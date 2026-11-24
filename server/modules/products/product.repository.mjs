import { pool } from '../../db.mjs';
import { markLab } from '../../lab/trace.mjs';
async function query(sql,values){markLab('repository',sql.trim().split(/\s+/)[0]);markLab('pool','pool.query(sql, values)');const result=await pool.query(sql,values);markLab('database','SQL completed');return result;}
const fields = 'id,name,description,price::float8 AS price,type,image,created_at,updated_at';
// Все SQL-запросы изолированы в репозитории. Значения передаются параметрами.
export async function listProducts() { return (await query(`SELECT ${fields} FROM products ORDER BY id DESC`)).rows; }
export async function getProduct(id) { return (await query(`SELECT ${fields} FROM products WHERE id=$1`, [id])).rows[0]; }
// Сцепление по образцу СЦ=3: вызывающий модуль передаёт объект товара.
export async function createProduct(product) {
  return (await query(`INSERT INTO products(name,description,price,type,image) VALUES($1,$2,$3,$4,$5) RETURNING ${fields}`,
    [product.name,product.description,product.price,product.type,product.image])).rows[0];
}
export async function updateProduct(id, product) {
  return (await query(`UPDATE products SET name=$2,description=$3,price=$4,type=$5,image=$6,updated_at=now() WHERE id=$1 RETURNING ${fields}`,
    [id,product.name,product.description,product.price,product.type,product.image])).rows[0];
}
// Сцепление по данным СЦ=1: только простое значение id.
export async function deleteProduct(id) { return (await query('DELETE FROM products WHERE id=$1', [id])).rowCount > 0; }
export async function getPhoto(id) { return (await query('SELECT photo FROM products WHERE id=$1', [id])).rows[0]?.photo; }
export async function savePhoto(id, buffer) {
  markLab('repository','savePhoto(id, buffer)');
  markLab('pool','pool.connect()');
  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    const row = await client.query('UPDATE products SET photo=$2 WHERE id=$1 RETURNING id', [id,buffer]);
    if (!row.rowCount) { await client.query('ROLLBACK'); return null; }
    const imageUrl = `/api/cosmetics/${id}/image`;
    const result = await client.query(`UPDATE products SET image=$2,updated_at=now() WHERE id=$1 RETURNING ${fields}`, [id,imageUrl]);
    await client.query('COMMIT'); markLab('database','COMMIT photo + image'); return result.rows[0];
  } catch (error) { await client.query('ROLLBACK'); throw error; }
  finally { client.release(); }
}
