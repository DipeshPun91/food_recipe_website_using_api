import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import { AuthContext } from "../../context/AuthContext";
import defaultAvatar from "../../assets/default_user.png";

const navLinks = [
  { name: "Home", path: "/" },
  { name: "Recipes", path: "/recipes" },
  { name: "About", path: "/about" },
];

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { currentUser } = useContext(AuthContext);

  return (
    <header className="bg-[#FAF3E7]/90 backdrop-blur-md fixed w-full z-50 border-b border-[#E4D9C5]">
      <div className="container max-w-6xl mx-auto py-3 md:py-4 flex justify-between items-center">
        <Link to="/" className="flex items-baseline gap-0.5">
          <span
            className="text-2xl text-[#2B2420]"
            style={{ fontFamily: "'Fraunces', serif", fontWeight: 600 }}
          >
            Recipe
          </span>
          <span
            className="text-2xl italic text-[#C1440E]"
            style={{ fontFamily: "'Fraunces', serif", fontWeight: 600 }}
          >
            Hub
          </span>
        </Link>

        <nav className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className="relative text-[#2B2420]/80 hover:text-[#2B2420] text-sm tracking-wide transition-colors duration-200 group"
              style={{ fontFamily: "'JetBrains Mono', monospace" }}
            >
              {link.name.toUpperCase()}
              <span className="absolute -bottom-1 left-0 w-0 h-[1.5px] bg-[#C1440E] transition-all duration-300 group-hover:w-full" />
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex items-center space-x-4">
          {currentUser ? (
            <div className="flex items-center space-x-2">
              <img
                src={currentUser.avatar || defaultAvatar}
                alt={`${currentUser.username}'s profile`}
                className="w-9 h-9 rounded-full object-cover border-2 border-[#E4D9C5]"
              />
              <Link
                to="/profile"
                className="text-[#2B2420] hover:text-[#C1440E] font-medium transition-colors duration-200"
              >
                {currentUser.username}
              </Link>
            </div>
          ) : (
            <div className="flex items-center space-x-3">
              <Link
                to="/login"
                className="text-[#2B2420]/80 hover:text-[#2B2420] font-medium px-3 py-2 transition-colors duration-200"
              >
                Sign In
              </Link>
              <Link
                to="/register"
                className="bg-[#C1440E] hover:bg-[#a3390b] text-[#FAF3E7] font-medium px-5 py-2.5 rounded-sm transition-colors duration-200 shadow-[3px_3px_0_0_#2B2420]"
              >
                Sign Up
              </Link>
            </div>
          )}
        </div>

        <button
          className="md:hidden text-[#2B2420] focus:outline-none text-xl"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      <div
        className={`md:hidden ${
          mobileMenuOpen ? "block" : "hidden"
        } bg-[#FAF3E7] py-2 px-4 border-t border-[#E4D9C5] transition-all duration-300`}
      >
        {navLinks.map((link) => (
          <Link
            key={link.name}
            to={link.path}
            className="block py-3 px-2 text-[#2B2420]/80 hover:text-[#C1440E] rounded transition-colors duration-200"
            style={{ fontFamily: "'JetBrains Mono', monospace" }}
            onClick={() => setMobileMenuOpen(false)}
          >
            {link.name.toUpperCase()}
          </Link>
        ))}

        {currentUser ? (
          <div className="border-t border-[#E4D9C5] mt-2 pt-2">
            <div className="flex items-center space-x-3 py-3 px-2">
              <img
                src={currentUser.avatar || defaultAvatar}
                alt={`${currentUser.username}'s profile`}
                className="w-8 h-8 rounded-full object-cover border border-[#E4D9C5]"
              />
              <Link
                to="/profile"
                className="text-[#2B2420] font-medium transition-colors duration-200"
                onClick={() => setMobileMenuOpen(false)}
              >
                {currentUser.username}
              </Link>
            </div>
          </div>
        ) : (
          <div className="border-t border-[#E4D9C5] mt-2 pt-2 flex flex-col gap-2">
            <Link
              to="/login"
              className="block py-3 px-2 text-[#2B2420]/80 hover:text-[#C1440E] rounded transition-colors duration-200 text-center"
              onClick={() => setMobileMenuOpen(false)}
            >
              Sign In
            </Link>
            <Link
              to="/register"
              className="block py-3 px-2 bg-[#C1440E] text-[#FAF3E7] font-medium rounded-sm transition-colors duration-200 text-center"
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
