import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaUser,
  FaEnvelope,
  FaSignOutAlt,
  FaClock,
  FaHeart,
  FaStar,
  FaEdit,
  FaLink,
  FaLock,
  FaTrash,
  FaTimes,
  FaUtensils,
  FaBookmark,
} from "react-icons/fa";
import { AuthContext } from "../context/AuthContext";
import { apiRequest } from "../services/api";
import defaultAvatar from "../assets/default_user.png";

const mono = { fontFamily: "'JetBrains Mono', monospace" };
const serif = { fontFamily: "'Fraunces', serif", fontWeight: 600 };

const Profile = () => {
  const { currentUser, logout, updateUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const [isEditing, setIsEditing] = useState(false);
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [showDeleteAccount, setShowDeleteAccount] = useState(false);

  const [formData, setFormData] = useState({
    username: currentUser?.username || "",
    email: currentUser?.email || "",
    avatar: currentUser?.avatar || "",
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [deletePassword, setDeletePassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
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
    if (name === "avatar") {
      setPreviewAvatar(value);
    }
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData({
      ...passwordData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const res = await apiRequest.put(`/users/${currentUser._id}`, formData);
      updateUser(res.data.data);
      setIsEditing(false);
      setSuccess("Profile updated successfully!");
      setTimeout(() => setSuccess(""), 3000);
    } catch (error) {
      setError(error.response?.data?.message || "Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setError("New passwords do not match");
      setLoading(false);
      return;
    }

    if (passwordData.newPassword.length < 6) {
      setError("New password must be at least 6 characters long");
      setLoading(false);
      return;
    }

    try {
      await apiRequest.post(`/users/${currentUser._id}/change-password`, {
        currentPassword: passwordData.currentPassword,
        newPassword: passwordData.newPassword,
      });
      setSuccess("Password changed successfully!");
      setShowChangePassword(false);
      setPasswordData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
      setTimeout(() => setSuccess(""), 3000);
    } catch (error) {
      setError(error.response?.data?.message || "Failed to change password");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteAccount = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      await apiRequest.delete(`/users/${currentUser._id}/delete-account`, {
        data: { password: deletePassword },
      });
      setSuccess("Account deleted successfully");
      setTimeout(() => {
        logout();
        navigate("/");
      }, 1500);
    } catch (error) {
      setError(error.response?.data?.message || "Failed to delete account");
    } finally {
      setLoading(false);
    }
  };

  if (!currentUser) {
    return (
      <div className="min-h-screen bg-[#FAF3E7] flex items-center justify-center pt-16 pb-16">
        <div className="text-center">
          <h2 className="text-2xl text-[#2B2420] mb-4" style={serif}>
            Please sign in to view your profile
          </h2>
          <button
            onClick={() => navigate("/login")}
            className="bg-[#C1440E] hover:bg-[#a3390b] text-[#FAF3E7] px-6 py-3 rounded-sm font-medium shadow-[3px_3px_0_0_#2B2420] transition-all"
          >
            Sign In
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAF3E7] pt-28 pb-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Success/Error Messages */}
        {success && (
          <div className="mb-4 p-4 bg-[#4B6B3A]/10 border border-[#4B6B3A]/30 text-[#4B6B3A] rounded-sm">
            {success}
          </div>
        )}
        {error && (
          <div className="mb-4 p-4 bg-[#C1440E]/5 border border-[#C1440E]/20 text-[#C1440E] rounded-sm">
            {error}
          </div>
        )}

        {/* Profile Card */}
        <div className="bg-[#FFFBF3] border border-[#E4D9C5] rounded-sm shadow-sm overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-[#C1440E] to-[#a3390b] px-6 py-8">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <img
                    src={currentUser.avatar || defaultAvatar}
                    alt={currentUser.username}
                    className="w-20 h-20 rounded-full object-cover border-4 border-[#FAF3E7]"
                    onError={(e) => {
                      e.target.src = defaultAvatar;
                    }}
                  />
                </div>
                <div>
                  <h1
                    className="text-2xl font-bold text-[#FAF3E7]"
                    style={serif}
                  >
                    {currentUser.username}
                  </h1>
                  <p className="text-[#FAF3E7]/80">{currentUser.email}</p>
                  <p className="text-[#FAF3E7]/60 text-sm mt-1" style={mono}>
                    Member since{" "}
                    {new Date(currentUser.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsEditing(true)}
                className="bg-[#FAF3E7] text-[#2B2420] px-4 py-2 rounded-sm font-medium hover:bg-[#FAF3E7]/90 transition-colors flex items-center shadow-[2px_2px_0_0_#2B2420]"
              >
                <FaEdit className="mr-2" />
                Edit Profile
              </button>
            </div>
          </div>

          {/* Profile Info */}
          <div className="p-6">
            <h2 className="text-xl text-[#2B2420] mb-6" style={serif}>
              Profile Information
            </h2>

            <div className="space-y-4">
              <div className="flex items-center space-x-4 p-4 bg-[#FAF3E7] rounded-sm border border-[#E4D9C5]">
                <div className="bg-[#C1440E]/10 p-3 rounded-full">
                  <FaUser className="text-[#C1440E]" />
                </div>
                <div>
                  <p
                    className="text-sm font-medium text-[#2B2420]/50"
                    style={mono}
                  >
                    Username
                  </p>
                  <p className="text-lg font-semibold text-[#2B2420]">
                    {currentUser.username}
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-4 p-4 bg-[#FAF3E7] rounded-sm border border-[#E4D9C5]">
                <div className="bg-[#4B6B3A]/10 p-3 rounded-full">
                  <FaEnvelope className="text-[#4B6B3A]" />
                </div>
                <div>
                  <p
                    className="text-sm font-medium text-[#2B2420]/50"
                    style={mono}
                  >
                    Email
                  </p>
                  <p className="text-lg font-semibold text-[#2B2420]">
                    {currentUser.email}
                  </p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-3">
              <button
                onClick={() => setShowChangePassword(true)}
                className="flex items-center justify-center gap-2 px-4 py-3 bg-[#D9A441]/15 text-[#8a6417] rounded-sm hover:bg-[#D9A441]/25 transition-colors border border-[#D9A441]/30"
                style={mono}
              >
                <FaLock className="h-4 w-4" />
                Change Password
              </button>
              <button
                onClick={() => setShowDeleteAccount(true)}
                className="flex items-center justify-center gap-2 px-4 py-3 bg-[#C1440E]/10 text-[#C1440E] rounded-sm hover:bg-[#C1440E]/20 transition-colors border border-[#C1440E]/20"
                style={mono}
              >
                <FaTrash className="h-4 w-4" />
                Delete Account
              </button>
              <button
                onClick={handleLogout}
                className="flex items-center justify-center gap-2 px-4 py-3 bg-[#2B2420] text-[#FAF3E7] rounded-sm hover:bg-[#1a1513] transition-colors"
                style={mono}
              >
                <FaSignOutAlt className="h-4 w-4" />
                Sign Out
              </button>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-[#FFFBF3] border border-[#E4D9C5] rounded-sm shadow-sm p-6 text-center hover:shadow-md transition-shadow">
            <div className="bg-[#D9A441]/15 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
              <FaUtensils className="text-[#8a6417] text-xl" />
            </div>
            <div className="text-3xl font-bold text-[#2B2420]" style={serif}>
              {currentUser.recipesCount || 0}
            </div>
            <div className="text-[#2B2420]/60 font-medium" style={mono}>
              RECIPES CREATED
            </div>
          </div>

          <div className="bg-[#FFFBF3] border border-[#E4D9C5] rounded-sm shadow-sm p-6 text-center hover:shadow-md transition-shadow">
            <div className="bg-[#C1440E]/10 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
              <FaBookmark className="text-[#C1440E] text-xl" />
            </div>
            <div className="text-3xl font-bold text-[#2B2420]" style={serif}>
              {currentUser.wishlist?.length || 0}
            </div>
            <div className="text-[#2B2420]/60 font-medium" style={mono}>
              RECIPES SAVED
            </div>
          </div>

          <div className="bg-[#FFFBF3] border border-[#E4D9C5] rounded-sm shadow-sm p-6 text-center hover:shadow-md transition-shadow">
            <div className="bg-[#4B6B3A]/10 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
              <FaStar className="text-[#4B6B3A] text-xl" />
            </div>
            <div className="text-3xl font-bold text-[#2B2420]" style={serif}>
              {currentUser.ratings?.length || 0}
            </div>
            <div className="text-[#2B2420]/60 font-medium" style={mono}>
              REVIEWS WRITTEN
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-8 bg-[#FFFBF3] border border-[#E4D9C5] rounded-sm shadow-sm p-6">
          <h3 className="text-lg text-[#2B2420] mb-4" style={serif}>
            Quick Actions
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <button
              onClick={() => navigate("/recipes")}
              className="p-4 border border-[#E4D9C5] rounded-sm hover:bg-[#FAF3E7] transition-colors text-left"
            >
              <h4 className="font-semibold text-[#C1440E]">Browse Recipes</h4>
              <p className="text-sm text-[#2B2420]/60 mt-1">
                Discover new recipes to try
              </p>
            </button>
            <button
              onClick={() => navigate("/dashboard")}
              className="p-4 border border-[#E4D9C5] rounded-sm hover:bg-[#FAF3E7] transition-colors text-left"
            >
              <h4 className="font-semibold text-[#4B6B3A]">My Dashboard</h4>
              <p className="text-sm text-[#2B2420]/60 mt-1">
                Manage your recipes and wishlist
              </p>
            </button>
          </div>
        </div>
      </div>

      {/* Edit Profile Modal */}
      {isEditing && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-[#FFFBF3] rounded-sm border border-[#E4D9C5] shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b border-[#E4D9C5]">
              <h2 className="text-xl text-[#2B2420]" style={serif}>
                Edit Profile
              </h2>
              <button
                onClick={() => setIsEditing(false)}
                className="text-[#2B2420]/50 hover:text-[#2B2420] transition-colors"
              >
                <FaTimes className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6">
              {/* Avatar Preview */}
              <div className="mb-6 flex flex-col items-center">
                <img
                  src={previewAvatar || defaultAvatar}
                  alt="Profile preview"
                  className="w-24 h-24 rounded-full object-cover border-4 border-[#E4D9C5]"
                  onError={(e) => {
                    e.target.src = defaultAvatar;
                  }}
                />
              </div>

              {/* Avatar URL Field */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-[#2B2420] mb-2">
                  Profile Image URL
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaLink className="text-[#2B2420]/35" />
                  </div>
                  <input
                    type="url"
                    name="avatar"
                    value={formData.avatar}
                    onChange={handleChange}
                    className="w-full pl-10 pr-3 py-2 bg-[#FAF3E7] border border-[#E4D9C5] rounded-sm focus:ring-2 focus:ring-[#C1440E]/40 focus:border-[#C1440E] outline-none text-[#2B2420]"
                    placeholder="https://example.com/avatar.jpg"
                  />
                </div>
                <p className="text-xs text-[#2B2420]/50 mt-1" style={mono}>
                  Enter a URL for your profile image (optional)
                </p>
              </div>

              {/* Username Field */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-[#2B2420] mb-2">
                  Username
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaUser className="text-[#2B2420]/35" />
                  </div>
                  <input
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    className="w-full pl-10 pr-3 py-2 bg-[#FAF3E7] border border-[#E4D9C5] rounded-sm focus:ring-2 focus:ring-[#C1440E]/40 focus:border-[#C1440E] outline-none text-[#2B2420]"
                    required
                    minLength="3"
                    maxLength="50"
                  />
                </div>
              </div>

              {/* Email Field */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-[#2B2420] mb-2">
                  Email
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaEnvelope className="text-[#2B2420]/35" />
                  </div>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full pl-10 pr-3 py-2 bg-[#FAF3E7] border border-[#E4D9C5] rounded-sm focus:ring-2 focus:ring-[#C1440E]/40 focus:border-[#C1440E] outline-none text-[#2B2420]"
                    required
                  />
                </div>
              </div>

              {/* Buttons */}
              <div className="flex space-x-3">
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="flex-1 px-4 py-2 border border-[#E4D9C5] rounded-sm text-[#2B2420] font-medium hover:bg-[#FAF3E7] transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 px-4 py-2 bg-[#C1440E] hover:bg-[#a3390b] text-[#FAF3E7] font-medium rounded-sm shadow-[2px_2px_0_0_#2B2420] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Change Password Modal */}
      {showChangePassword && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-[#FFFBF3] rounded-sm border border-[#E4D9C5] shadow-xl max-w-md w-full">
            <div className="flex items-center justify-between p-6 border-b border-[#E4D9C5]">
              <h2 className="text-xl text-[#2B2420]" style={serif}>
                Change Password
              </h2>
              <button
                onClick={() => {
                  setShowChangePassword(false);
                  setError("");
                }}
                className="text-[#2B2420]/50 hover:text-[#2B2420] transition-colors"
              >
                <FaTimes className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleChangePassword} className="p-6">
              <div className="mb-4">
                <label className="block text-sm font-medium text-[#2B2420] mb-2">
                  Current Password
                </label>
                <input
                  type="password"
                  name="currentPassword"
                  value={passwordData.currentPassword}
                  onChange={handlePasswordChange}
                  className="w-full px-4 py-2 bg-[#FAF3E7] border border-[#E4D9C5] rounded-sm focus:ring-2 focus:ring-[#C1440E]/40 focus:border-[#C1440E] outline-none text-[#2B2420]"
                  required
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-[#2B2420] mb-2">
                  New Password
                </label>
                <input
                  type="password"
                  name="newPassword"
                  value={passwordData.newPassword}
                  onChange={handlePasswordChange}
                  className="w-full px-4 py-2 bg-[#FAF3E7] border border-[#E4D9C5] rounded-sm focus:ring-2 focus:ring-[#C1440E]/40 focus:border-[#C1440E] outline-none text-[#2B2420]"
                  required
                  minLength="6"
                />
                <p className="text-xs text-[#2B2420]/50 mt-1" style={mono}>
                  Must be at least 6 characters
                </p>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-[#2B2420] mb-2">
                  Confirm New Password
                </label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={passwordData.confirmPassword}
                  onChange={handlePasswordChange}
                  className="w-full px-4 py-2 bg-[#FAF3E7] border border-[#E4D9C5] rounded-sm focus:ring-2 focus:ring-[#C1440E]/40 focus:border-[#C1440E] outline-none text-[#2B2420]"
                  required
                />
              </div>

              <div className="flex space-x-3">
                <button
                  type="button"
                  onClick={() => {
                    setShowChangePassword(false);
                    setError("");
                  }}
                  className="flex-1 px-4 py-2 border border-[#E4D9C5] rounded-sm text-[#2B2420] font-medium hover:bg-[#FAF3E7] transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 px-4 py-2 bg-[#C1440E] hover:bg-[#a3390b] text-[#FAF3E7] font-medium rounded-sm shadow-[2px_2px_0_0_#2B2420] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? "Changing..." : "Change Password"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Account Modal */}
      {showDeleteAccount && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-[#FFFBF3] rounded-sm border border-[#E4D9C5] shadow-xl max-w-md w-full">
            <div className="flex items-center justify-between p-6 border-b border-[#E4D9C5]">
              <h2 className="text-xl text-[#2B2420]" style={serif}>
                Delete Account
              </h2>
              <button
                onClick={() => {
                  setShowDeleteAccount(false);
                  setError("");
                  setDeletePassword("");
                }}
                className="text-[#2B2420]/50 hover:text-[#2B2420] transition-colors"
              >
                <FaTimes className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleDeleteAccount} className="p-6">
              <div className="mb-4 p-4 bg-[#C1440E]/5 border border-[#C1440E]/20 rounded-sm">
                <p className="text-sm text-[#C1440E]">
                  <strong>Warning:</strong> This action is irreversible. All
                  your data, including recipes, wishlist, and ratings will be
                  permanently deleted.
                </p>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-[#2B2420] mb-2">
                  Enter your password to confirm
                </label>
                <input
                  type="password"
                  value={deletePassword}
                  onChange={(e) => setDeletePassword(e.target.value)}
                  className="w-full px-4 py-2 bg-[#FAF3E7] border border-[#E4D9C5] rounded-sm focus:ring-2 focus:ring-[#C1440E]/40 focus:border-[#C1440E] outline-none text-[#2B2420]"
                  required
                  placeholder="Enter your password"
                />
              </div>

              <div className="flex space-x-3">
                <button
                  type="button"
                  onClick={() => {
                    setShowDeleteAccount(false);
                    setError("");
                    setDeletePassword("");
                  }}
                  className="flex-1 px-4 py-2 border border-[#E4D9C5] rounded-sm text-[#2B2420] font-medium hover:bg-[#FAF3E7] transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 px-4 py-2 bg-[#C1440E] hover:bg-[#a3390b] text-[#FAF3E7] font-medium rounded-sm shadow-[2px_2px_0_0_#2B2420] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? "Deleting..." : "Delete Account"}
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
