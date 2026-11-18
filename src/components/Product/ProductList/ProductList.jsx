import { Box, Pagination } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Stack } from "react-bootstrap";
// import { useSearchParams } from "react-router-dom";
import { useProducts } from "../../../contexts/ProductContextProvider";
import ProductCard from "../ProductCard";
import useCatalog from '../../../hooks/useCatalog';
import CatalogStatus from '../CatalogStatus';

const ProductList = () => {
  const {page,setPage,count,currentData}=useCatalog();
  const handleChange = (event, value) => {
    setPage(value);
  };

  //! pagination
  return (
    <>
      <CatalogStatus />
      <Box
        className="catalog-grid"
        sx={{
          display: "flex",
          flexWrap: "wrap",
          marginTop: "90px",
          marginBottom: "20px",
          // justifyContent: "space-between",
        }}
      >
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
    </>
  );
};

export default ProductList;
