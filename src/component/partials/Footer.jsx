import React from "react";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer id="contact" className="bg-gray-900 text-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          <div>
            <h3 className="text-xl font-bold mb-4 relative pb-2 after:absolute after:bottom-0 after:left-0 after:w-10 after:h-0.5 after:bg-red-500">
              GourmetExpress
            </h3>
            <p className="text-gray-400 mb-4">
              Delivering delicious food to your doorstep since 2015. We pride
              ourselves on quality, speed, and excellent customer service.
            </p>
            <div className="flex space-x-4">
              <a
                href="#"
                className="bg-gray-800 w-10 h-10 rounded-full flex items-center justify-center hover:bg-red-500 transition"
              >
                <FaFacebookF />
              </a>
              <a
                href="#"
                className="bg-gray-800 w-10 h-10 rounded-full flex items-center justify-center hover:bg-red-500 transition"
              >
                <FaTwitter />
              </a>
              <a
                href="#"
                className="bg-gray-800 w-10 h-10 rounded-full flex items-center justify-center hover:bg-red-500 transition"
              >
                <FaInstagram />
              </a>
              <a
                href="#"
                className="bg-gray-800 w-10 h-10 rounded-full flex items-center justify-center hover:bg-red-500 transition"
              >
                <FaLinkedinIn />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-4 relative pb-2 after:absolute after:bottom-0 after:left-0 after:w-10 after:h-0.5 after:bg-red-500">
              Quick Links
            </h3>
            <ul className="space-y-2">
              {["Home", "Menu", "About Us", "Contact", "FAQ"].map((link) => (
                <li key={link}>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-red-500 transition"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-4 relative pb-2 after:absolute after:bottom-0 after:left-0 after:w-10 after:h-0.5 after:bg-red-500">
              Contact Us
            </h3>
            <ul className="space-y-3 text-gray-400">
              <li className="flex items-start">
                <span className="mr-3 mt-1 text-red-500">📍</span>
                123 Food Street, New York
              </li>
              <li className="flex items-start">
                <span className="mr-3 mt-1 text-red-500">📞</span>
                +1 (555) 123-4567
              </li>
              <li className="flex items-start">
                <span className="mr-3 mt-1 text-red-500">✉️</span>
                info@gourmetexpress.com
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-4 relative pb-2 after:absolute after:bottom-0 after:left-0 after:w-10 after:h-0.5 after:bg-red-500">
              Opening Hours
            </h3>
            <ul className="space-y-2 text-gray-400">
              <li>Monday - Friday: 9am - 10pm</li>
              <li>Saturday: 10am - 11pm</li>
              <li>Sunday: 10am - 9pm</li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-gray-800 text-center text-gray-500 text-sm">
          <p>
            &copy; 2023 GourmetExpress. All Rights Reserved. | Designed with ❤️
            by Food Lovers
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
