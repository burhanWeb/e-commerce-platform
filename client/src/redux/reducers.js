import { combineReducers } from "@reduxjs/toolkit";

import { AuthSlice } from "./slices/auth/AuthSlice";
import { ProductSlice } from "./slices/product/ProductsSlice";
import { CartSlice } from "./slices/cart/CartSlice";
import { orderSlice } from "./slices/order/OrderSlice";
AuthSlice;
// import { o } from "./slices/order/OrderSlice";

const rootReducer = combineReducers({
  auth: AuthSlice.reducer,
  product: ProductSlice.reducer,
  cart: CartSlice.reducer,
  order: orderSlice.reducer,
});

export default rootReducer;
