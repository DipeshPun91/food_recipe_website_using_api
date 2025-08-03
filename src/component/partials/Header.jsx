import React from "react";

const Header = () => {
  return (
    <header className="bg-white shadow-sm fixed w-full z-50">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-red-500">
          Gourmet<span className="text-orange-500">Express</span>
        </h1>
        <nav className="hidden md:flex items-center space-x-8">
          <a
            href="#home"
            className="text-gray-700 hover:text-red-500 font-medium"
          >
            Home
          </a>
          <a
            href="#menu"
            className="text-gray-700 hover:text-red-500 font-medium"
          >
            Menu
          </a>
          <a
            href="#about"
            className="text-gray-700 hover:text-red-500 font-medium"
          >
            About
          </a>
          <a
            href="#contact"
            className="text-gray-700 hover:text-red-500 font-medium"
          >
            Contact
          </a>
          <button className="bg-red-500 text-white px-6 py-2 rounded-full font-medium hover:bg-red-600 transition">
            Order Now
          </button>
        </nav>
      </div>
    </header>
  );
};

export default Header;
