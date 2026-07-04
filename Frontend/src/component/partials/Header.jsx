import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaBars,
  FaTimes,
  FaUser,
  FaUtensils,
  FaSignOutAlt,
  FaChevronDown,
} from "react-icons/fa";
import { AuthContext } from "../../context/AuthContext";
import defaultAvatar from "../../assets/default_user.png";

const navLinks = [
  { name: "Home", path: "/" },
  { name: "Recipes", path: "/recipes" },
  { name: "About", path: "/about" },
];

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { currentUser, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
    setDropdownOpen(false);
  };

  const handleMobileLogout = () => {
    logout();
    navigate("/");
    setMobileMenuOpen(false);
  };

  return (
    <header className="bg-[#FAF3E7]/90 backdrop-blur-md fixed w-full z-50 border-b border-[#E4D9C5]">
      <div className="container max-w-7xl mx-auto py-3 md:py-4 px-4 flex justify-between items-center">
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
            <div className="relative">
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center space-x-2 hover:opacity-80 transition-opacity focus:outline-none"
              >
                <img
                  src={currentUser.avatar || defaultAvatar}
                  alt={`${currentUser.username}'s profile`}
                  className="w-9 h-9 rounded-full object-cover border-2 border-[#E4D9C5]"
                />
                <span className="text-[#2B2420] font-medium text-sm hidden lg:inline">
                  {currentUser.username}
                </span>
                <FaChevronDown
                  className={`text-[#2B2420]/50 text-xs transition-transform duration-200 ${dropdownOpen ? "rotate-180" : ""}`}
                />
              </button>

              {/* Dropdown Menu */}
              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-[#FFFBF3] border border-[#E4D9C5] rounded-sm shadow-lg py-2 z-50">
                  <div className="px-4 py-3 border-b border-[#E4D9C5]">
                    <p
                      className="text-sm font-medium text-[#2B2420]"
                      style={{
                        fontFamily: "'Fraunces', serif",
                        fontWeight: 600,
                      }}
                    >
                      {currentUser.username}
                    </p>
                    <p
                      className="text-xs text-[#2B2420]/50 truncate"
                      style={{ fontFamily: "'JetBrains Mono', monospace" }}
                    >
                      {currentUser.email}
                    </p>
                  </div>

                  <Link
                    to="/profile"
                    onClick={() => setDropdownOpen(false)}
                    className="flex items-center gap-3 px-4 py-2.5 text-sm text-[#2B2420] hover:bg-[#FAF3E7] transition-colors"
                  >
                    <FaUser className="text-[#2B2420]/50" />
                    <span>Profile</span>
                  </Link>

                  <Link
                    to="/dashboard"
                    onClick={() => setDropdownOpen(false)}
                    className="flex items-center gap-3 px-4 py-2.5 text-sm text-[#2B2420] hover:bg-[#FAF3E7] transition-colors"
                  >
                    <FaUtensils className="text-[#2B2420]/50" />
                    <span>Dashboard</span>
                  </Link>

                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-3 px-4 py-2.5 text-sm text-[#C1440E] hover:bg-[#FAF3E7] transition-colors w-full text-left border-t border-[#E4D9C5] mt-1 pt-2"
                  >
                    <FaSignOutAlt className="text-[#C1440E]" />
                    <span>Sign Out</span>
                  </button>
                </div>
              )}
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

      {/* Mobile Menu */}
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
              <span className="text-[#2B2420] font-medium">
                {currentUser.username}
              </span>
            </div>

            <Link
              to="/profile"
              className="flex items-center gap-3 py-3 px-2 text-[#2B2420] hover:bg-[#FFFBF3] rounded transition-colors duration-200"
              onClick={() => setMobileMenuOpen(false)}
            >
              <FaUser className="text-[#2B2420]/50" />
              <span>Profile</span>
            </Link>

            <Link
              to="/dashboard"
              className="flex items-center gap-3 py-3 px-2 text-[#2B2420] hover:bg-[#FFFBF3] rounded transition-colors duration-200"
              onClick={() => setMobileMenuOpen(false)}
            >
              <FaUtensils className="text-[#2B2420]/50" />
              <span>Dashboard</span>
            </Link>

            <button
              onClick={handleMobileLogout}
              className="flex items-center gap-3 py-3 px-2 text-[#C1440E] hover:bg-[#FFFBF3] rounded transition-colors duration-200 w-full border-t border-[#E4D9C5] mt-1 pt-3"
            >
              <FaSignOutAlt />
              <span>Sign Out</span>
            </button>
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
