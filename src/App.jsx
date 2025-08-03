import React from "react";
import {
  FaSearch,
  FaPlus,
  FaBolt,
  FaUtensils,
  FaMedal,
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";
import Header from "./component/partials/Header";
import Footer from "./component/partials/Footer";
import Menu from "./component/partials/Menu";

const App = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <Header />

      {/* Hero Section */}
      <section
        id="home"
        className="pt-32 pb-20 bg-gradient-to-r from-red-50 to-orange-50"
      >
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
            Delicious Food Delivered To Your Doorstep
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-10">
            Order from your favorite restaurants with just a few clicks and
            enjoy premium quality food in the comfort of your home.
          </p>
          <div className="flex max-w-xl mx-auto bg-white rounded-full shadow-md overflow-hidden">
            <input
              type="text"
              placeholder="Search for restaurants or dishes..."
              className="flex-grow px-6 py-4 focus:outline-none"
              readOnly
            />
            <button className="bg-red-500 text-white px-6 flex items-center hover:bg-red-600 transition">
              <FaSearch className="mr-2" /> Search
            </button>
          </div>
        </div>
      </section>

      {/* Menu Section */}
      <section id="menu" className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              Our Delicious Menu
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Explore our wide variety of dishes prepared by top chefs using the
              freshest ingredients
            </p>
          </div>

          {/* Category Filters */}
          <div className="flex flex-wrap justify-center gap-3 mb-10">
            {["all", "pizza", "burger", "pasta", "salad", "dessert"].map(
              (category) => (
                <button
                  key={category}
                  className={`px-6 py-2 rounded-full capitalize ${
                    category === "all"
                      ? "bg-red-500 text-white"
                      : "bg-white text-gray-700 border border-gray-200 hover:border-red-300"
                  }`}
                >
                  {category === "all" ? "All Items" : category + "s"}
                </button>
              )
            )}
          </div>

          {/* Food Items Grid */}
          <Menu />
        </div>
      </section>

      {/* Features Section */}
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
                We use only the freshest ingredients sourced from local farms
                and trusted suppliers.
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

      {/* Testimonials */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              What Our Customers Say
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Hear from people who have enjoyed our delicious food and excellent
              service
            </p>
          </div>

          <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-sm text-center">
            <p className="text-lg italic text-gray-700 mb-8 relative">
              <span className="text-red-500 text-4xl absolute top-0 left-0 opacity-30">
                "
              </span>
              The food arrived hot and fresh, exactly as described on the menu.
              The flavors were incredible and the portion was generous. I'll
              definitely be ordering again!
              <span className="text-red-500 text-4xl absolute bottom-0 right-0 opacity-30">
                "
              </span>
            </p>
            <p className="font-semibold">Sarah Johnson</p>
            <p className="text-gray-500 text-sm">Regular Customer</p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-red-500 to-orange-500 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">
            Ready to enjoy delicious food?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Download our app now and get 20% off your first order with code
            WELCOME20
          </p>
          <button className="bg-white text-red-500 px-8 py-3 rounded-full font-bold hover:bg-gray-100 transition">
            Download App
          </button>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default App;
