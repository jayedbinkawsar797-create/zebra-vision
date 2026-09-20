import {beforeEach,describe,it,expect,vi} from 'vitest';
import {sendLeadEmail} from './brevo';
const form=()=>{const f=document.createElement('form');f.innerHTML='<input name="contactConsent" value="yes"><input name="companyWebsiteCheck" value="">';return f;};
const payload={type:'quote' as const,subject:'Quote',senderName:'QA Customer',senderEmail:'qa@example.com',senderPhone:'2025550101',data:{message:'Private message',budget:'18000'}};
beforeEach(()=>{vi.restoreAllMocks();localStorage.clear();sessionStorage.clear();vi.stubGlobal('crypto',{randomUUID:()=> 'd2e63c1a-5d9a-448a-a2d2-d1c3218afbd7'});});
describe('confirmed lead submission',()=>{
 it('keeps failure visible and reuses the submission ID on retry',async()=>{
  const fetcher=vi.fn().mockResolvedValueOnce({ok:false,json:async()=>({error:'Save failed'})}).mockResolvedValueOnce({ok:true,json:async()=>({success:true,eventName:'Lead',eventId:'same'})});vi.stubGlobal('fetch',fetcher);const f=form();
  await expect(sendLeadEmail(payload,f)).rejects.toThrow('Save failed');await sendLeadEmail(payload,f);
  expect(JSON.parse(fetcher.mock.calls[0][1].body).submissionId).toBe(JSON.parse(fetcher.mock.calls[1][1].body).submissionId);
 });
 it('does not emit a lead event when saving fails',async()=>{localStorage.setItem('zebra-advertising-consent','accepted');window.fbq=vi.fn((..._args: unknown[]) => {});vi.stubGlobal('fetch',vi.fn().mockResolvedValue({ok:false,json:async()=>({error:'Unavailable'})}));await expect(sendLeadEmail(payload,form())).rejects.toThrow();expect(window.fbq).not.toHaveBeenCalled();});
 it('does not share advertising data when consent is declined',async()=>{localStorage.setItem('zebra-advertising-consent','declined');const fetcher=vi.fn().mockResolvedValue({ok:true,json:async()=>({success:true,eventName:'Lead',eventId:'test'})});vi.stubGlobal('fetch',fetcher);window.fbq=vi.fn((..._args: unknown[]) => {});await sendLeadEmail(payload,form());expect(JSON.parse(fetcher.mock.calls[0][1].body).marketingConsent).toBe(false);expect(window.fbq).not.toHaveBeenCalled();});
 it('emits only the confirmed event with its shared ID and no customer details',async()=>{localStorage.setItem('zebra-advertising-consent','accepted');window.fbq=vi.fn((..._args: unknown[]) => {});vi.stubGlobal('fetch',vi.fn().mockResolvedValue({ok:true,json:async()=>({success:true,eventName:'Lead',eventId:'server-id'})}));await sendLeadEmail(payload,form());expect(window.fbq).toHaveBeenCalledWith('track','Lead',{content_name:'Zebra Golf Cart inquiry',content_category:'quote'},{eventID:'server-id'});expect(JSON.stringify(vi.mocked(window.fbq).mock.calls)).not.toContain('qa@example.com');});
});
