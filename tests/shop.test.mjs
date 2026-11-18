import test from 'node:test';
import assert from 'node:assert/strict';
import { normalizeCart,validateDemoPayment } from '../src/helpers/shop.mjs';
test('корзина выдерживает некорректное сохранённое состояние',()=>{
 assert.deepEqual(normalizeCart(null),{cosmetics:[],totalPrice:0});
 assert.deepEqual(normalizeCart({cosmetics:[null,{item:{id:1,price:'oops'}}]}),{cosmetics:[],totalPrice:0});
});
test('количество ограничено целым числом 1–100, суммы округляются',()=>{
 const items=[{item:{id:1,price:.1},count:3},{item:{id:2,price:1.23},count:-1},{item:{id:3,price:2},count:150}];
 const cart=normalizeCart({cosmetics:items});
 assert.deepEqual(cart.cosmetics.map(p=>p.count),[3,1,100]);
 assert.equal(cart.totalPrice,201.53);assert.equal(cart.cosmetics[0].subPrice,.3);
 assert.equal(normalizeCart({cosmetics:[{item:{id:4,price:10},count:2.7}]}).cosmetics[0].count,2);
});
test('демо-оформление не пропускает пустые, просроченные и неверные данные',()=>{
 const date=new Date(2026,10,18),valid={number:'4111 1111 1111 1111',name:'Test User',expiry:'12/39',cvc:'123'};
 assert.deepEqual(validateDemoPayment(valid,date),{});
 assert.equal(Object.keys(validateDemoPayment({number:'',name:'',expiry:'',cvc:''},date)).length,4);
 assert.ok(validateDemoPayment({...valid,number:'0000000000000000'},date).number);
 assert.ok(validateDemoPayment({...valid,number:'4111111111111112'},date).number);
 assert.ok(validateDemoPayment({...valid,expiry:'10/26'},date).expiry);
 assert.ok(validateDemoPayment({...valid,expiry:'13/39'},date).expiry);
 assert.ok(validateDemoPayment({...valid,cvc:'a12'},date).cvc);
});
