import http from 'node:http';
import { randomBytes, randomInt, randomUUID, timingSafeEqual } from 'node:crypto';
import { readFile, stat } from 'node:fs/promises';
import { createReadStream } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import { pool, migrate } from './db.mjs';
import { leadSchema, hash, eventForType, csvCell, normalizedPhone } from './lead-core.mjs';
import { deliverPending, mailConfig, sendMail } from './delivery.mjs';

const port = Number(process.env.PORT || 8080);
const root = path.resolve(fileURLToPath(new URL('../dist/', import.meta.url)));
const origin = process.env.SITE_ORIGIN || 'https://zebragolfcart.com';
const production = process.env.NODE_ENV === 'production';
const limits = new Map();
let ready = false;

function rate(key, max, seconds) {
  const now = Date.now();
  for (const [k,v] of limits) if (v.until < now) limits.delete(k);
  if (!limits.has(key) && limits.size >= 20000) return false;
  const item = limits.get(key) || {count:0, until:now + seconds * 1000};
  item.count++; limits.set(key,item);
  return item.count <= max;
}
function json(res, status, data) {
  res.writeHead(status, {'Content-Type':'application/json; charset=utf-8', 'Cache-Control':'no-store'});
  res.end(JSON.stringify(data));
}
async function body(req) {
  if (!req.headers['content-type']?.startsWith('application/json')) throw Object.assign(new Error('Use JSON'), {status:415});
  let size=0; const chunks=[];
  for await (const chunk of req) { size+=chunk.length; if(size>20000) throw Object.assign(new Error('Request too large'),{status:413}); chunks.push(chunk); }
  try { return JSON.parse(Buffer.concat(chunks).toString()); } catch { throw Object.assign(new Error('Invalid request'),{status:400}); }
}
async function authorized(req) {
  const token = req.headers.cookie?.split(';').map(s=>s.trim()).find(s=>s.startsWith('zebra_session='))?.slice(14);
  if (!token || !/^[a-f0-9]{64}$/.test(token)) return false;
  const r=await pool.query('SELECT 1 FROM zebra_admin_sessions WHERE token_hash=$1 AND expires_at>now()', [hash(token)]);
  return !!r.rowCount;
}
function headers(res) {
  res.setHeader('X-Content-Type-Options','nosniff');
  res.setHeader('X-Frame-Options','DENY');
  res.setHeader('Referrer-Policy','strict-origin-when-cross-origin');
  res.setHeader('Permissions-Policy','camera=(), microphone=(), geolocation=()');
  res.setHeader('Content-Security-Policy', "default-src 'self'; script-src 'self' https://connect.facebook.net; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data: https://www.facebook.com; connect-src 'self' https://www.facebook.com https://connect.facebook.net; frame-src https://www.facebook.com https://www.google.com; object-src 'none'; base-uri 'self'; form-action 'self'; frame-ancestors 'none'");
  if(production) res.setHeader('Strict-Transport-Security','max-age=31536000');
}

export const server = http.createServer(async (req,res) => {
  headers(res);
  const ip = String(req.headers['x-forwarded-for'] || req.socket.remoteAddress || '').split(',')[0].trim().slice(0,60);
  let pathname;
  try {
    pathname = new URL(req.url, origin).pathname;
    if(pathname.startsWith('/api/') || pathname === '/leads' || pathname === '/thank-you') res.setHeader('X-Robots-Tag','noindex, nofollow');
    if(pathname.startsWith('/api/')) {
      if(req.method!=='GET' && req.headers.origin !== origin && !( !production && req.headers.origin === `http://localhost:${port}`)) return json(res,403,{error:'Request origin not allowed'});
      if(pathname==='/api/health' && req.method==='GET') return json(res,ready?200:503,{ok:ready});
      if(!ready) return json(res,503,{error:'Please try again shortly or call (954) 820-4220.'});
      if(pathname==='/api/leads' && req.method==='POST') {
        if(!rate(`lead:${ip}`,8,900)) return json(res,429,{error:'Please wait a few minutes before trying again.'});
        const parsed = leadSchema.safeParse(await body(req));
        if(!parsed.success || parsed.data.website) return json(res,400,{error:'Please check your name, email, phone, and consent.'});
        const payload=parsed.data;
        if(!payload.marketingConsent) payload.attribution={path:payload.attribution.path};
        const fingerprint=hash(JSON.stringify(payload));
        const cx=await pool.connect();
        try {
          await cx.query('BEGIN');
          const result=await cx.query(`INSERT INTO zebra_web_leads(id,payload,request_hash,client_ip,user_agent) VALUES($1,$2,$3,$4,$5) ON CONFLICT(id) DO NOTHING RETURNING id`,[payload.submissionId,payload,fingerprint,payload.marketingConsent?ip:null,payload.marketingConsent?String(req.headers['user-agent']||'').slice(0,500):null]);
          if(!result.rowCount) {
            const old=await cx.query('SELECT request_hash FROM zebra_web_leads WHERE id=$1',[payload.submissionId]);
            if(old.rows[0]?.request_hash!==fingerprint) {await cx.query('ROLLBACK'); return json(res,409,{error:'Please reload the form and try again.'});}
          } else {
            await cx.query("INSERT INTO zebra_lead_outbox(id,lead_id,kind) VALUES($1,$2,'email')",[`email:${payload.submissionId}`,payload.submissionId]);
            if(payload.marketingConsent) await cx.query("INSERT INTO zebra_lead_outbox(id,lead_id,kind,event_name) VALUES($1,$2,'meta',$3)",[payload.submissionId,payload.submissionId,eventForType(payload.type)]);
          }
          await cx.query('COMMIT');
        } catch(error) {await cx.query('ROLLBACK'); throw error;} finally {cx.release();}
        json(res,201,{success:true,leadId:payload.submissionId,eventId:payload.submissionId,eventName:eventForType(payload.type)});
        void deliverPending(); return;
      }
      if(pathname==='/api/admin/request-code' && req.method==='POST') {
        if(!rate(`login:${ip}`,3,900) || !rate('login-global',8,3600)) return json(res,429,{error:'Please wait before requesting another code.'});
        await pool.query('DELETE FROM zebra_admin_codes WHERE expires_at<now()');
        await pool.query('DELETE FROM zebra_admin_sessions WHERE expires_at<now()');
        const id=randomUUID(), code=String(randomInt(100000,1000000));
        await pool.query("INSERT INTO zebra_admin_codes(id,code_hash,expires_at) VALUES($1,$2,now()+interval '10 minutes')",[id,hash(id+code)]);
        try {await sendMail('Your Zebra lead manager sign-in code',`<p>Your sign-in code is <strong>${code}</strong>.</p><p>It expires in 10 minutes. If you did not request it, ignore this email.</p>`);} catch {return json(res,503,{error:'Sign-in email could not be sent. Please check the email service configuration.'});}
        return json(res,200,{challenge:id});
      }
      if(pathname==='/api/admin/verify-code' && req.method==='POST') {
        if(!rate(`verify:${ip}`,15,900)) return json(res,429,{error:'Please try again later.'});
        const input=await body(req);
        if(!/^[a-f0-9-]{36}$/.test(input.challenge||'') || !/^\d{6}$/.test(input.code||'')) return json(res,401,{error:'Invalid or expired code'});
        const cx=await pool.connect();
        try {
          await cx.query('BEGIN');
          const found=await cx.query('SELECT * FROM zebra_admin_codes WHERE id=$1 AND expires_at>now() AND used=false AND attempts<5 FOR UPDATE',[input.challenge]);
          const entry=found.rows[0];
          if(!entry){await cx.query('ROLLBACK');return json(res,401,{error:'Invalid or expired code'});}
          await cx.query('UPDATE zebra_admin_codes SET attempts=attempts+1 WHERE id=$1',[input.challenge]);
          if(!timingSafeEqual(Buffer.from(entry.code_hash),Buffer.from(hash(input.challenge+input.code)))){await cx.query('COMMIT');return json(res,401,{error:'Invalid or expired code'});}
          const session=randomBytes(32).toString('hex');
          await cx.query('UPDATE zebra_admin_codes SET used=true WHERE id=$1',[input.challenge]);
          await cx.query("INSERT INTO zebra_admin_sessions(token_hash,expires_at) VALUES($1,now()+interval '8 hours')",[hash(session)]);
          await cx.query('COMMIT');
          res.setHeader('Set-Cookie',`zebra_session=${session}; HttpOnly; ${production?'Secure; ':''}SameSite=Strict; Path=/api/admin; Max-Age=28800`);
          return json(res,200,{success:true});
        } catch(error){await cx.query('ROLLBACK');throw error;} finally {cx.release();}
      }
      if(pathname.startsWith('/api/admin/')) {
        if(!await authorized(req)) return json(res,401,{error:'Sign in to view customer data.'});
        if(pathname==='/api/admin/logout' && req.method==='POST') {
          const token=req.headers.cookie?.split(';').map(s=>s.trim()).find(s=>s.startsWith('zebra_session='))?.slice(14);
          await pool.query('DELETE FROM zebra_admin_sessions WHERE token_hash=$1',[hash(token)]);
          res.setHeader('Set-Cookie','zebra_session=; HttpOnly; SameSite=Strict; Path=/api/admin; Max-Age=0');
          return json(res,200,{success:true});
        }
        if(pathname==='/api/admin/leads' && req.method==='GET') {
          const leads=await pool.query('SELECT id,payload,status,created_at FROM zebra_web_leads ORDER BY created_at DESC LIMIT 250');
          const queue=await pool.query('SELECT lead_id,kind,state,last_error FROM zebra_lead_outbox WHERE lead_id=ANY($1::uuid[])',[leads.rows.map(l=>l.id)]);
          return json(res,200,{leads:leads.rows,delivery:queue.rows,metaConfigured:!!(process.env.META_ACCESS_TOKEN&&process.env.META_DATASET_ID),emailConfigured:!!mailConfig().key});
        }
        if(pathname==='/api/admin/export' && req.method==='GET') {
          const leads=await pool.query(`SELECT id,payload,status,created_at FROM zebra_web_leads WHERE payload->>'marketingConsent'='true' AND payload->>'type' IN ('quote','demo','testdrive') ORDER BY created_at DESC LIMIT 10000`);
          const rows=[['First Name','Last Name','Phone','Email','Company','Notes'],...leads.rows.map(l=>{const [first,...last]=l.payload.senderName.split(/\s+/);return [first,last.join(' '),normalizedPhone(l.payload.senderPhone),l.payload.senderEmail,l.payload.data.businessName||'',`Website ${l.payload.type}; status: ${l.status}; ${l.id}; ${new Date(l.created_at).toISOString()}`];})];
          res.writeHead(200,{'Content-Type':'text/csv; charset=utf-8','Content-Disposition':'attachment; filename="zebra-website-leads.csv"','Cache-Control':'no-store'});
          return res.end('\uFEFF'+rows.map(row=>row.map(csvCell).join(',')).join('\r\n'));
        }
        if(pathname==='/api/admin/status' && req.method==='POST') {
          const input=await body(req);
          if(!/^[a-f0-9-]{36}$/.test(input.id||'')||!['qualified','disqualified','new'].includes(input.status)||typeof input.reason!=='string'||input.reason.trim().length<3||input.reason.length>300) return json(res,400,{error:'Choose a status and add a short reason.'});
          const cx=await pool.connect();
          try {
            await cx.query('BEGIN');
            const found=await cx.query('SELECT * FROM zebra_web_leads WHERE id=$1 FOR UPDATE',[input.id]);
            const lead=found.rows[0];
            if(!lead){await cx.query('ROLLBACK');return json(res,404,{error:'Lead not found'});}
            if(lead.status!==input.status){
              await cx.query('UPDATE zebra_web_leads SET status=$2,updated_at=now() WHERE id=$1',[input.id,input.status]);
              await cx.query('INSERT INTO zebra_lead_status_log(lead_id,status,reason) VALUES($1,$2,$3)',[input.id,input.status,input.reason.trim()]);
              if(lead.payload.marketingConsent&&eventForType(lead.payload.type)==='Lead'&&input.status!=='new') await cx.query("INSERT INTO zebra_lead_outbox(id,lead_id,kind,event_name) VALUES($1,$2,'meta',$3)",[`status:${randomUUID()}`,input.id,input.status==='qualified'?'QualifiedLead':'DisqualifiedLead']);
            }
            await cx.query('COMMIT');
          }catch(error){await cx.query('ROLLBACK');throw error;}finally{cx.release();}
          void deliverPending();return json(res,200,{success:true});
        }
      }
      return json(res,404,{error:'Not found'});
    }
    if(!['GET','HEAD'].includes(req.method)){res.writeHead(405);return res.end();}
    const knownAsset = /^\/(?:assets\/[A-Za-z0-9_.-]+|[A-Za-z0-9_-]+\.(?:ico|png|svg|webmanifest|txt|xml))$/.test(pathname);
    const file=knownAsset?path.join(root,pathname):path.join(root,'index.html');
    let s;
    try{s=await stat(file);}catch{res.writeHead(404);return res.end('Not found');}
    const types={'.html':'text/html; charset=utf-8','.js':'text/javascript; charset=utf-8','.css':'text/css; charset=utf-8','.png':'image/png','.jpg':'image/jpeg','.jpeg':'image/jpeg','.webp':'image/webp','.svg':'image/svg+xml','.ico':'image/x-icon','.xml':'application/xml','.txt':'text/plain','.webmanifest':'application/manifest+json'};
    res.setHeader('Content-Type',types[path.extname(file)]||'application/octet-stream');
    res.setHeader('Cache-Control',pathname.startsWith('/assets/')?'public, max-age=31536000, immutable':'no-cache');
    res.setHeader('Content-Length',s.size);
    if(req.method==='HEAD')return res.end();
    createReadStream(file).on('error',()=>res.destroy()).pipe(res);
  } catch(error) { if(!res.headersSent)json(res,error.status||503,{error:error.status?error.message:'We could not save your request. Please try again or call (954) 820-4220.'});else res.end(); }
});
server.requestTimeout=15000;
server.headersTimeout=10000;

if(process.env.NODE_ENV!=='test') {
  await migrate(); ready=true;
  server.listen(port,'0.0.0.0',()=>console.log(`Zebra website listening on ${port}`));
  const worker=setInterval(()=>void deliverPending(),30000);
  void deliverPending();
  process.on('SIGTERM',()=>{clearInterval(worker);server.close(()=>void pool.end());});
}
