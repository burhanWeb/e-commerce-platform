import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import demo from "../images/demo.png";
import {
  Box,
  Button,
  Typography,
  useMediaQuery,
  useTheme,
  Paper,
  Divider,
} from "@mui/material";
import {
  createOrUpdateCart,
  decreaseOrRemoveCart,
} from "../redux/slices/cart/CartSlice";

function SingleProduct({ name, image, _id, price, stock }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(stock > 0 ? 1 : 0);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const handleCartIncrementOrAdd = () => {
    dispatch(
      createOrUpdateCart({ product: _id, name, price, quantity, image })
    );
  };

  const handleCartDecrementOrRemove = () => {
    dispatch(decreaseOrRemoveCart({ product: _id, quantity: 1 }));
  };

  const increaseQuantity = () => {
    if (quantity < stock) setQuantity((prev) => prev + 1);
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1);
      handleCartDecrementOrRemove();
    } else {
      handleCartDecrementOrRemove();
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        bgcolor: "#f5f5f5",
        p: 2,
      }}
    >
      <Paper
        elevation={4}
        sx={{
          width: "100%",
          maxWidth: 1100,
          p: 4,
          borderRadius: 4,
          display: "flex",
          flexDirection: isMobile ? "column" : "row",
          gap: 4,
        }}
      >
        {/* Product Image */}
        <Box
          sx={{
            flex: 1,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <img
            src={image}
            alt={name}
            style={{
              width: "100%",
              maxWidth: "400px",
              height: "auto",
              borderRadius: "1rem",
              objectFit: "cover",
            }}
          />
        </Box>

        {/* Product Details */}
        <Box sx={{ flex: 1, display: "flex", flexDirection: "column", gap: 2 }}>
          {/* Back Button */}
          <Button
            onClick={() => navigate(-1)}
            variant="outlined"
            sx={{ alignSelf: "flex-start", mb: 2 }}
          >
            ← Back
          </Button>

          <Typography variant="h4" fontWeight={600}>
            {name}
          </Typography>

          <Typography color="text.secondary">Product ID: #{_id}</Typography>

          <Typography variant="h5" color="primary" fontWeight="bold">
            ₹{price}
          </Typography>

          <Divider sx={{ my: 2 }} />

          <Typography variant="body1">
            Status:{" "}
            <strong style={{ color: stock === 0 ? "red" : "green" }}>
              {stock === 0 ? "Out of Stock" : "In Stock"}
            </strong>
          </Typography>

          {/* Quantity Control */}
          <Box display="flex" alignItems="center" gap={2}>
            <Button
              variant="outlined"
              onClick={decreaseQuantity}
              disabled={quantity <= 1}
            >
              -
            </Button>
            <Typography variant="h6">{quantity}</Typography>
            <Button
              variant="outlined"
              onClick={increaseQuantity}
              disabled={quantity >= stock}
            >
              +
            </Button>
          </Box>

          {/* Add to Cart Button */}
          <Button
            variant="contained"
            size="large"
            onClick={handleCartIncrementOrAdd}
            disabled={stock === 0}
            sx={{ mt: 2 }}
          >
            Add to Cart
          </Button>
        </Box>
      </Paper>
    </Box>
  );
}

export default SingleProduct;
