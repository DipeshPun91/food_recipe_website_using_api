import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaUser,
  FaEnvelope,
  FaCamera,
  FaSignOutAlt,
  FaClock,
  FaHeart,
  FaStar,
  FaEdit,
  FaLink,
} from "react-icons/fa";
import { AuthContext } from "../context/AuthContext";
import { apiRequest } from "../services/api";
import defaultAvatar from "../assets/default_user.png";

const Profile = () => {
  const { currentUser, logout, updateUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    username: currentUser?.username || "",
    email: currentUser?.email || "",
    avatar: currentUser?.avatar || "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [previewAvatar, setPreviewAvatar] = useState(currentUser?.avatar || "");

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    // Update preview when avatar URL changes
    if (name === "avatar") {
      setPreviewAvatar(value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await apiRequest.put(`/user/${currentUser._id}`, formData);
      updateUser(res.data.data);
      setIsEditing(false);
      setError("");
    } catch (error) {
      setError(error.response?.data?.message || "Failed to update profile");
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  if (!currentUser) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center pt-16 pb-16">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Please sign in to view your profile
          </h2>
          <button
            onClick={() => navigate("/login")}
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
          >
            Sign In
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-20 pb-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="bg-green-600 px-6 py-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <img
                    src={currentUser.avatar || defaultAvatar}
                    alt={currentUser.username}
                    className="w-20 h-20 rounded-full object-cover border-4 border-white"
                    onError={(e) => {
                      e.target.src = defaultAvatar;
                    }}
                  />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-white">
                    {currentUser.username}
                  </h1>
                  <p className="text-green-100">{currentUser.email}</p>
                  <p className="text-green-200 text-sm mt-1">
                    Member since{" "}
                    {new Date(currentUser.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsEditing(true)}
                className="bg-white text-green-600 px-4 py-2 rounded-lg font-medium hover:bg-green-50 transition-colors flex items-center"
              >
                <FaEdit className="mr-2" />
                Edit Profile
              </button>
            </div>
          </div>

          <div className="p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6">
              Profile Information
            </h2>

            <div className="space-y-6">
              <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                <div className="bg-green-100 p-3 rounded-full">
                  <FaUser className="text-green-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Username</p>
                  <p className="text-lg font-semibold text-gray-900">
                    {currentUser.username}
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                <div className="bg-green-100 p-3 rounded-full">
                  <FaEnvelope className="text-green-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Email</p>
                  <p className="text-lg font-semibold text-gray-900">
                    {currentUser.email}
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-gray-200">
              <button
                onClick={handleLogout}
                className="w-full bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-medium transition-colors flex items-center justify-center"
              >
                <FaSignOutAlt className="mr-2" />
                Sign Out
              </button>
            </div>
          </div>
        </div>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg shadow p-6 text-center hover:shadow-md transition-shadow">
            <div className="bg-amber-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
              <FaClock className="text-amber-600 text-xl" />
            </div>
            <div className="text-3xl font-bold text-gray-900">12</div>
            <div className="text-gray-600 font-medium">Recipes Created</div>
          </div>

          <div className="bg-white rounded-lg shadow p-6 text-center hover:shadow-md transition-shadow">
            <div className="bg-red-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
              <FaHeart className="text-red-600 text-xl" />
            </div>
            <div className="text-3xl font-bold text-gray-900">47</div>
            <div className="text-gray-600 font-medium">Recipes Saved</div>
          </div>

          <div className="bg-white rounded-lg shadow p-6 text-center hover:shadow-md transition-shadow">
            <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
              <FaStar className="text-blue-600 text-xl" />
            </div>
            <div className="text-3xl font-bold text-gray-900">23</div>
            <div className="text-gray-600 font-medium">Reviews Written</div>
          </div>
        </div>

        <div className="mt-8 bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">
            Quick Actions
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <button
              onClick={() => navigate("/recipes")}
              className="p-4 border border-green-200 rounded-lg hover:bg-green-50 transition-colors text-left"
            >
              <h4 className="font-semibold text-green-700">Browse Recipes</h4>
              <p className="text-sm text-gray-600 mt-1">
                Discover new recipes to try
              </p>
            </button>
            <button
              onClick={() => navigate("/my-recipes")}
              className="p-4 border border-amber-200 rounded-lg hover:bg-amber-50 transition-colors text-left"
            >
              <h4 className="font-semibold text-amber-700">My Recipes</h4>
              <p className="text-sm text-gray-600 mt-1">
                View your created recipes
              </p>
            </button>
          </div>
        </div>
      </div>

      {/* Edit Profile Modal */}
      {isEditing && (
        <div className="fixed inset-0 bg-transparent backdrop-blur-lg flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
            <div className="flex items-center justify-between p-6 border-b">
              <h2 className="text-xl font-bold text-gray-900">Edit Profile</h2>
              <button
                onClick={() => setIsEditing(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6">
              {error && (
                <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg">
                  {error}
                </div>
              )}

              {/* Avatar Preview */}
              <div className="mb-6 flex flex-col items-center">
                <img
                  src={previewAvatar || defaultAvatar}
                  alt="Profile preview"
                  className="w-24 h-24 rounded-full object-cover border-4 border-gray-200"
                  onError={(e) => {
                    e.target.src = defaultAvatar;
                  }}
                />
              </div>

              {/* Avatar URL Field */}
              <div className="mb-4">
                <label
                  htmlFor="avatar"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Profile Image URL
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaLink className="text-gray-400" />
                  </div>
                  <input
                    type="url"
                    id="avatar"
                    name="avatar"
                    value={formData.avatar}
                    onChange={handleChange}
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="https://example.com/avatar.jpg"
                  />
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  Enter a URL for your profile image (optional)
                </p>
              </div>

              {/* Username Field */}
              <div className="mb-4">
                <label
                  htmlFor="username"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Username
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaUser className="text-gray-400" />
                  </div>
                  <input
                    type="text"
                    id="username"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="Enter username"
                    required
                    minLength="3"
                    maxLength="50"
                  />
                </div>
              </div>

              {/* Email Field */}
              <div className="mb-6">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Email
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaEnvelope className="text-gray-400" />
                  </div>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="Enter email"
                    required
                  />
                </div>
              </div>

              {/* Buttons */}
              <div className="flex space-x-3">
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 px-4 py-2 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
