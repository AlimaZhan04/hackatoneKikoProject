import test from 'node:test';
import assert from 'node:assert/strict';
import { once } from 'node:events';
import sharp from 'sharp';
import { app } from '../server/app.mjs';
import { pool } from '../server/db.mjs';
import { migrate } from '../server/migrate.mjs';
import { hashPassword } from '../server/auth.mjs';
test('реальный PostgreSQL: CRUD, валидация, фото и ошибки HTTP',async()=>{
  await migrate();const server=app.listen(0,'127.0.0.1');await once(server,'listening');
  const base=`http://127.0.0.1:${server.address().port}/api`;let id;
  const email=`integration-${Date.now()}@kiko.test`,password='TestPassword2026!';
  const user=(await pool.query("INSERT INTO users(email,password_hash,role) VALUES($1,$2,'admin') RETURNING id",[email,await hashPassword(password)])).rows[0];
  const unauthenticated=await fetch(base+'/cosmetics',{method:'POST',headers:{'Content-Type':'application/json'},body:'{}'});
  assert.equal(unauthenticated.status,403);
  const login=await fetch(base+'/auth/login',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({email,password})});
  assert.equal(login.status,200);
  const cookie=login.headers.get('set-cookie').split(';')[0];
  const apiFetch=(url,options={})=>fetch(url,{...options,headers:{...options.headers,Cookie:cookie,'X-Kiko-Lab':'1'}});
  const product={name:'API test '+Date.now(),description:'Временная тестовая запись',price:345.5,type:'care',image:''};
  const send=(url,method,body)=>apiFetch(base+url,{method,headers:{'Content-Type':'application/json'},body:JSON.stringify(body)});
  try{
    assert.equal((await fetch(base+'/health')).status,200);
    const status=await(await fetch(base+'/lab/status')).json();assert.equal(status.database,'PostgreSQL');assert.ok(status.tables.includes('products'));
    const source=await(await fetch(base+'/lab/source/validation')).json();assert.equal(source.path,'shared/product-validation.mjs');assert.match(source.code,/export function validateProduct/);
    assert.equal((await fetch(base+'/lab/source/env')).status,404);
    const readTrace=response=>JSON.parse(Buffer.from(response.headers.get('X-Kiko-Lab-Trace'),'base64url').toString('utf8'));
    const all=await(await fetch(base+'/cosmetics')).json();
    const filtered=await(await fetch(base+'/cosmetics?type=care&price_lte=500')).json();
    assert.ok(filtered.every(p=>p.type==='care'&&p.price<=500));
    const first=all[0];
    if(first){const found=await(await fetch(base+'/cosmetics?q='+encodeURIComponent(first.name))).json();assert.ok(found.some(p=>p.id===first.id));}
    assert.deepEqual(await(await fetch(base+'/cosmetics?q=not-a-real-product-'+Date.now())).json(),[]);
    assert.ok((await(await fetch(base+'/cosmetics?_limit=2')).json()).length<=2);
    let response=await send('/cosmetics','POST',{...product,price:-1});assert.equal(response.status,422);
    assert.deepEqual(readTrace(response).steps.map(s=>s.module),['routes','validation']);
    response=await send('/cosmetics','POST',product);assert.equal(response.status,201);const created=await response.json();id=created.id;assert.equal(created.price,345.5);
    assert.deepEqual(readTrace(response).steps.map(s=>s.module),['routes','validation','repository','pool','database']);
    assert.equal((await fetch(base+'/cosmetics')).headers.get('X-Kiko-Lab-Trace'),null);
    assert.equal((await(await fetch(base+`/cosmetics/${id}`)).json()).name,product.name);
    assert.ok((await(await fetch(base+'/cosmetics')).json()).some(p=>p.id===id));
    response=await send(`/cosmetics/${id}`,'PUT',{...product,name:'Обновлённый тест',price:999});assert.equal(response.status,200);assert.equal((await response.json()).price,999);
    const bad=new FormData();bad.append('photo',new Blob(['not a photo'],{type:'image/png'}),'fake.png');
    assert.equal((await apiFetch(base+`/cosmetics/${id}/photo`,{method:'POST',body:bad})).status,422);
    const image=await sharp({create:{width:30,height:30,channels:3,background:'#702d46'}}).png().toBuffer();
    const body=new FormData();body.append('photo',new Blob([image],{type:'image/png'}),'test.png');
    response=await apiFetch(base+`/cosmetics/${id}/photo`,{method:'POST',body});assert.equal(response.status,200);
    const imageUrl=(await response.json()).image;
    response=await fetch(`http://127.0.0.1:${server.address().port}`+imageUrl);assert.equal(response.status,200);assert.match(response.headers.get('content-type'),/image\/webp/);
    assert.equal((await pool.query('SELECT photo IS NOT NULL AS stored FROM products WHERE id=$1',[id])).rows[0].stored,true);
    assert.equal((await fetch(base+'/cosmetics/invalid')).status,400);
    assert.equal((await fetch(base+'/cosmetics/999999999999999')).status,400);
    assert.equal((await apiFetch(base+`/cosmetics/${id}`,{method:'DELETE'})).status,204);
    assert.equal((await fetch(base+`/cosmetics/${id}`)).status,404);
    assert.equal((await fetch(base+`/cosmetics/${id}/image`)).status,404);
    const newsletterEmail=`newsletter-${Date.now()}@kiko.test`;
    try{
      assert.equal((await send('/newsletter','POST',{email:'invalid'})).status,422);
      assert.equal((await send('/newsletter','POST',{email:newsletterEmail})).status,201);
      assert.equal((await send('/newsletter','POST',{email:newsletterEmail})).status,201);
      assert.equal((await pool.query('SELECT count(*)::int AS count FROM newsletter_subscriptions WHERE email=$1',[newsletterEmail])).rows[0].count,1);
    }finally{await pool.query('DELETE FROM newsletter_subscriptions WHERE email=$1',[newsletterEmail]);}
  }finally{if(id)await pool.query('DELETE FROM products WHERE id=$1',[id]);await pool.query('DELETE FROM users WHERE id=$1',[user.id]);await new Promise(resolve=>server.close(resolve));await pool.end();}
});
