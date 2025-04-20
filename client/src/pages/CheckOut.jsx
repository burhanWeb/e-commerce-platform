import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  CircularProgress,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { checkout } from "../redux/slices/order/OrderSlice";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Checkout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { cartItems, grossTotal, error, loading } = useSelector(
    (state) => state.cart
  );
  console.log(grossTotal);

  console.log(cartItems);

  const { order } = useSelector((state) => state.order);

  const [shippingInfo, setShippingInfo] = useState({
    address: "",
    city: "",
    state: "",
    country: "",
    pinCode: "",
    phoneNo: "",
  });

  const [validationError, setValidationError] = useState("");

  // useEffect(() => {
  //   if (order) {
  //     navigate("/order-success");
  //   }
  // }, [order, navigate]);

  const handleChange = (e) => {
    setShippingInfo((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const validateForm = () => {
    for (let key in shippingInfo) {
      if (!shippingInfo[key]) {
        setValidationError("All fields are required.");
        return false;
      }
    }
    setValidationError("");

    return true;
  };

  const handlePlaceOrder = () => {
    if (!validateForm()) return;

    dispatch(
      checkout({
        orderData: {
          itemsPrice: grossTotal,
          taxPrice: grossTotal * 0.05,
          shippingPrice: 10,
          grossTotal,
          paymentMethod: "Razorpay",
        },
        orderItems: cartItems,
        shippingInfo,
      })
    );
  };

  return (
    <Box width="100%" p={3}>
      <Typography variant="h5">Checkout</Typography>

      <Box mt={3}>
        <TextField
          fullWidth
          label="Address"
          name="address"
          value={shippingInfo.address}
          onChange={handleChange}
          required
          margin="dense"
        />
        <TextField
          fullWidth
          label="City"
          name="city"
          value={shippingInfo.city}
          onChange={handleChange}
          required
          margin="dense"
        />
        <TextField
          fullWidth
          label="State"
          name="state"
          value={shippingInfo.state}
          onChange={handleChange}
          required
          margin="dense"
        />
        <TextField
          fullWidth
          label="Country"
          name="country"
          value={shippingInfo.country}
          onChange={handleChange}
          required
          margin="dense"
        />
        <TextField
          fullWidth
          label="Pin Code"
          name="pinCode"
          value={shippingInfo.pinCode}
          onChange={handleChange}
          required
          margin="dense"
        />
        <TextField
          fullWidth
          label="Phone No."
          name="phoneNo"
          value={shippingInfo.phoneNo}
          onChange={handleChange}
          required
          margin="dense"
        />
      </Box>

      {validationError && (
        <Typography color="error">{validationError}</Typography>
      )}

      <Box mt={3}>
        <Typography variant="h6">Cart Summary</Typography>
        {cartItems.map((item, index) => (
          <Typography key={index}>
            {item.name} x {item.quantity} = ₹{item.subtotal.toFixed(2)}
          </Typography>
        ))}
        <Typography variant="h6">Total: ₹{grossTotal.toFixed(2)}</Typography>
      </Box>

      {error && <Typography color="error">{error}</Typography>}
      <Button
        variant="contained"
        color="primary"
        onClick={handlePlaceOrder}
        disabled={loading}
        sx={{ mt: 2 }}
      >
        {loading ? <CircularProgress size={24} /> : "Pay & Place Order"}
      </Button>
    </Box>
  );
};

export default Checkout;
