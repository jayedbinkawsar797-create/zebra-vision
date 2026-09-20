import test from 'node:test';
import assert from 'node:assert/strict';
import {randomUUID} from 'node:crypto';
import {leadSchema,metaEvent,leadEmail,csvCell,hash,eventForType} from './lead-core.mjs';
const payload=()=>({submissionId:randomUUID(),type:'quote',subject:'Quote',senderName:'QA Customer',senderEmail:'QA@example.com',senderPhone:'(202) 555-0101',data:{message:'<img src=x onerror=alert(1)>',budget:'$18,000'},consent:true,marketingConsent:true,attribution:{path:'/'}});

test('server rejects invalid, oversized and unconsented submissions',()=>{
  const p=payload();assert(leadSchema.safeParse(p).success);
  for(const change of [{consent:false},{senderEmail:'bad'},{senderPhone:'abcde'},{senderName:'x'.repeat(101)},{attribution:{path:'https://evil.test'}},{unexpected:'bad'}]) assert.equal(leadSchema.safeParse({...p,...change}).success,false);
});
test('Meta contact matching is hashed and shared event ID preserves deduplication',()=>{
  const p=leadSchema.parse(payload());const l={id:p.submissionId,payload:p,created_at:new Date(),client_ip:'127.0.0.1',user_agent:'QA'};const ev=metaEvent(l);
  assert.equal(ev.event_id,p.submissionId);assert.equal(ev.event_name,'Lead');assert.equal(ev.user_data.em[0],hash('qa@example.com'));assert.equal(ev.user_data.ph[0],hash('12025550101'));
  const s=JSON.stringify(ev);for(const forbidden of ['QA Customer','qa@example.com','555-0101','18,000','onerror','message'])assert(!s.includes(forbidden));
  assert.equal(ev.custom_data.value,undefined);assert.equal(ev.event_source_url,'https://zebragolfcart.com/');
});
test('dealer and support forms do not inflate sales Lead events',()=>{assert.equal(eventForType('dealer'),'SubmitApplication');assert.equal(eventForType('contact'),'Contact');});
test('qualification outcomes are separate server events',()=>{
  const p=leadSchema.parse(payload());const ev=metaEvent({id:p.submissionId,payload:p,created_at:new Date()},'QualifiedLead','status:test',new Date());
  assert.equal(ev.action_source,'system_generated');assert.equal(ev.event_id,'status:test');assert.equal(ev.event_source_url,undefined);
});
test('customer text is escaped in email and spreadsheet formulas neutralized',()=>{
  const p=payload();p.senderName='<script>alert(1)</script>';const html=leadEmail({id:p.submissionId,payload:p});assert(!html.includes('<script>'));assert(!html.includes('<img'));assert(html.includes('&lt;img'));
  assert.equal(csvCell('=HYPERLINK("evil")'),'"\'=HYPERLINK(""evil"")"');
});
