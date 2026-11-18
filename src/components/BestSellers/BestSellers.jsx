import { Box, Pagination, Stack, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import ProductCard from "../../components/Product/ProductCard";
import { useProducts } from "../../contexts/ProductContextProvider";
import "./bestSellers.css";
import SideBar from "../Product/SideBar";
import "./bestSellersAdapt.css";
import useCatalog from '../../hooks/useCatalog';
import CatalogStatus from '../Product/CatalogStatus';

const BestSellers = () => {
  const {products,fetchByParams,setSearchParams,page,setPage,count,currentData,loading}=useCatalog();
  const handleChange = (event, value) => {
    setPage(value);
  };


  //! pagination

  return (
    <div>
      <div className="color">
        <img
          className="Acc_img"
          src="/images/hero-beauty.jpg"
          alt="picture"
        />
        <h1 className="acc_b">Best Sellers</h1>

        <div className="best_buttons">
          <button className="acc_button" onClick={()=>setSearchParams({})}>All</button>
          <button className="acc_button" onClick={()=>fetchByParams('type','decorative')}>MakeUp Best Sellers</button>
          <button className="acc_button" onClick={()=>fetchByParams('type','care')}>Skin Care Best Sellers</button>
          <button className="acc_button" onClick={()=>fetchByParams('type','accessories')}>Accessories Best Sellers</button>
        </div>
      </div>
      <div>
        <SideBar />
      </div>
      <p className="acc_best" role="status">{loading?'Loading…':`${products.length} Results`}</p>
      <CatalogStatus />

      <Box className="catalog-grid" sx={{ display: "flex", flexWrap: "wrap", marginTop: "90px" }}>
        {currentData().map((item) => (
          <ProductCard item={item} key={item.id} />
        ))}
      </Box>
      <Stack spacing={2}>
        <Pagination
          className="pagination"
          count={count}
          page={page}
          onChange={handleChange}
        />
      </Stack>

    </div>
  );
};
export default BestSellers;
