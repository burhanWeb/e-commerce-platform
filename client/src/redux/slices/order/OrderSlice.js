import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import customFetch from "../../../utils/axios.js";
import { toast } from "react-toastify";

// checkout
export const checkout = createAsyncThunk(
  "/order/checkout",
  async ({ orderData, orderItems, shippingInfo }, { rejectWithValue }) => {
    try {
      const {
        data: { order },
      } = await customFetch.post("/orders/checkout", orderData);

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: order.subtotal * 100,
        currency: "INR",
        name: "My Shop",
        description: "Order Payment",
        order_id: order.id,

        handler: async (response) => {
          const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
            response;

          const paymentData = {
            razorpay_order_id,
            razorpay_payment_id,
            razorpay_signature,
            shippingInfo,
            orderItems,
            itemsPrice: orderData.itemsPrice,
            taxPrice: orderData.taxPrice,
            shippingPrice: orderData.shippingPrice,
            totalPrice: orderData.grossTotal,
          };

          try {
            const { data } = await customFetch.post(
              `/orders/paymentverification`,
              paymentData
            );

            if (data.success) {
              window.location.href = `/payment-success?reference=${razorpay_payment_id}`;
            } else {
              toast.error(
                data.message || "Payment verified, but order not completed."
              );
            }
          } catch (err) {
            console.error("Payment Verification Failed:", err);
            toast.error(
              "Payment was successful, but server confirmation failed. Please check your order history."
            );
          }
        },

        prefill: {
          name: shippingInfo.name,
          email: shippingInfo.email,
          contact: shippingInfo.phoneNo,
        },
        theme: { color: "#3399cc" },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (error) {
      console.error("Checkout error:", error);
      return rejectWithValue(
        error.response?.data?.message || "Something went wrong"
      );
    }
  }
);

// getMYorders

export const getMyOrders = createAsyncThunk(
  "/order/myOrders",
  async (_, { rejectWithValue }) => {
    try {
      const response = await customFetch.get("/orders/me");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
// getAllOrdersAdmin
export const getAllOrdersAdmin = createAsyncThunk(
  "/order/admin/orders",
  async (_, { rejectWithValue }) => {
    try {
      const response = await customFetch.get("orders/admin/allorders");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
// updateOrderStautus
export const updateOrderStatus = createAsyncThunk(
  "/order/admin/updateOrder",
  async ({ orderId, orderData }, { rejectWithValue }) => {
    try {
      const response = await customFetch.put(
        `/orders/admin/${orderId}`,
        orderData
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
// deleteOrder
export const deleteOrder = createAsyncThunk(
  "/order/admin/deleteOrder",
  async (orderId, { rejectWithValue }) => {
    try {
      const response = await customFetch.delete(`/orders/admin/${orderId}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const orderSlice = createSlice({
  name: "order",
  initialState: {
    loading: false,
    orders: [],
    myOrders: [],

    error: null,
  },
  reducers: {
    updateOrderStatusInState: (state, action) => {
      const { orderId, orderData } = action.payload;
      const order = state.orders.find((order) => order._id === orderId);
      if (order) {
        order.orderStatus = orderData.orderStatus;
      }
    },
    deleteOrderInState: (state, action) => {
      const orderId = action.payload;
      state.orders = state.orders.filter((order) => order._id !== orderId);
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(getMyOrders.pending, (state) => {
        state.loading = true;
      })
      .addCase(getMyOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.myOrders = action.payload;
      })
      .addCase(getMyOrders.rejected, (state, action) => {
        state.loading = true;
        toast.error(action.payload);
      })
      .addCase(getAllOrdersAdmin.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllOrdersAdmin.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload;
      })
      .addCase(getAllOrdersAdmin.rejected, (state, action) => {
        state.loading = true;
        toast.error(action.payload);
      })
      .addCase(deleteOrder.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteOrder.fulfilled, (state, action) => {
        state.loading = false;
        toast.success(action.payload.message);
      })
      .addCase(deleteOrder.rejected, (state, action) => {
        state.loading = true;
        toast.error(action.payload);
      });
  },
});

export const { updateOrderStatusInState, deleteOrderInState } =
  orderSlice.actions;
export default orderSlice.reducer;
