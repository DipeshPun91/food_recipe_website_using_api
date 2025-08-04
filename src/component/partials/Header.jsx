import React, { useState } from "react";
import { Link } from "react-router-dom";

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-sm fixed w-full z-50">
      <div className="container mx-auto px-4 py-3 md:py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-green-600">
          Recipe<span className="text-amber-600">Hub</span>
        </h1>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6 lg:space-x-8">
          <Link
            to="/"
            className="text-gray-700 hover:text-green-600 font-medium transition-colors duration-200"
          >
            Home
          </Link>
          <Link
            to="/recipes"
            className="text-gray-700 hover:text-green-600 font-medium transition-colors duration-200"
          >
            Recipes
          </Link>
          <Link
            to="/categories"
            className="text-gray-700 hover:text-green-600 font-medium transition-colors duration-200"
          >
            Categories
          </Link>
          <Link
            to="/about"
            className="text-gray-700 hover:text-green-600 font-medium transition-colors duration-200"
          >
            About
          </Link>
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-gray-700 focus:outline-none"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            ></path>
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden ${
          mobileMenuOpen ? "block" : "hidden"
        } bg-white py-2 px-4 shadow-md transition-all duration-300`}
      >
        <Link
          to="/"
          className="block py-3 px-2 text-gray-700 hover:text-green-600 hover:bg-green-50 rounded transition-colors duration-200"
          onClick={() => setMobileMenuOpen(false)}
        >
          Home
        </Link>
        <Link
          to="/recipes"
          className="block py-3 px-2 text-gray-700 hover:text-green-600 hover:bg-green-50 rounded transition-colors duration-200"
          onClick={() => setMobileMenuOpen(false)}
        >
          Recipes
        </Link>
        <Link
          to="/categories"
          className="block py-3 px-2 text-gray-700 hover:text-green-600 hover:bg-green-50 rounded transition-colors duration-200"
          onClick={() => setMobileMenuOpen(false)}
        >
          Categories
        </Link>
        <Link
          to="/about"
          className="block py-3 px-2 text-gray-700 hover:text-green-600 hover:bg-green-50 rounded transition-colors duration-200"
          onClick={() => setMobileMenuOpen(false)}
        >
          About
        </Link>
      </div>
    </header>
  );
};

export default Header;
