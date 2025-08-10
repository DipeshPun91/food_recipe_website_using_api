import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  FaYoutube,
  FaUtensils,
  FaGlobeAmericas,
  FaArrowLeft,
  FaHeart,
  FaClock,
  FaUserFriends,
} from "react-icons/fa";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const RecipeDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
        );
        const data = await response.json();

        if (data.meals && data.meals.length > 0) {
          setRecipe(data.meals[0]);
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

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <Skeleton width={100} height={24} />
        </div>
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="p-6">
            <div className="flex flex-col md:flex-row gap-6 mb-8">
              <Skeleton height={240} width={240} className="rounded-lg" />
              <div className="flex-1">
                <Skeleton height={32} width="70%" className="mb-4" />
                <div className="flex gap-3 mb-4">
                  <Skeleton width={80} height={24} />
                  <Skeleton width={80} height={24} />
                </div>
                <div className="flex flex-wrap gap-4 mb-4">
                  <Skeleton width={100} height={20} />
                  <Skeleton width={100} height={20} />
                </div>
                <Skeleton width={150} height={36} />
              </div>
            </div>
            <Skeleton height={24} width="30%" className="mb-3" />
            <div className="grid grid-cols-2 gap-3 mb-6">
              {[...Array(8)].map((_, i) => (
                <Skeleton key={i} height={20} />
              ))}
            </div>
            <Skeleton height={24} width="30%" className="mb-3" />
            {[...Array(5)].map((_, i) => (
              <Skeleton key={i} height={16} className="mb-2" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded-lg">
          <div className="flex items-start">
            <div className="flex-shrink-0 pt-0.5">
              <svg
                className="h-6 w-6 text-red-500"
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
              <h3 className="text-lg font-medium text-red-800">
                Error loading recipe
              </h3>
              <p className="text-gray-700 mt-2">{error}</p>
              <button
                onClick={() => navigate(-1)}
                className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
              >
                <FaArrowLeft className="mr-2" />
                Back to Recipes
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!recipe) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center py-12">
          <h3 className="text-xl font-medium text-gray-900 mb-4">
            Recipe not found
          </h3>
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
          >
            <FaArrowLeft className="mr-2" />
            Back to Recipes
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center text-green-600 hover:text-green-700 mb-6 transition-colors"
      >
        <FaArrowLeft className="mr-2" />
        Back to Recipes
      </button>

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="p-6">
          {/* Header Section - Horizontal Layout */}
          <div className="flex flex-col md:flex-row gap-6 mb-8">
            <div className="relative w-full md:w-64 h-64 flex-shrink-0">
              <img
                src={recipe.strMealThumb}
                alt={recipe.strMeal}
                className="w-full h-full object-cover rounded-lg"
                onError={(e) => {
                  e.target.src =
                    "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80";
                  e.target.className = "w-full h-full object-cover rounded-lg";
                }}
              />
            </div>

            <div className="flex-1">
              <h1 className="text-2xl font-bold text-gray-900 mb-2">
                {recipe.strMeal}
              </h1>

              <div className="flex flex-wrap gap-2 mb-3">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-50 text-green-700">
                  <FaUtensils className="mr-1.5" />
                  {recipe.strCategory}
                </span>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-50 text-amber-700">
                  <FaGlobeAmericas className="mr-1.5" />
                  {recipe.strArea}
                </span>
              </div>

              <div className="flex flex-wrap gap-4 mb-4">
                <div className="flex items-center text-sm text-gray-600">
                  <FaClock className="mr-1.5 text-green-600" />
                  <span>30 mins</span>
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <FaUserFriends className="mr-1.5 text-green-600" />
                  <span>4 servings</span>
                </div>
              </div>

              {recipe.strYoutube && (
                <a
                  href={recipe.strYoutube}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                >
                  <FaYoutube className="mr-2" />
                  Watch on YouTube
                </a>
              )}
            </div>
          </div>

          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-3 pb-2 border-b border-gray-100">
              Ingredients
            </h2>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {Array.from({ length: 20 }).map((_, i) => {
                const ingredient = recipe[`strIngredient${i + 1}`];
                const measure = recipe[`strMeasure${i + 1}`];
                if (ingredient && ingredient.trim() !== "") {
                  return (
                    <li key={i} className="flex items-start text-sm">
                      <span className="inline-flex items-center justify-center h-5 w-5 rounded-full bg-green-100 text-green-800 text-xs mr-2 mt-0.5 flex-shrink-0">
                        {i + 1}
                      </span>
                      <span className="text-gray-700">
                        <span className="font-medium">{measure}</span>{" "}
                        {ingredient}
                      </span>
                    </li>
                  );
                }
                return null;
              })}
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-3 pb-2 border-b border-gray-100">
              Instructions
            </h2>
            <div className="prose prose-sm max-w-none text-gray-700">
              {recipe.strInstructions
                .split("\r\n")
                .filter((para) => para.trim() !== "")
                .map((paragraph, i) => (
                  <div key={i} className="mb-4">
                    <h3 className="text-base font-medium text-gray-900 mb-1">
                      Step {i + 1}
                    </h3>
                    <p className="text-gray-700 leading-relaxed">{paragraph}</p>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeDetail;
