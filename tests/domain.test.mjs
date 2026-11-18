import test from 'node:test';
import assert from 'node:assert/strict';
import { validateProduct } from '../shared/product-validation.mjs';
import { filterProducts,summarizeProducts } from '../src/studio/catalog.mjs';
import { submitProduct } from '../src/studio/submit-product.mjs';
const valid={name:'Помада',description:'Увлажняющая',price:550,type:'decorative',image:''};
test('валидация отклоняет пустое имя, отрицательную цену и неизвестную категорию',()=>{
  const errors=validateProduct({...valid,name:' ',price:-1,type:'other'});
  assert.deepEqual(Object.keys(errors).sort(),['name','price','type']);
});
test('границы цены, строковые поля и URL проверяются независимо',()=>{
  for(const price of ['',null,0,0.001,1.234,Infinity,'abc',1000001,true]) assert.ok(validateProduct({...valid,price}).price);
  assert.deepEqual(validateProduct(valid),{});
  assert.ok(validateProduct({...valid,image:'javascript:alert(1)'}).image);
  assert.ok(validateProduct({...valid,description:'x'.repeat(2001)}).description);
  assert.ok(validateProduct(null).name);
});
test('каталог фильтруется, статистика считается по исходной коллекции',()=>{
  const products=[valid,{...valid,name:'Крем',type:'care'},{...valid,name:'Кисть',type:'accessories'}];
  assert.equal(filterProducts(products,' ПОМАДА ','decorative').length,1);
  assert.deepEqual(summarizeProducts(products),{total:3,decorative:1,care:1,accessories:1});
  assert.equal(filterProducts(products,'Крем','accessories').length,0);
});
test('сценарий закрывает форму только после сохранения и обновления',async()=>{
  const calls=[];
  await submitProduct({persist:async()=>calls.push('persist'),refresh:async()=>calls.push('refresh'),close:()=>calls.push('close'),notify:()=>calls.push('notify'),record:()=>{}});
  assert.deepEqual(calls,['persist','refresh','close','notify']);
});
test('при отказе записи форма остаётся открытой',async()=>{
  let closed=false,refreshed=false;
  await assert.rejects(()=>submitProduct({persist:async()=>{throw Error('DB offline');},refresh:async()=>{refreshed=true;},close:()=>{closed=true;},notify:()=>{},record:()=>{}}));
  assert.equal(closed,false);assert.equal(refreshed,false);
});
test('ошибка обновления списка не объявляется ошибкой сохранения',async()=>{
  let message='';
  await submitProduct({persist:async()=>{},refresh:async()=>{throw Error('network');},close:()=>{},notify:text=>{message=text;},record:()=>{}});
  assert.match(message,/сохранён, но список/);
});
