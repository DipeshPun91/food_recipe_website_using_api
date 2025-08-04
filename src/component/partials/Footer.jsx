import React from "react";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaPinterestP,
  FaYoutube,
  FaUtensils,
  FaBookOpen,
  FaUserFriends,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaClock,
  FaArrowRight,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white pt-16 pb-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* About Column */}
          <div>
            <h3 className="text-xl font-bold mb-4 flex items-center">
              <FaUtensils className="text-green-500 mr-2" />
              <span>
                Recipe<span className="text-amber-500">Hub</span>
              </span>
            </h3>
            <p className="text-gray-400 mb-4">
              Your ultimate cooking companion with thousands of recipes, cooking
              tips, and meal planning tools to inspire your kitchen adventures.
            </p>
            <div className="flex space-x-4">
              {[
                { icon: FaFacebookF, color: "text-blue-400" },
                { icon: FaInstagram, color: "text-pink-400" },
                { icon: FaPinterestP, color: "text-red-500" },
                { icon: FaYoutube, color: "text-red-600" },
                { icon: FaTwitter, color: "text-blue-300" },
              ].map((social, index) => (
                <a
                  key={index}
                  href="#"
                  className={`bg-gray-800 w-10 h-10 rounded-full flex items-center justify-center hover:bg-gray-700 transition ${social.color}`}
                >
                  <social.icon />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links Column */}
          <div>
            <h3 className="text-xl font-bold mb-4 flex items-center">
              <FaBookOpen className="text-green-500 mr-2" />
              Quick Links
            </h3>
            <ul className="space-y-3">
              {[
                { name: "Home", path: "/" },
                { name: "Recipes", path: "/recipes" },
                { name: "Categories", path: "/categories" },
                { name: "Cooking Tips", path: "/tips" },
                { name: "Meal Planner", path: "/meal-planner" },
              ].map((link) => (
                <li key={link.name}>
                  <a
                    href={link.path}
                    className="text-gray-400 hover:text-green-400 transition flex items-center"
                  >
                    <FaArrowRight className="text-xs mr-2 opacity-0 group-hover:opacity-100 transition" />
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Community Column */}
          <div>
            <h3 className="text-xl font-bold mb-4 flex items-center">
              <FaUserFriends className="text-green-500 mr-2" />
              Community
            </h3>
            <ul className="space-y-3 text-gray-400">
              <li className="hover:text-green-400 transition">
                <a href="#" className="flex items-center">
                  Forums
                </a>
              </li>
              <li className="hover:text-green-400 transition">
                <a href="#" className="flex items-center">
                  Contribute a Recipe
                </a>
              </li>
              <li className="hover:text-green-400 transition">
                <a href="#" className="flex items-center">
                  Cooking Challenges
                </a>
              </li>
              <li className="hover:text-green-400 transition">
                <a href="#" className="flex items-center">
                  Chef Spotlights
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Column */}
          <div>
            <h3 className="text-xl font-bold mb-4 flex items-center">
              <FaEnvelope className="text-green-500 mr-2" />
              Contact Us
            </h3>
            <ul className="space-y-3 text-gray-400">
              <li className="flex items-start hover:text-green-400 transition">
                <FaMapMarkerAlt className="text-green-500 mt-1 mr-3 flex-shrink-0" />
                <span>123 Culinary Ave, Foodie City FC 12345</span>
              </li>
              <li className="flex items-start hover:text-green-400 transition">
                <FaPhone className="text-green-500 mt-1 mr-3 flex-shrink-0" />
                <span>+1 (555) REC-IPES</span>
              </li>
              <li className="flex items-start hover:text-green-400 transition">
                <FaClock className="text-green-500 mt-1 mr-3 flex-shrink-0" />
                <span>Support: Mon-Fri, 9AM-6PM EST</span>
              </li>
              <li className="flex items-start hover:text-green-400 transition">
                <FaEnvelope className="text-green-500 mt-1 mr-3 flex-shrink-0" />
                <span>hello@recipehub.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-gray-800 text-center text-gray-500 text-sm">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="mb-4 md:mb-0">
              &copy; {new Date().getFullYear()} RecipeHub. All culinary rights
              reserved.
            </p>
            <div className="flex space-x-6">
              <a href="#" className="hover:text-green-400 transition">
                Privacy Policy
              </a>
              <a href="#" className="hover:text-green-400 transition">
                Terms of Service
              </a>
              <a href="#" className="hover:text-green-400 transition">
                Cookie Policy
              </a>
            </div>
          </div>
          <p className="mt-4 text-xs text-gray-600">
            Made with ❤️ for food lovers everywhere
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
