import React from "react";
import { useSelector } from "react-redux";
import { Box, Grid2, Typography } from "@mui/material";
import FeaturedProducts from "./FeaturedProducts";
import { makeStyles } from "@mui/styles";
function FeaturedProductsList() {
  const { featuredProducts } = useSelector((state) => state.product);
  return (
    <div>
      <Typography
        variant="h4"
        textAlign={"center"}
        textTransform={"capitalize"}
      >
        Featured Products
      </Typography>
      <Grid2 container columns={{ sm: 2, md: 4, xs: 1 }}>
        {featuredProducts.map((products) => {
          return <FeaturedProducts key={products._id} {...products} />;
        })}
      </Grid2>
    </div>
  );
}

export default FeaturedProductsList;
