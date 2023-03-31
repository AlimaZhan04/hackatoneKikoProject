import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Button, CardActionArea, CardActions } from "@mui/material";
import { useProducts } from "../../contexts/ProductContextProvider";
import { useNavigate } from "react-router";

export default function ProductCard({ item }) {
  const { deleteCosmetics } = useProducts();
  const navigate = useNavigate();
  return (
    <Card sx={{ maxWidth: 255 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="260"
          image={item.image}
          alt="green iguana"
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
      </CardActionArea>
      <CardActions>
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
      </CardActions>
    </Card>
  );
}
