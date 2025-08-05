import React, { useEffect, useState, useRef } from "react";
import {
  FaYoutube,
  FaUtensils,
  FaGlobeAmericas,
  FaSearch,
  FaChevronLeft,
  FaChevronRight,
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
  const [currentSlide, setCurrentSlide] = useState(0);
  const sliderRef = useRef(null);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const navigate = useNavigate();

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

        let allMeals = [];

        for (const letter of letters) {
          const response = await fetch(
            `https://www.themealdb.com/api/json/v1/1/search.php?f=${letter}`
          );
          const data = await response.json();
          if (data.meals) {
            allMeals = [...allMeals, ...data.meals];
          }
        }

        setFoodItems(allMeals);
      } catch (err) {
        console.error("Error fetching meals:", err);
        setError("Failed to load meals. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchMeals();
  }, []);

  // Extract unique categories and areas from the food items
  const categories = [
    "all",
    ...new Set(foodItems.map((item) => item.strCategory)),
  ];
  const areas = ["all", ...new Set(foodItems.map((item) => item.strArea))];

  // Filter food items based on search term, selected category and area
  const filteredItems = foodItems.filter((item) => {
    if (!item) return false;

    const matchesSearch = item.strMeal
      ? item.strMeal.toLowerCase().includes(searchTerm.toLowerCase())
      : false;
    const matchesCategory =
      selectedCategory === "all" || item.strCategory === selectedCategory;
    const matchesArea = selectedArea === "all" || item.strArea === selectedArea;
    return matchesSearch && matchesCategory && matchesArea;
  });

  // Group items into slides of 6 recipes each
  const groupedItems = [];
  for (let i = 0; i < filteredItems.length; i += 6) {
    groupedItems.push(filteredItems.slice(i, i + 6));
  }

  const totalSlides = groupedItems.length;

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === totalSlides - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? totalSlides - 1 : prev - 1));
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  // Handle touch events for swipe
  const handleTouchStart = (e) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (touchStart - touchEnd > 50) {
      nextSlide();
    }

    if (touchStart - touchEnd < -50) {
      prevSlide();
    }
  };

  const handleRecipeClick = (recipe) => {
    navigate(`/recipes/${recipe.idMeal}`);
  };

  return (
    <section id="menu" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-3">
          <span className="text-green-600">Explore</span> Our Recipe Collection
        </h1>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          Discover culinary excellence with our handpicked collection of
          international dishes from around the world
        </p>
      </div>

      <div className="mb-12 p-6 bg-green-50 rounded-xl">
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="flex-1 relative">
            <input
              type="text"
              placeholder="Search recipes by name..."
              className="w-full px-5 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentSlide(0);
              }}
            />
            <span className="absolute right-4 top-3.5 text-gray-400">
              <FaSearch className="inline" />
            </span>
          </div>

          <select
            className="px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 bg-white transition-all"
            value={selectedCategory}
            onChange={(e) => {
              setSelectedCategory(e.target.value);
              setCurrentSlide(0);
            }}
          >
            {categories.map((category) => (
              <option key={category} value={category}>
                {category === "all" ? "All Categories" : category}
              </option>
            ))}
          </select>

          <select
            className="px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 bg-white transition-all"
            value={selectedArea}
            onChange={(e) => {
              setSelectedArea(e.target.value);
              setCurrentSlide(0);
            }}
          >
            {areas.map((area) => (
              <option key={area} value={area}>
                {area === "all" ? "All Cuisines" : area}
              </option>
            ))}
          </select>
        </div>
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

      {!loading && !error && filteredItems.length === 0 && (
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
            No matching recipes found
          </h3>
          <p className="mt-2 text-gray-600 max-w-md mx-auto">
            Try adjusting your search criteria or filters to discover our
            delicious recipes.
          </p>
        </div>
      )}

      {!loading && !error && filteredItems.length > 0 && (
        <div className="relative">
          <button
            onClick={prevSlide}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 bg-white p-3 rounded-full shadow-md hover:bg-green-100 transition"
            aria-label="Previous slide"
          >
            <FaChevronLeft className="text-green-600 text-lg" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 bg-white p-3 rounded-full shadow-md hover:bg-green-100 transition"
            aria-label="Next slide"
          >
            <FaChevronRight className="text-green-600 text-lg" />
          </button>

          <div
            className="overflow-hidden"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <div
              ref={sliderRef}
              className="flex transition-transform duration-300 ease-in-out"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {groupedItems.map((group, groupIndex) => (
                <div key={groupIndex} className="w-full flex-shrink-0 px-2">
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {group.map((food) => (
                      <div
                        key={food.idMeal}
                        className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden flex flex-col border border-gray-100 cursor-pointer"
                        onClick={() => handleRecipeClick(food)}
                      >
                        <div className="relative h-56 overflow-hidden">
                          <img
                            src={food.strMealThumb}
                            alt={food.strMeal}
                            className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
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

                          <div className="mt-auto">
                            <button className="w-full inline-flex items-center justify-center px-5 py-2.5 border border-transparent text-sm font-medium rounded-lg shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors">
                              View Recipe
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-center mt-8 space-x-2">
            {groupedItems.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-all ${
                  index === currentSlide ? "bg-green-600 w-6" : "bg-gray-300"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      )}
    </section>
  );
};

export default Menu;
