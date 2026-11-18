import React from 'react';
import { Box,Typography } from '@mui/material';
import { useFavorites } from '../contexts/FavoritesContextProvider';
import { useProducts } from '../contexts/ProductContextProvider';
import ProductCard from '../components/Product/ProductCard';
export default function FavoritesPage(){
 const {favorites}=useFavorites(),{cosmetics,loading,error}=useProducts();
 const items=cosmetics.filter(p=>favorites.includes(p.id));
 return <Box sx={{p:{xs:2,md:4}}}><Typography variant="h4" component="h1">Favorites</Typography>{loading?<p role="status">Loading products…</p>:error?<p role="alert">{error}</p>:!items.length?<p>No favorites yet. Tap a heart on a product to save it here.</p>:<Box className="catalog-grid" sx={{display:'flex',flexWrap:'wrap'}}>{items.map(p=><ProductCard key={p.id} item={p}/>)}</Box>}</Box>;
}
