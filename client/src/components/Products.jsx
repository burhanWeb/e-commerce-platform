import React from "react";
import { useSelector } from "react-redux";
import ProductsList from "./ProductsList";
import { Card, CardContent, CardMedia, Grid2, Typography } from "@mui/material";
import demo from "../images/demo.png";
import { Link } from "react-router-dom";

function Products({ name, price, _id, image }) {
  return (
    <Grid2
      size={{ xs: 1, sm: 1 }}
      padding={2}
      sx={{
        "&:hover": {
          transform: "scale(1.05)",
          transition: "0.3s",
        },
      }}
    >
      <Card boxShadow={3} sx={{ maxWidth: 500 }}>
        <CardMedia
          component="img"
          image={image}
          alt="Product Image"
          width={"100%"}
          height={"200px"}
        />
        <CardContent>
          <Link to={`/product/${_id}`}>
            <Typography variant="h6">{name}</Typography>
          </Link>

          <Typography variant="body1">${price}</Typography>
        </CardContent>
      </Card>
    </Grid2>
  );
}

export default Products;
