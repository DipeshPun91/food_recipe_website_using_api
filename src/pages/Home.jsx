import React from "react";
import Menu from "../component/home/Menu";
import Features from "../component/home/Features";
import Testimonials from "../component/home/Testimonials";
import Cta from "../component/home/Cta";
import Hero from "../component/home/Hero";

const Home = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Hero />

      <Menu />

      <Features />

      <Testimonials />

      <Cta />
    </div>
  );
};

export default Home;
