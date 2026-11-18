import React,{useEffect,useState} from 'react';
import assets from '../../helpers/product-assets.json';
export default function ProductImage({src,alt,...props}){const [failed,setFailed]=useState(false);useEffect(()=>setFailed(false),[src]);return <img {...props} src={!src||failed?'/images/product-placeholder.svg':assets[src]||src} alt={alt} onError={()=>setFailed(true)}/>;}
