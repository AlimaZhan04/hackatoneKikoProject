import React from "react";
import { Grid } from "@mui/material";
import SideBar from "../../components/Product/SideBar";
import ProductList from '../../components/Product/ProductList/ProductList';

const ProductPage = () => {
  return (
    <Grid sx={{ display: "flex" }}>
      <Grid item md={3}>
        <SideBar />
      </Grid>
      <Grid item xs={12} md={9}><ProductList /></Grid>
    </Grid>
  );
};

export default ProductPage;
