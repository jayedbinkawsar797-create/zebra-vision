import { createHash } from 'node:crypto';
import { z } from 'zod';

const text = (max) => z.string().trim().max(max);
const cookieId = text(250).regex(/^fb\.\d\.\d{10,13}\.[A-Za-z0-9_.-]+$/).optional();
export const leadSchema = z.object({
  submissionId: z.string().uuid(),
  type: z.enum(['quote', 'demo', 'dealer', 'contact', 'testdrive']),
  subject: text(180).min(1),
  senderName: text(100).min(2),
  senderEmail: text(254).email().transform(s => s.toLowerCase()),
  senderPhone: text(30).refine(s => /^[+\d\s().-]+$/.test(s) && s.replace(/\D/g, '').length >= 7),
  data: z.record(text(60), z.union([text(2000), z.number().finite(), z.array(text(200)).max(20)])).refine(o => Object.keys(o).length <= 30),
  website: text(200).default(''),
  consent: z.literal(true),
  marketingConsent: z.boolean().default(false),
  attribution: z.object({
    path: text(160).regex(/^\/[A-Za-z0-9/_-]*$/),
    fbp: cookieId,
    fbc: cookieId,
    utm_source: text(150).optional(), utm_medium: text(150).optional(),
    utm_campaign: text(150).optional(), utm_content: text(150).optional(),
    utm_term: text(150).optional(),
  }).default({ path: '/' }),
}).strict();

export const hash = value => createHash('sha256').update(String(value)).digest('hex');
export const normalizedPhone = value => { const digits = value.replace(/\D/g, ''); return digits.length === 10 ? `1${digits}` : digits; };
export const escapeHtml = value => String(value ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
export const eventForType = type => type === 'dealer' ? 'SubmitApplication' : type === 'contact' ? 'Contact' : 'Lead';
export function metaEvent(lead, eventName = eventForType(lead.payload.type), eventId = lead.id, at = lead.created_at) {
  const p = lead.payload;
  const phone = normalizedPhone(p.senderPhone);
  const event = {
    event_name: eventName,
    event_time: Math.floor(new Date(at).getTime() / 1000),
    event_id: eventId,
    action_source: eventName === 'QualifiedLead' || eventName === 'DisqualifiedLead' ? 'system_generated' : 'website',
    user_data: { em: [hash(p.senderEmail.trim().toLowerCase())], ph: [hash(phone)], external_id: [hash(lead.id)] },
    custom_data: { content_name: 'Zebra Golf Cart inquiry', content_category: p.type },
  };
  if (event.action_source === 'system_generated') Object.assign(event.custom_data, { event_source: 'crm', lead_event_source: 'Zebra Website CRM' });
  if (event.action_source === 'website') event.event_source_url = `https://zebragolfcart.com${p.attribution.path}`;
  if (lead.client_ip) event.user_data.client_ip_address = lead.client_ip;
  if (lead.user_agent) event.user_data.client_user_agent = lead.user_agent;
  if (p.attribution.fbp) event.user_data.fbp = p.attribution.fbp;
  if (p.attribution.fbc) event.user_data.fbc = p.attribution.fbc;
  return event;
}

export function leadEmail(lead) {
  const p = lead.payload;
  const fields = { Name: p.senderName, Email: p.senderEmail, Phone: p.senderPhone, ...p.data };
  return `<h1>Zebra Golf Cart: ${escapeHtml(p.type)} request</h1><p>Reference: ${escapeHtml(lead.id)}</p><table>${Object.entries(fields).map(([k,v]) => `<tr><th style="text-align:left;padding:8px">${escapeHtml(k)}</th><td style="padding:8px">${escapeHtml(Array.isArray(v) ? v.join(', ') : v)}</td></tr>`).join('')}</table><p><a href="https://zebragolfcart.com/leads">Review leads</a></p>`;
}

export function csvCell(value) {
  let v = String(value ?? '');
  if (/^[\s]*[=+\-@\t\r]/.test(v)) v = `'${v}`;
  return `"${v.replace(/"/g, '""')}"`;
}
