import React, { useEffect } from "react";
import { Container, Typography, Box, Button, Paper } from "@mui/material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { Link } from "react-router-dom";
import { clearCart } from "../redux/slices/cart/CartSlice";

const OrderSuccess = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    // Clear the cart after successful order
    clearCart();
  }, [dispatch]);

  // Clear the cart after successful order
  return (
    <Container maxWidth="sm" sx={{ mt: 10 }}>
      <Paper elevation={3} sx={{ p: 4, textAlign: "center" }}>
        <Box display="flex" justifyContent="center" mb={2}>
          <CheckCircleOutlineIcon color="success" sx={{ fontSize: 60 }} />
        </Box>
        <Typography variant="h4" gutterBottom>
          Payment Successful!
        </Typography>
        <Typography variant="body1" color="text.secondary" mb={4}>
          Thank you for your purchase. Your order has been placed successfully.
        </Typography>
        <Button
          component={Link}
          to="/"
          variant="contained"
          color="success"
          size="large"
        >
          Continue Shopping
        </Button>
      </Paper>
    </Container>
  );
};

export default OrderSuccess;
