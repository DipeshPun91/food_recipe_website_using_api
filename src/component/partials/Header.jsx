import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import defaultAvatar from "../../assets/default_user.png";

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { currentUser } = useContext(AuthContext);

  return (
    <header className="bg-white/80 backdrop-blur-md fixed w-full z-50 border-b border-gray-200/60">
      <div className="container mx-auto px-4 py-3 md:py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-green-600">
          Recipe<span className="text-amber-600">Hub</span>
        </h1>

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

        <div className="hidden md:flex items-center space-x-4">
          {currentUser ? (
            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-2">
                <img
                  src={currentUser.avatar || defaultAvatar}
                  alt={`${currentUser.username}'s profile`}
                  className="w-8 h-8 rounded-full object-cover border border-gray-300"
                />
                <Link
                  to="/profile"
                  className="text-gray-700 hover:text-green-600 font-medium transition-colors duration-200"
                >
                  {currentUser.username}
                </Link>
              </div>
            </div>
          ) : (
            <div className="flex items-center space-x-3">
              <Link
                to="/login"
                className="text-gray-700 hover:text-green-600 font-medium px-4 py-2 transition-colors duration-200"
              >
                Sign In
              </Link>
              <Link
                to="/register"
                className="bg-green-600 hover:bg-green-700 text-white font-medium px-4 py-2 rounded transition-colors duration-200"
              >
                Sign Up
              </Link>
            </div>
          )}
        </div>

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

      <div
        className={`md:hidden ${
          mobileMenuOpen ? "block" : "hidden"
        } bg-white/95 backdrop-blur-md py-2 px-4 border-b border-gray-200/60 transition-all duration-300`}
      >
        <Link
          to="/"
          className="block py-3 px-2 text-gray-700 hover:text-green-600 hover:bg-green-50/50 rounded transition-colors duration-200"
          onClick={() => setMobileMenuOpen(false)}
        >
          Home
        </Link>
        <Link
          to="/recipes"
          className="block py-3 px-2 text-gray-700 hover:text-green-600 hover:bg-green-50/50 rounded transition-colors duration-200"
          onClick={() => setMobileMenuOpen(false)}
        >
          Recipes
        </Link>
        <Link
          to="/categories"
          className="block py-3 px-2 text-gray-700 hover:text-green-600 hover:bg-green-50/50 rounded transition-colors duration-200"
          onClick={() => setMobileMenuOpen(false)}
        >
          Categories
        </Link>
        <Link
          to="/about"
          className="block py-3 px-2 text-gray-700 hover:text-green-600 hover:bg-green-50/50 rounded transition-colors duration-200"
          onClick={() => setMobileMenuOpen(false)}
        >
          About
        </Link>

        {currentUser ? (
          <div className="border-t border-gray-200/60 mt-2 pt-2">
            <div className="flex items-center space-x-3 py-3 px-2">
              <img
                src={currentUser.avatar || defaultAvatar}
                alt={`${currentUser.username}'s profile`}
                className="w-8 h-8 rounded-full object-cover border border-gray-300"
              />
              <Link
                to="/profile"
                className="text-gray-700 hover:text-green-600 font-medium transition-colors duration-200"
                onClick={() => setMobileMenuOpen(false)}
              >
                {currentUser.username}
              </Link>
            </div>
          </div>
        ) : (
          <div className="border-t border-gray-200/60 mt-2 pt-2">
            <Link
              to="/login"
              className="block py-3 px-2 text-gray-700 hover:text-green-600 hover:bg-green-50/50 rounded transition-colors duration-200 text-center"
              onClick={() => setMobileMenuOpen(false)}
            >
              Sign In
            </Link>
            <Link
              to="/register"
              className="block py-3 px-2 bg-green-600 hover:bg-green-700 text-white font-medium rounded transition-colors duration-200 text-center mt-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              Sign Up
            </Link>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
