import React from "react";
import ProductList from "../../components/Product/ProductList/ProductList";
import { Grid } from "@mui/material";
import SideBar from "../../components/Product/SideBar";

const ProductPage = () => {
  return (
    <Grid sx={{ display: "flex" }}>
      <Grid item md={3}>
        <SideBar />
      </Grid>
    </Grid>
  );
};

export default ProductPage;
