import React from "react";
import { Route, Routes } from "react-router-dom";
import Header from "./component/partials/Header";
import Footer from "./component/partials/Footer";
import Home from "./pages/Home";
import About from "./pages/About";

const App = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow pt-16">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
};

export default App;
