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

  useEffect(() => {
    setSearchParams({ q: search });
    getCosmetics();
  }, [search]);

  useEffect(() => {
    getCosmetics();
  }, [searchParams]);
  return (
    <Grid item md={4}>
      <Paper elevation={1} sx={{ width: "200px", boxShadow: "none" }}>
        <TextField
          fullWidth
          id="standard-basic"
          label="Search"
          variant="standard"
          onChange={(e) => setSearch(e.target.value)}
          value={search}
        />
      </Paper>

      <Grid>
        <FormControl>
          <FormLabel id="demo-radio-buttons-group-label">Type</FormLabel>
          <RadioGroup
            aria-labelledby="demo-radio-buttons-group-label"
            defaultValue="all"
            name="radio-buttons-group"
            onChange={(e) => fetchByParams("type", e.target.value)}
          >
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
          <FormLabel id="demo-radio-buttons-group-label">Price</FormLabel>
          <RadioGroup
            aria-labelledby="demo-radio-buttons-group-label"
            defaultValue="all"
            name="radio-buttons-group"
            onChange={(e) => fetchByParams("price_lte", e.target.value)}
          >
            <FormControlLabel
              value="300"
              control={<Radio />}
              label="less than 300$"
            />
            <FormControlLabel
              value="500"
              control={<Radio />}
              label="less than 500"
            />

            <FormControlLabel
              value="1200"
              control={<Radio />}
              label="less than 1200$"
            />
          </RadioGroup>
        </FormControl>
      </Grid>
    </Grid>
  );
};

export default SideBar;
