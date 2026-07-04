import express from "express";
import {
  changePassword,
  deleteAccount,
  getAllUsers,
  getUserById,
  updateUser,
  getUserWishlist,
  getUserRatings,
  updateAvatar,
  getUserStats,
  getUserRecipes,
} from "../controllers/userController.js";
import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();

// Public routes
router.get("/", getAllUsers);

// Protected routes (require authentication)
router.get("/:id", verifyToken, getUserById);
router.put("/:id", verifyToken, updateUser);
router.post("/:id/change-password", verifyToken, changePassword);
router.delete("/:id/delete-account", verifyToken, deleteAccount);

// User's recipes
router.get("/:id/recipes", verifyToken, getUserRecipes);

// User's wishlist
router.get("/:id/wishlist", verifyToken, getUserWishlist);

// User's ratings
router.get("/:id/ratings", verifyToken, getUserRatings);

// Avatar management
router.patch("/:id/avatar", verifyToken, updateAvatar);

// User statistics
router.get("/:id/stats", verifyToken, getUserStats);

export default router;
