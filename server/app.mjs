import express from 'express';
import { existsSync } from 'node:fs';
import { resolve } from 'node:path';
import { productRoutes } from './modules/products/product.routes.mjs';
import { pool } from './db.mjs';
import { authRoutes } from './auth.mjs';
export const app = express();
app.disable('x-powered-by');
app.use(express.json({ limit:'100kb' }));
app.use('/api/auth',authRoutes);
app.get('/api/health', async (req,res) => { await pool.query('SELECT 1'); res.json({ status:'ok',database:'PostgreSQL',mode:'local' }); });
app.use('/api/cosmetics', productRoutes);
app.use('/api', (req,res) => res.status(404).json({ message:'Маршрут не найден.' }));
if (existsSync(resolve('dist/index.html'))) {
  app.use(express.static(resolve('dist')));
  app.get('/{*path}', (req,res) => res.sendFile(resolve('dist/index.html')));
}
app.use((error,req,res,next) => {
  console.error(error.message);
  const status = error.code === 'LIMIT_FILE_SIZE' ? 413 : error.status || 500;
  res.status(status).json({ message: status === 413 ? 'Файл должен быть не больше 5 МБ.' : status < 500 ? error.message : 'Ошибка сервера. Проверьте подключение к PostgreSQL.' });
});
