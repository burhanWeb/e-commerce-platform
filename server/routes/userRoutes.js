import express from "express";
import {
  login,
  logout,
  regsiter,
  getUserDetail,
  updatePassword,
  updateProfile,
  getAllUsers,
  getSingleUser,
  updateRole,
  deleteUser,
  logoutUser,
} from "../controllers/userController.js";

import {
  authorizeRoles,
  ProtectedRoute,
} from "../middleware/protectedRoutes.js";
import { upload } from "../middleware/multerMiddleware.js";

const router = express.Router();

router.post("/register", upload.single("image"), regsiter);
router.post("/login", login);
router.get("/logout", logout);

router.route("/me").get(ProtectedRoute, getUserDetail);

router.route("/password/update").put(ProtectedRoute, updatePassword);
router.route("/me/update").put(ProtectedRoute, updateProfile);

router
  .route("/admin/users")
  .get(ProtectedRoute, authorizeRoles("admin"), getAllUsers);

router
  .route("/admin/user/:id")
  .get(ProtectedRoute, authorizeRoles("admin"), getSingleUser)
  .put(ProtectedRoute, updateRole)
  .delete(ProtectedRoute, authorizeRoles("admin"), deleteUser);

router.route("/logout").post(ProtectedRoute, logoutUser);

export default router;
