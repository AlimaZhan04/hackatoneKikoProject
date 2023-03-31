import { Box } from "@mui/material";
import React, { useEffect } from "react";
import { useProducts } from "../../../contexts/ProductContextProvider";
import ProductCard from "../ProductCard";

const ProductList = () => {
  const { getCosmetics, cosmetics } = useProducts();
  useEffect(() => {
    getCosmetics();
  }, []);
  useEffect(() => {
    getCosmetics();
  }, []);
  return (
    <Box>
      {cosmetics.map((item) => (
        <ProductCard item={item} key={item.id} />
      ))}
    </Box>
  );
};

export default ProductList;
