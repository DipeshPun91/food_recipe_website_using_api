import Recipe from "../models/Recipe.js";

// Get all recipes
export const getAllRecipes = async (req, res) => {
  try {
    const recipes = await Recipe.find();
    res.status(200).json({
      success: true,
      message: "All recipes retrieved successfully",
      data: recipes,
    });
  } catch (error) {
    console.log("Error fetching recipes:", error);
    res.status(500).json({
      success: false,
      message: "Server error while fetching recipes",
      error: error.message,
    });
  }
};

// Create a new recipe
export const createRecipe = async (req, res) => {
  const {
    strMeal,
    strCategory,
    strArea,
    strInstructions,
    strMealThumb,
    strYoutube,
    strIngredients,
    strTags,
    strSource,
  } = req.body;

  try {
    const newRecipe = await Recipe.create({
      strMeal,
      strCategory,
      strArea,
      strInstructions,
      strMealThumb,
      strYoutube,
      strIngredients,
      strTags,
      strSource,
    });

    const recipeResponse = {
      _id: newRecipe._id,
      strMeal: newRecipe.strMeal,
      strCategory: newRecipe.strCategory,
      strArea: newRecipe.strArea,
      strInstructions: newRecipe.strInstructions,
      strMealThumb: newRecipe.strMealThumb,
      strYoutube: newRecipe.strYoutube,
      strIngredients: newRecipe.strIngredients,
      strTags: newRecipe.strTags,
      strSource: newRecipe.strSource,
    };

    res.status(201).json({
      success: true,
      message: "New recipe created successfully",
      data: recipeResponse,
    });
  } catch (error) {
    console.log("Error creating recipe:", error);
    res.status(500).json({
      success: false,
      message: "Server error while creating recipe",
      error: error.message,
    });
  }
};

// Get recipe by ID
export const getRecipeById = async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id);

    if (!recipe) {
      return res.status(404).json({
        success: false,
        message: "Recipe not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Recipe retrieved successfully",
      data: recipe,
    });
  } catch (error) {
    console.log("Error fetching recipe:", error);
    res.status(500).json({
      success: false,
      message: "Server error while fetching recipe",
      error: error.message,
    });
  }
};

// Delete recipe
export const deleteRecipe = async (req, res) => {
  try {
    const recipe = await Recipe.findByIdAndDelete(req.params.id);

    if (!recipe) {
      return res.status(404).json({
        success: false,
        message: "Recipe not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Recipe deleted successfully",
    });
  } catch (error) {
    console.log("Error deleting recipe:", error);
    res.status(500).json({
      success: false,
      message: "Server error while deleting recipe",
      error: error.message,
    });
  }
};

// Update recipe
export const updateRecipe = async (req, res) => {
  try {
    const updatedRecipe = await Recipe.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updatedRecipe) {
      return res.status(404).json({
        success: false,
        message: "Recipe not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Recipe updated successfully",
      data: updatedRecipe,
    });
  } catch (error) {
    console.log("Error updating recipe:", error);
    res.status(500).json({
      success: false,
      message: "Server error while updating recipe",
      error: error.message,
    });
  }
};

// // GET all recipes
// export const getAllRecipes = (req, res) => {
//   res.status(200).json({
//     success: true,
//     message: "GET all recipes endpoint is working! 📋",
//   });
// };

// // GET single recipe by ID
// export const getRecipeById = (req, res) => {
//   const recipeId = req.params.id;
//   res.status(200).json({
//     success: true,
//     message: `GET recipe by ID endpoint is working! ID: ${recipeId}`,
//   });
// };

// // POST - Create new recipe
// export const createRecipe = (req, res) => {
//   res.status(201).json({
//     success: true,
//     message: "POST create recipe endpoint is working! ✅",
//   });
// };

// // PUT - Update existing recipe
// export const updateRecipe = (req, res) => {
//   const recipeId = req.params.id;

//   res.status(200).json({
//     success: true,
//     message: `PUT update recipe endpoint is working!  ✏️`,
//   });
// };

// // DELETE - Remove recipe
// export const deleteRecipe = (req, res) => {
//   const recipeId = req.params.id;
//   res.status(200).json({
//     success: true,
//     message: `DELETE recipe endpoint is working! ID: ${recipeId} 🗑️`,
//   });
// };
