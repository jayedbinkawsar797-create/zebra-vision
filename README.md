# Zebra Golf Cart

Website and private lead manager for https://zebragolfcart.com.

## Application

React and Vite build the public website. The Node server in `server/index.mjs` serves the built website and handles inquiries, staff sign-in, and lead status changes. PostgreSQL stores leads, sessions, status history, and the delivery outbox.

## Configuration

Use `.env.example` as the configuration reference. Store production secrets only in Railway service variables for `fulfilling-success` → `production` → `zebra-vision`.

Required email variables:

- `BREVO_API_KEY`: a valid Brevo API key, available only to the server.
- `BREVO_SENDER_EMAIL`: a verified sender; defaults to `notifications@zebragolfcart.com`.
- `BREVO_RECIPIENT_EMAIL`: the staff notification and sign-in recipient; defaults to `info@zebragolfcart.com`.

Never prefix secrets with `VITE_`, commit real credentials, or print them in logs. Remove obsolete frontend email variables when migrating. Rotate any previously exposed key at Brevo after deploying and verifying the replacement.

Other server settings include `DATABASE_URL`, `SITE_ORIGIN`, `NODE_ENV`, `PORT`, `META_DATASET_ID`, `META_ACCESS_TOKEN`, and `META_GRAPH_VERSION`. Use `META_TEST_EVENT_CODE` only for controlled testing and remove it before real traffic.

## Development and checks

Install dependencies with `npm ci`. Run the API server with `npm start` and Vite with `npm run dev`; the Vite configuration proxies `/api` to port 8080. Supply the server environment securely. Run `npm run build` for production assets.

Available checks: `npm test`, `npm run test:server`, `npm run test:integration`, and `npm run lint`. Database-dependent checks require the appropriate test database configuration.

## Deployment and verification

Railway deploys `zzorganization/zebra-vision` branch `main`. The Node server serves `dist` and `/api/health` reports readiness after database migration.

After an email configuration change, verify a clearly labeled inquiry is saved, confirm a Delivered event in Brevo's transactional logs, and test staff sign-in at `/leads`. An API acceptance response or the outbox's `sent` state alone does not prove delivery to the recipient's mail server.

Meta browser/server events respect advertising consent and use shared event IDs for deduplication. Qualified and disqualified outcomes are sent through the Conversions API. These events are measurement signals; their acceptance does not establish creation or status synchronization of a customer record in Meta Leads Center. The consent-filtered CSV export remains a manual transfer unless a supported record integration is separately implemented and verified.
