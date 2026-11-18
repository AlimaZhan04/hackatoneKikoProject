export function readStored(key, fallback) {
  try { return JSON.parse(localStorage.getItem(key)) ?? fallback; } catch { return fallback; }
}
export const roundMoney=value=>Math.round((value+Number.EPSILON)*100)/100;
export function normalizeCart(value) {
  const cosmetics=Array.isArray(value?.cosmetics)?value.cosmetics.filter(p=>p?.item?.id && Number.isFinite(Number(p.item.price)) && Number(p.item.price)>0).map(p=>{
    const count=Math.min(100,Math.max(1,Math.trunc(Number(p.count))||1));
    return {item:p.item,count,subPrice:roundMoney(count*Number(p.item.price))};
  }):[];
  return {cosmetics,totalPrice:roundMoney(cosmetics.reduce((sum,p)=>sum+p.subPrice,0))};
}
export function validateDemoPayment({number,name,expiry,cvc},now=new Date()) {
  const errors={};const digits=String(number).replace(/\s/g,'');
  let sum=0,double=false;
  for(let i=digits.length-1;i>=0;i--){let n=Number(digits[i]);if(double){n*=2;if(n>9)n-=9;}sum+=n;double=!double;}
  if(!/^\d{13,19}$/.test(digits)||/^0+$/.test(digits)||sum%10!==0)errors.number='Enter a valid test card number.';
  if(typeof name!=='string'||name.trim().length<2)errors.name='Enter the cardholder name.';
  const match=/^(0[1-9]|1[0-2])\/(\d{2})$/.exec(expiry);
  if(!match||new Date(2000+Number(match[2]),Number(match[1]),1)<=now)errors.expiry='Enter a future expiry date as MM/YY.';
  if(!/^\d{3,4}$/.test(cvc))errors.cvc='Enter 3 or 4 digits.';
  return errors;
}
