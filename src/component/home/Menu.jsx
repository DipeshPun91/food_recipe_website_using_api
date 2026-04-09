import React, { useEffect, useState, useCallback, useMemo } from "react";
import {
  FaUtensils,
  FaGlobeAmericas,
  FaSearch,
  FaTimes,
  FaClock,
} from "react-icons/fa";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useNavigate } from "react-router-dom";

const Menu = () => {
  const [foodItems, setFoodItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedArea, setSelectedArea] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(12);
  const navigate = useNavigate();

  // Fetch meals with parallel requests for better performance
  useEffect(() => {
    const fetchMeals = async () => {
      try {
        setLoading(true);
        const letters = [
          "a",
          "b",
          "c",
          "d",
          "e",
          "f",
          "g",
          "h",
          "i",
          "j",
          "k",
          "l",
          "m",
          "n",
          "o",
          "p",
          "q",
          "r",
          "s",
          "t",
          "u",
          "v",
          "w",
          "x",
          "y",
          "z",
        ];

        // Create an array of fetch promises for parallel execution
        const fetchPromises = letters.map(async (letter) => {
          try {
            const response = await fetch(
              `https://www.themealdb.com/api/json/v1/1/search.php?f=${letter}`,
            );
            const data = await response.json();
            return data.meals || [];
          } catch (error) {
            console.error(`Error fetching letter ${letter}:`, error);
            return [];
          }
        });

        // Wait for all fetches to complete in parallel
        const allResults = await Promise.all(fetchPromises);
        const allMeals = allResults.flat();

        // Remove duplicates (in case same meal appears under different letters)
        const uniqueMeals = Array.from(
          new Map(allMeals.map((meal) => [meal.idMeal, meal])).values(),
        );

        setFoodItems(uniqueMeals);
      } catch (err) {
        console.error("Error fetching meals:", err);
        setError("Failed to load meals. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchMeals();
  }, []);

  // Extract unique categories and areas
  const { categories, areas } = useMemo(() => {
    const uniqueCategories = [
      "all",
      ...new Set(foodItems.map((item) => item.strCategory).filter(Boolean)),
    ];
    const uniqueAreas = [
      "all",
      ...new Set(foodItems.map((item) => item.strArea).filter(Boolean)),
    ];
    return { categories: uniqueCategories, areas: uniqueAreas };
  }, [foodItems]);

  // Filter items
  const filteredItems = useMemo(() => {
    return foodItems.filter((item) => {
      if (!item) return false;

      const matchesSearch = item.strMeal
        ? item.strMeal.toLowerCase().includes(searchTerm.toLowerCase())
        : false;
      const matchesCategory =
        selectedCategory === "all" || item.strCategory === selectedCategory;
      const matchesArea =
        selectedArea === "all" || item.strArea === selectedArea;

      return matchesSearch && matchesCategory && matchesArea;
    });
  }, [foodItems, searchTerm, selectedCategory, selectedArea]);

  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredItems.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleRecipeClick = useCallback(
    (recipeId) => {
      navigate(`/recipes/${recipeId}`);
    },
    [navigate],
  );

  const clearFilters = () => {
    setSearchTerm("");
    setSelectedCategory("all");
    setSelectedArea("all");
    setCurrentPage(1);
  };

  // Loading skeleton
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center mb-12">
            <div className="animate-pulse">
              <div className="h-10 bg-gray-200 rounded-lg w-64 mx-auto mb-3"></div>
              <div className="h-6 bg-gray-200 rounded-lg w-96 mx-auto"></div>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[...Array(12)].map((_, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-sm overflow-hidden"
              >
                <div className="animate-pulse">
                  <div className="bg-gray-200 h-48"></div>
                  <div className="p-4">
                    <div className="h-4 bg-gray-200 rounded mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded w-2/3 mb-4"></div>
                    <div className="h-10 bg-gray-200 rounded"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 pt-20 flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center">
          <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg
              className="h-10 w-10 text-red-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-3">
            Oops! Something went wrong
          </h3>
          <p className="text-gray-600 mb-8">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="inline-flex items-center px-6 py-3 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-all"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Discover & Cook
            <span className="bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
              {" "}
              Delicious Meals
            </span>
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Explore {foodItems.length}+ recipes from around the world. Find your
            next favorite dish!
          </p>
        </div>

        {/* Search and Filters */}
        <div className="mb-8">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <div className="space-y-4">
              {/* Search Input */}
              <div className="relative">
                <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search recipes by name..."
                  className="w-full pl-12 pr-10 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all outline-none"
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                    setCurrentPage(1);
                  }}
                />
                {searchTerm && (
                  <button
                    onClick={() => setSearchTerm("")}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    <FaTimes className="h-4 w-4" />
                  </button>
                )}
              </div>

              {/* Filters Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="relative">
                  <select
                    className="w-full px-4 py-3 pr-10 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 bg-white transition-all appearance-none cursor-pointer outline-none"
                    value={selectedCategory}
                    onChange={(e) => {
                      setSelectedCategory(e.target.value);
                      setCurrentPage(1);
                    }}
                  >
                    {categories.map((category) => (
                      <option key={category} value={category}>
                        {category === "all" ? "All Categories" : category}
                      </option>
                    ))}
                  </select>
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                    <svg
                      className="h-4 w-4 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </div>
                </div>

                <div className="relative">
                  <select
                    className="w-full px-4 py-3 pr-10 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 bg-white transition-all appearance-none cursor-pointer outline-none"
                    value={selectedArea}
                    onChange={(e) => {
                      setSelectedArea(e.target.value);
                      setCurrentPage(1);
                    }}
                  >
                    {areas.map((area) => (
                      <option key={area} value={area}>
                        {area === "all" ? "All Cuisines" : area}
                      </option>
                    ))}
                  </select>
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                    <svg
                      className="h-4 w-4 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Active Filters */}
              {(searchTerm ||
                selectedCategory !== "all" ||
                selectedArea !== "all") && (
                <div className="flex items-center justify-between flex-wrap gap-3 pt-2">
                  <div className="flex flex-wrap gap-2">
                    {searchTerm && (
                      <span className="inline-flex items-center px-3 py-1.5 rounded-full text-sm bg-green-100 text-green-700">
                        <span className="mr-1">🔍</span>
                        {searchTerm.length > 20
                          ? searchTerm.substring(0, 20) + "..."
                          : searchTerm}
                        <button
                          onClick={() => setSearchTerm("")}
                          className="ml-2 hover:text-green-900 transition-colors"
                        >
                          <FaTimes className="h-3 w-3" />
                        </button>
                      </span>
                    )}
                    {selectedCategory !== "all" && (
                      <span className="inline-flex items-center px-3 py-1.5 rounded-full text-sm bg-blue-100 text-blue-700">
                        <FaUtensils className="mr-1.5 h-3 w-3" />
                        {selectedCategory}
                        <button
                          onClick={() => setSelectedCategory("all")}
                          className="ml-2 hover:text-blue-900 transition-colors"
                        >
                          <FaTimes className="h-3 w-3" />
                        </button>
                      </span>
                    )}
                    {selectedArea !== "all" && (
                      <span className="inline-flex items-center px-3 py-1.5 rounded-full text-sm bg-purple-100 text-purple-700">
                        <FaGlobeAmericas className="mr-1.5 h-3 w-3" />
                        {selectedArea}
                        <button
                          onClick={() => setSelectedArea("all")}
                          className="ml-2 hover:text-purple-900 transition-colors"
                        >
                          <FaTimes className="h-3 w-3" />
                        </button>
                      </span>
                    )}
                  </div>
                  <button
                    onClick={clearFilters}
                    className="text-sm text-gray-500 hover:text-gray-700 transition-colors flex items-center gap-1"
                  >
                    <FaTimes className="h-3 w-3" />
                    Clear all
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6 flex items-center justify-between">
          <p className="text-gray-600">
            Found{" "}
            <span className="font-semibold text-gray-900">
              {filteredItems.length}
            </span>{" "}
            recipes
          </p>
          {filteredItems.length > 0 && (
            <p className="text-sm text-gray-500">
              Page {currentPage} of {totalPages}
            </p>
          )}
        </div>

        {/* No Results */}
        {filteredItems.length === 0 && (
          <div className="text-center py-16 bg-white rounded-2xl shadow-sm">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <FaUtensils className="h-12 w-12 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              No recipes found
            </h3>
            <p className="text-gray-600 max-w-md mx-auto mb-6">
              We couldn't find any recipes matching your criteria. Try adjusting
              your filters or search term.
            </p>
            <button
              onClick={clearFilters}
              className="inline-flex items-center px-6 py-3 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-all"
            >
              Clear all filters
            </button>
          </div>
        )}

        {/* Recipe Grid */}
        {filteredItems.length > 0 && (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {currentItems.map((food) => (
                <div
                  key={food.idMeal}
                  className="group relative bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden cursor-pointer"
                  onClick={() => handleRecipeClick(food.idMeal)}
                >
                  {/* Accent bar at top */}
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-green-500 to-emerald-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left z-10" />

                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={food.strMealThumb}
                      alt={food.strMeal}
                      loading="lazy"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      onError={(e) => {
                        e.target.src =
                          "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80";
                      }}
                    />
                  </div>

                  <div className="p-4">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="text-md font-semibold text-gray-800 line-clamp-2 flex-1 min-h-[40px]">
                        {food.strMeal}
                      </h3>
                    </div>

                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-xs px-2 py-0.5 bg-green-100 text-green-700 rounded-full">
                        {food.strCategory || "Other"}
                      </span>
                      <span className="text-xs px-2 py-0.5 bg-amber-100 text-amber-700 rounded-full">
                        {food.strArea || "International"}
                      </span>
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                      <div className="flex items-center text-xs text-gray-500">
                        <FaClock className="mr-1 text-green-600 text-xs" />
                        <span>30-45 min</span>
                      </div>
                      <button className="text-green-600 text-sm font-medium flex items-center gap-1 group-hover:gap-2 transition-all duration-300">
                        View Detail
                        <svg
                          className="w-3 h-3"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 5l7 7-7 7"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="mt-12 flex justify-center">
                <nav className="flex items-center gap-2">
                  <button
                    onClick={() => paginate(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                  >
                    Previous
                  </button>

                  <div className="flex gap-2">
                    {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                      let pageNum;
                      if (totalPages <= 5) {
                        pageNum = i + 1;
                      } else if (currentPage <= 3) {
                        pageNum = i + 1;
                      } else if (currentPage >= totalPages - 2) {
                        pageNum = totalPages - 4 + i;
                      } else {
                        pageNum = currentPage - 2 + i;
                      }

                      return (
                        <button
                          key={pageNum}
                          onClick={() => paginate(pageNum)}
                          className={`w-10 h-10 rounded-lg transition-all ${
                            currentPage === pageNum
                              ? "bg-green-600 text-white shadow-md"
                              : "border border-gray-300 text-gray-700 hover:bg-gray-50"
                          }`}
                        >
                          {pageNum}
                        </button>
                      );
                    })}
                  </div>

                  <button
                    onClick={() => paginate(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                  >
                    Next
                  </button>
                </nav>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Menu;
