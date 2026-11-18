import pg from 'pg';
if (!process.env.DATABASE_URL) throw new Error('Задайте DATABASE_URL в .env. См. README.md');
export const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL,connectionTimeoutMillis:5000 });
pool.on('error', error => console.error('PostgreSQL pool:', error.message));
