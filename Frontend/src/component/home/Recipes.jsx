import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaUtensils, FaGlobeAmericas, FaYoutube } from "react-icons/fa";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const Recipes = () => {
  const [foodItems, setFoodItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchChickenRecipes = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          "https://www.themealdb.com/api/json/v1/1/search.php?s=chicken",
        );
        const data = await response.json();

        if (data.meals) {
          setFoodItems(data.meals);
        } else {
          setFoodItems([]);
        }
      } catch (err) {
        console.error("Error fetching chicken recipes:", err);
        setError("Failed to load recipes. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchChickenRecipes();
  }, []);

  const handleRecipeClick = (recipe) => {
    navigate(`/recipes/${recipe.idMeal}`);
  };

  const handleYoutubeClick = (e, youtubeUrl) => {
    e.stopPropagation();
    window.open(youtubeUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-3">
            <span className="text-green-600">Chicken</span> Recipes
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Discover delicious chicken recipes from around the world
          </p>
        </div>

        {loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-xl shadow-sm border border-gray-100"
              >
                <Skeleton height={200} className="mb-4 rounded-lg" />
                <Skeleton count={3} />
              </div>
            ))}
          </div>
        )}

        {error && !loading && (
          <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-lg max-w-3xl mx-auto">
            <div className="flex items-start">
              <div className="flex-shrink-0 pt-0.5">
                <svg
                  className="h-5 w-5 text-red-500"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-red-800">
                  Error loading recipes
                </h3>
                <p className="text-sm text-red-700 mt-1">{error}</p>
              </div>
            </div>
          </div>
        )}

        {!loading && !error && foodItems.length === 0 && (
          <div className="text-center py-16 bg-white rounded-xl shadow-sm border border-gray-100 max-w-3xl mx-auto">
            <svg
              className="mx-auto h-16 w-16 text-gray-300"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <h3 className="mt-4 text-xl font-medium text-gray-900">
              No chicken recipes found
            </h3>
            <p className="mt-2 text-gray-600 max-w-md mx-auto">
              We couldn't find any chicken recipes at the moment. Please try
              again later.
            </p>
          </div>
        )}

        {!loading && !error && foodItems.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {foodItems.map((food) => (
              <div
                key={food.idMeal}
                className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden flex flex-col border border-gray-100 cursor-pointer group"
                onClick={() => handleRecipeClick(food)}
              >
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={food.strMealThumb}
                    alt={food.strMeal}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    onError={(e) => {
                      e.target.src =
                        "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80";
                      e.target.className = "w-full h-full object-cover";
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-5">
                    <h2 className="text-xl font-bold text-white line-clamp-2">
                      {food.strMeal}
                    </h2>
                  </div>
                </div>

                <div className="p-6 flex-1 flex flex-col">
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-50 text-green-700">
                      <FaUtensils className="mr-1.5" />
                      {food.strCategory}
                    </span>
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-amber-50 text-amber-700">
                      <FaGlobeAmericas className="mr-1.5" />
                      {food.strArea}
                    </span>
                  </div>

                  {food.strYoutube && (
                    <button
                      onClick={(e) => handleYoutubeClick(e, food.strYoutube)}
                      className="w-full mb-4 inline-flex items-center justify-center px-4 py-2.5 border border-transparent text-sm font-medium rounded-lg shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors"
                    >
                      <FaYoutube className="mr-2 text-lg" />
                      Watch on YouTube
                    </button>
                  )}

                  <div className="mt-auto">
                    <button
                      onClick={() => handleRecipeClick(food)}
                      className="w-full inline-flex items-center justify-center px-5 py-2.5 border border-transparent text-sm font-medium rounded-lg shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors"
                    >
                      View Recipe Details
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default Recipes;
