import React, { useState, useEffect, useContext, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaPlus,
  FaHeart,
  FaStar,
  FaUtensils,
  FaUser,
  FaSignOutAlt,
  FaChevronLeft,
  FaChevronRight,
  FaTimes,
} from "react-icons/fa";
import { AuthContext } from "../context/AuthContext";
import { apiRequest } from "../services/api";
import Loading from "../component/ui/loading";
import RecipeForm from "../component/dashboard/RecipeForm";
import RecipeCard from "../component/dashboard/RecipeCard";
import EmptyState from "../component/ui/EmptyState";

const mono = { fontFamily: "'JetBrains Mono', monospace" };
const serif = { fontFamily: "'Fraunces', serif", fontWeight: 600 };

const Dashboard = () => {
  const { currentUser, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  // States
  const [activeTab, setActiveTab] = useState("my-recipes");
  const [recipes, setRecipes] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [ratings, setRatings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showRecipeForm, setShowRecipeForm] = useState(false);
  const [editingRecipe, setEditingRecipe] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(6);

  // Form data
  const [formData, setFormData] = useState({
    strMeal: "",
    strCategory: "",
    strArea: "",
    strInstructions: "",
    strMealThumb: "",
    strYoutube: "",
    strIngredients: [{ ingredient: "", measure: "" }],
    strTags: "",
    strSource: "",
  });

  const getUserId = (user) => user?._id || user?.id || user?.userId;

  // Fetch user data
  const fetchUserData = useCallback(async () => {
    try {
      const userId = getUserId(currentUser);
      if (!userId) {
        throw new Error("Logged-in user ID is not available");
      }

      setLoading(true);

      const recipesRes = await apiRequest.get(`/users/${userId}/recipes`);
      setRecipes(recipesRes.data.data || []);

      const wishlistRes = await apiRequest.get(`/users/${userId}/wishlist`);
      setWishlist(wishlistRes.data.data || []);

      const ratingsRes = await apiRequest.get(`/users/${userId}/ratings`);
      setRatings(ratingsRes.data.data || []);

      setError(null);
    } catch (err) {
      console.error("Error fetching user data:", err);
      setError(err.response?.data?.message || "Failed to load dashboard data");
    } finally {
      setLoading(false);
    }
  }, [currentUser]);

  // Check authentication and fetch data
  useEffect(() => {
    const userId = getUserId(currentUser);
    if (!userId) {
      setError("Session expired. Please sign in again.");
      logout();
      navigate("/login");
      return;
    }
    fetchUserData();
  }, [currentUser, logout, navigate, fetchUserData]);

  // Reset form
  const resetForm = () => {
    setFormData({
      strMeal: "",
      strCategory: "",
      strArea: "",
      strInstructions: "",
      strMealThumb: "",
      strYoutube: "",
      strIngredients: [{ ingredient: "", measure: "" }],
      strTags: "",
      strSource: "",
    });
    setEditingRecipe(null);
    setShowRecipeForm(false);
  };

  // Handle recipe submission
  const handleSubmitRecipe = async (e) => {
    e.preventDefault();
    try {
      const url = editingRecipe ? `/recipes/${editingRecipe._id}` : "/recipes";
      const method = editingRecipe ? "put" : "post";

      const response = await apiRequest[method](url, formData);

      if (response.data.success) {
        await fetchUserData();
        resetForm();
      }
    } catch (err) {
      console.error("Error saving recipe:", err);
      setError(err.response?.data?.message || "Failed to save recipe");
    }
  };

  const handleEditRecipe = (recipe) => {
    setEditingRecipe(recipe);
    setFormData({
      strMeal: recipe.strMeal || "",
      strCategory: recipe.strCategory || "",
      strArea: recipe.strArea || "",
      strInstructions: recipe.strInstructions || "",
      strMealThumb: recipe.strMealThumb || "",
      strYoutube: recipe.strYoutube || "",
      strIngredients: recipe.strIngredients?.length
        ? recipe.strIngredients
        : [{ ingredient: "", measure: "" }],
      strTags: recipe.strTags || "",
      strSource: recipe.strSource || "",
    });
    setShowRecipeForm(true);
  };

  const handleDeleteRecipe = async (recipeId) => {
    if (!window.confirm("Are you sure you want to delete this recipe?")) return;
    try {
      await apiRequest.delete(`/recipes/${recipeId}`);
      await fetchUserData();
    } catch (err) {
      console.error("Error deleting recipe:", err);
      setError("Failed to delete recipe");
    }
  };

  const handleWishlistToggle = async (recipeId) => {
    try {
      const isInWishlist = wishlist.some(
        (item) => item.recipeId?._id === recipeId,
      );

      if (isInWishlist) {
        await apiRequest.delete(`/recipes/wishlist/${recipeId}`);
      } else {
        await apiRequest.post("/recipes/wishlist", { recipeId });
      }
      await fetchUserData();
    } catch (err) {
      console.error("Error toggling wishlist:", err);
      setError("Failed to update wishlist");
    }
  };

  const handleRating = async (recipeId, rating) => {
    try {
      await apiRequest.post(`/recipes/${recipeId}/rate`, { rating });
      await fetchUserData();
    } catch (err) {
      console.error("Error rating recipe:", err);
      setError("Failed to rate recipe");
    }
  };

  const getUserRating = (recipeId) => {
    const rating = ratings.find((r) => r.recipeId?._id === recipeId);
    return rating?.rating || 0;
  };

  const isInWishlist = (recipeId) => {
    return wishlist.some((item) => item.recipeId?._id === recipeId);
  };

  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentRecipes = recipes.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(recipes.length / itemsPerPage);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (loading) {
    return <Loading />;
  }

  if (!currentUser) {
    return null;
  }

  return (
    <div className="min-h-screen bg-[#FAF3E7] pt-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Dashboard Header */}
        <div className="bg-[#FFFBF3] border border-[#E4D9C5] rounded-sm shadow-sm p-6 mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-[#C1440E]/10 rounded-full flex items-center justify-center">
                {currentUser?.avatar ? (
                  <img
                    src={currentUser.avatar}
                    alt={currentUser.username}
                    className="w-full h-full rounded-full object-cover"
                  />
                ) : (
                  <FaUser className="h-8 w-8 text-[#C1440E]" />
                )}
              </div>
              <div>
                <h1 className="text-2xl text-[#2B2420]" style={serif}>
                  Welcome back, {currentUser?.username}
                </h1>
                <p className="text-[#2B2420]/60 text-sm" style={mono}>
                  {currentUser?.email}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={fetchUserData}
                className="px-4 py-2 text-sm bg-[#FAF3E7] border border-[#E4D9C5] rounded-sm hover:bg-[#FFFBF3] transition-colors"
                style={mono}
              >
                Refresh
              </button>
              <button
                onClick={logout}
                className="flex items-center gap-2 px-4 py-2 text-sm bg-[#C1440E] text-[#FAF3E7] rounded-sm hover:bg-[#a3390b] transition-colors"
                style={mono}
              >
                <FaSignOutAlt className="h-4 w-4" />
                Logout
              </button>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6 pt-6 border-t border-[#E4D9C5]">
            <div className="text-center">
              <div className="text-2xl font-bold text-[#2B2420]" style={serif}>
                {recipes.length}
              </div>
              <p className="text-xs text-[#2B2420]/50" style={mono}>
                MY RECIPES
              </p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-[#2B2420]" style={serif}>
                {wishlist.length}
              </div>
              <p className="text-xs text-[#2B2420]/50" style={mono}>
                WISHLIST
              </p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-[#2B2420]" style={serif}>
                {ratings.length}
              </div>
              <p className="text-xs text-[#2B2420]/50" style={mono}>
                RATED
              </p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-[#2B2420]" style={serif}>
                {recipes.reduce((acc, r) => acc + (r.totalRatings || 0), 0)}
              </div>
              <p className="text-xs text-[#2B2420]/50" style={mono}>
                TOTAL RATINGS
              </p>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap gap-2 mb-8">
          <button
            onClick={() => setActiveTab("my-recipes")}
            className={`px-6 py-3 rounded-sm transition-all ${
              activeTab === "my-recipes"
                ? "bg-[#C1440E] text-[#FAF3E7] shadow-[3px_3px_0_0_#2B2420]"
                : "bg-[#FFFBF3] border border-[#E4D9C5] text-[#2B2420]/70 hover:bg-[#FAF3E7]"
            }`}
            style={mono}
          >
            <FaUtensils className="inline mr-2" />
            My Recipes
          </button>
          <button
            onClick={() => setActiveTab("wishlist")}
            className={`px-6 py-3 rounded-sm transition-all ${
              activeTab === "wishlist"
                ? "bg-[#C1440E] text-[#FAF3E7] shadow-[3px_3px_0_0_#2B2420]"
                : "bg-[#FFFBF3] border border-[#E4D9C5] text-[#2B2420]/70 hover:bg-[#FAF3E7]"
            }`}
            style={mono}
          >
            <FaHeart className="inline mr-2" />
            Wishlist
          </button>
          <button
            onClick={() => setActiveTab("ratings")}
            className={`px-6 py-3 rounded-sm transition-all ${
              activeTab === "ratings"
                ? "bg-[#C1440E] text-[#FAF3E7] shadow-[3px_3px_0_0_#2B2420]"
                : "bg-[#FFFBF3] border border-[#E4D9C5] text-[#2B2420]/70 hover:bg-[#FAF3E7]"
            }`}
            style={mono}
          >
            <FaStar className="inline mr-2" />
            My Ratings
          </button>
          <button
            onClick={() => {
              setActiveTab("my-recipes");
              setShowRecipeForm(true);
              setEditingRecipe(null);
              setFormData({
                strMeal: "",
                strCategory: "",
                strArea: "",
                strInstructions: "",
                strMealThumb: "",
                strYoutube: "",
                strIngredients: [{ ingredient: "", measure: "" }],
                strTags: "",
                strSource: "",
              });
            }}
            className="px-6 py-3 rounded-sm bg-[#4B6B3A] text-[#FAF3E7] hover:bg-[#3d5a2e] transition-all shadow-[3px_3px_0_0_#2B2420]"
            style={mono}
          >
            <FaPlus className="inline mr-2" />
            Add Recipe
          </button>
        </div>

        {/* Error Display */}
        {error && (
          <div className="bg-[#C1440E]/5 border border-[#C1440E]/20 text-[#C1440E] px-4 py-3 rounded-sm mb-6 flex items-center justify-between">
            <span>{error}</span>
            <button onClick={() => setError(null)}>
              <FaTimes className="h-4 w-4" />
            </button>
          </div>
        )}

        {/* My Recipes Tab */}
        {activeTab === "my-recipes" && (
          <div>
            {showRecipeForm && (
              <RecipeForm
                formData={formData}
                setFormData={setFormData}
                onSubmit={handleSubmitRecipe}
                onCancel={resetForm}
                editingRecipe={editingRecipe}
              />
            )}

            {recipes.length === 0 ? (
              <EmptyState
                icon={<FaUtensils className="h-9 w-9 text-[#2B2420]/30" />}
                title="No recipes yet"
                description="Start sharing your culinary creations with the world!"
                buttonText="Add Your First Recipe"
                onAction={() => {
                  setShowRecipeForm(true);
                  setEditingRecipe(null);
                  setFormData({
                    strMeal: "",
                    strCategory: "",
                    strArea: "",
                    strInstructions: "",
                    strMealThumb: "",
                    strYoutube: "",
                    strIngredients: [{ ingredient: "", measure: "" }],
                    strTags: "",
                    strSource: "",
                  });
                }}
              />
            ) : (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {currentRecipes.map((recipe) => (
                    <RecipeCard
                      key={recipe._id}
                      recipe={recipe}
                      onEdit={handleEditRecipe}
                      onDelete={handleDeleteRecipe}
                      onWishlistToggle={handleWishlistToggle}
                      isInWishlist={isInWishlist}
                    />
                  ))}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="mt-8 flex justify-center">
                    <nav className="flex items-center gap-2">
                      <button
                        onClick={() => paginate(currentPage - 1)}
                        disabled={currentPage === 1}
                        className="px-4 py-2 rounded-sm border border-[#E4D9C5] text-[#2B2420]/70 hover:bg-[#FFFBF3] disabled:opacity-40 disabled:cursor-not-allowed transition-all"
                      >
                        <FaChevronLeft />
                      </button>
                      {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                        (page) => (
                          <button
                            key={page}
                            onClick={() => paginate(page)}
                            className={`w-10 h-10 rounded-sm transition-all ${
                              currentPage === page
                                ? "bg-[#C1440E] text-[#FAF3E7] shadow-[2px_2px_0_0_#2B2420]"
                                : "border border-[#E4D9C5] text-[#2B2420]/70 hover:bg-[#FFFBF3]"
                            }`}
                          >
                            {page}
                          </button>
                        ),
                      )}
                      <button
                        onClick={() => paginate(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className="px-4 py-2 rounded-sm border border-[#E4D9C5] text-[#2B2420]/70 hover:bg-[#FFFBF3] disabled:opacity-40 disabled:cursor-not-allowed transition-all"
                      >
                        <FaChevronRight />
                      </button>
                    </nav>
                  </div>
                )}
              </>
            )}
          </div>
        )}

        {/* Wishlist Tab */}
        {activeTab === "wishlist" && (
          <div>
            {wishlist.length === 0 ? (
              <EmptyState
                icon={<FaHeart className="h-9 w-9 text-[#2B2420]/30" />}
                title="Your wishlist is empty"
                description="Start saving recipes you love from the recipe collection."
              />
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {wishlist.map((item) => {
                  const recipe = item.recipeId;
                  if (!recipe) return null;
                  return (
                    <RecipeCard
                      key={item._id}
                      recipe={recipe}
                      onEdit={handleEditRecipe}
                      onDelete={handleDeleteRecipe}
                      onWishlistToggle={handleWishlistToggle}
                      isInWishlist={isInWishlist}
                      showWishlistButton={true}
                    />
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* Ratings Tab */}
        {activeTab === "ratings" && (
          <div>
            {ratings.length === 0 ? (
              <EmptyState
                icon={<FaStar className="h-9 w-9 text-[#2B2420]/30" />}
                title="No ratings yet"
                description="Rate recipes you've tried and share your feedback."
              />
            ) : (
              <div className="space-y-4">
                {ratings.map((item) => {
                  const recipe = item.recipeId;
                  if (!recipe) return null;
                  return (
                    <div
                      key={item._id}
                      className="bg-[#FFFBF3] border border-[#E4D9C5] rounded-sm p-4 hover:shadow-md transition-all"
                    >
                      <div className="flex items-start gap-4">
                        <img
                          src={recipe.strMealThumb}
                          alt={recipe.strMeal}
                          className="w-20 h-20 object-cover rounded-sm"
                          onError={(e) => {
                            e.target.src =
                              "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80";
                          }}
                        />
                        <div className="flex-1">
                          <h3
                            className="text-lg text-[#2B2420] cursor-pointer hover:text-[#C1440E] transition-colors"
                            onClick={() => navigate(`/recipes/${recipe._id}`)}
                            style={serif}
                          >
                            {recipe.strMeal}
                          </h3>
                          <div className="flex items-center gap-2 mt-1">
                            <div className="flex items-center gap-1">
                              {[1, 2, 3, 4, 5].map((star) => (
                                <button
                                  key={star}
                                  onClick={() => handleRating(recipe._id, star)}
                                  className="focus:outline-none"
                                >
                                  {star <= (getUserRating(recipe._id) || 0) ? (
                                    <FaStar className="h-5 w-5 text-[#D9A441]" />
                                  ) : (
                                    <FaRegStar className="h-5 w-5 text-[#E4D9C5]" />
                                  )}
                                </button>
                              ))}
                            </div>
                            <span
                              className="text-sm text-[#2B2420]/50"
                              style={mono}
                            >
                              {new Date(item.ratedAt).toLocaleDateString()}
                            </span>
                          </div>
                          <div className="flex gap-2 mt-2">
                            <span
                              className="px-2 py-0.5 text-xs bg-[#4B6B3A]/10 text-[#4B6B3A] rounded-sm"
                              style={mono}
                            >
                              {recipe.strCategory}
                            </span>
                            <span
                              className="px-2 py-0.5 text-xs bg-[#D9A441]/15 text-[#8a6417] rounded-sm"
                              style={mono}
                            >
                              {recipe.strArea}
                            </span>
                          </div>
                        </div>
                        <button
                          onClick={() => navigate(`/recipes/${recipe._id}`)}
                          className="px-4 py-2 text-sm bg-[#C1440E] text-[#FAF3E7] rounded-sm hover:bg-[#a3390b] transition-colors"
                          style={mono}
                        >
                          View Recipe
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
