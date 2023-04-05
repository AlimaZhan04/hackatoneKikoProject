import { Box, Pagination, Stack, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import ProductCard from "../../components/Product/ProductCard";
import { useProducts } from "../../contexts/ProductContextProvider";
import "./bestSellers.css";
import SideBar from "../Product/SideBar";
import "./bestSellersAdapt.css";

const BestSellers = () => {
  const { getCosmetics, cosmetics } = useProducts();
  const [searchParams] = useSearchParams();
  useEffect(() => {
    getCosmetics();
  }, [searchParams]);
  useEffect(() => {
    getCosmetics();
  }, []);

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
    <div>
      <div className="color">
        <img
          className="Acc_img"
          src="https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcQ-y6nbbrSJlmtBO9x9mKx_xlSvAPqFEfBXPZ2RchfDc_q1p6gy"
          alt="picture"
        />
        <h1 className="acc_b">Best Sellers</h1>

        <div className="best_buttons">
          <button className="acc_button">All</button>
          <button className="acc_button">MakeUp Best Sellers</button>
          <button className="acc_button">Skin Care Best Sellers</button>
          <button className="acc_button">Accessories Best Sellers</button>
        </div>
      </div>
      <div>
        <SideBar />
      </div>
      <p className="acc_best">24 Results</p>

      <Box sx={{ display: "flex", flexWrap: "wrap", marginTop: "90px" }}>
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

      <Box sx={{ display: "flex", flexWrap: "wrap", marginTop: "90px" }}>
        {currentData().map((item) => (
          <ProductCard item={item} key={item.id} />
        ))}
      </Box>
      <Stack spacing={2}>
        <Pagination
          sx={{ marginLeft: { medium: 100 } }}
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
