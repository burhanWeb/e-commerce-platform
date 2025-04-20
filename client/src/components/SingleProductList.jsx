import React from "react";
import SingleProduct from "./SingleProduct";
import { useSelector } from "react-redux";
import { Grid2 } from "@mui/material";

function SingleProductList() {
  const { singleProduct } = useSelector((state) => state.product);
  return (
    <Grid2
      container
      alignContent={"center"}
      justifyContent={"center"}
      height={"100vh"}
    >
      {singleProduct.map((product) => {
        return <SingleProduct key={product._id} {...product} />;
      })}
    </Grid2>
  );
}

export default SingleProductList;
