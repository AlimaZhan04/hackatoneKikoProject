import React,{createContext,useContext,useState} from 'react';
import { readStored } from '../helpers/shop.mjs';
const context=createContext();
export const useFavorites=()=>useContext(context);
export default function FavoritesContextProvider({children}) {
 const [favorites,setFavorites]=useState(()=>{const stored=readStored('kiko-favorites',[]);return Array.isArray(stored)?stored.filter(Number.isSafeInteger):[];});
 const toggleFavorite=id=>setFavorites(prev=>{const next=prev.includes(id)?prev.filter(value=>value!==id):[...prev,id];localStorage.setItem('kiko-favorites',JSON.stringify(next));return next;});
 return <context.Provider value={{favorites,toggleFavorite}}>{children}</context.Provider>;
}
