import React from "react";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaPinterestP,
  FaYoutube,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaClock,
} from "react-icons/fa";

const columns = [
  {
    title: "Explore",
    items: [
      { name: "Home", path: "/" },
      { name: "Recipes", path: "/recipes" },
      { name: "Categories", path: "/categories" },
      { name: "Cooking Tips", path: "/tips" },
      { name: "Meal Planner", path: "/meal-planner" },
    ],
  },
  {
    title: "Community",
    items: [
      { name: "Forums", path: "#" },
      { name: "Contribute a Recipe", path: "#" },
      { name: "Cooking Challenges", path: "#" },
      { name: "Chef Spotlights", path: "#" },
    ],
  },
];

const Footer = () => {
  return (
    <footer className="bg-[#2B2420] text-[#FAF3E7] border-t border-[#E4D9C5]/20">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand card */}
          <div>
            <div className="flex items-baseline gap-0.5 mb-4">
              <span
                className="text-2xl text-[#FAF3E7]"
                style={{ fontFamily: "'Fraunces', serif", fontWeight: 600 }}
              >
                Recipe
              </span>
              <span
                className="text-2xl italic text-[#D9A441]"
                style={{ fontFamily: "'Fraunces', serif", fontWeight: 600 }}
              >
                Hub
              </span>
            </div>
            <p className="text-[#FAF3E7]/60 mb-5 leading-relaxed">
              Your ultimate cooking companion thousands of recipes, cooking
              tips, and meal planning tools to inspire your kitchen adventures.
            </p>
            <div className="flex space-x-3">
              {[
                FaFacebookF,
                FaInstagram,
                FaPinterestP,
                FaYoutube,
                FaTwitter,
              ].map((Icon, index) => (
                <a
                  key={index}
                  href="#"
                  className="bg-[#FAF3E7]/10 w-9 h-9 rounded-full flex items-center justify-center hover:bg-[#C1440E] hover:text-[#FAF3E7] transition-colors duration-200"
                >
                  <Icon className="text-sm" />
                </a>
              ))}
            </div>
          </div>

          {/* Link columns styled like recipe-box drawer tabs */}
          {columns.map((col) => (
            <div key={col.title}>
              <h3
                className="text-xs tracking-[0.2em] text-[#D9A441] mb-4"
                style={{ fontFamily: "'JetBrains Mono', monospace" }}
              >
                {col.title.toUpperCase()}
              </h3>
              <ul className="space-y-3">
                {col.items.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.path}
                      className="text-[#FAF3E7]/60 hover:text-[#FAF3E7] transition-colors duration-200"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Contact */}
          <div>
            <h3
              className="text-xs tracking-[0.2em] text-[#D9A441] mb-4"
              style={{ fontFamily: "'JetBrains Mono', monospace" }}
            >
              CONTACT
            </h3>
            <ul className="space-y-3 text-[#FAF3E7]/60">
              <li className="flex items-start">
                <FaMapMarkerAlt className="text-[#C1440E] mt-1 mr-3 flex-shrink-0" />
                <span>123 Culinary Ave, Foodie City FC 12345</span>
              </li>
              <li className="flex items-start">
                <FaPhone className="text-[#C1440E] mt-1 mr-3 flex-shrink-0" />
                <span>+1 (555) REC-IPES</span>
              </li>
              <li className="flex items-start">
                <FaClock className="text-[#C1440E] mt-1 mr-3 flex-shrink-0" />
                <span>Support: Mon–Fri, 9AM–6PM EST</span>
              </li>
              <li className="flex items-start">
                <FaEnvelope className="text-[#C1440E] mt-1 mr-3 flex-shrink-0" />
                <span>hello@recipehub.com</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 mt-8 border-t border-[#FAF3E7]/10 text-center text-[#FAF3E7]/40 text-sm">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="mb-4 md:mb-0">
              &copy; {new Date().getFullYear()} RecipeHub. All culinary rights
              reserved.
            </p>
            <div className="flex space-x-6">
              <a href="#" className="hover:text-[#FAF3E7]/80 transition">
                Privacy Policy
              </a>
              <a href="#" className="hover:text-[#FAF3E7]/80 transition">
                Terms of Service
              </a>
              <a href="#" className="hover:text-[#FAF3E7]/80 transition">
                Cookie Policy
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
