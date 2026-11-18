import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useProducts } from "../../contexts/ProductContextProvider";
import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  Paper,
  Radio,
  RadioGroup,
  TextField,
} from "@mui/material";

const SideBar = () => {
  const {
    fetchByParams,
    getCosmetics,
    search,
    setSearch,
    searchParams,
    setSearchParams,
  } = useProducts();

  return (
    <Grid item md={4}>
      <Paper elevation={1} sx={{ width: "200px", boxShadow: "none" }}>
        <TextField
          fullWidth
          id="catalog-search"
          label="Search"
          variant="standard"
          onChange={(e) => setSearch(e.target.value)}
          value={search}
        />
      </Paper>

      <Grid>
        <FormControl>
          <FormLabel id="catalog-type-label">Type</FormLabel>
          <RadioGroup
            aria-labelledby="catalog-type-label"
            value={searchParams.get('type')||'all'}
            name="catalog-type"
            onChange={(e) => fetchByParams("type", e.target.value)}
          >
            <FormControlLabel value="all" control={<Radio />} label="All types" />
            <FormControlLabel
              value="decorative"
              control={<Radio />}
              label="decorative"
            />
            <FormControlLabel value="care" control={<Radio />} label="care" />
            <FormControlLabel
              value="accessories"
              control={<Radio />}
              label="accessories"
            />
          </RadioGroup>
        </FormControl>
      </Grid>

      <Grid>
        <FormControl>
          <FormLabel id="catalog-price-label">Price</FormLabel>
          <RadioGroup
            aria-labelledby="catalog-price-label"
            value={searchParams.get('price_lte')||'all'}
            name="catalog-price"
            onChange={(e) => fetchByParams("price_lte", e.target.value)}
          >
            <FormControlLabel value="all" control={<Radio />} label="Any price" />
            <FormControlLabel
              value="300"
              control={<Radio />}
              label="less than 300$"
            />
            <FormControlLabel
              value="500"
              control={<Radio />}
              label="less than 500$"
            />

            <FormControlLabel
              value="1200"
              control={<Radio />}
              label="less than 1200$"
            />
          </RadioGroup>
        </FormControl>
      </Grid>
      <button className="filter-reset" onClick={()=>setSearchParams({})}>Reset filters</button>
    </Grid>
  );
};

export default SideBar;
