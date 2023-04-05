import { Box, Pagination } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Stack } from "react-bootstrap";
import { useSearchParams } from "react-router-dom";
import { useProducts } from "../../../contexts/ProductContextProvider";
import ProductCard from "../ProductCard";

const ProductList = () => {
  const { getCosmetics, cosmetics, searchParams } = useProducts();
  useEffect(() => {
    getCosmetics();
  }, []);

  useEffect(() => {
    getCosmetics();
  }, [searchParams]);

  //! pagination
  const [page, setPage] = React.useState(1);
  const handleChange = (event, value) => {
    setPage(value);
  };

  const itemsPerPage = 4;
  const count = Math.ceil(cosmetics.length / itemsPerPage);

  const currentData = () => {
    const begin = (page - 1) * itemsPerPage;
    const end = begin + itemsPerPage;
    return cosmetics.slice(begin, end);
  };

  //! pagination
  return (
    <>
      <Box
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
