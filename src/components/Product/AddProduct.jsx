import React, { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";

const AddProduct = () => {
  const navigate = useNavigate();
  const [product, setproduct] = useState({
    name: "",
    description: "",
    price: "",
    image: "",
    type: "",
  });
  const handleInp = (e) => {
    if (e.target.name == "price") {
      let obj = {
        ...product,
        [e.target.name]: Number(e.target.value),
      };
      setproduct(obj);
    } else {
      let obj = {
        ...product,
        [e.target.name]: e.target.value,
      };
      setproduct(obj);
    }
  };
  console.log(product);
  return (
    <Box
      sx={{
        width: "40vw",
        margin: "5vh auto",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        // background: "rgb(254, 249, 239)",
        gap: "30px",
        padding: "20px",
      }}
    >
      <h1>ADMIN PAGE</h1>
      <TextField
        id="outlined-basic"
        label="Name"
        variant="outlined"
        color="grey"
        name="name"
        size="small"
        onChange={handleInp}
      />
      <TextField
        id="outlined-basic"
        label="Description"
        variant="outlined"
        color="grey"
        name="description"
        size="small"
        onChange={handleInp}
      />
      <TextField
        id="outlined-basic"
        label="Price"
        variant="outlined"
        color="grey"
        name="price"
        size="small"
        onChange={handleInp}
      />
      <TextField
        id="outlined-basic"
        label="Image"
        variant="outlined"
        color="grey"
        name="image"
        size="small"
        onChange={handleInp}
      />
      <TextField
        id="outlined-basic"
        label="Type"
        variant="outlined"
        color="grey"
        name="type"
        size="small"
        onChange={handleInp}
      />
      <Button
        variant="contained"
        size="large"
        sx={{
          border: "1px solid black",
          color: "white",
          backgroundColor: "black",
        }}
      >
        ADD PRODUCT
      </Button>
    </Box>
  );
};

export default AddProduct;
