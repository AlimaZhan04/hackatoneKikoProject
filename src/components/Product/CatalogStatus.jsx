import React from 'react';
import { useProducts } from '../../contexts/ProductContextProvider';
export default function CatalogStatus(){const {cosmetics,loading,error}=useProducts();return loading?<p className="catalog-status" role="status">Loading products…</p>:error?<p className="catalog-status" role="alert">{error}</p>:cosmetics.length===0?<p className="catalog-status">No products match your filters. Try another search or reset filters.</p>:null;}
