import { readFile } from 'node:fs/promises';
import { pool } from './db.mjs';
import { migrate } from './migrate.mjs';
import { hashPassword } from './auth.mjs';
await migrate();
const client = await pool.connect();
try {
  await client.query('BEGIN');
  await client.query('LOCK TABLE products IN EXCLUSIVE MODE');
  if (Number((await client.query('SELECT count(*) FROM products')).rows[0].count) === 0) {
    const { cosmetics } = JSON.parse(await readFile(new URL('../db.json', import.meta.url),'utf8'));
    for (const p of cosmetics) await client.query('INSERT INTO products(name,description,price,type,image) VALUES($1,$2,$3,$4,$5)',
      [String(p.name || 'Товар').slice(0,120),String(p.description || '').slice(0,2000),Math.min(1000000,Math.max(.01,Number(p.price)||1)),['decorative','care','accessories'].includes(p.type?.trim())?p.type.trim():'care',p.image || '']);
    console.log(`Импортировано ${cosmetics.length} товаров из db.json. ID назначены PostgreSQL.`);
  } else console.log('В БД уже есть товары. Импорт пропущен.');
  await client.query('COMMIT');
  if(process.env.ADMIN_PASSWORD) {
    await pool.query("INSERT INTO users(email,password_hash,role) VALUES($1,$2,'admin') ON CONFLICT(email) DO NOTHING",[process.env.ADMIN_EMAIL||'admin1@gmail.com',await hashPassword(process.env.ADMIN_PASSWORD)]);
    console.log('Администратор готов. Email и пароль указаны в .env.');
  }
} catch (error) { await client.query('ROLLBACK'); throw error; }
finally { client.release(); await pool.end(); }
