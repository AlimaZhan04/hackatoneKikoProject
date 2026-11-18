import React,{createContext,useContext,useState,useCallback} from 'react';
import { normalizeCart,readStored } from '../helpers/shop.mjs';
export const cartContext=createContext();
export const useCart=()=>useContext(cartContext);
export default function CartContextProvider({children}) {
 const [cart,setCart]=useState(()=>normalizeCart(readStored('cart',null)));
 const save=useCallback(update=>setCart(previous=>{const next=normalizeCart(update(previous));localStorage.setItem('cart',JSON.stringify(next));return next;}),[]);
 const getCart=useCallback(()=>save(()=>readStored('cart',null)),[save]);
 const addProductToCart=product=>save(previous=>{const found=previous.cosmetics.some(p=>p.item.id===product.id);return {...previous,cosmetics:found?previous.cosmetics.map(p=>p.item.id===product.id?{...p,count:Math.min(100,p.count+1)}:p):[...previous.cosmetics,{item:product,count:1}]};});
 const changeProductCount=(count,id)=>save(previous=>({...previous,cosmetics:previous.cosmetics.map(p=>p.item.id===id?{...p,count}:p)}));
 const deleteCartProduct=id=>save(previous=>({...previous,cosmetics:previous.cosmetics.filter(p=>p.item.id!==id)}));
 const clearCart=()=>save(()=>null);
 const checkProductInCart=id=>cart.cosmetics.some(p=>p.item.id===id);
 const cartLength=cart.cosmetics.reduce((sum,p)=>sum+p.count,0);
 return <cartContext.Provider value={{cart,cartLength,getCart,addProductToCart,changeProductCount,deleteCartProduct,clearCart,checkProductInCart}}>{children}</cartContext.Provider>;
}
