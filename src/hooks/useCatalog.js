import { useEffect,useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useProducts } from '../contexts/ProductContextProvider';
export default function useCatalog(source) {
 const context=useProducts(),location=useLocation();
 const products=source||context.cosmetics;
 const [page,setPage]=useState(1);
 const count=Math.ceil(products.length/4),currentPage=Math.max(1,Math.min(page,count||1));
 useEffect(()=>setPage(1),[location.search,location.pathname]);
 return {...context,products,page:currentPage,count,setPage,currentData:()=>products.slice((currentPage-1)*4,currentPage*4)};
}
