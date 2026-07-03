import React from "react";
import {
  FaSearch,
  FaThumbtack,
  FaPaperclip,
  FaStar,
  FaBook,
  FaChartPie,
  FaUsers,
  FaLeaf,
  FaApple,
  FaGooglePlay,
} from "react-icons/fa";
import Popular from "../component/home/Popular";

const chips = ["Breakfast", "Dinner", "Dessert", "Vegan"];

const features = [
  {
    icon: FaBook,
    label: "THE BASICS",
    title: "10,000+ recipes",
    desc: "A vast, growing collection from every corner of the world, added to weekly.",
  },
  {
    icon: FaChartPie,
    label: "ON THE SIDE",
    title: "Nutrition info",
    desc: "A full nutritional breakdown on every recipe, so you know what's on the plate.",
  },
  {
    icon: FaUsers,
    label: "SHARED TABLE",
    title: "Chef community",
    desc: "Learn from professional chefs and share your own creations with the table.",
  },
  {
    icon: FaLeaf,
    label: "TO TASTE",
    title: "Dietary filters",
    desc: "Vegan, gluten-free, keto, and more — find what fits without the guesswork.",
  },
];

const testimonials = [
  {
    id: 1,
    quote:
      "RecipeHub has transformed my cooking. The step-by-step instructions and video tutorials helped me master dishes I never thought I could make at home.",
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

const Home = () => {
  return (
    <div className="min-h-screen bg-[#FAF3E7]">
      {/* HERO */}
      <section className="pt-32 pb-20 px-4 overflow-hidden">
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center max-w-6xl mx-auto">
            {/* Left: copy + search */}
            <div>
              <span
                className="inline-block text-xs tracking-[0.25em] text-[#C1440E] mb-5"
                style={{ fontFamily: "'JetBrains Mono', monospace" }}
              >
                A DIGITAL COOKBOOK
              </span>

              <h1
                className="text-5xl md:text-6xl text-[#2B2420] mb-6 leading-[1.05]"
                style={{ fontFamily: "'Fraunces', serif", fontWeight: 600 }}
              >
                Cook it. Save it.
                <br />
                Make it <span className="italic text-[#C1440E]">yours</span>.
              </h1>

              <p className="text-lg text-[#2B2420]/65 max-w-lg mb-9 leading-relaxed">
                Thousands of recipes from real kitchens around the world,
                written the way a good cook actually explains them — clear
                steps, honest timing, no mystery ingredients.
              </p>

              <div className="max-w-md mb-6">
                <div className="flex bg-[#FFFBF3] border border-[#E4D9C5] rounded-sm overflow-hidden shadow-sm focus-within:ring-2 focus-within:ring-[#C1440E]/40">
                  <input
                    type="text"
                    placeholder="Search a dish, an ingredient, a craving…"
                    className="flex-grow px-5 py-4 bg-transparent focus:outline-none text-[#2B2420] placeholder-[#2B2420]/35"
                  />
                  <button className="bg-[#C1440E] hover:bg-[#a3390b] text-[#FAF3E7] px-5 flex items-center justify-center transition-colors duration-200">
                    <FaSearch />
                  </button>
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                {chips.map((chip) => (
                  <button
                    key={chip}
                    className="px-4 py-1.5 rounded-full text-sm border border-[#4B6B3A]/40 text-[#4B6B3A] hover:bg-[#4B6B3A] hover:text-[#FAF3E7] transition-colors duration-200"
                  >
                    {chip}
                  </button>
                ))}
              </div>
            </div>

            {/* Right: signature recipe card */}
            <div className="relative mx-auto max-w-sm w-full py-6">
              <div className="absolute inset-0 translate-x-3 translate-y-4 -rotate-6 bg-[#D9A441]/25 rounded-sm" />

              <div className="relative -rotate-2 bg-[#FFFBF3] border border-[#E4D9C5] rounded-sm shadow-xl p-7">
                <FaThumbtack className="absolute -top-3 left-1/2 -translate-x-1/2 text-[#C1440E] text-xl drop-shadow" />

                <p
                  className="text-[11px] tracking-[0.25em] text-[#2B2420]/50 mb-1"
                  style={{ fontFamily: "'JetBrains Mono', monospace" }}
                >
                  RECIPE CARD NO. 01
                </p>
                <h3
                  className="text-2xl text-[#2B2420] mb-4"
                  style={{ fontFamily: "'Fraunces', serif", fontWeight: 600 }}
                >
                  RecipeHub
                </h3>

                <div
                  className="flex justify-between text-[11px] text-[#2B2420]/60 border-y border-dashed border-[#E4D9C5] py-2 mb-4"
                  style={{ fontFamily: "'JetBrains Mono', monospace" }}
                >
                  <span>SERVES: everyone</span>
                  <span>PREP: 2 min</span>
                </div>

                <p
                  className="text-[11px] tracking-[0.2em] text-[#2B2420]/50 mb-2"
                  style={{ fontFamily: "'JetBrains Mono', monospace" }}
                >
                  INGREDIENTS
                </p>
                <ul className="space-y-2 mb-5 text-[#2B2420]/80 text-sm">
                  {[
                    "10,000+ chef-approved recipes",
                    "Step-by-step video guides",
                    "Personalized dietary filters",
                    "A pinch of meal planning",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2.5">
                      <span className="mt-1.5 w-2 h-2 border border-[#4B6B3A] flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>

                <div className="flex items-center justify-between">
                  <span
                    className="w-16 h-16 rounded-full border-2 border-dashed border-[#C1440E]/60 text-[#C1440E] flex items-center justify-center text-[10px] text-center leading-tight -rotate-12"
                    style={{ fontFamily: "'JetBrains Mono', monospace" }}
                  >
                    TASTE
                    <br />
                    APPROVED
                  </span>
                  <FaPaperclip className="text-[#2B2420]/30 text-2xl rotate-45" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Popular />

      {/* FEATURES */}
      <section
        id="features"
        className="py-20 bg-[#FFFBF3] border-y border-[#E4D9C5]"
      >
        <div className="container max-w-6xl mx-auto py-3 md:py-4">
          <div className="text-center mb-14">
            <span
              className="inline-block text-xs tracking-[0.25em] text-[#C1440E] mb-3"
              style={{ fontFamily: "'JetBrains Mono', monospace" }}
            >
              THE PANTRY
            </span>
            <h2
              className="text-4xl md:text-5xl text-[#2B2420]"
              style={{ fontFamily: "'Fraunces', serif", fontWeight: 600 }}
            >
              Everything a kitchen needs
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((f) => (
              <div
                key={f.title}
                className="bg-[#FAF3E7] border border-[#E4D9C5] rounded-sm p-7 hover:shadow-md hover:-translate-y-1 transition-all duration-300"
              >
                <p
                  className="text-[10px] tracking-[0.2em] text-[#4B6B3A] mb-4"
                  style={{ fontFamily: "'JetBrains Mono', monospace" }}
                >
                  {f.label}
                </p>
                <div className="w-12 h-12 rounded-full bg-[#C1440E]/10 text-[#C1440E] flex items-center justify-center text-xl mb-5">
                  <f.icon />
                </div>
                <h3
                  className="text-xl text-[#2B2420] mb-2"
                  style={{ fontFamily: "'Fraunces', serif", fontWeight: 600 }}
                >
                  {f.title}
                </h3>
                <p className="text-[#2B2420]/60 text-sm leading-relaxed">
                  {f.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-20 lg:py-24 bg-[#FAF3E7]">
        <div className="container max-w-6xl mx-auto py-3 md:py-4">
          <div className="text-center mb-14">
            <span
              className="inline-block text-xs tracking-[0.25em] text-[#C1440E] mb-3"
              style={{ fontFamily: "'JetBrains Mono', monospace" }}
            >
              COMMUNITY NOTES
            </span>
            <h2
              className="text-4xl md:text-5xl text-[#2B2420]"
              style={{ fontFamily: "'Fraunces', serif", fontWeight: 600 }}
            >
              What our cooks say
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((t, i) => (
              <div
                key={t.id}
                className={`relative bg-[#FFFBF3] border border-[#E4D9C5] rounded-sm p-7 shadow-sm hover:shadow-md transition-shadow duration-300 ${
                  i % 2 === 0 ? "-rotate-1" : "rotate-1"
                }`}
              >
                <div
                  className="absolute top-6 right-6 w-12 h-12 rounded-full opacity-40"
                  style={{
                    background:
                      "radial-gradient(circle, transparent 55%, #8a5a2b 58%, transparent 62%)",
                  }}
                />
                <FaPaperclip className="absolute -top-2 left-6 text-[#2B2420]/25 text-xl -rotate-12" />

                <div className="flex mb-4 mt-2">
                  {[...Array(5)].map((_, idx) => (
                    <FaStar
                      key={idx}
                      className={`text-sm ${
                        idx < t.rating ? "text-[#D9A441]" : "text-[#E4D9C5]"
                      }`}
                    />
                  ))}
                </div>

                <p className="text-[#2B2420]/75 text-sm leading-relaxed mb-6">
                  {t.quote}
                </p>

                <div className="flex items-center pt-4 border-t border-dashed border-[#E4D9C5]">
                  <div className="bg-[#C1440E]/10 text-[#C1440E] w-10 h-10 rounded-full flex items-center justify-center font-semibold mr-3 text-sm">
                    {t.avatar}
                  </div>
                  <div>
                    <p className="font-semibold text-[#2B2420] text-sm">
                      {t.name}
                    </p>
                    <p
                      className="text-[#2B2420]/50 text-xs"
                      style={{ fontFamily: "'JetBrains Mono', monospace" }}
                    >
                      {t.role.toUpperCase()}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-20 md:py-24 bg-[#2B2420] text-[#FAF3E7] overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <span
              className="inline-block text-xs tracking-[0.25em] text-[#D9A441] mb-5"
              style={{ fontFamily: "'JetBrains Mono', monospace" }}
            >
              TAKE IT WITH YOU
            </span>

            <h2
              className="text-4xl md:text-5xl mb-6 leading-tight"
              style={{ fontFamily: "'Fraunces', serif", fontWeight: 600 }}
            >
              The recipe box that fits in{" "}
              <span className="italic text-[#D9A441]">your pocket</span>
            </h2>

            <p className="text-lg text-[#FAF3E7]/60 mb-11 max-w-xl mx-auto leading-relaxed">
              10,000+ recipes, video guides, and meal plans — hands-free in the
              kitchen, wherever you cook.
            </p>

            <p className="mt-9 text-[#FAF3E7]/50 text-sm">
              Already a member?{" "}
              <a
                href="#"
                className="text-[#D9A441] hover:text-[#e8b95c] font-medium transition-colors"
              >
                Sign in to your account
              </a>
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
