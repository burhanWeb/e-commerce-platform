import express from "express";
import {
  authorizeRoles,
  ProtectedRoute,
} from "../middleware/protectedRoutes.js";
import {
  checkout,
  deleteOrder,
  getAllOrder,
  getSingleOrder,
  myOrders,
  updateOrder,
  PaymentVerification,
} from "../controllers/orderController.js";

const router = express.Router();

router.route("/checkout").post(ProtectedRoute, checkout);

router.route("/paymentverfication").post(ProtectedRoute, PaymentVerification);

router.route("/me").get(ProtectedRoute, myOrders);
router
  .route("/admin/allorders")
  .get(ProtectedRoute, authorizeRoles("admin"), getAllOrder);

router.route("/:id").get(ProtectedRoute, getSingleOrder);

router.route("/me").get(ProtectedRoute, myOrders);
router
  .route("/admin/:id")
  .put(ProtectedRoute, authorizeRoles("admin"), updateOrder)
  .delete(ProtectedRoute, authorizeRoles("admin"), deleteOrder);
export default router;
