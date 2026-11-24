import { Router } from 'express';
import multer from 'multer';
import { validateProduct, normalizeProduct } from '../../../shared/product-validation.mjs';
import * as repository from './product.repository.mjs';
import { processProductPhoto } from './product.photo.mjs';
import { requireAdmin } from '../../auth.mjs';
import { markLab } from '../../lab/trace.mjs';
export const productRoutes = Router();
const upload = multer({ storage: multer.memoryStorage(), limits: { fileSize: 5 * 1024 * 1024, files: 1 } });
productRoutes.param('id', (req,res,next,value) => {
  if (!/^\d+$/.test(value) || !Number.isSafeInteger(Number(value)) || Number(value) < 1 || Number(value) > 2147483647)
    return res.status(400).json({ message: 'Некорректный ID товара.' });
  req.productId = Number(value); next();
});
const missing = res => res.status(404).json({ message: 'Товар не найден.' });
productRoutes.get('/', async (req,res) => {
  let products=await repository.listProducts();
  const { q,type,price_lte,_limit }=req.query;
  if(typeof q==='string'&&q.trim())products=products.filter(p=>`${p.name} ${p.description}`.toLowerCase().includes(q.trim().toLowerCase()));
  if(typeof type==='string'&&type!=='all')products=products.filter(p=>p.type===type);
  if(typeof price_lte==='string'&&Number.isFinite(Number(price_lte)))products=products.filter(p=>p.price<=Number(price_lte));
  if(typeof _limit==='string'&&/^\d+$/.test(_limit))products=products.slice(0,Math.min(Number(_limit),1000));
  res.json(products);
});
productRoutes.get('/:id', async (req,res) => { const p = await repository.getProduct(req.productId); p ? res.json(p) : missing(res); });
function validate(req,res,next) {
  markLab('validation','validateProduct(req.body)');
  const errors = validateProduct(req.body);
  if (Object.keys(errors).length) return res.status(422).json({ message:'Проверьте поля формы.',errors });
  req.productData = normalizeProduct(req.body); next();
}
productRoutes.post('/', requireAdmin,validate, async (req,res) => res.status(201).json(await repository.createProduct(req.productData)));
productRoutes.put('/:id', requireAdmin,validate, async (req,res) => { const p = await repository.updateProduct(req.productId,req.productData); p ? res.json(p) : missing(res); });
productRoutes.delete('/:id', requireAdmin,async (req,res) => { (await repository.deleteProduct(req.productId)) ? res.status(204).end() : missing(res); });
productRoutes.post('/:id/photo', requireAdmin,upload.single('photo'), async (req,res) => { const p = await processProductPhoto(req.productId,req.file); p ? res.json(p) : missing(res); });
productRoutes.get('/:id/image', async (req,res) => {
  const photo = await repository.getPhoto(req.productId);
  if (!photo) return missing(res);
  res.set('Cache-Control','no-cache').type('image/webp').send(photo);
});
