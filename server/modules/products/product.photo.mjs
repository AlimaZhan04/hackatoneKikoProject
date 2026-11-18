import sharp from 'sharp';
import { savePhoto } from './product.repository.mjs';
// Информационная связность СС=9 по лекции: выход этапа — вход следующего.
export async function processProductPhoto(id, file) {
  if (!file) throw Object.assign(new Error('Выберите JPEG, PNG или WebP.'), { status: 422 });
  let metadata;
  try { metadata = await sharp(file.buffer, { limitInputPixels: 25000000 }).metadata(); }
  catch { throw Object.assign(new Error('Файл не является корректным изображением.'), { status: 422 }); }
  if (!['jpeg','png','webp'].includes(metadata.format)) throw Object.assign(new Error('Поддерживаются JPEG, PNG и WebP.'), { status: 422 });
  const optimized = await sharp(file.buffer, { limitInputPixels: 25000000 }).rotate().resize(900,900,{ fit:'inside',withoutEnlargement:true }).webp({ quality:85 }).toBuffer();
  return savePhoto(id, optimized);
}
