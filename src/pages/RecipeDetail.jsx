import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  FaYoutube,
  FaUtensils,
  FaGlobeAmericas,
  FaArrowLeft,
  FaUserFriends,
  FaRegBookmark,
  FaBookmark,
  FaShare,
  FaPrint,
  FaStar,
  FaRegStar,
  FaInfoCircle,
  FaExclamationTriangle,
  FaChevronRight,
  FaRegClock,
  FaFire,
  FaCheckCircle,
} from "react-icons/fa";
import Loading from "../component/ui/loading";

const RecipeDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isSaved, setIsSaved] = useState(false);
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [showShareTooltip, setShowShareTooltip] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [checkedIngredients, setCheckedIngredients] = useState({});

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`,
        );
        const data = await response.json();

        if (data.meals && data.meals.length > 0) {
          setRecipe(data.meals[0]);
          const savedRecipes = JSON.parse(
            localStorage.getItem("savedRecipes") || "[]",
          );
          setIsSaved(savedRecipes.includes(id));

          const savedChecked = localStorage.getItem(`checked_${id}`);
          if (savedChecked) {
            setCheckedIngredients(JSON.parse(savedChecked));
          }
        } else {
          setError("Recipe not found");
        }
      } catch (err) {
        console.error("Error fetching recipe:", err);
        setError("Failed to load recipe. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchRecipe();
  }, [id]);

  const handleSaveRecipe = () => {
    const savedRecipes = JSON.parse(
      localStorage.getItem("savedRecipes") || "[]",
    );
    let newSavedRecipes;

    if (isSaved) {
      newSavedRecipes = savedRecipes.filter((recipeId) => recipeId !== id);
    } else {
      newSavedRecipes = [...savedRecipes, id];
    }

    localStorage.setItem("savedRecipes", JSON.stringify(newSavedRecipes));
    setIsSaved(!isSaved);
  };

  const handleShare = async () => {
    const shareData = {
      title: recipe.strMeal,
      text: `Check out this delicious ${recipe.strMeal} recipe!`,
      url: window.location.href,
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(window.location.href);
        setShowShareTooltip(true);
        setTimeout(() => setShowShareTooltip(false), 2000);
      }
    } catch (err) {
      console.error("Error sharing:", err);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const handleRating = (newRating) => {
    setRating(newRating);
    localStorage.setItem(`rating_${id}`, newRating);
  };

  const toggleIngredient = (index) => {
    const newChecked = {
      ...checkedIngredients,
      [index]: !checkedIngredients[index],
    };
    setCheckedIngredients(newChecked);
    localStorage.setItem(`checked_${id}`, JSON.stringify(newChecked));
  };

  useEffect(() => {
    const savedRating = localStorage.getItem(`rating_${id}`);
    if (savedRating) {
      setRating(parseInt(savedRating));
    }
  }, [id]);

  const getIngredientsList = () => {
    const ingredients = [];
    for (let i = 1; i <= 20; i++) {
      const ingredient = recipe[`strIngredient${i}`];
      const measure = recipe[`strMeasure${i}`];
      if (ingredient && ingredient.trim() !== "") {
        ingredients.push({ ingredient, measure });
      }
    }
    return ingredients;
  };

  const getInstructionsSteps = () => {
    return recipe.strInstructions
      .split(/\r?\n/)
      .filter((para) => para.trim() !== "")
      .map((para) => para.replace(/^Step \d+:\s*/, "").trim());
  };

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center">
          <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <FaExclamationTriangle className="h-10 w-10 text-red-600" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-3">
            Error Loading Recipe
          </h3>
          <p className="text-gray-600 mb-8">{error}</p>
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center px-6 py-3 bg-red-600 text-white rounded-xl hover:bg-red-700 transition-all transform hover:scale-105 shadow-lg"
          >
            <FaArrowLeft className="mr-2" />
            Go Back
          </button>
        </div>
      </div>
    );
  }

  if (!recipe) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center">
          <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <FaInfoCircle className="h-10 w-10 text-gray-600" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-3">
            Recipe Not Found
          </h3>
          <p className="text-gray-600 mb-8">
            The recipe you're looking for doesn't exist or has been removed.
          </p>
          <button
            onClick={() => navigate("/")}
            className="inline-flex items-center px-6 py-3 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-all transform hover:scale-105 shadow-lg"
          >
            Browse Recipes
          </button>
        </div>
      </div>
    );
  }

  const ingredients = getIngredientsList();
  const instructions = getInstructionsSteps();
  const checkedCount = Object.values(checkedIngredients).filter(Boolean).length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50">
      {/* Header Navigation */}
      <div className="sticky top-0 z-10 bg-white/80 backdrop-blur-md border-b border-gray-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => navigate(-1)}
              className="flex items-center text-gray-600 hover:text-green-600 transition-colors group"
            >
              <FaArrowLeft className="mr-2 group-hover:-translate-x-1 transition-transform" />
              <span className="font-medium">Back</span>
            </button>
            <div className="flex gap-2">
              <button
                onClick={handleSaveRecipe}
                className="p-2 rounded-xl hover:bg-gray-100 transition-all"
                aria-label={isSaved ? "Remove from saved" : "Save recipe"}
              >
                {isSaved ? (
                  <FaBookmark className="h-5 w-5 text-green-600" />
                ) : (
                  <FaRegBookmark className="h-5 w-5 text-gray-600" />
                )}
              </button>
              <button
                onClick={handleShare}
                className="p-2 rounded-xl hover:bg-gray-100 transition-all relative"
                aria-label="Share recipe"
              >
                <FaShare className="h-5 w-5 text-gray-600" />
                {showShareTooltip && (
                  <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-900 text-white text-xs rounded whitespace-nowrap">
                    Link copied!
                  </span>
                )}
              </button>
              <button
                onClick={handlePrint}
                className="p-2 rounded-xl hover:bg-gray-100 transition-all"
                aria-label="Print recipe"
              >
                <FaPrint className="h-5 w-5 text-gray-600" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        {/* Hero Section */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 mb-12">
          {/* Image Container */}
          <div className="relative group">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl bg-gray-100">
              <div className="aspect-w-4 aspect-h-3">
                <img
                  src={recipe.strMealThumb}
                  alt={recipe.strMeal}
                  className={`w-full h-full object-cover transition-all duration-700 ${
                    imageLoaded
                      ? "scale-100 opacity-100"
                      : "scale-105 opacity-0"
                  }`}
                  onLoad={() => setImageLoaded(true)}
                  onError={(e) => {
                    e.target.src =
                      "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80";
                  }}
                />
              </div>
              {!imageLoaded && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-12 h-12 border-4 border-green-600 border-t-transparent rounded-full animate-spin"></div>
                </div>
              )}

              {/* Badge Overlay */}
              <div className="absolute top-4 left-4 flex gap-2">
                <span className="px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-sm font-semibold text-gray-900 shadow-lg">
                  ⭐ {rating > 0 ? rating.toFixed(1) : "4.5"} / 5
                </span>
              </div>
            </div>
          </div>

          {/* Recipe Info */}
          <div className="space-y-6">
            <div>
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold bg-gradient-to-r from-green-50 to-emerald-50 text-green-700 border border-green-100">
                  <FaUtensils className="mr-1.5 text-sm" />
                  {recipe.strCategory}
                </span>
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold bg-gradient-to-r from-amber-50 to-orange-50 text-amber-700 border border-amber-100">
                  <FaGlobeAmericas className="mr-1.5 text-sm" />
                  {recipe.strArea}
                </span>
              </div>

              <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4 leading-tight">
                {recipe.strMeal}
              </h1>

              <p className="text-gray-600 text-lg leading-relaxed">
                A delicious {recipe.strCategory?.toLowerCase()} dish from{" "}
                {recipe.strArea}, perfect for any occasion. Follow this
                authentic recipe to create an unforgettable meal.
              </p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-4 pt-4">
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-4 border border-green-100">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-green-600 rounded-xl flex items-center justify-center">
                    <FaRegClock className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 font-medium">
                      Total Time
                    </p>
                    <p className="text-xl font-bold text-gray-900">60 mins</p>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-4 border border-blue-100">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center">
                    <FaUserFriends className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 font-medium">
                      Servings
                    </p>
                    <p className="text-xl font-bold text-gray-900">4 people</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Rating */}
            <div className="bg-gray-50 rounded-2xl p-4">
              <div className="flex items-center justify-between flex-wrap gap-4">
                <div className="flex items-center gap-2">
                  <span className="text-gray-700 font-medium">
                    Rate this recipe:
                  </span>
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        onClick={() => handleRating(star)}
                        onMouseEnter={() => setHoveredRating(star)}
                        onMouseLeave={() => setHoveredRating(0)}
                        className="focus:outline-none transition-all hover:scale-110"
                      >
                        {star <= (hoveredRating || rating) ? (
                          <FaStar className="h-6 w-6 text-yellow-400" />
                        ) : (
                          <FaRegStar className="h-6 w-6 text-gray-300" />
                        )}
                      </button>
                    ))}
                  </div>
                </div>
                {rating > 0 && (
                  <div className="flex items-center gap-1 text-green-600">
                    <FaCheckCircle className="h-4 w-4" />
                    <span className="text-sm font-medium">
                      Thanks for rating!
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* YouTube Button */}
            {recipe.strYoutube && (
              <a
                href={recipe.strYoutube}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center w-full px-6 py-4 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-2xl font-semibold shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-0.5 group"
              >
                <FaYoutube className="mr-3 h-6 w-6 group-hover:scale-110 transition-transform" />
                Watch Video Tutorial
                <FaChevronRight className="ml-2 group-hover:translate-x-1 transition-transform" />
              </a>
            )}
          </div>
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Ingredients Section */}
          <div>
            <div className="lg:sticky lg:top-24">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                  <span className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center">
                    <FaUtensils className="h-4 w-4 text-white" />
                  </span>
                  Ingredients
                </h2>
                {checkedCount > 0 && (
                  <span className="text-sm text-green-600 font-medium">
                    {checkedCount}/{ingredients.length} checked
                  </span>
                )}
              </div>

              <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
                <ul className="divide-y divide-gray-100">
                  {ingredients.map((item, index) => (
                    <li
                      key={index}
                      className="group hover:bg-gray-50 transition-colors cursor-pointer"
                      onClick={() => toggleIngredient(index)}
                    >
                      <div className="flex items-center p-4">
                        <div className="flex-shrink-0 mr-3">
                          <div
                            className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-all ${
                              checkedIngredients[index]
                                ? "bg-green-600 border-green-600"
                                : "border-gray-300 group-hover:border-green-400"
                            }`}
                          >
                            {checkedIngredients[index] && (
                              <FaCheckCircle className="h-3 w-3 text-white" />
                            )}
                          </div>
                        </div>
                        <div className="flex-1">
                          <span
                            className={`text-gray-700 transition-all ${
                              checkedIngredients[index]
                                ? "line-through text-gray-400"
                                : ""
                            }`}
                          >
                            <span className="font-semibold text-gray-900">
                              {item.measure || "To taste"}
                            </span>
                            {item.measure && " "}
                            <span className="capitalize">
                              {item.ingredient}
                            </span>
                          </span>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Instructions Section */}
          <div>
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                <span className="w-8 h-8 bg-orange-600 rounded-lg flex items-center justify-center">
                  <FaFire className="h-4 w-4 text-white" />
                </span>
                Instructions
              </h2>
            </div>

            <div className="space-y-4">
              {instructions.map((step, index) => (
                <div
                  key={index}
                  className="group bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition-all p-6"
                >
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-green-600 to-emerald-600 text-white flex items-center justify-center font-bold text-lg shadow-md">
                        {index + 1}
                      </div>
                    </div>
                    <div className="flex-1">
                      <p className="text-gray-700 leading-relaxed text-base">
                        {step}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Tips Section */}
        <div className="mt-12 p-6 bg-gradient-to-r from-amber-50 to-yellow-50 rounded-2xl border border-amber-200">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0">
              <div className="w-12 h-12 bg-amber-600 rounded-xl flex items-center justify-center">
                <FaInfoCircle className="h-6 w-6 text-white" />
              </div>
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                Chef's Tip
              </h3>
              <p className="text-gray-700 leading-relaxed">
                For best results, use fresh ingredients and follow the cooking
                times closely. Feel free to adjust seasoning according to your
                taste preferences. This recipe can be customized with your
                favorite vegetables or protein options.
              </p>
            </div>
          </div>
        </div>

        {/* Tags Section */}
        <div className="mt-8 pt-6 border-t border-gray-200">
          <div className="flex flex-wrap items-center gap-3">
            <span className="text-sm font-semibold text-gray-500">Tags:</span>
            <div className="flex flex-wrap gap-2">
              <span className="px-3 py-1.5 bg-gray-100 hover:bg-gray-200 rounded-full text-sm text-gray-700 transition-colors cursor-pointer">
                #{recipe.strCategory?.toLowerCase()}
              </span>
              <span className="px-3 py-1.5 bg-gray-100 hover:bg-gray-200 rounded-full text-sm text-gray-700 transition-colors cursor-pointer">
                #{recipe.strArea?.toLowerCase()}
              </span>
              <span className="px-3 py-1.5 bg-gray-100 hover:bg-gray-200 rounded-full text-sm text-gray-700 transition-colors cursor-pointer">
                #homemade
              </span>
              <span className="px-3 py-1.5 bg-gray-100 hover:bg-gray-200 rounded-full text-sm text-gray-700 transition-colors cursor-pointer">
                #easyrecipe
              </span>
              <span className="px-3 py-1.5 bg-gray-100 hover:bg-gray-200 rounded-full text-sm text-gray-700 transition-colors cursor-pointer">
                #delicious
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeDetail;
