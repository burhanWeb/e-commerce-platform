import express from "express";
import {
  getAllProducts,
  createProduct,
  updateProducts,
  deleteProduct,
  getSingleProduct,
  getFeaturedProducts,
  getCategories,
} from "../controllers/productsController.js";
import {
  ProtectedRoute,
  authorizeRoles,
} from "../middleware/protectedRoutes.js";
import { upload } from "../middleware/multerMiddleware.js";

const router = express.Router();

router.route("/").get(ProtectedRoute, getAllProducts);
router
  .route("/new")
  .post(
    ProtectedRoute,
    authorizeRoles("admin"),
    upload.single("productImage"),
    createProduct
  );

router.route("/categories").get(ProtectedRoute, getCategories);

router.route("/featuredProducts").get(getFeaturedProducts);

router
  .route("/product/:id")
  .get(getSingleProduct)
  .put(ProtectedRoute, authorizeRoles("admin"), updateProducts)
  .delete(ProtectedRoute, authorizeRoles("admin"), deleteProduct);

export default router;
