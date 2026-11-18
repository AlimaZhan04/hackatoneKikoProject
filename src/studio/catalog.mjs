// Коммуникативная связность: обе операции используют один массив products.
export function filterProducts(products, query, category) {
  const search = query.trim().toLocaleLowerCase('ru');
  return products.filter(p => (!category || p.type === category) && `${p.name} ${p.description}`.toLocaleLowerCase('ru').includes(search));
}
export function summarizeProducts(products) {
  return { total:products.length,decorative:products.filter(p=>p.type==='decorative').length,care:products.filter(p=>p.type==='care').length,accessories:products.filter(p=>p.type==='accessories').length };
}
