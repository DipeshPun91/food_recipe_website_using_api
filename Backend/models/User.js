import mongoose from "mongoose";

const { Schema } = mongoose;

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: [true, "Username is required"],
      trim: true,
      minlength: [3, "Username must be at least 3 characters long"],
      maxlength: [50, "Username cannot exceed 50 characters"],
      unique: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      trim: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, "Please enter a valid email address"],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [6, "Password must be at least 6 characters long"],
      select: false,
    },
    avatar: {
      type: String,
      default: null,
    },
    wishlist: [
      {
        recipeId: {
          type: Schema.Types.ObjectId,
          ref: "Recipe",
        },
        addedAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
    ratings: [
      {
        recipeId: {
          type: Schema.Types.ObjectId,
          ref: "Recipe",
        },
        rating: {
          type: Number,
          min: 1,
          max: 5,
          required: true,
        },
        ratedAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
    favoriteRecipes: [
      {
        type: Schema.Types.ObjectId,
        ref: "Recipe",
      },
    ],
  },
  {
    timestamps: true,
  },
);

// Indexes for better performance
userSchema.index({ "wishlist.recipeId": 1 });
userSchema.index({ "ratings.recipeId": 1 });

export default mongoose.model("User", userSchema);
