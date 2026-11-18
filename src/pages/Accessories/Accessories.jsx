import { Box, Pagination, Stack, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import ProductCard from "../../components/Product/ProductCard";
import { useProducts } from "../../contexts/ProductContextProvider";
import "./accessories.css";
import "./adaptivka-Acc.css";
import useCatalog from '../../hooks/useCatalog';
import CatalogStatus from '../../components/Product/CatalogStatus';

const Accessories = () => {
  const {page,setPage,count,currentData,fetchByParams}=useCatalog();
  const handleChange = (event, value) => {
    setPage(value);
  };


  //! pagination

  return (
    <div className="accessories-page">
      <div className="colors">
        <img
          className="Acc_img"
          src="/images/hero-gifts.webp"
          alt="picture"
        />
        <h1 className="acc_h">Accessories</h1>
        <p className="acc_text2">
          Make the best use of your cosmetics with KIKO’s face, eye and hand
          accessories. Browse our brush sets, make-up pouches, manicure sets and
          travel must-haves.
        </p>
        <div className="acc_buttons1">
          <button className="acc_button" onClick={()=>fetchByParams('q','face')}>Face Accessories</button>
          <button className="acc_button" onClick={()=>fetchByParams('q','eye')}>Eye Accessories</button>
          <button className="acc_button" onClick={()=>fetchByParams('q','hand')}>Hand Care Accessories</button>
          <button className="acc_button" onClick={()=>fetchByParams('q','brush')}>Brushes</button>
          <button className="acc_button" onClick={()=>fetchByParams('q','travel')}>Empty Travel Containers</button>
          <button className="acc_button" onClick={()=>fetchByParams('q','bag')}>MakeUp Cases</button>
          <button className="acc_button" onClick={()=>fetchByParams('q','')}>All accessories</button>
        </div>
      </div>
      <h2 className="acc_h2">Make up brushes</h2>
      <p className="acc_text">DO YOU DREAM OF A FLAWLESS FINISH?</p>
      <CatalogStatus />

      <Box className="catalog-grid" sx={{ display: "flex", flexWrap: "wrap", marginTop: "0px" }}>
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
      <img
        className="acc_picture3"
        src="/images/beauty-eyes.jpg"
        alt="photo33"
      />

      <h2 className="acc_h2">Make up bags</h2>

      <p className="acc_text1">
        ARE YOU LOOKING FOR A SOLUTION TO KEEP YOUR COSMETICS?
      </p>

      <img
        className="acc_picture4"
        src="/images/hero-gifts.webp"
        alt="photo33"
      />
    </div>
  );
};

export default Accessories;
