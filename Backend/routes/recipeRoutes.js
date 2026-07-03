import express from "express";
import {
  getAllRecipes,
  createRecipe,
  getRecipeById,
  deleteRecipe,
  updateRecipe,
  addToWishlist,
  removeFromWishlist,
  getWishlist,
  rateRecipe,
  getUserRating,
  getRecipeStats,
} from "../controllers/recipeController.js";
import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();

// Public routes
router.get("/", getAllRecipes);
router.get("/:id", getRecipeById);
router.get("/:id/stats", getRecipeStats);

// Protected routes
router.post("/", verifyToken, createRecipe);
router.put("/:id", verifyToken, updateRecipe);
router.delete("/:id", verifyToken, deleteRecipe);

// Wishlist routes
router.post("/wishlist", verifyToken, addToWishlist);
router.delete("/wishlist/:recipeId", verifyToken, removeFromWishlist);
router.get("/wishlist", verifyToken, getWishlist);

// Rating routes
router.post("/:recipeId/rate", verifyToken, rateRecipe);
router.get("/:recipeId/rating", verifyToken, getUserRating);

export default router;
