import React from "react";
import { FaApple, FaGooglePlay, FaArrowRight } from "react-icons/fa";

const Cta = () => {
  return (
    <section className="relative py-20 bg-gradient-to-r from-red-600 to-orange-600 text-white overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full opacity-10">
        <div className="absolute top-10 left-10 w-32 h-32 bg-white rounded-full"></div>
        <div className="absolute bottom-20 right-20 w-40 h-40 bg-white rounded-full"></div>
        <div className="absolute top-1/3 right-1/4 w-16 h-16 bg-white rounded-full"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <span className="inline-block px-4 py-1 text-sm font-semibold text-red-600 bg-white rounded-full mb-4">
            Limited Time Offer
          </span>
          <h2 className="text-4xl font-bold mb-6">
            Ready to enjoy restaurant-quality meals at home?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Download our app now and get{" "}
            <span className="font-bold">20% off</span> your first order with
            code <span className="font-bold">WELCOME20</span>
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-8">
            <button className="flex items-center justify-center bg-black hover:bg-gray-900 text-white px-6 py-3 rounded-lg font-medium transition">
              <FaApple className="mr-2 text-xl" />
              <div className="text-left">
                <div className="text-xs">Download on the</div>
                <div className="text-lg">App Store</div>
              </div>
            </button>

            <button className="flex items-center justify-center bg-white hover:bg-gray-100 text-gray-800 px-6 py-3 rounded-lg font-medium transition">
              <FaGooglePlay className="mr-2 text-xl" />
              <div className="text-left">
                <div className="text-xs">Get it on</div>
                <div className="text-lg">Google Play</div>
              </div>
            </button>
          </div>

          <div className="flex items-center justify-center text-sm">
            <span className="mr-2">Prefer to order online?</span>
            <a
              href="#"
              className="flex items-center font-semibold hover:underline"
            >
              Order Now <FaArrowRight className="ml-1" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Cta;
