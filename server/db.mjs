import pg from 'pg';

export const pool = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
  max: 5, connectionTimeoutMillis: 5000, idleTimeoutMillis: 30000,
});
pool.on('error', () => console.error('Database connection interrupted'));

export async function migrate() {
  if (!process.env.DATABASE_URL) throw new Error('DATABASE_URL is required');
  await pool.query(`
    CREATE TABLE IF NOT EXISTS zebra_web_leads (
      id UUID PRIMARY KEY, payload JSONB NOT NULL, request_hash TEXT NOT NULL,
      status TEXT NOT NULL DEFAULT 'new' CHECK (status IN ('new','qualified','disqualified')),
      created_at TIMESTAMPTZ NOT NULL DEFAULT now(), updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
      client_ip TEXT, user_agent TEXT
    );
    CREATE TABLE IF NOT EXISTS zebra_lead_outbox (
      id TEXT PRIMARY KEY, lead_id UUID NOT NULL REFERENCES zebra_web_leads(id),
      kind TEXT NOT NULL, event_name TEXT, event_time TIMESTAMPTZ NOT NULL DEFAULT now(),
      attempts INTEGER NOT NULL DEFAULT 0, state TEXT NOT NULL DEFAULT 'pending',
      next_attempt TIMESTAMPTZ NOT NULL DEFAULT now(), last_error TEXT
    );
    CREATE INDEX IF NOT EXISTS zebra_outbox_due ON zebra_lead_outbox(state, next_attempt);
    CREATE TABLE IF NOT EXISTS zebra_admin_codes (
      id UUID PRIMARY KEY, code_hash TEXT NOT NULL, expires_at TIMESTAMPTZ NOT NULL,
      attempts INTEGER NOT NULL DEFAULT 0, used BOOLEAN NOT NULL DEFAULT false
    );
    CREATE TABLE IF NOT EXISTS zebra_admin_sessions (
      token_hash TEXT PRIMARY KEY, expires_at TIMESTAMPTZ NOT NULL
    );
    CREATE TABLE IF NOT EXISTS zebra_lead_status_log (
      id BIGSERIAL PRIMARY KEY, lead_id UUID NOT NULL REFERENCES zebra_web_leads(id),
      status TEXT NOT NULL, reason TEXT NOT NULL, changed_at TIMESTAMPTZ NOT NULL DEFAULT now()
    );
  `);
}
