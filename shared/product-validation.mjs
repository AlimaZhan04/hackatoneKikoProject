export const CATEGORIES = ['decorative', 'care', 'accessories'];
// Функциональная связность СС=10: только проверка данных, без HTTP и БД.
export function validateProduct(product) {
  const errors = {};
  if (typeof product?.name !== 'string' || !product.name.trim() || product.name.trim().length > 120)
    errors.name = 'Название должно содержать от 1 до 120 символов.';
  if (product?.price === '' || product?.price === null || !['string', 'number'].includes(typeof product?.price) || !Number.isFinite(Number(product.price)) || Number(product.price) < 0.01 || Number(product.price) > 1000000 || Math.abs(Number(product.price)*100-Math.round(Number(product.price)*100)) > 0.000001)
    errors.price = 'Цена от 0,01 до 1 000 000; не больше двух знаков после запятой.';
  if (!CATEGORIES.includes(product?.type)) errors.type = 'Выберите категорию из списка.';
  if (typeof product?.description !== 'string' || product.description.length > 2000)
    errors.description = 'Описание должно быть не длиннее 2000 символов.';
  if (typeof product?.image !== 'string' || product.image.length > 2048 || (product.image && !/^https?:\/\//i.test(product.image) && !/^\/api\/cosmetics\/\d+\/image$/.test(product.image)))
    errors.image = 'Используйте ссылку http или https либо загрузите фото после сохранения.';
  return errors;
}
export function normalizeProduct(product) {
  return { name: product.name.trim(), description: product.description.trim(), price: Number(product.price), type: product.type, image: product.image.trim() };
}
