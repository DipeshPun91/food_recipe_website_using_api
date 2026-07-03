import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import RecipeCard from "../ui/RecipeCard";

const mono = { fontFamily: "'JetBrains Mono', monospace" };
const serif = { fontFamily: "'Fraunces', serif", fontWeight: 600 };

const Popular = () => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPopularRecipes = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          "https://www.themealdb.com/api/json/v1/1/search.php?s=",
        );
        const data = await response.json();
        if (data.meals) {
          setRecipes(data.meals.slice(0, 9));
        }
      } catch (err) {
        console.error("Error fetching recipes:", err);
        setError("Failed to load recipes. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchPopularRecipes();
  }, []);

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 bg-[#FAF3E7]">
      <div className="text-center mb-16">
        <span
          className="inline-block text-xs tracking-[0.25em] text-[#C1440E] mb-3"
          style={mono}
        >
          FROM THE RECIPE BOX
        </span>
        <h2 className="text-4xl md:text-5xl text-[#2B2420] mb-4" style={serif}>
          Popular <span className="italic text-[#C1440E]">recipes</span>
        </h2>
        <p className="text-lg text-[#2B2420]/60 max-w-2xl mx-auto">
          Culinary treasures from around the world, picked by the community.
        </p>
      </div>

      {loading && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[...Array(6)].map((_, index) => (
            <div
              key={index}
              className="bg-[#FFFBF3] p-6 rounded-sm border border-[#E4D9C5]"
            >
              <Skeleton height={200} className="mb-4 rounded-sm" />
              <Skeleton count={3} />
            </div>
          ))}
        </div>
      )}

      {error && !loading && (
        <div className="bg-[#C1440E]/5 border-l-4 border-[#C1440E] p-4 rounded-sm max-w-3xl mx-auto">
          <div className="flex items-start">
            <div className="flex-shrink-0 pt-0.5">
              <svg
                className="h-5 w-5 text-[#C1440E]"
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
              <h3 className="text-sm font-medium text-[#2B2420]">
                Error loading recipes
              </h3>
              <p className="text-sm text-[#2B2420]/70 mt-1">{error}</p>
            </div>
          </div>
        </div>
      )}

      {!loading && !error && recipes.length > 0 && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {recipes.map((recipe) => (
              <RecipeCard key={recipe.idMeal} recipe={recipe} />
            ))}
          </div>

          <div className="text-center">
            <Link
              to="/recipes"
              className="inline-flex items-center justify-center px-8 py-4 text-base font-medium rounded-sm text-[#FAF3E7] bg-[#C1440E] hover:bg-[#a3390b] transition-all shadow-[4px_4px_0_0_#2B2420] hover:shadow-[2px_2px_0_0_#2B2420] hover:translate-x-0.5 hover:translate-y-0.5"
            >
              Explore all recipes
            </Link>
          </div>
        </>
      )}
    </section>
  );
};

export default Popular;
