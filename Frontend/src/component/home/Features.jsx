import React from "react";
import { FaBook, FaChartPie, FaUsers, FaLeaf } from "react-icons/fa";

const Features = () => {
  return (
    <section id="features" className="py-12 md:py-16 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Why RecipeHub Stands Out
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg md:text-xl">
            Discover what makes our recipe platform different from the rest
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          <div className="bg-gray-50 rounded-xl p-6 md:p-8 hover:shadow-lg transition-all duration-300 hover:bg-white">
            <div className="text-green-600 text-4xl mb-4 flex justify-center">
              <FaBook />
            </div>
            <h3 className="text-xl font-semibold mb-3 text-center">
              10,000+ Recipes
            </h3>
            <p className="text-gray-600 text-center">
              Access our vast collection of recipes from around the world, with
              new additions weekly.
            </p>
          </div>

          <div className="bg-gray-50 rounded-xl p-6 md:p-8 hover:shadow-lg transition-all duration-300 hover:bg-white">
            <div className="text-green-600 text-4xl mb-4 flex justify-center">
              <FaChartPie />
            </div>
            <h3 className="text-xl font-semibold mb-3 text-center">
              Nutrition Info
            </h3>
            <p className="text-gray-600 text-center">
              Detailed nutritional breakdown for every recipe to support your
              health goals.
            </p>
          </div>

          <div className="bg-gray-50 rounded-xl p-6 md:p-8 hover:shadow-lg transition-all duration-300 hover:bg-white">
            <div className="text-green-600 text-4xl mb-4 flex justify-center">
              <FaUsers />
            </div>
            <h3 className="text-xl font-semibold mb-3 text-center">
              Chef Community
            </h3>
            <p className="text-gray-600 text-center">
              Learn from professional chefs and share your own creations with
              our community.
            </p>
          </div>

          <div className="bg-gray-50 rounded-xl p-6 md:p-8 hover:shadow-lg transition-all duration-300 hover:bg-white">
            <div className="text-green-600 text-4xl mb-4 flex justify-center">
              <FaLeaf />
            </div>
            <h3 className="text-xl font-semibold mb-3 text-center">
              Dietary Filters
            </h3>
            <p className="text-gray-600 text-center">
              Easily find recipes that fit your dietary needs: vegan,
              gluten-free, keto, and more.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
