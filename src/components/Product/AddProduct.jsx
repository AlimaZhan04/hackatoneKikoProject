import React, { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import { useProducts } from "../../contexts/ProductContextProvider";

const AddProduct = () => {
  const navigate = useNavigate();
  const [cosmetics, setCosmetics] = useState({
    name: "",
    description: "",
    price: "",
    image: "",
    type: "",
  });

  const { addCosmetics } = useProducts();
  const handleInp = (e) => {
    if (e.target.name == "price") {
      let obj = {
        ...cosmetics,
        [e.target.name]: Number(e.target.value),
      };
      setCosmetics(obj);
    } else {
      let obj = {
        ...cosmetics,
        [e.target.name]: e.target.value,
      };
      setCosmetics(obj);
    }
  };
  console.log(cosmetics);
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
        onClick={() => addCosmetics(cosmetics)}
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
      <img
        src="https://images.kikocosmetics.com/sys-master/images/h1f/h94/9359085764638/KS0200106900044secondario_304Wx304H.webp#k-bundle-secondary"
        alt=""
      />
    </Box>
  );
};

export default AddProduct;
