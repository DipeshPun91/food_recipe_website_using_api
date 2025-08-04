import React from "react";
import {
  FaBookOpen,
  FaMobileAlt,
  FaHeart,
  FaApple,
  FaGooglePlay,
} from "react-icons/fa";

const Cta = () => {
  return (
    <section className="relative py-16 md:py-24 bg-gradient-to-br from-green-600 to-green-700 text-white overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full opacity-5">
        <div className="absolute top-1/4 left-1/4 w-40 h-40 bg-white rounded-full mix-blend-soft-light"></div>
        <div className="absolute bottom-1/3 right-1/3 w-48 h-48 bg-white rounded-full mix-blend-soft-light"></div>
        <div className="absolute top-1/2 right-1/4 w-24 h-24 bg-white rounded-full mix-blend-soft-light"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <span className="inline-block px-4 py-2 text-sm font-semibold text-green-600 bg-white rounded-full mb-6 uppercase tracking-wider shadow-sm">
            Join Our Community
          </span>

          <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
            Elevate Your <span className="text-amber-300">Cooking Skills</span>
          </h2>

          <p className="text-lg md:text-xl text-green-100 mb-10 max-w-2xl mx-auto">
            Unlock
            <span className="font-semibold text-white">
              10,000+ chef-approved recipes
            </span>
            ,
            <span className="font-semibold text-white">
              step-by-step video guides
            </span>
            , and
            <span className="font-semibold text-white">
              personalized meal plans
            </span>
            with our app.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="bg-white/10 backdrop-blur-md p-6 rounded-xl border border-white/10 hover:border-white/20 transition-all duration-300">
              <div className="bg-green-700/30 w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4">
                <FaBookOpen className="text-2xl text-green-200" />
              </div>
              <h3 className="font-bold text-lg mb-2">Premium Recipes</h3>
              <p className="text-sm text-green-100">
                Chef-curated recipes with pro techniques
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-md p-6 rounded-xl border border-white/10 hover:border-white/20 transition-all duration-300">
              <div className="bg-green-700/30 w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4">
                <FaMobileAlt className="text-2xl text-green-200" />
              </div>
              <h3 className="font-bold text-lg mb-2">Mobile Kitchen</h3>
              <p className="text-sm text-green-100">
                Hands-free cooking with voice commands
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-md p-6 rounded-xl border border-white/10 hover:border-white/20 transition-all duration-300">
              <div className="bg-green-700/30 w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4">
                <FaHeart className="text-2xl text-green-200" />
              </div>
              <h3 className="font-bold text-lg mb-2">Your Collection</h3>
              <p className="text-sm text-green-100">
                Save and organize your favorite recipes
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row justify-center gap-4 max-w-md mx-auto">
            <button className="flex items-center justify-center bg-white hover:bg-gray-100 text-gray-900 px-6 py-4 rounded-xl font-medium transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
              <FaApple className="text-xl mr-3" />
              <div className="text-left">
                <div className="text-xs">Download on the</div>
                <div className="text-lg font-bold">App Store</div>
              </div>
            </button>

            <button className="flex items-center justify-center bg-gray-900 hover:bg-gray-800 text-white px-6 py-4 rounded-xl font-medium transition-all duration-300 hover:shadow-lg hover:-translate-y-1 border border-gray-700">
              <FaGooglePlay className="text-xl mr-3" />
              <div className="text-left">
                <div className="text-xs">Get it on</div>
                <div className="text-lg font-bold">Google Play</div>
              </div>
            </button>
          </div>

          <div className="mt-10">
            <p className="text-green-100">
              Already a member?
              <a
                href="#"
                className="font-semibold text-white hover:text-amber-300 transition-colors"
              >
                Sign in to your account
              </a>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Cta;
