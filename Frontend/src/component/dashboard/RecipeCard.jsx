import React from "react";
import { FaClock, FaGlobeAmericas } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const mono = { fontFamily: "'JetBrains Mono', monospace" };
const serif = { fontFamily: "'Fraunces', serif", fontWeight: 600 };

const RecipeCard = ({ recipe, className = "", onClick }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (onClick) {
      onClick(recipe._id);
    } else {
      navigate(`/recipes/${recipe._id}`);
    }
  };

  return (
    <div
      className={`group relative bg-[#FFFBF3] border border-[#E4D9C5] rounded-sm hover:shadow-lg transition-all duration-300 overflow-hidden cursor-pointer ${className}`}
      onClick={handleClick}
    >
      {/* Accent bar at top */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-[#C1440E] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left z-10" />

      <div className="relative h-48 overflow-hidden">
        <img
          src={recipe.strMealThumb}
          alt={recipe.strMeal}
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          onError={(e) => {
            e.target.src =
              "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80";
          }}
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#2B2420]/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      <div className="p-4">
        <h3
          className="text-md text-[#2B2420] line-clamp-2 mb-2 min-h-[40px]"
          style={serif}
        >
          {recipe.strMeal}
        </h3>

        <div className="flex items-center gap-2 mb-3">
          <span
            className="text-[10px] px-2 py-0.5 bg-[#4B6B3A]/10 text-[#4B6B3A] rounded-sm"
            style={mono}
          >
            {(recipe.strCategory || "Other").toUpperCase()}
          </span>
          <span
            className="text-[10px] px-2 py-0.5 bg-[#D9A441]/15 text-[#8a6417] rounded-sm flex items-center gap-1"
            style={mono}
          >
            <FaGlobeAmericas className="text-[8px]" />
            {(recipe.strArea || "International").toUpperCase()}
          </span>
        </div>

        <div className="flex items-center justify-between pt-2 border-t border-dashed border-[#E4D9C5]">
          <div className="flex items-center text-xs text-[#2B2420]/50">
            <FaClock className="mr-1 text-[#C1440E] text-xs" />
            <span>30–45 min</span>
          </div>
          <button className="text-[#C1440E] text-sm font-medium flex items-center gap-1 group-hover:gap-2 transition-all duration-300">
            View recipe
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
  );
};

export default RecipeCard;
