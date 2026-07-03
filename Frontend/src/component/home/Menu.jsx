import React, { useEffect, useState, useCallback, useMemo } from "react";
import { FaUtensils, FaGlobeAmericas, FaSearch, FaTimes } from "react-icons/fa";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useNavigate } from "react-router-dom";
import RecipeCard from "../ui/RecipeCard";

const mono = { fontFamily: "'JetBrains Mono', monospace" };
const serif = { fontFamily: "'Fraunces', serif", fontWeight: 600 };

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

        const allResults = await Promise.all(fetchPromises);
        const allMeals = allResults.flat();

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
      <div className="min-h-screen bg-[#FAF3E7] pt-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center mb-12">
            <div className="animate-pulse">
              <div className="h-4 bg-[#E4D9C5] rounded-sm w-40 mx-auto mb-4"></div>
              <div className="h-10 bg-[#E4D9C5] rounded-sm w-72 mx-auto mb-3"></div>
              <div className="h-5 bg-[#E4D9C5] rounded-sm w-96 mx-auto"></div>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[...Array(12)].map((_, index) => (
              <div
                key={index}
                className="bg-[#FFFBF3] border border-[#E4D9C5] rounded-sm overflow-hidden"
              >
                <Skeleton height={192} />
                <div className="p-4">
                  <Skeleton count={2} className="mb-2" />
                  <Skeleton height={36} className="mt-3" />
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
      <div className="min-h-screen bg-[#FAF3E7] pt-28 flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-[#FFFBF3] border border-[#E4D9C5] rounded-sm shadow-xl p-8 text-center">
          <div className="w-16 h-16 rounded-full border-2 border-dashed border-[#C1440E]/50 flex items-center justify-center mx-auto mb-6 text-[#C1440E]">
            <svg
              className="h-8 w-8"
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
          <h3 className="text-2xl text-[#2B2420] mb-3" style={serif}>
            The kitchen hit a snag
          </h3>
          <p className="text-[#2B2420]/60 mb-8">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="inline-flex items-center px-6 py-3 bg-[#C1440E] hover:bg-[#a3390b] text-[#FAF3E7] rounded-sm shadow-[3px_3px_0_0_#2B2420] transition-all"
          >
            Try again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAF3E7] pt-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        {/* Header Section */}
        <div className="text-center mb-12">
          <span
            className="inline-block text-xs tracking-[0.25em] text-[#C1440E] mb-3"
            style={mono}
          >
            THE FULL RECIPE BOX
          </span>
          <h1
            className="text-4xl lg:text-5xl text-[#2B2420] mb-4"
            style={serif}
          >
            Discover &amp; cook{" "}
            <span className="italic text-[#C1440E]">delicious meals</span>
          </h1>
          <p className="text-lg text-[#2B2420]/60 max-w-2xl mx-auto">
            Explore {foodItems.length}+ recipes from around the world. Find your
            next favorite dish.
          </p>
        </div>

        {/* Search and Filters */}
        <div className="mb-8">
          <div className="space-y-4">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#2B2420]/35" />
                <input
                  type="text"
                  placeholder="Search recipes by name…"
                  className="w-full pl-12 pr-10 py-3 bg-[#FAF3E7] border border-[#E4D9C5] rounded-sm focus:ring-2 focus:ring-[#C1440E]/40 focus:border-[#C1440E] transition-all outline-none text-[#2B2420] placeholder-[#2B2420]/35"
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                    setCurrentPage(1);
                  }}
                />
                {searchTerm && (
                  <button
                    onClick={() => setSearchTerm("")}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#2B2420]/40 hover:text-[#2B2420] transition-colors"
                  >
                    <FaTimes className="h-4 w-4" />
                  </button>
                )}
              </div>

              <div className="relative md:w-48 lg:w-56">
                <select
                  className="w-full px-4 py-3 pr-10 bg-[#FAF3E7] border border-[#E4D9C5] rounded-sm focus:ring-2 focus:ring-[#C1440E]/40 focus:border-[#C1440E] transition-all appearance-none cursor-pointer outline-none text-[#2B2420]"
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
                    className="h-4 w-4 text-[#2B2420]/40"
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

              <div className="relative md:w-48 lg:w-56">
                <select
                  className="w-full px-4 py-3 pr-10 bg-[#FAF3E7] border border-[#E4D9C5] rounded-sm focus:ring-2 focus:ring-[#C1440E]/40 focus:border-[#C1440E] transition-all appearance-none cursor-pointer outline-none text-[#2B2420]"
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
                    className="h-4 w-4 text-[#2B2420]/40"
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
                    <span
                      className="inline-flex items-center px-3 py-1.5 rounded-full text-sm bg-[#C1440E]/10 text-[#C1440E]"
                      style={mono}
                    >
                      {searchTerm.length > 20
                        ? searchTerm.substring(0, 20) + "..."
                        : searchTerm}
                      <button
                        onClick={() => setSearchTerm("")}
                        className="ml-2 hover:opacity-70 transition-opacity"
                      >
                        <FaTimes className="h-3 w-3" />
                      </button>
                    </span>
                  )}
                  {selectedCategory !== "all" && (
                    <span
                      className="inline-flex items-center px-3 py-1.5 rounded-full text-sm bg-[#4B6B3A]/10 text-[#4B6B3A]"
                      style={mono}
                    >
                      <FaUtensils className="mr-1.5 h-3 w-3" />
                      {selectedCategory}
                      <button
                        onClick={() => setSelectedCategory("all")}
                        className="ml-2 hover:opacity-70 transition-opacity"
                      >
                        <FaTimes className="h-3 w-3" />
                      </button>
                    </span>
                  )}
                  {selectedArea !== "all" && (
                    <span
                      className="inline-flex items-center px-3 py-1.5 rounded-full text-sm bg-[#D9A441]/15 text-[#8a6417]"
                      style={mono}
                    >
                      <FaGlobeAmericas className="mr-1.5 h-3 w-3" />
                      {selectedArea}
                      <button
                        onClick={() => setSelectedArea("all")}
                        className="ml-2 hover:opacity-70 transition-opacity"
                      >
                        <FaTimes className="h-3 w-3" />
                      </button>
                    </span>
                  )}
                </div>
                <button
                  onClick={clearFilters}
                  className="text-sm text-[#2B2420]/50 hover:text-[#2B2420] transition-colors flex items-center gap-1"
                >
                  <FaTimes className="h-3 w-3" />
                  Clear all
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6 flex items-center justify-between">
          <p className="text-[#2B2420]/60">
            Found{" "}
            <span className="font-semibold text-[#2B2420]">
              {filteredItems.length}
            </span>{" "}
            recipes
          </p>
          {filteredItems.length > 0 && (
            <p className="text-sm text-[#2B2420]/40" style={mono}>
              PAGE {currentPage} / {totalPages}
            </p>
          )}
        </div>

        {/* No Results */}
        {filteredItems.length === 0 && (
          <div className="text-center py-16 bg-[#FFFBF3] border border-[#E4D9C5] rounded-sm">
            <div className="w-20 h-20 rounded-full border-2 border-dashed border-[#2B2420]/20 flex items-center justify-center mx-auto mb-6">
              <FaUtensils className="h-9 w-9 text-[#2B2420]/30" />
            </div>
            <h3 className="text-xl text-[#2B2420] mb-2" style={serif}>
              No recipes found
            </h3>
            <p className="text-[#2B2420]/60 max-w-md mx-auto mb-6">
              We couldn't find anything matching your criteria. Try adjusting
              your filters or search term.
            </p>
            <button
              onClick={clearFilters}
              className="inline-flex items-center px-6 py-3 bg-[#C1440E] hover:bg-[#a3390b] text-[#FAF3E7] rounded-sm shadow-[3px_3px_0_0_#2B2420] transition-all"
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
                <RecipeCard
                  key={food.idMeal}
                  recipe={food}
                  onClick={handleRecipeClick}
                />
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="mt-12 flex justify-center">
                <nav className="flex items-center gap-2">
                  <button
                    onClick={() => paginate(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="px-4 py-2 rounded-sm border border-[#E4D9C5] text-[#2B2420]/70 hover:bg-[#FFFBF3] disabled:opacity-40 disabled:cursor-not-allowed transition-all"
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
                          className={`w-10 h-10 rounded-sm transition-all ${
                            currentPage === pageNum
                              ? "bg-[#C1440E] text-[#FAF3E7] shadow-[2px_2px_0_0_#2B2420]"
                              : "border border-[#E4D9C5] text-[#2B2420]/70 hover:bg-[#FFFBF3]"
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
                    className="px-4 py-2 rounded-sm border border-[#E4D9C5] text-[#2B2420]/70 hover:bg-[#FFFBF3] disabled:opacity-40 disabled:cursor-not-allowed transition-all"
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
