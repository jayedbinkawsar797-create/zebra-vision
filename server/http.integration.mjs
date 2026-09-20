import test from 'node:test';
import assert from 'node:assert/strict';
import {spawn} from 'node:child_process';
import {randomUUID,randomBytes,createHash} from 'node:crypto';
import pg from 'pg';
const url=process.env.DATABASE_URL;
if(!url || !['127.0.0.1','localhost'].includes(new URL(url).hostname)) throw Error('Use an isolated local test database');
const base='http://localhost:18080';
const child=spawn(process.execPath,['server/index.mjs'],{env:{...process.env,PORT:'18080',SITE_ORIGIN:base,NODE_ENV:'development',BREVO_API_KEY:'',VITE_BREVO_API_KEY:'',META_ACCESS_TOKEN:''},stdio:['ignore','pipe','pipe']});
const pool=new pg.Pool({connectionString:url,max:2});
const sha=s=>createHash('sha256').update(s).digest('hex');
await new Promise((resolve,reject)=>{const timeout=setTimeout(()=>reject(Error('Server did not start')),15000);child.stdout.on('data',v=>{if(String(v).includes('listening')){clearTimeout(timeout);resolve();}});child.once('exit',code=>{clearTimeout(timeout);reject(Error(`Server exited ${code}`))});});
const request=(path,data,headers={})=>fetch(base+path,{method:data?'POST':'GET',headers:{origin:base,'content-type':'application/json',...headers},...(data?{body:JSON.stringify(data)}:{})});
const makeLead=()=>({submissionId:randomUUID(),type:'quote',subject:'QA',senderName:'QA Customer',senderEmail:'qa@example.com',senderPhone:'2025550101',data:{zip:'33324',seats:'4'},consent:true,marketingConsent:true,attribution:{path:'/'}});
try {
 await test('database health and private data protection',async()=>{
  assert.equal((await request('/api/health')).status,200);
  assert.equal((await request('/api/admin/leads')).status,401);
  assert.equal((await request('/api/admin/export')).status,401);
  assert.equal((await request('/api/admin/status',{id:randomUUID(),status:'qualified',reason:'QA'})).status,401);
  assert.equal((await request('/api/leads',makeLead(),{origin:'https://untrusted.example'})).status,403);
  const response=await request('/leads');assert.equal(response.headers.get('x-robots-tag'),'noindex, nofollow');assert.ok(response.headers.get('content-security-policy').includes("frame-ancestors 'none'"));
 });
 await test('lead saved once; changed retry rejected; invalid data does not save',async()=>{
  const lead=makeLead();const first=await request('/api/leads',lead);assert.equal(first.status,201);assert.equal((await first.json()).eventId,lead.submissionId);
  assert.equal((await request('/api/leads',lead)).status,201);
  assert.equal((await request('/api/leads',{...lead,senderName:'Different'})).status,409);
  assert.equal((await request('/api/leads',{...makeLead(),senderEmail:'invalid'})).status,400);
  assert.equal((await pool.query('SELECT count(*)::int AS n FROM zebra_web_leads WHERE id=$1',[lead.submissionId])).rows[0].n,1);
  assert.equal((await pool.query('SELECT count(*)::int AS n FROM zebra_lead_outbox WHERE lead_id=$1',[lead.submissionId])).rows[0].n,2);
 });
 await test('declined advertising consent stores no advertising identifiers or Meta job',async()=>{
  const lead={...makeLead(),senderEmail:'qa-declined@example.com',marketingConsent:false,attribution:{path:'/',fbp:'fb.1.1726800000000.1234',utm_source:'facebook'}};
  assert.equal((await request('/api/leads',lead)).status,201);
  const row=(await pool.query('SELECT * FROM zebra_web_leads WHERE id=$1',[lead.submissionId])).rows[0];
  assert.equal(row.client_ip,null);assert.equal(row.user_agent,null);assert.deepEqual(row.payload.attribution,{path:'/'});
  assert.equal((await pool.query("SELECT count(*)::int AS n FROM zebra_lead_outbox WHERE lead_id=$1 AND kind='meta'",[lead.submissionId])).rows[0].n,0);
 });
 await test('one-time codes, protected qualification and repeated status update',async()=>{
  const challenge=randomUUID(),code='123456';await pool.query("INSERT INTO zebra_admin_codes(id,code_hash,expires_at) VALUES($1,$2,now()+interval '10 minutes')",[challenge,sha(challenge+code)]);
  assert.equal((await request('/api/admin/verify-code',{challenge,code:'654321'})).status,401);
  const login=await request('/api/admin/verify-code',{challenge,code});assert.equal(login.status,200);const cookie=login.headers.get('set-cookie');assert.match(cookie,/HttpOnly/);assert.match(cookie,/SameSite=Strict/);
  assert.equal((await request('/api/admin/verify-code',{challenge,code})).status,401);
  const headers={cookie};const exported=await request('/api/admin/export',null,headers);assert.equal(exported.status,200);const csv=await exported.text();assert.match(csv,/"First Name","Last Name","Phone","Email"/);assert.ok(!csv.includes("qa-declined@example.com"));assert.match(csv,/"12025550101"/);const leads=await request('/api/admin/leads',null,headers);assert.equal(leads.status,200);const id=(await leads.json()).leads.find(l=>l.payload.marketingConsent).id;
  const update={id,status:'qualified',reason:'QA confirmed model and timing'};
  assert.equal((await request('/api/admin/status',update,headers)).status,200);assert.equal((await request('/api/admin/status',update,headers)).status,200);
  assert.equal((await pool.query("SELECT count(*)::int AS n FROM zebra_lead_outbox WHERE lead_id=$1 AND event_name='QualifiedLead'",[id])).rows[0].n,1);
  assert.equal((await request('/api/admin/logout',{},headers)).status,200);assert.equal((await request('/api/admin/leads',null,headers)).status,401);
 });
}finally{child.kill('SIGTERM');await pool.end();}
