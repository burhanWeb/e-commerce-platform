import React from "react";
import { useSelector } from "react-redux";
import Products from "./Products";
import { Grid2 } from "@mui/material";

function ProductsList() {
  const { products } = useSelector((state) => state.product);
  console.log(products);

  return (
    <Grid2 container columns={{ sm: 2, md: 3, xs: 1 }} width={"100%"}>
      {products.map((product) => {
        return <Products key={product._id} {...product} />;
      })}
    </Grid2>
  );
}

export default ProductsList;
