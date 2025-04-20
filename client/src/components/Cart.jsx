import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCart,
  increment,
  decrement,
  createOrUpdateCart,
  decreaseOrRemoveCart,
  clearCart,
  fecthClearCart,
} from "../redux/slices/cart/CartSlice.js";
import { Link } from "react-router-dom";
import { fetchProducts } from "../redux/slices/product/ProductsSlice.js";
import { Box, Button, Typography, Grid2 } from "@mui/material";

const Cart = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCart());
    dispatch(fetchProducts());
  }, [dispatch]);

  const { products } = useSelector((state) => state.product);
  const { cartItems, grossTotal } = useSelector((state) => state.cart);

  const getProductDetails = (productId) =>
    products.find((p) => p._id === productId);

  const handleIncrement = (item) => {
    const product = getProductDetails(item.product);
    if (!product) return;

    if (item.quantity < product.stock) {
      dispatch(
        createOrUpdateCart({
          product: item.product,
          quantity: item.quantity + 1,
        })
      );
      dispatch(
        increment({
          product: item.product,
          quantity: 1,
        })
      );
    }
  };
  const handleDecrement = (item) => {
    const product = getProductDetails(item.product);
    if (!product) return;

    if (item.quantity > 1) {
      // Backend decrement
      dispatch(
        decreaseOrRemoveCart({
          product: item.product,
          quantity: item.quantity - 1,
        })
      );

      // Local Redux decrement
      dispatch(
        decrement({
          product: item.product,
          quantity: 1,
        })
      );
    } else {
      // Backend remove
      dispatch(
        decreaseOrRemoveCart({
          product: item.product,
          quantity: item.quantity,
        })
      );

      // Local Redux remove (always trigger this)
      dispatch(
        decrement({
          product: item.product,
          quantity: 1,
        })
      );
    }
  };
  const handleClearCart = () => {
    dispatch(fecthClearCart());
    dispatch(clearCart());
  };

  return (
    <Box width="100%" p={3}>
      <Button
        component={Link}
        to="/products"
        variant="outlined"
        color="primary"
        sx={{ mb: 2 }}
      >
        Back
      </Button>

      <Grid2 container width="100%" direction="column">
        <Grid2
          container
          justifyContent="space-between"
          alignItems="center"
          sx={{
            backgroundColor: "#ff7043",
            p: 2,
            borderRadius: 1,
            mb: 2, // Added margin-bottom for spacing
          }}
        >
          <Typography variant="h6" color="white" width="30%">
            Product
          </Typography>
          <Typography variant="h6" color="white" width="20%">
            Quantity
          </Typography>
          <Typography variant="h6" color="white" width="20%">
            Subtotal
          </Typography>
        </Grid2>

        {cartItems.length > 0 ? (
          cartItems.map((item, index) => {
            const product = getProductDetails(item.product);
            return (
              <Grid2
                key={index}
                container
                justifyContent="space-between"
                alignItems="center"
                p={2}
                sx={{ borderBottom: "1px solid #ddd" }}
              >
                <Box display="flex" alignItems="center" gap={2} width="30%">
                  <img
                    src={product?.image}
                    alt={product?.name}
                    width="100px"
                    height="100px"
                    style={{ borderRadius: "1rem", objectFit: "cover" }}
                  />
                  <Typography variant="subtitle1">
                    {product?.name || "Unknown Product"}
                  </Typography>
                </Box>

                <Box display="flex" alignItems="center" width="20%">
                  <Button
                    variant="contained"
                    size="small"
                    onClick={() => handleDecrement(item)}
                  >
                    -
                  </Button>
                  <Typography mx={2}>{item.quantity}</Typography>
                  <Button
                    variant="contained"
                    size="small"
                    onClick={() => handleIncrement(item)}
                  >
                    +
                  </Button>
                </Box>

                <Typography width="20%">
                  ₹{(product?.price * item.quantity).toFixed(2)}
                </Typography>
              </Grid2>
            );
          })
        ) : (
          <Typography variant="h6" textAlign="center" mt={3}>
            Your cart is empty.
          </Typography>
        )}

        <Grid2 container justifyContent="flex-end" mt={3}>
          <Typography variant="h6">Total: ${grossTotal}</Typography>
        </Grid2>

        <Grid2
          gap={"2rem"}
          display={"flex"}
          container
          justifyContent="center"
          mt={2}
        >
          {cartItems.length > 0 && (
            <Link to="/checkout">
              <Button variant="contained" color="primary" size="large">
                Checkout
              </Button>
            </Link>
          )}
          {cartItems.length > 0 && (
            <Button
              variant="outlined"
              color="error"
              size="large"
              onClick={handleClearCart}
            >
              clear cart{" "}
            </Button>
          )}
        </Grid2>
      </Grid2>
    </Box>
  );
};

export default Cart;
