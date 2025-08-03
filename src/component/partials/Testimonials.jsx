import React from "react";
import { FaQuoteLeft, FaQuoteRight } from "react-icons/fa";

const Testimonials = () => {
  const testimonials = [
    {
      id: 1,
      quote:
        "The food arrived hot and fresh, exactly as described on the menu. The flavors were incredible and the portion was generous. I'll definitely be ordering again!",
      name: "Sarah Johnson",
      role: "Regular Customer",
      rating: 5,
    },
    {
      id: 2,
      quote:
        "Exceptional service and the chicken dishes were cooked to perfection. The delivery was faster than expected too!",
      name: "Michael Chen",
      role: "Food Blogger",
      rating: 5,
    },
    {
      id: 3,
      quote:
        "As a busy professional, this service has been a lifesaver. Quality meals without the hassle of cooking or going out.",
      name: "David Wilson",
      role: "Monthly Subscriber",
      rating: 4,
    },
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <span className="inline-block px-3 py-1 text-sm font-semibold text-red-500 bg-red-50 rounded-full mb-4">
            Testimonials
          </span>
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            Trusted by Thousands of Food Lovers
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Don't just take our word for it. Here's what our customers say about
            their experience.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex mb-4">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className={`w-5 h-5 ${
                      i < testimonial.rating
                        ? "text-yellow-400"
                        : "text-gray-300"
                    }`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-gray-700 mb-6 relative">
                <FaQuoteLeft className="text-red-100 text-xl mb-2" />
                {testimonial.quote}
                <FaQuoteRight className="text-red-100 text-xl mt-2 ml-auto" />
              </p>
              <div className="flex items-center">
                <div className="bg-red-100 text-red-600 w-10 h-10 rounded-full flex items-center justify-center font-bold mr-3">
                  {testimonial.name.charAt(0)}
                </div>
                <div>
                  <p className="font-semibold">{testimonial.name}</p>
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
