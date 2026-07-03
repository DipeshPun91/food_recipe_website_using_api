import Recipe from "../models/Recipe.js";
import User from "../models/User.js";

// Get all recipes with pagination and filtering
export const getAllRecipes = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 20,
      category,
      area,
      search,
      sortBy = "createdAt",
      sortOrder = "desc",
    } = req.query;

    // Build filter
    const filter = { isPublic: true };
    if (category) filter.strCategory = category;
    if (area) filter.strArea = area;
    if (search) {
      filter.$text = { $search: search };
    }

    // Build sort
    const sort = {};
    if (sortBy === "rating") {
      sort.averageRating = sortOrder === "desc" ? -1 : 1;
    } else {
      sort[sortBy] = sortOrder === "desc" ? -1 : 1;
    }

    const pageNum = parseInt(page);
    const limitNum = parseInt(limit);
    const skip = (pageNum - 1) * limitNum;

    const [recipes, total] = await Promise.all([
      Recipe.find(filter)
        .sort(sort)
        .skip(skip)
        .limit(limitNum)
        .populate("createdBy", "username avatar"),
      Recipe.countDocuments(filter),
    ]);

    res.status(200).json({
      success: true,
      message: "Recipes retrieved successfully",
      data: {
        recipes,
        pagination: {
          currentPage: pageNum,
          totalPages: Math.ceil(total / limitNum),
          totalItems: total,
          itemsPerPage: limitNum,
        },
      },
    });
  } catch (error) {
    console.error("Error fetching recipes:", error);
    res.status(500).json({
      success: false,
      message: "Server error while fetching recipes",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

// Get single recipe by ID
export const getRecipeById = async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id).populate(
      "createdBy",
      "username avatar",
    );

    if (!recipe) {
      return res.status(404).json({
        success: false,
        message: "Recipe not found",
      });
    }

    // Check if recipe is private and user is not the creator
    if (
      !recipe.isPublic &&
      (!req.userId || recipe.createdBy._id.toString() !== req.userId)
    ) {
      return res.status(403).json({
        success: false,
        message: "You don't have permission to view this recipe",
      });
    }

    res.status(200).json({
      success: true,
      message: "Recipe retrieved successfully",
      data: recipe,
    });
  } catch (error) {
    console.error("Error fetching recipe:", error);
    res.status(500).json({
      success: false,
      message: "Server error while fetching recipe",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

// Create new recipe
export const createRecipe = async (req, res) => {
  try {
    const recipeData = {
      ...req.body,
      createdBy: req.userId,
    };

    const newRecipe = await Recipe.create(recipeData);

    res.status(201).json({
      success: true,
      message: "Recipe created successfully",
      data: newRecipe,
    });
  } catch (error) {
    console.error("Error creating recipe:", error);
    res.status(500).json({
      success: false,
      message: "Server error while creating recipe",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

// Update recipe
export const updateRecipe = async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id);

    if (!recipe) {
      return res.status(404).json({
        success: false,
        message: "Recipe not found",
      });
    }

    // Check if user is the creator
    if (recipe.createdBy.toString() !== req.userId) {
      return res.status(403).json({
        success: false,
        message: "You don't have permission to update this recipe",
      });
    }

    const updatedRecipe = await Recipe.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      },
    );

    res.status(200).json({
      success: true,
      message: "Recipe updated successfully",
      data: updatedRecipe,
    });
  } catch (error) {
    console.error("Error updating recipe:", error);
    res.status(500).json({
      success: false,
      message: "Server error while updating recipe",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

// Delete recipe
export const deleteRecipe = async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id);

    if (!recipe) {
      return res.status(404).json({
        success: false,
        message: "Recipe not found",
      });
    }

    // Check if user is the creator
    if (recipe.createdBy.toString() !== req.userId) {
      return res.status(403).json({
        success: false,
        message: "You don't have permission to delete this recipe",
      });
    }

    await recipe.deleteOne();

    res.status(200).json({
      success: true,
      message: "Recipe deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting recipe:", error);
    res.status(500).json({
      success: false,
      message: "Server error while deleting recipe",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

// Add recipe to wishlist
export const addToWishlist = async (req, res) => {
  try {
    const { recipeId } = req.body;
    const userId = req.userId;

    // Check if recipe exists
    const recipe = await Recipe.findById(recipeId);
    if (!recipe) {
      return res.status(404).json({
        success: false,
        message: "Recipe not found",
      });
    }

    // Check if already in wishlist
    const user = await User.findById(userId);
    const existingWishlistItem = user.wishlist.find(
      (item) => item.recipeId.toString() === recipeId,
    );

    if (existingWishlistItem) {
      return res.status(400).json({
        success: false,
        message: "Recipe already in wishlist",
      });
    }

    // Add to wishlist
    user.wishlist.push({
      recipeId,
      addedAt: new Date(),
    });

    await user.save();

    res.status(200).json({
      success: true,
      message: "Recipe added to wishlist",
      data: {
        wishlist: user.wishlist,
      },
    });
  } catch (error) {
    console.error("Error adding to wishlist:", error);
    res.status(500).json({
      success: false,
      message: "Server error while adding to wishlist",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

// Remove recipe from wishlist
export const removeFromWishlist = async (req, res) => {
  try {
    const { recipeId } = req.params;
    const userId = req.userId;

    const user = await User.findById(userId);
    const wishlistItemIndex = user.wishlist.findIndex(
      (item) => item.recipeId.toString() === recipeId,
    );

    if (wishlistItemIndex === -1) {
      return res.status(404).json({
        success: false,
        message: "Recipe not found in wishlist",
      });
    }

    user.wishlist.splice(wishlistItemIndex, 1);
    await user.save();

    res.status(200).json({
      success: true,
      message: "Recipe removed from wishlist",
      data: {
        wishlist: user.wishlist,
      },
    });
  } catch (error) {
    console.error("Error removing from wishlist:", error);
    res.status(500).json({
      success: false,
      message: "Server error while removing from wishlist",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

// Get user's wishlist
export const getWishlist = async (req, res) => {
  try {
    const user = await User.findById(req.userId).populate(
      "wishlist.recipeId",
      "strMeal strMealThumb strCategory strArea averageRating",
    );

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Wishlist retrieved successfully",
      data: user.wishlist,
    });
  } catch (error) {
    console.error("Error fetching wishlist:", error);
    res.status(500).json({
      success: false,
      message: "Server error while fetching wishlist",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

// Rate a recipe
export const rateRecipe = async (req, res) => {
  try {
    const { recipeId } = req.params;
    const { rating } = req.body;
    const userId = req.userId;

    // Validate rating
    if (!rating || rating < 1 || rating > 5) {
      return res.status(400).json({
        success: false,
        message: "Rating must be between 1 and 5",
      });
    }

    // Check if recipe exists
    const recipe = await Recipe.findById(recipeId);
    if (!recipe) {
      return res.status(404).json({
        success: false,
        message: "Recipe not found",
      });
    }

    // Find user
    const user = await User.findById(userId);
    const existingRatingIndex = user.ratings.findIndex(
      (r) => r.recipeId.toString() === recipeId,
    );

    if (existingRatingIndex !== -1) {
      // Update existing rating
      user.ratings[existingRatingIndex].rating = rating;
      user.ratings[existingRatingIndex].ratedAt = new Date();
    } else {
      // Add new rating
      user.ratings.push({
        recipeId,
        rating,
        ratedAt: new Date(),
      });
    }

    await user.save();

    // Update recipe's average rating
    const allRatings = await User.aggregate([
      { $unwind: "$ratings" },
      { $match: { "ratings.recipeId": recipe._id } },
      {
        $group: {
          _id: null,
          average: { $avg: "$ratings.rating" },
          count: { $sum: 1 },
        },
      },
    ]);

    if (allRatings.length > 0) {
      recipe.averageRating = Math.round(allRatings[0].average * 10) / 10;
      recipe.totalRatings = allRatings[0].count;
    } else {
      recipe.averageRating = 0;
      recipe.totalRatings = 0;
    }

    await recipe.save();

    res.status(200).json({
      success: true,
      message: "Recipe rated successfully",
      data: {
        averageRating: recipe.averageRating,
        totalRatings: recipe.totalRatings,
      },
    });
  } catch (error) {
    console.error("Error rating recipe:", error);
    res.status(500).json({
      success: false,
      message: "Server error while rating recipe",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

// Get user's rating for a recipe
export const getUserRating = async (req, res) => {
  try {
    const { recipeId } = req.params;
    const userId = req.userId;

    const user = await User.findById(userId);
    const rating = user.ratings.find((r) => r.recipeId.toString() === recipeId);

    res.status(200).json({
      success: true,
      data: {
        rating: rating ? rating.rating : null,
        ratedAt: rating ? rating.ratedAt : null,
      },
    });
  } catch (error) {
    console.error("Error fetching user rating:", error);
    res.status(500).json({
      success: false,
      message: "Server error while fetching user rating",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

// Get recipe statistics
export const getRecipeStats = async (req, res) => {
  try {
    const { id } = req.params;

    const recipe = await Recipe.findById(id);
    if (!recipe) {
      return res.status(404).json({
        success: false,
        message: "Recipe not found",
      });
    }

    // Get users who have this recipe in wishlist
    const wishlistUsers = await User.countDocuments({
      "wishlist.recipeId": id,
    });

    // Get users who rated this recipe
    const ratingUsers = await User.countDocuments({
      "ratings.recipeId": id,
    });

    res.status(200).json({
      success: true,
      data: {
        totalWishlists: wishlistUsers,
        totalRatings: recipe.totalRatings,
        averageRating: recipe.averageRating,
        viewCount: recipe.viewCount || 0,
      },
    });
  } catch (error) {
    console.error("Error fetching recipe stats:", error);
    res.status(500).json({
      success: false,
      message: "Server error while fetching recipe stats",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};
