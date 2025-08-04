import React from "react";
import { FaQuoteLeft, FaQuoteRight, FaStar } from "react-icons/fa";

const Testimonials = () => {
  const testimonials = [
    {
      id: 1,
      quote:
        "RecipeHub has transformed my cooking! The step-by-step instructions and video tutorials helped me master dishes I never thought I could make at home.",
      name: "Emily Rodriguez",
      role: "Home Cook",
      rating: 5,
      avatar: "ER",
    },
    {
      id: 2,
      quote:
        "As a professional chef, I appreciate the accuracy of the recipes. The ingredient measurements are precise and techniques are well-explained.",
      name: "Marcus Tan",
      role: "Executive Chef",
      rating: 5,
      avatar: "MT",
    },
    {
      id: 3,
      quote:
        "The dietary filters saved me so much time. Finding gluten-free recipes that actually taste good was a struggle before RecipeHub.",
      name: "Sophia Chen",
      role: "Health Enthusiast",
      rating: 4,
      avatar: "SC",
    },
  ];

  return (
    <section className="py-12 md:py-16 lg:py-20 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-2 text-sm font-semibold text-green-600 bg-green-50 rounded-full mb-4 uppercase tracking-wider">
            Community Love
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            What Our Cooks Say
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            Join thousands of home cooks who've elevated their cooking with
            RecipeHub
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="bg-white p-6 md:p-8 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 flex flex-col"
            >
              <div className="flex mb-4">
                {[...Array(5)].map((_, i) => (
                  <FaStar
                    key={i}
                    className={`text-lg ${
                      i < testimonial.rating
                        ? "text-amber-400"
                        : "text-gray-200"
                    }`}
                  />
                ))}
              </div>

              <div className="relative mb-6 flex-grow">
                <FaQuoteLeft className="text-green-100 text-2xl absolute -top-2 -left-1" />
                <p className="text-gray-700 text-base md:text-lg pl-6">
                  {testimonial.quote}
                </p>
                <FaQuoteRight className="text-green-100 text-2xl absolute -bottom-2 -right-1" />
              </div>

              <div className="flex items-center mt-auto">
                <div className="bg-green-100 text-green-600 w-12 h-12 rounded-full flex items-center justify-center font-bold mr-4 text-lg">
                  {testimonial.avatar}
                </div>
                <div>
                  <p className="font-semibold text-gray-800">
                    {testimonial.name}
                  </p>
                  <p className="text-gray-500 text-sm">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
