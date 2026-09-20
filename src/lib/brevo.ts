import { advertisingAllowed, getAttribution, trackConfirmedLead } from './metaPixel';
export interface LeadEmailPayload {
  type: 'quote' | 'demo' | 'dealer' | 'contact' | 'testdrive';
  subject: string; senderName: string; senderEmail: string; senderPhone?: string; data: Record<string, unknown>;
}
const pending = new WeakMap<HTMLFormElement, {fingerprint: string; request: Record<string, unknown>}>();
/** Save on our server first. Secrets, email delivery and CAPI stay on the server. */
export async function sendLeadEmail(payload: LeadEmailPayload, form: HTMLFormElement) {
  const fields = new FormData(form);
  const consent = fields.get('contactConsent') === 'yes';
  if (!consent) throw new Error('Please allow us to contact you about this request.');
  const fingerprint = JSON.stringify(payload);
  let submission = pending.get(form);
  if (!submission || submission.fingerprint !== fingerprint) {
    submission = {fingerprint, request: {...payload, submissionId: crypto.randomUUID(), consent,
      website: String(fields.get('companyWebsiteCheck') || ''),
      marketingConsent: advertisingAllowed(), attribution: getAttribution()}};
    pending.set(form, submission);
  }
  const response = await fetch('/api/leads', {method:'POST', headers:{'content-type':'application/json'}, body:JSON.stringify(submission.request), signal:AbortSignal.timeout(20000)});
  const result = await response.json().catch(() => ({}));
  if (!response.ok || !result.success) throw new Error(result.error || 'Your request was not saved. Please try again or call (954) 820-4220.');
  try { trackConfirmedLead(result.eventName, result.eventId, payload.type); } catch { /* optional analytics cannot change save status */ }
  pending.delete(form);
  return result as {success: true; leadId: string; eventId: string};
}
