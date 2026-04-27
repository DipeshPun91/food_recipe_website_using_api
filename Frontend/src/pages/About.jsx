import React from "react";
import { FaUsers, FaHeart, FaLeaf, FaUtensils } from "react-icons/fa";

const About = () => {
  return (
    <section className="py-12 md:py-16 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
            Our <span className="text-green-600">Story</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
            RecipeHub was born from a simple idea: everyone deserves to cook
            delicious meals with confidence, no matter their skill level.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
          <div>
            <h2 className="text-3xl font-bold text-gray-800 mb-6">
              Our <span className="text-green-600">Mission</span>
            </h2>
            <p className="text-gray-600 mb-6">
              At RecipeHub, we're dedicated to making cooking accessible,
              enjoyable, and rewarding for everyone. We believe that great food
              brings people together and creates lasting memories.
            </p>
            <p className="text-gray-600">
              Our platform combines professional chef expertise with home cook
              practicality, offering thousands of tested recipes with clear
              instructions, helpful tips, and nutritional information.
            </p>
          </div>
          <div className="bg-gray-100 rounded-xl overflow-hidden h-80">
            <img
              src="https://images.unsplash.com/photo-1547592180-85f173990554"
              alt="Chef preparing food"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        <div className="mb-20">
          <h2 className="text-3xl font-bold text-gray-800 mb-12 text-center">
            Our <span className="text-green-600">Values</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: <FaUsers className="text-4xl text-green-600 mb-4" />,
                title: "Community",
                description:
                  "We foster a supportive cooking community where everyone can share and learn.",
              },
              {
                icon: <FaHeart className="text-4xl text-green-600 mb-4" />,
                title: "Passion",
                description:
                  "We're driven by our love for food and the joy it brings to people's lives.",
              },
              {
                icon: <FaLeaf className="text-4xl text-green-600 mb-4" />,
                title: "Quality",
                description:
                  "Every recipe is carefully tested and vetted by our culinary team.",
              },
              {
                icon: <FaUtensils className="text-4xl text-green-600 mb-4" />,
                title: "Innovation",
                description:
                  "We're constantly improving to bring you the best cooking experience.",
              },
            ].map((value, index) => (
              <div
                key={index}
                className="bg-gray-50 p-8 rounded-xl hover:shadow-md transition-shadow"
              >
                <div className="text-center">
                  {value.icon}
                  <h3 className="text-xl font-semibold mb-3">{value.title}</h3>
                  <p className="text-gray-600">{value.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mb-20">
          <h2 className="text-3xl font-bold text-gray-800 mb-12 text-center">
            Meet Our <span className="text-green-600">Team</span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                name: "Sarah Johnson",
                role: "Head Chef",
                bio: "Former executive chef with 15 years of restaurant experience.",
                image: "https://randomuser.me/api/portraits/women/44.jpg",
              },
              {
                name: "Michael Chen",
                role: "Nutritionist",
                bio: "Registered dietitian specializing in healthy meal planning.",
                image: "https://randomuser.me/api/portraits/men/32.jpg",
              },
              {
                name: "David Wilson",
                role: "Tech Lead",
                bio: "Makes sure our platform works seamlessly for all users.",
                image: "https://randomuser.me/api/portraits/men/75.jpg",
              },
              {
                name: "Emily Rodriguez",
                role: "Community Manager",
                bio: "Connects our users and helps build our cooking community.",
                image: "https://randomuser.me/api/portraits/women/63.jpg",
              },
            ].map((member, index) => (
              <div key={index} className="text-center">
                <div className="w-40 h-40 mx-auto mb-4 rounded-full overflow-hidden border-4 border-green-100">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-xl font-semibold">{member.name}</h3>
                <p className="text-green-600 mb-2">{member.role}</p>
                <p className="text-gray-600">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-gradient-to-r from-green-600 to-green-700 text-white rounded-xl p-8 md:p-12 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Ready to start your cooking journey?
          </h2>
          <p className="text-green-100 mb-6 max-w-2xl mx-auto">
            Join thousands of home cooks who are already improving their skills
            with RecipeHub.
          </p>
          <button className="bg-white text-green-600 hover:bg-gray-100 font-semibold px-8 py-3 rounded-lg transition-colors">
            Explore Recipes
          </button>
        </div>
      </div>
    </section>
  );
};

export default About;
