import React from "react";
import { FaSearch } from "react-icons/fa";
import Header from "./component/partials/Header";
import Footer from "./component/partials/Footer";
import Menu from "./component/partials/Menu";
import Features from "./component/partials/Features";
import Testimonials from "./component/partials/Testimonials";
import Cta from "./component/partials/Cta";

const App = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <section
        id="home"
        className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 via-orange-50 to-amber-50 py-20 px-4"
      >
        <div className="container mx-auto text-center">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-6 leading-tight">
              Restaurant-Quality Meals <br className="hidden md:block" />
              <span className="text-red-600">Delivered</span> To Your Door
            </h1>

            <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto mb-10">
              Discover gourmet dining experiences from top local chefs, prepared
              fresh and delivered fast to your home or office.
            </p>

            <div className="flex flex-col sm:flex-row max-w-2xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl">
              <input
                type="text"
                placeholder="Search for restaurants, dishes, or cuisines..."
                className="flex-grow px-6 py-5 focus:outline-none text-gray-700 placeholder-gray-400"
              />
              <button className="bg-red-600 hover:bg-red-700 text-white px-8 py-5 flex items-center justify-center transition-colors duration-300">
                <span className="hidden sm:inline mr-2">Find Food</span>
                <FaSearch className="text-lg" />
              </button>
            </div>
          </div>
        </div>
      </section>

      <Menu />

      <Features />

      <Testimonials />

      <Cta />

      <Footer />
    </div>
  );
};

export default App;
