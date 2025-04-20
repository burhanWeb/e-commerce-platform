import React, { useEffect } from "react";
import {
  FeaturedProducts,
  FeaturedProductsList,
  Hero,
  Sidebar,
} from "../components";
import { fetchFeaturedProducts } from "../redux/slices/product/ProductsSlice";
import { useDispatch } from "react-redux";
import { Grid2 } from "@mui/material";
import { fetchCart } from "../redux/slices/cart/CartSlice";

function Home() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchFeaturedProducts());
    dispatch(fetchCart());
  }, [dispatch]);

  return (
    <div>
      <Hero />
      <FeaturedProductsList />
    </div>
  );
}

export default Home;
