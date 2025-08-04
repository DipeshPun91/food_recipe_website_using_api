import React from "react";
import { FaSearch, FaUtensils } from "react-icons/fa";

const Hero = () => {
  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 via-orange-50 to-amber-50 py-20 px-4">
      <div className="container mx-auto text-center">
        <div className="max-w-4xl mx-auto">
          <div className="inline-flex items-center justify-center mb-6 bg-green-100 text-green-600 rounded-full px-5 py-2 text-sm md:text-base transition-all duration-300 hover:bg-green-200">
            <FaUtensils className="mr-2" />
            <span>Discover Amazing Recipes</span>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            Cook Like a Chef <br className="hidden md:block" />
            <span className="text-green-600">With Our Recipes</span>
          </h1>

          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto mb-10 leading-relaxed">
            Find thousands of delicious recipes from around the world, with
            step-by-step instructions and expert tips to help you master any
            dish.
          </p>

          <div className="flex flex-col sm:flex-row max-w-2xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl">
            <input
              type="text"
              placeholder="Search for recipes, ingredients, or cuisines..."
              className="flex-grow px-6 py-3 sm:py-4 focus:outline-none text-gray-700 placeholder-gray-400"
            />
            <button className="bg-green-600 hover:bg-green-700 text-white px-6 sm:px-8 py-3 sm:py-4 flex items-center justify-center transition-colors duration-300">
              <span className="hidden sm:inline mr-2">Search</span>
              <FaSearch className="text-lg" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
