import React,{useState} from 'react';
import { Button } from '@mui/material';
import Cards from 'react-credit-cards';
import { Link,useNavigate } from 'react-router-dom';
import { useCart } from '../../../contexts/CartContextProvider';
import { validateDemoPayment } from '../../../helpers/shop.mjs';
import './Payment.css';
export default function Payment(){
 const [number,setNumber]=useState(''),[name,setName]=useState(''),[expiry,setExpiry]=useState(''),[cvc,setCvc]=useState(''),[focus,setFocus]=useState(''),[errors,setErrors]=useState({});
 const {cart,clearCart}=useCart(),navigate=useNavigate();
 if(!cart.cosmetics.length)return <p className="catalog-status">Your bag is empty. <Link to="/best">Choose products</Link> before checking out.</p>;
 const pay=event=>{event.preventDefault();const invalid=validateDemoPayment({number,name,expiry,cvc});setErrors(invalid);if(Object.keys(invalid).length)return;localStorage.setItem('kiko-last-order',JSON.stringify({id:Date.now(),total:cart.totalPrice,items:cart.cosmetics,createdAt:new Date().toISOString()}));clearCart();navigate('/thanks');};
 const field=(key,placeholder,value,setValue,maxLength)=> <label><span className="visually-hidden">{placeholder}</span><input className="payment_inp" type={key==='name'?'text':'tel'} name={key} aria-label={placeholder} placeholder={placeholder} value={value} maxLength={maxLength} onChange={event=>setValue(event.target.value)} onFocus={()=>setFocus(key)} aria-invalid={!!errors[key]} aria-describedby={errors[key]?`payment-${key}-error`:undefined}/>{errors[key]&&<span id={`payment-${key}-error`} className="payment-error">{errors[key]}</span>}</label>;
 return <div className="payment_card"><Cards number={number} name={name} expiry={expiry} cvc={cvc} focused={focus}/><form className="payment" onSubmit={pay} noValidate><p className="payment-demo">Demo checkout. No money is charged. Use test card 4111 1111 1111 1111.</p>{field('number','Card Number',number,setNumber,23)}{field('name','Name',name,setName,100)}{field('expiry','MM/YY Expiry',expiry,setExpiry,5)}{field('cvc','CVC',cvc,setCvc,4)}<Button type="submit" className="pay_btn" style={{border:'2px solid black',borderRadius:'100rem',color:'white',marginTop:5,background:'black',minHeight:35}}>Pay with Card</Button></form></div>;
}
