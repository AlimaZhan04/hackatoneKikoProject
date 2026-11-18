// По управлению: method выбирает ветвь выполнения HTTP-запроса.
import { recordAction } from '../project-work/trace.mjs';
export async function request(path, { method = 'GET', body } = {}) {
  if(!path.startsWith('/auth'))recordAction(`${method} /api${path}`,body instanceof FormData ? {photo:'файл изображения'} : body);
  const response = await fetch('/api' + path, {
    method,
    ...(body instanceof FormData ? { body } : body ? { headers: { 'Content-Type':'application/json' }, body:JSON.stringify(body) } : {})
  });
  if (!response.ok) {
    const data = await response.json().catch(() => ({ message:'Сервер недоступен.' }));
    throw Object.assign(new Error(data.message), { errors:data.errors, status:response.status });
  }
  return response.status === 204 ? null : response.json();
}
export const productsApi = {
  list: () => request('/cosmetics'),
  create: product => request('/cosmetics', { method:'POST',body:product }),
  update: (id,product) => request(`/cosmetics/${id}`, { method:'PUT',body:product }),
  remove: id => request(`/cosmetics/${id}`, { method:'DELETE' }),
  photo: (id,file) => { const body=new FormData();body.append('photo',file);return request(`/cosmetics/${id}/photo`,{method:'POST',body}); }
};
