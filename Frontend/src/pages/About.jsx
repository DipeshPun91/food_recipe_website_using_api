import React, { useEffect, useState } from "react";
import {
  FaUsers,
  FaHeart,
  FaLeaf,
  FaUtensils,
  FaGlobeAmericas,
  FaArrowLeft,
  FaChartLine,
  FaBookOpen,
  FaChevronRight,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Loading from "../component/ui/loading";

const mono = { fontFamily: "'JetBrains Mono', monospace" };
const serif = { fontFamily: "'Fraunces', serif", fontWeight: 600 };

const About = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    totalRecipes: 0,
    categories: 0,
    cuisines: 0,
    loading: true,
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        // Fetch categories count
        const categoriesRes = await fetch(
          "https://www.themealdb.com/api/json/v1/1/categories.php",
        );
        const categoriesData = await categoriesRes.json();

        // Fetch areas count
        const areasRes = await fetch(
          "https://www.themealdb.com/api/json/v1/1/list.php?a=list",
        );
        const areasData = await areasRes.json();

        setStats({
          totalRecipes: 250,
          categories: categoriesData.categories?.length || 0,
          cuisines: areasData.meals?.length || 0,
          loading: false,
        });
      } catch (error) {
        console.error("Error fetching stats:", error);
        setStats({
          totalRecipes: 0,
          categories: 0,
          cuisines: 0,
          loading: false,
        });
      }
    };

    fetchStats();
  }, []);

  if (stats.loading) {
    return <Loading />;
  }

  return (
    <div className="min-h-screen bg-[#FAF3E7]">
      {/* Header Navigation */}
      <div className="sticky top-0 z-10 bg-[#FAF3E7]/90 backdrop-blur-md border-b border-[#E4D9C5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => navigate(-1)}
              className="flex items-center text-[#2B2420]/70 hover:text-[#2B2420] transition-colors group"
            >
              <FaArrowLeft className="mr-2 group-hover:-translate-x-1 transition-transform" />
              <span className="font-medium" style={mono}>
                Back
              </span>
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        {/* Hero Section */}
        <div className="text-center mb-20">
          <div className="inline-block mb-6">
            <div className="w-20 h-20 bg-[#C1440E]/10 rounded-sm flex items-center justify-center mx-auto">
              <FaUtensils className="h-10 w-10 text-[#C1440E]" />
            </div>
          </div>
          <h1
            className="text-4xl md:text-5xl lg:text-6xl text-[#2B2420] mb-6 leading-tight"
            style={serif}
          >
            Our <span className="text-[#C1440E]">Story</span>
          </h1>
          <p className="text-lg md:text-xl text-[#2B2420]/60 max-w-3xl mx-auto leading-relaxed">
            RecipeHub was born from a simple idea: everyone deserves to cook
            delicious meals with confidence, no matter their skill level.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {[
            {
              icon: <FaUtensils className="h-6 w-6 text-[#C1440E]" />,
              label: "Total Recipes",
              value: `${stats.totalRecipes}+`,
              bg: "bg-[#C1440E]/10",
            },
            {
              icon: <FaBookOpen className="h-6 w-6 text-[#4B6B3A]" />,
              label: "Categories",
              value: stats.categories,
              bg: "bg-[#4B6B3A]/10",
            },
            {
              icon: <FaGlobeAmericas className="h-6 w-6 text-[#D9A441]" />,
              label: "Cuisines",
              value: stats.cuisines,
              bg: "bg-[#D9A441]/15",
            },
            {
              icon: <FaChartLine className="h-6 w-6 text-[#2B2420]" />,
              label: "Active Users",
              value: "10K+",
              bg: "bg-[#2B2420]/10",
            },
          ].map((stat, index) => (
            <div
              key={index}
              className="bg-[#FFFBF3] border border-[#E4D9C5] shadow-sm p-6 hover:shadow-md transition-shadow"
            >
              <div className="flex items-center gap-4">
                <div
                  className={`w-12 h-12 rounded-sm ${stat.bg} flex items-center justify-center flex-shrink-0`}
                >
                  {stat.icon}
                </div>
                <div>
                  <div
                    className="text-2xl font-bold text-[#2B2420]"
                    style={serif}
                  >
                    {stat.value}
                  </div>
                  <p
                    className="text-xs text-[#2B2420]/50 tracking-wider"
                    style={mono}
                  >
                    {stat.label}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Mission Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
          <div>
            <span
              className="text-xs text-[#C1440E] tracking-[0.2em] font-semibold uppercase"
              style={mono}
            >
              Our Mission
            </span>
            <h2
              className="text-3xl lg:text-4xl text-[#2B2420] mt-3 mb-6"
              style={serif}
            >
              Making Cooking <br />
              <span className="text-[#C1440E]">Accessible to All</span>
            </h2>
            <div className="space-y-4 text-[#2B2420]/70 leading-relaxed">
              <p>
                At RecipeHub, we're dedicated to making cooking accessible,
                enjoyable, and rewarding for everyone. We believe that great
                food brings people together and creates lasting memories.
              </p>
              <p>
                Our platform combines professional chef expertise with home cook
                practicality, offering thousands of tested recipes with clear
                instructions, helpful tips, and nutritional information.
              </p>
            </div>
            <div className="mt-8 flex flex-wrap gap-4">
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 rounded-sm bg-[#4B6B3A] flex items-center justify-center">
                  <FaLeaf className="h-3 w-3 text-[#FAF3E7]" />
                </div>
                <span className="text-sm text-[#2B2420]/70">
                  Quality Tested
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 rounded-sm bg-[#D9A441] flex items-center justify-center">
                  <FaHeart className="h-3 w-3 text-[#2B2420]" />
                </div>
                <span className="text-sm text-[#2B2420]/70">
                  Community Driven
                </span>
              </div>
            </div>
          </div>
          <div className="relative">
            <div className="bg-[#FFFBF3] rounded-sm border border-[#E4D9C5] overflow-hidden shadow-sm">
              <img
                src="https://images.unsplash.com/photo-1547592180-85f173990554?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
                alt="Chef preparing food"
                className="w-full h-[400px] object-cover"
                onError={(e) => {
                  e.target.src =
                    "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80";
                }}
              />
            </div>
            <div className="absolute -bottom-4 -right-4 bg-[#C1440E] p-4 rounded-sm shadow-[3px_3px_0_0_#2B2420] hidden lg:block">
              <span className="text-[#FAF3E7] font-bold text-sm" style={mono}>
                10+ YEARS
              </span>
            </div>
          </div>
        </div>

        {/* Values Section */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <span
              className="text-xs text-[#C1440E] tracking-[0.2em] font-semibold uppercase"
              style={mono}
            >
              Core Values
            </span>
            <h2
              className="text-3xl lg:text-4xl text-[#2B2420] mt-3"
              style={serif}
            >
              What <span className="text-[#C1440E]">Drives Us</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                icon: <FaUsers className="text-3xl text-[#C1440E]" />,
                title: "Community First",
                description:
                  "We foster a supportive cooking community where everyone can share, learn, and grow together.",
                bg: "bg-[#C1440E]/5",
                border: "border-[#C1440E]/20",
              },
              {
                icon: <FaHeart className="text-3xl text-[#D9A441]" />,
                title: "Passion for Food",
                description:
                  "We're driven by our love for food and the joy it brings to people's lives around the world.",
                bg: "bg-[#D9A441]/5",
                border: "border-[#D9A441]/20",
              },
              {
                icon: <FaLeaf className="text-3xl text-[#4B6B3A]" />,
                title: "Quality Excellence",
                description:
                  "Every recipe is carefully tested, vetted, and refined by our culinary team for perfect results.",
                bg: "bg-[#4B6B3A]/5",
                border: "border-[#4B6B3A]/20",
              },
              {
                icon: (
                  <FaGlobeAmericas className="text-3xl text-[#2B2420]/70" />
                ),
                title: "Global Inspiration",
                description:
                  "We bring the world's diverse cuisines to your kitchen, celebrating food from every culture.",
                bg: "bg-[#2B2420]/5",
                border: "border-[#2B2420]/10",
              },
            ].map((value, index) => (
              <div
                key={index}
                className={`${value.bg} ${value.border} border rounded-sm p-8 hover:shadow-md transition-shadow group`}
              >
                <div className="flex items-start gap-5">
                  <div className="flex-shrink-0 mt-1">{value.icon}</div>
                  <div>
                    <h3 className="text-xl text-[#2B2420] mb-2" style={serif}>
                      {value.title}
                    </h3>
                    <p className="text-[#2B2420]/60 leading-relaxed">
                      {value.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Testimonial / Trust Section */}
        <div className="bg-[#FFFBF3] border border-[#E4D9C5] shadow-sm p-8 md:p-12 mb-20">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex justify-center mb-6">
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <FaHeart key={i} className="h-5 w-5 text-[#C1440E]" />
                ))}
              </div>
            </div>
            <blockquote
              className="text-xl md:text-2xl text-[#2B2420] leading-relaxed"
              style={serif}
            >
              "RecipeHub has transformed the way I cook. The recipes are clear,
              reliable, and always delicious. It's become my go-to resource for
              meal inspiration."
            </blockquote>
            <div className="mt-6">
              <p className="font-semibold text-[#2B2420]">— Maria Rodriguez</p>
              <p className="text-sm text-[#2B2420]/50" style={mono}>
                Home Cook · 2 Years Member
              </p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="relative overflow-hidden bg-[#2B2420] rounded-sm p-10 md:p-14 shadow-[4px_4px_0_0_#C1440E]">
          <div className="relative z-10 text-center">
            <h2
              className="text-2xl md:text-3xl lg:text-4xl text-[#FAF3E7] mb-4"
              style={serif}
            >
              Ready to Start Your <br className="md:hidden" />
              <span className="text-[#D9A441]">Cooking Journey?</span>
            </h2>
            <p className="text-[#FAF3E7]/70 mb-8 max-w-2xl mx-auto leading-relaxed">
              Join thousands of home cooks who are already discovering new
              flavors and improving their skills with RecipeHub.
            </p>
            <button
              onClick={() => navigate("/recipes")}
              className="inline-flex items-center gap-2 bg-[#C1440E] text-[#FAF3E7] hover:bg-[#a3390b] font-semibold px-8 py-4 rounded-sm shadow-[3px_3px_0_0_#D9A441] hover:shadow-[1.5px_1.5px_0_0_#D9A441] transition-all hover:translate-x-0.5 hover:translate-y-0.5"
              style={mono}
            >
              Explore Recipes
              <FaChevronRight className="h-4 w-4" />
            </button>
          </div>
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#C1440E]/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#D9A441]/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>
        </div>
      </div>
    </div>
  );
};

export default About;
