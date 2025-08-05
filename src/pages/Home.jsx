import React from "react";
import Features from "../component/home/Features";
import Testimonials from "../component/home/Testimonials";
import Cta from "../component/home/Cta";
import Hero from "../component/home/Hero";
import RecipePreview from "../component/home/RecipePreview";

const Home = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Hero />

      <RecipePreview />

      <Features />

      <Testimonials />

      <Cta />
    </div>
  );
};

export default Home;
