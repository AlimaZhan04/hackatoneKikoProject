import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@mui/material";
import { useProducts } from "../../contexts/ProductContextProvider";

const EditProduct = () => {
  const navigate = useNavigate();
  const { getCosmeticsDetails, cosmeticsDetails, saveEditedCosmetics } =
    useProducts();
  const [cosmetics, setCosmetics] = useState(cosmeticsDetails);

  const { id } = useParams();

  useEffect(() => {
    setCosmetics(cosmeticsDetails);
  }, [cosmeticsDetails]);

  useEffect(() => {
    getCosmeticsDetails(id);
  }, []);

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
      <h1>Edit PAGE</h1>
      <TextField
        id="outlined-basic"
        label="Name"
        variant="outlined"
        color="grey"
        name="name"
        size="small"
        onChange={handleInp}
        value={cosmetics.name || ""}
      />
      <TextField
        id="outlined-basic"
        label="Description"
        variant="outlined"
        color="grey"
        name="description"
        size="small"
        onChange={handleInp}
        value={cosmetics.description || ""}
      />
      <TextField
        id="outlined-basic"
        label="Price"
        variant="outlined"
        color="grey"
        name="price"
        size="small"
        onChange={handleInp}
        value={cosmetics.price || ""}
      />
      <TextField
        id="outlined-basic"
        label="Image"
        variant="outlined"
        color="grey"
        name="image"
        size="small"
        onChange={handleInp}
        value={cosmetics.image || ""}
      />
      <TextField
        id="outlined-basic"
        label="Type"
        variant="outlined"
        color="grey"
        name="type"
        size="small"
        onChange={handleInp}
        value={cosmetics.type || ""}
      />
      <Button
        onClick={() => {
          saveEditedCosmetics(cosmetics);
          navigate("/");
        }}
        variant="contained"
        size="large"
        sx={{
          border: "1px solid black",
          color: "white",
          backgroundColor: "black",
        }}
      >
        save changes
      </Button>
    </Box>
  );
};

export default EditProduct;
