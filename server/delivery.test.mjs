import test from 'node:test';
import assert from 'node:assert/strict';
import {mailConfig, sendMail} from './delivery.mjs';

test('email sending requires the private runtime key, including after rotation', async t => {
  const original = process.env.BREVO_API_KEY;
  const legacy = process.env.VITE_BREVO_API_KEY;
  t.after(() => {
    if (original === undefined) delete process.env.BREVO_API_KEY; else process.env.BREVO_API_KEY = original;
    if (legacy === undefined) delete process.env.VITE_BREVO_API_KEY; else process.env.VITE_BREVO_API_KEY = legacy;
  });
  delete process.env.BREVO_API_KEY;
  process.env.VITE_BREVO_API_KEY = 'obsolete-test-key';
  await assert.rejects(sendMail('QA', '<p>QA</p>'), {message: 'email_not_configured'});
  process.env.BREVO_API_KEY = '  replacement-test-key\n';
  assert.equal(mailConfig().key, 'replacement-test-key');
});

test('Brevo failures retain useful codes without exposing provider details', async t => {
  const original = process.env.BREVO_API_KEY;
  t.after(() => {if (original === undefined) delete process.env.BREVO_API_KEY; else process.env.BREVO_API_KEY = original;});
  process.env.BREVO_API_KEY = 'replacement-test-key';
  const fakeFetch = t.mock.method(globalThis, 'fetch', async () => new Response(JSON.stringify({code:'unauthorized',message:'sensitive provider detail'}), {status:401}));
  await assert.rejects(sendMail('QA', '<p>QA</p>'), {message:'email_http_401_unauthorized'});
  fakeFetch.mock.mockImplementation(async () => new Response(JSON.stringify({code:'unexpected_secret_value',message:'sensitive provider detail'}), {status:400}));
  await assert.rejects(sendMail('QA', '<p>QA</p>'), {message:'email_http_400'});
});
