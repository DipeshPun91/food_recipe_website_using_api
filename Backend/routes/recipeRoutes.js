// import express from "express";
// import {
//   getAllRecipes,
//   createRecipe,
//   getRecipeById,
//   deleteRecipe,
//   updateRecipe,
// } from "../controllers/recipeController.js";
// import { verifyToken } from "../middleware/verifyToken.js";

// const router = express.Router();

// // Public routes
// router.get("/", getAllRecipes);
// router.get("/:id", getRecipeById);

// // Protected routes (require authentication)
// router.post("/", verifyToken, createRecipe);
// router.delete("/:id", verifyToken, deleteRecipe);
// router.put("/:id", verifyToken, updateRecipe);

// export default router;

import express from "express";
import {
  getAllRecipes,
  createRecipe,
  getRecipeById,
  deleteRecipe,
  updateRecipe,
} from "../controllers/recipeController.js";
import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();

router.get("/", getAllRecipes);
router.post("/create", verifyToken, createRecipe);
// router.get("/:id", getRecipeById);
router.put("/edit/:id", verifyToken, updateRecipe);
// router.delete("/:id", deleteRecipe);
router.delete("/delete/:id", verifyToken, deleteRecipe);

export default router;
