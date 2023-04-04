import React from "react";
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
