import express from "express";
const router = express.Router();

import {
  addOrIncrementItem,
  clearCart,
  decrementOrRemoveItem,
  fetchCartItems,
} from "../controllers/cartControllers.js";
import { ProtectedRoute } from "../middleware/protectedRoutes.js";

router.route("/add").put(ProtectedRoute, addOrIncrementItem);

router.route("/decrement").put(ProtectedRoute, decrementOrRemoveItem);

router.route("/").get(ProtectedRoute, fetchCartItems);
router.route("/clearCart").delete(ProtectedRoute, clearCart);

export default router;
