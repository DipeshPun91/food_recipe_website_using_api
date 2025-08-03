import React from "react";
import { FaBolt, FaUtensils, FaMedal } from "react-icons/fa";

const Features = () => {
  return (
    <section id="about" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            Why Choose Us
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            We provide the best food delivery service with premium quality and
            fast delivery
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center p-8 hover:transform hover:-translate-y-2 transition">
            <div className="text-red-500 text-5xl mb-6 flex justify-center">
              <FaBolt />
            </div>
            <h3 className="text-xl font-semibold mb-3">Fast Delivery</h3>
            <p className="text-gray-600">
              Get your food delivered in less than 30 minutes or get it for
              free. We guarantee speedy service.
            </p>
          </div>

          <div className="text-center p-8 hover:transform hover:-translate-y-2 transition">
            <div className="text-red-500 text-5xl mb-6 flex justify-center">
              <FaUtensils />
            </div>
            <h3 className="text-xl font-semibold mb-3">Fresh Ingredients</h3>
            <p className="text-gray-600">
              We use only the freshest ingredients sourced from local farms and
              trusted suppliers.
            </p>
          </div>

          <div className="text-center p-8 hover:transform hover:-translate-y-2 transition">
            <div className="text-red-500 text-5xl mb-6 flex justify-center">
              <FaMedal />
            </div>
            <h3 className="text-xl font-semibold mb-3">Premium Quality</h3>
            <p className="text-gray-600">
              All our dishes are prepared by professional chefs with years of
              experience in gourmet cooking.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
