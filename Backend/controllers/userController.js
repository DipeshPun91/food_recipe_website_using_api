import User from "../models/User.js";
import bcrypt from "bcrypt";

// Get all users (Admin only - consider adding admin check)
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find()
      .select("-password") // Exclude passwords
      .sort({ createdAt: -1 }); // Newest first

    res.status(200).json({
      success: true,
      message: "Users retrieved successfully",
      count: users.length,
      data: users,
    });
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({
      success: false,
      message: "Server error while fetching users",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

// Get single user by ID
export const getUserById = async (req, res) => {
  try {
    const { id } = req.params;

    // Check if user exists
    const user = await User.findById(id)
      .select("-password")
      .populate("wishlist.recipeId", "strMeal strMealThumb strCategory strArea")
      .populate("favoriteRecipes", "strMeal strMealThumb strCategory strArea");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Check if requesting user is the same or admin
    if (req.userId !== id && !req.user?.isAdmin) {
      return res.status(403).json({
        success: false,
        message: "You don't have permission to view this user's profile",
      });
    }

    res.status(200).json({
      success: true,
      message: "User retrieved successfully",
      data: user,
    });
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({
      success: false,
      message: "Server error while fetching user",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

// Get user's recipes
export const getUserRecipes = async (req, res) => {
  try {
    const { id } = req.params;

    if (req.userId !== id) {
      return res.status(403).json({
        success: false,
        message: "You can only view your own recipes",
      });
    }

    const recipes = await (await import("../models/Recipe.js")).default
      .find({ createdBy: id })
      .populate("createdBy", "username avatar");

    res.status(200).json({
      success: true,
      message: "User recipes retrieved successfully",
      count: recipes.length,
      data: recipes,
    });
  } catch (error) {
    console.error("Error fetching user recipes:", error);
    res.status(500).json({
      success: false,
      message: "Server error while fetching user recipes",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

// Update user profile
export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { username, email, avatar } = req.body;

    // Check if user exists
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Check if user is updating their own profile
    if (req.userId !== id) {
      return res.status(403).json({
        success: false,
        message: "You can only update your own profile",
      });
    }

    // Check for duplicate username or email (excluding current user)
    const existingUser = await User.findOne({
      _id: { $ne: id },
      $or: [{ email }, { username }],
    });

    if (existingUser) {
      if (existingUser.email === email) {
        return res.status(409).json({
          success: false,
          message: "Email already exists",
        });
      }
      if (existingUser.username === username) {
        return res.status(409).json({
          success: false,
          message: "Username already exists",
        });
      }
    }

    // Update user
    const updatedUser = await User.findByIdAndUpdate(
      id,
      {
        username,
        email,
        avatar,
      },
      {
        new: true,
        runValidators: true,
        context: "query",
      },
    ).select("-password");

    res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      data: updatedUser,
    });
  } catch (error) {
    console.error("Error updating user:", error);

    if (error.name === "ValidationError") {
      const errors = Object.values(error.errors).map((err) => err.message);
      return res.status(400).json({
        success: false,
        message: "Validation error",
        errors,
      });
    }

    if (error.name === "CastError") {
      return res.status(400).json({
        success: false,
        message: "Invalid user ID format",
      });
    }

    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

// Change password
export const changePassword = async (req, res) => {
  try {
    const { id } = req.params;
    const { currentPassword, newPassword } = req.body;

    // Validate input
    if (!currentPassword || !newPassword) {
      return res.status(400).json({
        success: false,
        message: "Current password and new password are required",
      });
    }

    // Check if user is changing their own password
    if (req.userId !== id) {
      return res.status(403).json({
        success: false,
        message: "You can only change your own password",
      });
    }

    // Check if user exists
    const user = await User.findById(id).select("+password");
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Verify current password
    const isPasswordValid = await bcrypt.compare(
      currentPassword,
      user.password,
    );
    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: "Current password is incorrect",
      });
    }

    // Validate new password strength
    if (newPassword.length < 6) {
      return res.status(400).json({
        success: false,
        message: "New password must be at least 6 characters long",
      });
    }

    // Hash new password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    // Update password
    user.password = hashedPassword;
    await user.save();

    // Clear all sessions (optional - requires token blacklist)
    // This would invalidate all existing JWT tokens

    res.status(200).json({
      success: true,
      message: "Password updated successfully. Please login again.",
    });
  } catch (error) {
    console.error("Error changing password:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

// Delete account
export const deleteAccount = async (req, res) => {
  try {
    const { id } = req.params;
    const { password } = req.body;

    // Validate input
    if (!password) {
      return res.status(400).json({
        success: false,
        message: "Password is required to delete account",
      });
    }

    // Check if user is deleting their own account
    if (req.userId !== id) {
      return res.status(403).json({
        success: false,
        message: "You can only delete your own account",
      });
    }

    // Check if user exists
    const user = await User.findById(id).select("+password");
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Verify password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: "Password is incorrect",
      });
    }

    // Delete user account
    await User.findByIdAndDelete(id);

    // Clear authentication cookie
    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });

    res.status(200).json({
      success: true,
      message: "Account deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting account:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

// Get user's wishlist
export const getUserWishlist = async (req, res) => {
  try {
    const { id } = req.params;

    // Check if user is requesting their own wishlist
    if (req.userId !== id) {
      return res.status(403).json({
        success: false,
        message: "You can only view your own wishlist",
      });
    }

    const user = await User.findById(id).populate(
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
      count: user.wishlist.length,
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

// Get user's ratings
export const getUserRatings = async (req, res) => {
  try {
    const { id } = req.params;

    // Check if user is requesting their own ratings
    if (req.userId !== id) {
      return res.status(403).json({
        success: false,
        message: "You can only view your own ratings",
      });
    }

    const user = await User.findById(id).populate(
      "ratings.recipeId",
      "strMeal strMealThumb strCategory strArea",
    );

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Ratings retrieved successfully",
      count: user.ratings.length,
      data: user.ratings,
    });
  } catch (error) {
    console.error("Error fetching ratings:", error);
    res.status(500).json({
      success: false,
      message: "Server error while fetching ratings",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

// Upload/update avatar
export const updateAvatar = async (req, res) => {
  try {
    const { id } = req.params;
    const { avatar } = req.body;

    if (!avatar) {
      return res.status(400).json({
        success: false,
        message: "Avatar URL is required",
      });
    }

    // Check if user exists
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Check if user is updating their own avatar
    if (req.userId !== id) {
      return res.status(403).json({
        success: false,
        message: "You can only update your own avatar",
      });
    }

    // Update avatar
    user.avatar = avatar;
    await user.save();

    res.status(200).json({
      success: true,
      message: "Avatar updated successfully",
      data: {
        avatar: user.avatar,
      },
    });
  } catch (error) {
    console.error("Error updating avatar:", error);
    res.status(500).json({
      success: false,
      message: "Server error while updating avatar",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

// Get user statistics
export const getUserStats = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Get recipe count (if user created recipes)
    const Recipe = (await import("../models/Recipe.js")).default;
    const recipesCreated = await Recipe.countDocuments({ createdBy: id });

    res.status(200).json({
      success: true,
      data: {
        wishlistCount: user.wishlist.length,
        ratingsCount: user.ratings.length,
        recipesCreated,
        memberSince: user.createdAt,
        lastActive: user.updatedAt,
      },
    });
  } catch (error) {
    console.error("Error fetching user stats:", error);
    res.status(500).json({
      success: false,
      message: "Server error while fetching user stats",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};
