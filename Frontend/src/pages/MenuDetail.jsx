import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  FaYoutube,
  FaUtensils,
  FaGlobeAmericas,
  FaArrowLeft,
  FaUserFriends,
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
  FaHeart,
  FaRegHeart,
} from "react-icons/fa";
import Loading from "../component/ui/loading";
import { apiRequest } from "../services/api";
import { AuthContext } from "../context/AuthContext";

const mono = { fontFamily: "'JetBrains Mono', monospace" };
const serif = { fontFamily: "'Fraunces', serif", fontWeight: 600 };

const MenuDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { currentUser } = useContext(AuthContext);

  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isInWishlist, setIsInWishlist] = useState(false);
  const [userRating, setUserRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [showShareTooltip, setShowShareTooltip] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [checkedIngredients, setCheckedIngredients] = useState({});
  const [recipeStats, setRecipeStats] = useState(null);

  // Fetch recipe data from backend
  useEffect(() => {
    const fetchRecipeData = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await apiRequest.get(`/recipes/${id}`);

        if (response.data?.success && response.data?.data) {
          setRecipe(response.data.data);

          if (currentUser) {
            try {
              const wishlistResponse = await apiRequest.get(
                `/users/${currentUser._id}/wishlist`,
              );
              if (wishlistResponse.data?.success) {
                const inWishlist = wishlistResponse.data.data.some(
                  (item) => item.recipeId?._id === response.data.data._id,
                );
                setIsInWishlist(inWishlist);
              }
            } catch (wishlistErr) {
              console.error("Error checking wishlist:", wishlistErr);
            }

            try {
              const ratingResponse = await apiRequest.get(
                `/recipes/${id}/rating`,
              );
              if (
                ratingResponse.data?.success &&
                ratingResponse.data.data?.rating
              ) {
                setUserRating(ratingResponse.data.data.rating);
              }
            } catch (ratingErr) {
              console.error("Error fetching user rating:", ratingErr);
            }
          }

          try {
            const statsResponse = await apiRequest.get(`/recipes/${id}/stats`);
            if (statsResponse.data?.success) {
              setRecipeStats(statsResponse.data.data);
            }
          } catch (statsErr) {
            console.error("Error fetching recipe stats:", statsErr);
          }
        } else {
          setError("Recipe not found");
        }
      } catch (err) {
        console.error("Error fetching recipe:", err);
        if (err.response?.status === 404) {
          setError("Recipe not found");
        } else if (err.response?.status === 403) {
          setError("You don't have permission to view this recipe");
        } else {
          setError(
            err.response?.data?.message ||
              "Failed to load recipe. Please try again later.",
          );
        }
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchRecipeData();
    }
  }, [id, currentUser]);

  // Handle save/unsave recipe
  const handleSaveRecipe = async () => {
    if (!currentUser) {
      navigate("/login");
      return;
    }

    try {
      if (isInWishlist) {
        await apiRequest.delete(`/recipes/wishlist/${id}`);
        setIsInWishlist(false);
      } else {
        await apiRequest.post("/recipes/wishlist", { recipeId: id });
        setIsInWishlist(true);
      }
    } catch (err) {
      console.error("Error updating wishlist:", err);
      setError(err.response?.data?.message || "Failed to update wishlist");
    }
  };

  // Handle rating
  const handleRating = async (newRating) => {
    if (!currentUser) {
      navigate("/login");
      return;
    }

    try {
      await apiRequest.post(`/recipes/${id}/rate`, { rating: newRating });
      setUserRating(newRating);

      const statsResponse = await apiRequest.get(`/recipes/${id}/stats`);
      if (statsResponse.data?.success) {
        setRecipeStats(statsResponse.data.data);
      }
    } catch (err) {
      console.error("Error rating recipe:", err);
      setError(err.response?.data?.message || "Failed to rate recipe");
    }
  };

  // Handle share
  const handleShare = async () => {
    if (!recipe) return;

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

  // Handle print
  const handlePrint = () => {
    window.print();
  };

  // Toggle ingredient checked state
  const toggleIngredient = (index) => {
    setCheckedIngredients((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  // Get ingredients list
  const getIngredientsList = () => {
    if (!recipe) return [];

    if (recipe.strIngredients && Array.isArray(recipe.strIngredients)) {
      return recipe.strIngredients;
    }

    const ingredients = [];
    for (let i = 1; i <= 20; i++) {
      const ingredient = recipe[`strIngredient${i}`];
      const measure = recipe[`strMeasure${i}`];
      if (ingredient && ingredient.trim() !== "") {
        ingredients.push({
          ingredient: ingredient.trim(),
          measure: measure ? measure.trim() : "",
        });
      }
    }
    return ingredients;
  };

  // Get instructions steps - FIXED for proper sequential numbering
  const getInstructionsSteps = () => {
    if (!recipe) return [];

    if (typeof recipe.strInstructions !== "string") {
      return [];
    }

    let instructions = recipe.strInstructions;

    // Replace literal \n with actual newlines
    instructions = instructions.replace(/\\n/g, "\n");

    // Split by newlines and filter empty lines
    const rawSteps = instructions
      .split(/\r?\n/)
      .filter((step) => step.trim() !== "")
      .map((step) => step.trim());

    if (rawSteps.length === 0) {
      return [{ number: 1, text: instructions.trim(), isSection: false }];
    }

    const result = [];
    let stepCounter = 1;
    let currentSection = "";

    for (let i = 0; i < rawSteps.length; i++) {
      const step = rawSteps[i];

      // Check if this is a section header (ends with colon and doesn't start with a number)
      if (step.match(/^[A-Za-z\s]+:$/) && !step.match(/^\d+\./)) {
        // Add the section header
        currentSection = step;
        result.push({
          type: "section",
          text: step,
          number: null,
        });
        // Reset step counter for this section
        stepCounter = 1;
      } else {
        // Remove existing numbering
        const cleanStep = step.replace(/^\d+\.\s*/, "");

        result.push({
          type: "step",
          text: cleanStep,
          number: stepCounter,
          section: currentSection,
        });
        stepCounter++;
      }
    }

    return result;
  };

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#FAF3E7] flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-[#FFFBF3] border border-[#E4D9C5] rounded-sm shadow-xl p-8 text-center">
          <div className="w-16 h-16 rounded-full border-2 border-dashed border-[#C1440E]/50 flex items-center justify-center mx-auto mb-6 text-[#C1440E]">
            <FaExclamationTriangle className="h-8 w-8" />
          </div>
          <h3 className="text-2xl text-[#2B2420] mb-3" style={serif}>
            Error loading recipe
          </h3>
          <p className="text-[#2B2420]/60 mb-8">{error}</p>
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center px-6 py-3 bg-[#C1440E] hover:bg-[#a3390b] text-[#FAF3E7] rounded-sm shadow-[3px_3px_0_0_#2B2420] transition-all"
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
      <div className="min-h-screen bg-[#FAF3E7] flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-[#FFFBF3] border border-[#E4D9C5] rounded-sm shadow-xl p-8 text-center">
          <div className="w-16 h-16 rounded-full border-2 border-dashed border-[#2B2420]/20 flex items-center justify-center mx-auto mb-6 text-[#2B2420]/40">
            <FaInfoCircle className="h-8 w-8" />
          </div>
          <h3 className="text-2xl text-[#2B2420] mb-3" style={serif}>
            Recipe not found
          </h3>
          <p className="text-[#2B2420]/60 mb-8">
            The recipe you're looking for doesn't exist or has been removed.
          </p>
          <button
            onClick={() => navigate("/menu")}
            className="inline-flex items-center px-6 py-3 bg-[#C1440E] hover:bg-[#a3390b] text-[#FAF3E7] rounded-sm shadow-[3px_3px_0_0_#2B2420] transition-all"
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
  const displayRating =
    userRating > 0 ? userRating : recipeStats?.averageRating || 0;

  return (
    <div className="min-h-screen bg-[#FAF3E7]">
      {/* Header Navigation */}
      <div className="sticky top-0 z-10 bg-[#FAF3E7]/90 backdrop-blur-md border-b border-[#E4D9C5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => navigate(-1)}
              className="flex items-center text-[#2B2420]/70 hover:text-[#2B2420] transition-colors group"
            >
              <FaArrowLeft className="mr-2 group-hover:-translate-x-1 transition-transform" />
              <span className="font-medium">Back</span>
            </button>
            <div className="flex gap-2">
              <button
                onClick={handleSaveRecipe}
                className="p-2 rounded-sm hover:bg-[#FFFBF3] border border-transparent hover:border-[#E4D9C5] transition-all"
                aria-label={isInWishlist ? "Remove from saved" : "Save recipe"}
              >
                {isInWishlist ? (
                  <FaHeart className="h-5 w-5 text-[#C1440E]" />
                ) : (
                  <FaRegHeart className="h-5 w-5 text-[#2B2420]/60" />
                )}
              </button>
              <button
                onClick={handleShare}
                className="p-2 rounded-sm hover:bg-[#FFFBF3] border border-transparent hover:border-[#E4D9C5] transition-all relative"
                aria-label="Share recipe"
              >
                <FaShare className="h-5 w-5 text-[#2B2420]/60" />
                {showShareTooltip && (
                  <span
                    className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-[#2B2420] text-[#FAF3E7] text-xs rounded-sm whitespace-nowrap"
                    style={mono}
                  >
                    Link copied!
                  </span>
                )}
              </button>
              <button
                onClick={handlePrint}
                className="p-2 rounded-sm hover:bg-[#FFFBF3] border border-transparent hover:border-[#E4D9C5] transition-all"
                aria-label="Print recipe"
              >
                <FaPrint className="h-5 w-5 text-[#2B2420]/60" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        {/* Hero Section */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 mb-12">
          {/* Image Container */}
          <div className="relative">
            <div className="relative rounded-sm overflow-hidden border border-[#E4D9C5] shadow-lg bg-[#FFFBF3]">
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
                  <div className="w-10 h-10 border-2 border-[#C1440E] border-t-transparent rounded-full animate-spin"></div>
                </div>
              )}

              <div className="absolute top-4 left-4 flex gap-2">
                <span
                  className="px-3 py-1 bg-[#FFFBF3]/95 rounded-sm text-sm font-semibold text-[#2B2420] shadow-sm border border-[#E4D9C5]"
                  style={mono}
                >
                  ⭐ {displayRating > 0 ? displayRating.toFixed(1) : "N/A"} / 5
                </span>
                {recipeStats && (
                  <span
                    className="px-3 py-1 bg-[#FFFBF3]/95 rounded-sm text-sm font-semibold text-[#2B2420] shadow-sm border border-[#E4D9C5]"
                    style={mono}
                  >
                    {recipeStats.totalRatings || 0} reviews
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Recipe Info */}
          <div className="space-y-6">
            <div>
              <div className="flex flex-wrap gap-2 mb-4">
                <span
                  className="inline-flex items-center px-3 py-1 rounded-full text-xs bg-[#4B6B3A]/10 text-[#4B6B3A]"
                  style={mono}
                >
                  <FaUtensils className="mr-1.5 text-xs" />
                  {recipe.strCategory || "Other"}
                </span>
                <span
                  className="inline-flex items-center px-3 py-1 rounded-full text-xs bg-[#D9A441]/15 text-[#8a6417]"
                  style={mono}
                >
                  <FaGlobeAmericas className="mr-1.5 text-xs" />
                  {recipe.strArea || "International"}
                </span>
              </div>

              <h1
                className="text-4xl lg:text-5xl text-[#2B2420] mb-4 leading-tight"
                style={serif}
              >
                {recipe.strMeal}
              </h1>

              <p className="text-[#2B2420]/60 text-lg leading-relaxed">
                A delicious {recipe.strCategory?.toLowerCase()} dish from{" "}
                {recipe.strArea || "around the world"}, perfect for any
                occasion. Follow this authentic recipe to create an
                unforgettable meal.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4 pt-4">
              <div className="bg-[#FFFBF3] rounded-sm p-4 border border-[#E4D9C5]">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-[#C1440E]/10 rounded-sm flex items-center justify-center text-[#C1440E]">
                    <FaRegClock className="h-5 w-5" />
                  </div>
                  <div>
                    <p
                      className="text-[11px] tracking-[0.15em] text-[#2B2420]/50"
                      style={mono}
                    >
                      TOTAL TIME
                    </p>
                    <p className="text-xl font-semibold text-[#2B2420]">
                      60 mins
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-[#FFFBF3] rounded-sm p-4 border border-[#E4D9C5]">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-[#4B6B3A]/10 rounded-sm flex items-center justify-center text-[#4B6B3A]">
                    <FaUserFriends className="h-5 w-5" />
                  </div>
                  <div>
                    <p
                      className="text-[11px] tracking-[0.15em] text-[#2B2420]/50"
                      style={mono}
                    >
                      SERVINGS
                    </p>
                    <p className="text-xl font-semibold text-[#2B2420]">
                      4 people
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-[#FFFBF3] rounded-sm p-4 border border-[#E4D9C5]">
              <div className="flex items-center justify-between flex-wrap gap-4">
                <div className="flex items-center gap-2">
                  <span className="text-[#2B2420]/70 font-medium text-sm">
                    Rate this recipe:
                  </span>
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        onClick={() => handleRating(star)}
                        onMouseEnter={() => setHoveredRating(star)}
                        onMouseLeave={() => setHoveredRating(0)}
                        className="focus:outline-none transition-transform hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed"
                        disabled={!currentUser}
                      >
                        {star <= (hoveredRating || userRating) ? (
                          <FaStar className="h-5 w-5 text-[#D9A441]" />
                        ) : (
                          <FaRegStar className="h-5 w-5 text-[#E4D9C5]" />
                        )}
                      </button>
                    ))}
                  </div>
                </div>
                {userRating > 0 && (
                  <div className="flex items-center gap-1 text-[#4B6B3A]">
                    <FaCheckCircle className="h-4 w-4" />
                    <span className="text-sm font-medium">
                      Thanks for rating!
                    </span>
                  </div>
                )}
                {!currentUser && (
                  <button
                    onClick={() => navigate("/login")}
                    className="text-xs text-[#C1440E] hover:underline"
                  >
                    Sign in to rate
                  </button>
                )}
              </div>
            </div>

            {recipe.strYoutube && (
              <a
                href={recipe.strYoutube}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center w-full px-6 py-4 bg-[#C1440E] hover:bg-[#a3390b] text-[#FAF3E7] rounded-sm font-semibold shadow-[4px_4px_0_0_#2B2420] hover:shadow-[2px_2px_0_0_#2B2420] hover:translate-x-0.5 hover:translate-y-0.5 transition-all group"
              >
                <FaYoutube className="mr-3 h-6 w-6" />
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
                <h2
                  className="text-2xl text-[#2B2420] flex items-center gap-2"
                  style={serif}
                >
                  <span className="w-8 h-8 bg-[#C1440E] rounded-sm flex items-center justify-center">
                    <FaUtensils className="h-4 w-4 text-[#FAF3E7]" />
                  </span>
                  Ingredients
                </h2>
                {checkedCount > 0 && (
                  <span className="text-xs text-[#4B6B3A]" style={mono}>
                    {checkedCount}/{ingredients.length} CHECKED
                  </span>
                )}
              </div>

              <div className="bg-[#FFFBF3] rounded-sm border border-[#E4D9C5] overflow-hidden">
                <ul className="divide-y divide-[#E4D9C5]">
                  {ingredients.map((item, index) => (
                    <li
                      key={index}
                      className="group hover:bg-[#FAF3E7] transition-colors cursor-pointer"
                      onClick={() => toggleIngredient(index)}
                    >
                      <div className="flex items-center p-4">
                        <div className="flex-shrink-0 mr-3">
                          <div
                            className={`w-4 h-4 border flex items-center justify-center transition-all ${
                              checkedIngredients[index]
                                ? "bg-[#4B6B3A] border-[#4B6B3A]"
                                : "border-[#2B2420]/30 group-hover:border-[#4B6B3A]"
                            }`}
                          >
                            {checkedIngredients[index] && (
                              <FaCheckCircle className="h-2.5 w-2.5 text-[#FFFBF3]" />
                            )}
                          </div>
                        </div>
                        <div className="flex-1">
                          <span
                            className={`text-[#2B2420]/80 transition-all ${
                              checkedIngredients[index]
                                ? "line-through text-[#2B2420]/35"
                                : ""
                            }`}
                          >
                            <span className="font-semibold text-[#2B2420]">
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
              <h2
                className="text-2xl text-[#2B2420] flex items-center gap-2"
                style={serif}
              >
                <span className="w-8 h-8 bg-[#D9A441] rounded-sm flex items-center justify-center">
                  <FaFire className="h-4 w-4 text-[#2B2420]" />
                </span>
                Instructions
              </h2>
            </div>

            <div className="space-y-4">
              {instructions.map((item, index) => {
                if (item.type === "section") {
                  return (
                    <div
                      key={index}
                      className="bg-[#D9A441]/10 rounded-sm border-l-4 border-[#D9A441] p-4 mb-4"
                    >
                      <h3
                        className="text-lg font-semibold text-[#2B2420]"
                        style={serif}
                      >
                        {item.text}
                      </h3>
                    </div>
                  );
                }

                return (
                  <div
                    key={index}
                    className="bg-[#FFFBF3] rounded-sm border border-[#E4D9C5] hover:shadow-md transition-all p-6"
                  >
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0">
                        <div
                          className="w-9 h-9 rounded-sm bg-[#C1440E] text-[#FAF3E7] flex items-center justify-center font-bold text-sm"
                          style={mono}
                        >
                          {item.number}
                        </div>
                      </div>
                      <div className="flex-1">
                        {item.section && (
                          <span className="text-xs font-medium text-[#D9A441] block mb-1">
                            {item.section}
                          </span>
                        )}
                        <p className="text-[#2B2420]/80 leading-relaxed text-base">
                          {item.text}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Tips Section */}
        <div className="mt-12 p-6 bg-[#D9A441]/10 rounded-sm border border-[#D9A441]/30">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0">
              <div className="w-12 h-12 bg-[#D9A441] rounded-sm flex items-center justify-center">
                <FaInfoCircle className="h-6 w-6 text-[#2B2420]" />
              </div>
            </div>
            <div>
              <h3 className="text-lg text-[#2B2420] mb-2" style={serif}>
                Chef's Tip
              </h3>
              <p className="text-[#2B2420]/70 leading-relaxed">
                For best results, use fresh ingredients and follow the cooking
                times closely. Feel free to adjust seasoning according to your
                taste preferences. This recipe can be customized with your
                favorite vegetables or protein options.
              </p>
            </div>
          </div>
        </div>

        {/* Tags Section */}
        <div className="mt-8 pt-6 border-t border-[#E4D9C5]">
          <div className="flex flex-wrap items-center gap-3">
            <span className="text-xs text-[#2B2420]/50" style={mono}>
              TAGS:
            </span>
            <div className="flex flex-wrap gap-2">
              {[
                recipe.strCategory?.toLowerCase(),
                recipe.strArea?.toLowerCase(),
                "homemade",
                "easyrecipe",
                "delicious",
              ]
                .filter(Boolean)
                .map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1.5 bg-[#FFFBF3] hover:bg-[#E4D9C5] border border-[#E4D9C5] rounded-full text-sm text-[#2B2420]/70 transition-colors cursor-pointer"
                  >
                    #{tag}
                  </span>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MenuDetail;
