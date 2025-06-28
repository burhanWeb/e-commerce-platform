import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import customFetch from "../../../utils/axios.js";
import {
  addCartToLocalStorage,
  getCartFromLocalStorage,
  removeCartFromLocalStorage,
} from "../../../utils/localStorage";
import { toast } from "react-toastify";

// Add or Update Cart Item
export const createOrUpdateCart = createAsyncThunk(
  "/cart/createOrUpdateCart",
  async (cart, { rejectWithValue }) => {
    try {
      const response = await customFetch.put("/cart/add", cart); // API request to add or update cart
      return response.data.updatedItems; // Returning the updated cart items
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to update cart"
      );
    }
  }
);

// Decrease or Remove Cart Item
export const decreaseOrRemoveCart = createAsyncThunk(
  "/cart/decreaseOrRemoveCart",
  async (productId, { rejectWithValue }) => {
    try {
      const response = await customFetch.put("/cart/decrement", productId); // API request to decrease quantity or remove item
      return response.data; // Returning updated cart after item removal or decrement
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to modify cart item"
      );
    }
  }
);

// Fetch Cart from Server
export const fetchCart = createAsyncThunk(
  "/cart/fetchCart",
  async (_, { rejectWithValue }) => {
    try {
      const response = await customFetch.get(`/cart`); // API request to fetch cart
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch cart"
      );
    }
  }
);
export const fecthClearCart = createAsyncThunk(
  "/cart/clearCart",
  async (_, { rejectWithValue }) => {
    try {
      const response = await customFetch.delete(`/cart/clearCart`);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch cart"
      );
    }
  }
);
export const CartSlice = createSlice({
  name: "cart",
  initialState: {
    cartItems: getCartFromLocalStorage(),
    cartCount: 0,
    grossTotal: 0,
    loading: false,
  },
  reducers: {
    addToCart: (state, action) => {
      const newItem = action.payload;
      const existingItem = state.cartItems.find(
        (item) => item.product === newItem.product
      );

      if (existingItem) {
        existingItem.quantity += newItem.quantity;
      } else {
        state.cartItems.push(newItem);
        state.cartCount += newItem.quantity;
        state.grossTotal += newItem.price * newItem.quantity;
      }

      addCartToLocalStorage(state.cartItems);
    },

    increment: (state, action) => {
      const { product, quantity } = action.payload;
      const item = state.cartItems.find((item) => item.product === product);

      if (item) {
        item.quantity += quantity;
        state.cartCount += quantity;
        state.grossTotal += item.price * quantity;
        addCartToLocalStorage(state.cartItems);
      }
    },

    decrement: (state, action) => {
      const { product } = action.payload;
      const item = state.cartItems.find((item) => item.product === product);

      if (item) {
        if (item.quantity > 1) {
          item.quantity -= 1;
        } else {
          state.cartItems = state.cartItems.filter(
            (cartItem) => cartItem.product !== product
          );
        }
      }

      addCartToLocalStorage(state.cartItems);
    },

    clearCart: (state) => {
      state.cartItems = [];
      state.cartCount = 0;
      state.grossTotal = 0;
      removeCartFromLocalStorage();
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCart.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        const { updatedItems, grossTotal, cartCount } = action.payload;
        state.cartItems = updatedItems || [];
        state.grossTotal = grossTotal || 0;
        state.cartCount = cartCount || 0;
        state.loading = false;
        addCartToLocalStorage(state.cartItems);
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Unable to fetch cart.";
        toast.error(state.error);
      })
      .addCase(fecthClearCart.pending, (state) => {
        state.loading = true;
      })
      .addCase(fecthClearCart.fulfilled, (state, action) => {
        removeCartFromLocalStorage();
      })
      .addCase(fecthClearCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Unable to fetch cart.";
        toast.error(state.error);
      });
  },
});

export const { addToCart, increment, decrement, clearCart } = CartSlice.actions;
export default CartSlice.reducer;
