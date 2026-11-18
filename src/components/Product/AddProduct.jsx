import React, { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import { useProducts } from "../../contexts/ProductContextProvider";
import { validateProduct } from '../../../shared/product-validation.mjs';
import { submitProduct } from '../../studio/submit-product.mjs';
import { recordAction } from '../../project-work/trace.mjs';

const AddProduct = () => {
  const navigate = useNavigate();
  const [cosmetics, setCosmetics] = useState({
    name: "",
    description: "",
    price: "",
    image: "",
    type: "",
  });

  const { addCosmetics,getCosmetics } = useProducts();
  const [errors,setErrors]=useState({});
  const [saving,setSaving]=useState(false);
  const handleInp = (e) => {
    if (e.target.name === "price") {
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
  // console.log(cosmetics);
  return (
    <Box
      className="product-form"
      sx={{
        width: {xs:'100%',sm:'70vw',md:'40vw'},
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
        id="add-name"
        label="Name"
        variant="outlined"
        color="grey"
        name="name"
        error={!!errors.name} helperText={errors.name}
        size="small"
        onChange={handleInp}
      />
      <TextField
        id="add-description"
        label="Description"
        variant="outlined"
        color="grey"
        name="description"
        error={!!errors.description} helperText={errors.description}
        size="small"
        onChange={handleInp}
      />
      <TextField
        id="add-price"
        label="Price"
        variant="outlined"
        color="grey"
        name="price"
        error={!!errors.price} helperText={errors.price}
        size="small"
        onChange={handleInp}
      />
      <TextField
        id="add-image"
        label="Image"
        variant="outlined"
        color="grey"
        name="image"
        error={!!errors.image} helperText={errors.image}
        size="small"
        onChange={handleInp}
      />
      <TextField
        id="add-type"
        label="Type"
        variant="outlined"
        color="grey"
        name="type"
        error={!!errors.type} helperText={errors.type}
        size="small"
        onChange={handleInp}
      />
      <Button
        disabled={saving}
        onClick={async () => {
          const validation=validateProduct(cosmetics);setErrors(validation);
          if(Object.keys(validation).length){recordAction('validateProduct — ошибки',validation);return;}
          setSaving(true);
          try { await submitProduct({persist:()=>addCosmetics(cosmetics),refresh:()=>getCosmetics({throwOnError:true}),close:()=>navigate('/'),notify:message=>{if(message!=='Товар сохранён')alert(message);},record:recordAction}); }
          catch(error){setErrors(error.response?.data?.errors||{});alert(error.response?.data?.message||error.message);}
          finally{setSaving(false);}
        }}
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
