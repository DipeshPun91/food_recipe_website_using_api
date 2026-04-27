import React from "react";
import { Route, Routes } from "react-router-dom";
import Layout from "./component/partials/Layout";
import Home from "./pages/Home";
import About from "./pages/About";
import Recipe from "./pages/Recipe";
import RecipeDetail from "./pages/RecipeDetail";
import SignIn from "./pages/auth/SignIn";
import SignUp from "./pages/auth/SignUp";
import Profile from "./pages/Profile";
const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/recipes" element={<Recipe />} />
          <Route path="/recipes/:id" element={<RecipeDetail />} />
          <Route path="/profile" element={<Profile />} />
        </Route>

        <Route path="/login" element={<SignIn />} />
        <Route path="/register" element={<SignUp />} />
      </Routes>
    </>
  );
};

export default App;
