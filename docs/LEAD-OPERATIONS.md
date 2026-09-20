# Website lead operations

The React site posts forms to the same-origin Node service. PostgreSQL saves the inquiry and delivery outbox in one transaction before a visitor sees a success message. Email and Meta delivery retry independently; staff can see delivery failures at `/leads`.

## Runtime configuration

Use Railway's private runtime variables, never Vite-prefixed build variables:

- `DATABASE_URL`: the existing private PostgreSQL connection.
- `SITE_ORIGIN`: `https://zebragolfcart.com`.
- `BREVO_API_KEY`, `BREVO_SENDER_EMAIL`, `BREVO_RECIPIENT_EMAIL`: a rotated Brevo key, verified sender, and the business mailbox that receives inquiries and staff sign-in codes.
- `META_ACCESS_TOKEN`, `META_DATASET_ID`, `META_GRAPH_VERSION`: dataset-scoped Conversions API credentials.

The previously exposed Brevo key must be revoked at Brevo. Removing a key from source does not invalidate it or remove it from Git history. The server temporarily accepts the old runtime variable names so notifications can continue during rotation; no email credential is included in the frontend build. Remove obsolete Railway variables after rotation. Do not restart paid traffic until rotation and a real notification delivery check pass.

## Lead review and Meta

Open `/leads`, request a sign-in code in the configured business mailbox, and review an inquiry before assigning Qualified or Disqualified with a reason. No lead is automatically qualified. Staff codes expire after 10 minutes; sessions expire after 8 hours.

- Quote and test-drive requests produce `Lead` only after database persistence.
- Dealer applications produce `SubmitApplication`; support/contact produces `Contact`.
- Sales lead outcome changes produce `QualifiedLead` or `DisqualifiedLead`, with `action_source: system_generated`, `event_source: crm`, and `lead_event_source: Zebra Website CRM`.
- Advertising events require the visitor's advertising consent. Email/phone matching values are SHA-256 hashed. Messages, budget and financing choices are not sent as Meta event parameters.
- Browser and server lead events share one event ID for deduplication. Reloading `/thank-you` does not generate a Lead.
- Status saved in the dashboard is not proof Meta received it. Inspect delivery status.

Conversion events do not create customer cards in Meta Leads Center or synchronize status changes made inside Meta back to this dashboard. For contact review in Meta, use Export website leads and Meta Leads Center > Add leads > Upload leads. Export columns match Meta's downloaded CSV template; review names and field mapping before import. Website status is preserved in Notes, not silently used to overwrite Meta stages. A native two-way CRM integration is not included.

## Verification

`npm run build`, TypeScript checking, `npm test` and `npm run test:server` cover the build, failed-submit behavior, consent, validation, escaping and event IDs. `npm run test:integration` requires an isolated local PostgreSQL-compatible database in `DATABASE_URL`; it tests real HTTP requests, SQL persistence, duplicate requests, same-origin enforcement, private data authorization, one-time codes, session logout, CSV export and qualification idempotency. Never run that test against production.

Use Meta Test Events and `META_TEST_EVENT_CODE` only for isolated tests. Remove the test code before real traffic. API acceptance validates ingestion, not ad attribution or optimization performance.

## Homepage audit and assets

The homepage now presents an actual new-grille cart photo, starting prices, four model/battery comparisons, a short inquiry form with delivery ZIP and purchase timing, feature photos, FAQs and dealer signup. This structure follows useful patterns observed on https://iconev.com/ and https://evolutionelectricvehicle.com/: visible model/pricing choices, shopping actions, buyer resources and dealer navigation. No conversion uplift is claimed.

Photos came from the business's Google Drive: Zebra_Blue_IMG_4486_Professional.jpg (new grille), Zebra_Blue_IMG_4487_Professional.jpg (profile), and Zebra_Red_IMG_4495_Professional.jpg (roof). No AI reconstruction of product hardware was used. The old grille remains on some existing configurator example images; the homepage uses the new grille.

The Breeze 4L, Breeze 4L Pro and Terrain 6 use the owner's corrected 52.1V labels. Terrain 6 Pro retains its existing 73.6V specification. Range describes distance, not speed. Prices and availability remain subject to business confirmation.
