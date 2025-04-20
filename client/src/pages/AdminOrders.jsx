import { useDispatch, useSelector } from "react-redux";
import {
  getAllOrdersAdmin,
  updateOrderStatus,
  updateOrderStatusInState,
  deleteOrder,
  deleteOrderInState,
} from "../redux/slices/order/OrderSlice.js";

import {
  Table,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TableBody,
  Button,
  TextField,
  CircularProgress,
} from "@mui/material";
import { useEffect, useState } from "react";

function AdminOrders() {
  useEffect(() => {
    dispatch(getAllOrdersAdmin());
  }, []);

  const dispatch = useDispatch();
  const { orders, loading } = useSelector((state) => state.order);
  const [editMode, setEditMode] = useState(null);
  const [updatedData, setUpdatedData] = useState(null);
  const [loadingUpdate, setLoadingUpdate] = useState(false);
  const handleEdit = (order) => {
    setEditMode(order._id);
    setUpdatedData(order);
  };
  const handleInputChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setUpdatedData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleUpdateorder = () => {
    if (updatedData) {
      try {
        dispatch(
          updateOrderStatus({
            orderId: updatedData._id,
            orderData: updatedData,
          })
        );

        dispatch(
          updateOrderStatusInState({
            orderId: updatedData._id,
            orderData: updatedData,
          })
        );
        setEditMode(null);
      } catch (error) {
        console.error("Update failed:", error);
      }
    }
  };
  const handleDeleteorder = (orderId) => {
    dispatch(deleteOrder(orderId));
    dispatch(deleteOrderInState(orderId));
  };
  const handleCancelEdit = () => {
    setEditMode(null);
    setUpdatedData(null);
  };

  return (
    <div>
      <h2 style={{ textAlign: "center" }}>Admin Orders</h2>
      {loading ? (
        // <CircularProgress />
        <h1>no order found</h1>
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Order ID</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Items (Qty)</TableCell>
                <TableCell>Total Amount</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {orders.length > 0 ? (
                orders.map((order) => (
                  <TableRow key={order._id}>
                    <TableCell>{order._id}</TableCell>

                    <TableCell>
                      {editMode === order._id ? (
                        <TextField
                          name="orderStatus"
                          value={updatedData?.orderStatus || ""}
                          onChange={handleInputChange}
                          fullWidth
                          id="orderStatus"
                        />
                      ) : (
                        order.orderStatus
                      )}
                    </TableCell>

                    <TableCell>
                      {order.orderItems.map((item) => (
                        <div key={item._id}>
                          <TableCell>{item.orderStatus}</TableCell>
                          <TableCell>{item.quantity}</TableCell>
                        </div>
                      ))}
                    </TableCell>

                    <TableCell>₹{order.totalPrice}</TableCell>

                    <TableCell>
                      {editMode === order._id ? (
                        <>
                          <Button
                            variant="contained"
                            color="success"
                            onClick={handleUpdateorder}
                            disabled={loadingUpdate}
                          >
                            {loadingUpdate ? "Saving..." : "Save"}
                          </Button>
                          <Button
                            variant="contained"
                            color="secondary"
                            onClick={handleCancelEdit}
                            style={{ marginLeft: "10px" }}
                          >
                            Cancel
                          </Button>
                        </>
                      ) : (
                        <>
                          <Button
                            variant="contained"
                            color="primary"
                            onClick={() => handleEdit(order)}
                          >
                            Edit
                          </Button>
                          <Button
                            variant="contained"
                            color="error"
                            onClick={() => handleDeleteorder(order._id)}
                            style={{ marginLeft: "10px" }}
                          >
                            Delete
                          </Button>
                        </>
                      )}
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5} align="center">
                    No Orders Found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </div>
  );
}

export default AdminOrders;
