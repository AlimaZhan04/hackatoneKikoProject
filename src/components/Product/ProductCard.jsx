import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Button, CardActionArea, CardActions, IconButton,Dialog,DialogTitle,DialogContent,DialogActions } from "@mui/material";
import { useProducts } from "../../contexts/ProductContextProvider";
import { ADMIN } from "../../helpers/consts";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContextProvider";
import LocalMallIcon from "@mui/icons-material/LocalMall";
import LocalMallOutlinedIcon from "@mui/icons-material/LocalMallOutlined";
// import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
// import LocalMallIcon from '@mui/icons-material/LocalMall';
// import { IconButton } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import "./Product.css";

import { useCart } from "../../contexts/CartContextProvider";
import { pink } from "@mui/material/colors";
import { useState } from "react";
import { useFavorites } from '../../contexts/FavoritesContextProvider';
import ProductImage from './ProductImage';

export default function ProductCard({ item }) {
  const { deleteCosmetics } = useProducts();
  const navigate = useNavigate();
  const {
    user: { email },
  } = useAuth();

  // корзина/

  const { addProductToCart, checkProductInCart } = useCart();

  const {favorites,toggleFavorite}=useFavorites();
  const heartOpen=favorites.includes(item.id);
  const [details,setDetails]=useState(false),[added,setAdded]=useState(false);

  return (
    <Card
      data-product-id={item.id}
      className="product-card"
      sx={{
        maxWidth: 325,
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-around",
        width: 280,
        margin: 2,

        marginLeft: { xl: 10, lg: 8, md: 20, sm: 10, xs: 5 },
        with: { xl: 325, lg: 300, md: 200, sm: 160 },
        height: { xl: 430, lg: 430, md: 460, sm: 460 },
      }}
    >
      <CardActionArea component="div" onClick={()=>setDetails(true)} aria-label={`View ${item.name}`}>
        <ProductImage
          height="170"
          src={item.image}
          alt={item.name}
          className="product-photo"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {item.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {item.description}
          </Typography>

          <Typography variant="body2" color="text.secondary">
            {item.price} $
          </Typography>
        </CardContent>

        <IconButton aria-label={`${heartOpen?'Remove':'Save'} ${item.name} ${heartOpen?'from':'to'} favorites`} aria-pressed={heartOpen} onClick={event=>{event.stopPropagation();toggleFavorite(item.id);}}>
          <FavoriteIcon
            className={`likes ${heartOpen && "active"}`}
          />
          <span>{heartOpen?1:0}</span>
        </IconButton>
      </CardActionArea>
      <div className="btn_cart">
        <IconButton
          onClick={() => {addProductToCart(item);setAdded(true);}}
          sx={{
            border: "2px solid black",
            width: "250px",
            borderRadius: "2rem",
            height: "40px",
            fontSize: "15px",
            backgroundColor: "black",
            color: "white",
            hover: "pink",
          }}
          className="iconButton"
        >
          <LocalMallOutlinedIcon
            className="icon"
            color={checkProductInCart(item.id) ? "primary" : ""}
          />
          <span>{added?'Added · add another':'Add to bag'}</span>
        </IconButton>
      </div>

      {email === ADMIN ? (
        <>
          <Button
            onClick={() => navigate(`/edit/${item.id}`)}
            size="small"
            color="primary"
          >
            edit
          </Button>
          <Button
            onClick={() => deleteCosmetics(item.id)}
            size="small"
            color="primary"
          >
            delete
          </Button>
        </>
      ) : null}
      <Dialog open={details} onClose={()=>setDetails(false)} fullWidth maxWidth="sm"><DialogTitle>{item.name}</DialogTitle><DialogContent><ProductImage src={item.image} alt={item.name} style={{width:'100%',height:260,objectFit:'contain'}}/><p>{item.description}</p><p>{item.type} · {item.price} $</p></DialogContent><DialogActions><Button onClick={()=>setDetails(false)}>Close</Button><Button onClick={()=>{addProductToCart(item);setDetails(false);}}>Add to bag</Button></DialogActions></Dialog>
    </Card>
  );
}
