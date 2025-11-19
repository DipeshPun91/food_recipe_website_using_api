import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaUser,
  FaEnvelope,
  FaCamera,
  FaSignOutAlt,
  FaClock,
  FaHeart,
  FaStar,
} from "react-icons/fa";
import { AuthContext } from "../context/AuthContext";
import defaultAvatar from "../assets/default_user.png";

const Profile = () => {
  const { currentUser, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
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
            <div className="flex items-center space-x-4">
              <div className="relative">
                <img
                  src={currentUser.avatar || defaultAvatar}
                  alt={currentUser.username}
                  className="w-20 h-20 rounded-full object-cover border-4 border-white"
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
    </div>
  );
};

export default Profile;
