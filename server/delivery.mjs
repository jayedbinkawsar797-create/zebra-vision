import { pool } from './db.mjs';
import { leadEmail, metaEvent } from './lead-core.mjs';

export const mailConfig = () => ({
  key: process.env.BREVO_API_KEY || process.env.VITE_BREVO_API_KEY,
  sender: process.env.BREVO_SENDER_EMAIL || process.env.VITE_BREVO_SENDER_EMAIL || 'notifications@zebragolfcart.com',
  recipient: process.env.BREVO_RECIPIENT_EMAIL || process.env.VITE_BREVO_RECIPIENT_EMAIL || 'info@zebragolfcart.com',
});

export async function sendMail(subject, htmlContent, replyTo) {
  const c = mailConfig();
  if (!c.key) throw new Error('email_not_configured');
  const response = await fetch('https://api.brevo.com/v3/smtp/email', {
    method: 'POST', signal: AbortSignal.timeout(15000),
    headers: { 'api-key': c.key, 'content-type': 'application/json', accept: 'application/json' },
    body: JSON.stringify({ sender: { name: 'Zebra Golf Cart', email: c.sender }, to: [{email: c.recipient}], subject, htmlContent, ...(replyTo ? {replyTo} : {}) }),
  });
  if (!response.ok) throw new Error(`email_http_${response.status}`);
}

export async function sendMeta(lead, job) {
  if (!process.env.META_ACCESS_TOKEN || !process.env.META_DATASET_ID) throw new Error('meta_not_configured');
  const version = process.env.META_GRAPH_VERSION || 'v25.0';
  if (!/^v\d+\.0$/.test(version) || !/^\d+$/.test(process.env.META_DATASET_ID)) throw new Error('meta_invalid_config');
  const response = await fetch(`https://graph.facebook.com/${version}/${process.env.META_DATASET_ID}/events`, {
    method: 'POST', signal: AbortSignal.timeout(15000),
    headers: { Authorization: `Bearer ${process.env.META_ACCESS_TOKEN}`, 'content-type': 'application/json' },
    body: JSON.stringify({ data: [metaEvent(lead, job.event_name, job.id, job.event_time)], ...(process.env.META_TEST_EVENT_CODE ? {test_event_code: process.env.META_TEST_EVENT_CODE} : {}) }),
  });
  const result = await response.json().catch(() => ({}));
  if (!response.ok || result.events_received !== 1) throw new Error(`meta_http_${response.status}`);
}

let running = false;
export async function deliverPending() {
  if (running) return;
  running = true;
  let connection;
  try {
    connection = await pool.connect();
    // A database lock prevents two deployments from sending the same outbox item.
    const {rows} = await connection.query('SELECT pg_try_advisory_lock(82914025) AS locked');
    if (!rows[0].locked) return;
    const jobs = await connection.query(`SELECT * FROM zebra_lead_outbox WHERE state='pending' AND next_attempt <= now() ORDER BY next_attempt LIMIT 15`);
    for (const job of jobs.rows) {
      const {rows: leads} = await connection.query('SELECT * FROM zebra_web_leads WHERE id=$1', [job.lead_id]);
      const lead = leads[0];
      try {
        if (job.kind === 'email') await sendMail(`[Zebra Lead] ${lead.payload.type} request`, leadEmail(lead), {email: lead.payload.senderEmail, name: lead.payload.senderName});
        else {
          if (!lead.payload.marketingConsent) { await connection.query("UPDATE zebra_lead_outbox SET state='skipped' WHERE id=$1", [job.id]); continue; }
          // Meta rejects events more than 7 days old. Keep them visible for review.
          if (Date.now() - new Date(job.event_time).getTime() > 7 * 86400000) throw new Error('meta_event_expired');
          await sendMeta(lead, job);
        }
        await connection.query("UPDATE zebra_lead_outbox SET state='sent',last_error=NULL WHERE id=$1", [job.id]);
      } catch (error) {
        const terminal = job.attempts >= 19 || error.message === 'meta_event_expired';
        const delay = Math.min(3600, 60 * 2 ** Math.min(job.attempts, 6));
        await connection.query("UPDATE zebra_lead_outbox SET attempts=attempts+1, last_error=$2, state=$3, next_attempt=now()+$4*interval '1 second' WHERE id=$1", [job.id, /^(meta|email)_/.test(error.message) ? error.message : 'delivery_unavailable', terminal ? 'failed' : 'pending', delay]);
      }
    }
  } catch { console.error('Lead delivery queue temporarily unavailable'); }
  finally {
    if (connection) { await connection.query('SELECT pg_advisory_unlock(82914025)').catch(() => {}); connection.release(); }
    running = false;
  }
}
