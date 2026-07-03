import mongoose from "mongoose";

const { Schema } = mongoose;

const recipeSchema = new Schema(
  {
    strMeal: {
      type: String,
      required: [true, "Recipe name is required"],
      trim: true,
      index: true,
    },
    strCategory: {
      type: String,
      required: [true, "Category is required"],
      trim: true,
      index: true,
    },
    strArea: {
      type: String,
      required: [true, "Cuisine area is required"],
      trim: true,
      index: true,
    },
    strInstructions: {
      type: String,
      required: [true, "Instructions are required"],
    },
    strMealThumb: {
      type: String,
      required: [true, "Image URL is required"],
    },
    strYoutube: {
      type: String,
      default: "",
    },
    strIngredients: [
      {
        ingredient: {
          type: String,
          required: true,
        },
        measure: {
          type: String,
          default: "",
        },
      },
    ],
    strTags: {
      type: String,
      default: "",
    },
    strSource: {
      type: String,
      default: "",
    },
    averageRating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },
    totalRatings: {
      type: Number,
      default: 0,
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    isPublic: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  },
);

// Text index for search
recipeSchema.index(
  { strMeal: "text", strCategory: "text", strArea: "text", strTags: "text" },
  {
    weights: {
      strMeal: 10,
      strCategory: 5,
      strArea: 3,
      strTags: 2,
    },
  },
);

// Compound indexes for common queries
recipeSchema.index({ strCategory: 1, strArea: 1 });
recipeSchema.index({ averageRating: -1 });
recipeSchema.index({ createdAt: -1 });

export default mongoose.model("Recipe", recipeSchema);
