import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMyOrders } from "../redux/slices/order/OrderSlice";
import {
  Card,
  CardContent,
  Typography,
  Divider,
  Grid2,
  IconButton,
  Box,
  Chip,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Collapse from "@mui/material/Collapse";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import CancelIcon from "@mui/icons-material/Cancel";
import { List, ListItem, ListItemText } from "@mui/material";

function MyOrders() {
  const [expandedOrder, setExpandedOrder] = useState(null);

  const dispatch = useDispatch();
  const { myOrders } = useSelector((state) => state.order);

  useEffect(() => {
    dispatch(getMyOrders());
  }, []);

  const handleExpandClick = (orderId) => {
    setExpandedOrder(expandedOrder === orderId ? null : orderId);
  };

  return (
    <div>
      <Box sx={{ p: 3 }}>
        <Typography
          variant="h4"
          gutterBottom
          sx={{ textAlign: "center", fontWeight: "bold" }}
        >
          My Orders
        </Typography>
        <Grid2 container spacing={3}>
          {myOrders.length > 0 ? (
            myOrders.map((order) => (
              <Grid2 item xs={12} sm={6} md={4} key={order._id}>
                <Card
                  sx={{
                    borderRadius: "12px",
                    boxShadow: 3,
                    transition: "0.3s",
                    "&:hover": { boxShadow: 6 },
                  }}
                >
                  <CardContent>
                    <Typography
                      variant="h6"
                      sx={{ fontWeight: "bold", color: "primary.main" }}
                    >
                      Order #{order._id.slice(-6)}
                    </Typography>
                    <Chip
                      label={order.myOrderstatus}
                      color={
                        order.myOrderstatus === "Delivered"
                          ? "success"
                          : "warning"
                      }
                      icon={
                        order.myOrderstatus === "Delivered" ? (
                          <CheckCircleIcon />
                        ) : (
                          <LocalShippingIcon />
                        )
                      }
                      sx={{ mt: 1 }}
                    />
                    <Divider sx={{ my: 2 }} />

                    <Typography
                      variant="body2"
                      sx={{ fontSize: "0.9rem", color: "text.secondary" }}
                    >
                      📍 {order.shippingInfo.city}, {order.shippingInfo.country}
                    </Typography>

                    <Typography
                      variant="body2"
                      sx={{
                        fontSize: "0.9rem",
                        color: "text.secondary",
                        mt: 1,
                      }}
                    >
                      💳
                      {order.paymentInfo.status === "paid" ? "Paid" : "Unpaid"}
                      {order.paymentInfo.status === "paid" ? (
                        <CheckCircleIcon sx={{ color: "green", ml: 1 }} />
                      ) : (
                        <CancelIcon sx={{ color: "red", ml: 1 }} />
                      )}
                    </Typography>

                    <Typography
                      variant="h6"
                      sx={{ mt: 1, fontWeight: "bold", color: "primary.main" }}
                    >
                      Total: ${order.totalPrice}
                    </Typography>

                    <IconButton
                      onClick={() => handleExpandClick(order._id)}
                      sx={{ mt: 1 }}
                    >
                      <ExpandMoreIcon />
                    </IconButton>

                    <Collapse in={expandedOrder === order._id}>
                      <Divider sx={{ my: 2 }} />
                      <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                        Order Items
                      </Typography>
                      {order.orderItems.map((item) => (
                        <Typography
                          key={item._id}
                          variant="body2"
                          sx={{ fontSize: "0.9rem", mt: 1 }}
                        >
                          {item.name} (x{item.quantity}) - ${item.price}
                        </Typography>
                      ))}
                    </Collapse>
                  </CardContent>
                </Card>
              </Grid2>
            ))
          ) : (
            <Typography sx={{ textAlign: "center", width: "100%", mt: 3 }}>
              No myOrders found.
            </Typography>
          )}
        </Grid2>
      </Box>
    </div>
  );
}

export default MyOrders;
