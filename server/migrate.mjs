import { pool } from './db.mjs';
import { pathToFileURL } from 'node:url';
export async function migrate() {
  await pool.query(`CREATE TABLE IF NOT EXISTS products (
    id integer GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name varchar(120) NOT NULL CHECK (length(trim(name)) > 0),
    description text NOT NULL DEFAULT '' CHECK (length(description) <= 2000),
    price numeric(12,2) NOT NULL CHECK (price > 0 AND price <= 1000000),
    type varchar(30) NOT NULL CHECK (type IN ('decorative','care','accessories')),
    image text NOT NULL DEFAULT '',
    photo bytea,
    created_at timestamptz NOT NULL DEFAULT now(),
    updated_at timestamptz NOT NULL DEFAULT now()
  )`);
  await pool.query(`CREATE TABLE IF NOT EXISTS users (
    id integer GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    email varchar(254) NOT NULL UNIQUE,
    password_hash text NOT NULL,
    role text NOT NULL DEFAULT 'customer' CHECK(role IN ('customer','admin'))
  ); CREATE TABLE IF NOT EXISTS sessions (
    token_hash text PRIMARY KEY,
    user_id integer NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    expires_at timestamptz NOT NULL
  )`);
}
if (import.meta.url === pathToFileURL(process.argv[1]).href) {
  try { await migrate(); console.log('Миграция выполнена'); } finally { await pool.end(); }
}
