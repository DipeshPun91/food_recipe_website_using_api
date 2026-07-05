import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaUser,
  FaEnvelope,
  FaSignOutAlt,
  FaHeart,
  FaStar,
  FaEdit,
  FaLink,
  FaLock,
  FaTrash,
  FaTimes,
  FaUtensils,
  FaBookmark,
  FaCamera,
  FaChevronRight,
  FaCalendarAlt,
  FaLeaf,
  FaClock,
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
        <div className="max-w-7xl mx-auto px-4">
          <div className="max-w-md mx-auto text-center">
            <div className="w-20 h-20 bg-[#C1440E]/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <FaUser className="text-4xl text-[#C1440E]" />
            </div>
            <h2 className="text-2xl text-[#2B2420] mb-3" style={serif}>
              Welcome Back!
            </h2>
            <p className="text-[#2B2420]/60 mb-6">
              Please sign in to view and manage your profile
            </p>
            <button
              onClick={() => navigate("/login")}
              className="bg-[#C1440E] hover:bg-[#a3390b] text-[#FAF3E7] px-8 py-3 rounded-sm font-medium shadow-[3px_3px_0_0_#2B2420] transition-all"
            >
              Sign In
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAF3E7] pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Success/Error Messages */}
        {success && (
          <div className="mb-6 p-4 bg-[#4B6B3A]/10 border border-[#4B6B3A]/30 text-[#4B6B3A] rounded-sm flex items-center gap-3">
            <div className="w-2 h-2 bg-[#4B6B3A] rounded-full flex-shrink-0" />
            {success}
          </div>
        )}
        {error && (
          <div className="mb-6 p-4 bg-[#C1440E]/5 border border-[#C1440E]/20 text-[#C1440E] rounded-sm flex items-center gap-3">
            <div className="w-2 h-2 bg-[#C1440E] rounded-full flex-shrink-0" />
            {error}
          </div>
        )}

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Profile Card */}
          <div className="lg:col-span-1">
            <div className="bg-[#FFFBF3] border border-[#E4D9C5] rounded-sm shadow-sm overflow-hidden sticky top-28">
              {/* Avatar Section */}
              <div className="p-6 text-center border-b border-[#E4D9C5]">
                <div className="relative inline-block">
                  <img
                    src={currentUser.avatar || defaultAvatar}
                    alt={currentUser.username}
                    className="w-28 h-28 rounded-full object-cover border-4 border-[#E4D9C5]"
                    onError={(e) => {
                      e.target.src = defaultAvatar;
                    }}
                  />
                </div>

                <h2 className="text-xl mt-4 text-[#2B2420]" style={serif}>
                  {currentUser.username}
                </h2>
                <p className="text-sm text-[#2B2420]/60 flex items-center justify-center gap-2 mt-1">
                  <FaEnvelope className="text-xs" />
                  {currentUser.email}
                </p>
                <p
                  className="text-xs text-[#2B2420]/40 flex items-center justify-center gap-2 mt-2"
                  style={mono}
                >
                  <FaCalendarAlt className="text-xs" />
                  Joined{" "}
                  {new Date(currentUser.createdAt).toLocaleDateString("en-US", {
                    month: "long",
                    year: "numeric",
                  })}
                </p>
              </div>

              {/* Stats */}
              <div className="p-4 space-y-3">
                <div className="flex items-center justify-between p-3 bg-[#FAF3E7] rounded-sm border border-[#E4D9C5]">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-[#C1440E]/10 flex items-center justify-center">
                      <FaUtensils className="text-[#C1440E] text-sm" />
                    </div>
                    <span className="text-sm text-[#2B2420]">Recipes</span>
                  </div>
                  <span
                    className="text-lg font-bold text-[#2B2420]"
                    style={serif}
                  >
                    {currentUser.recipesCount || 0}
                  </span>
                </div>

                <div className="flex items-center justify-between p-3 bg-[#FAF3E7] rounded-sm border border-[#E4D9C5]">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-[#D9A441]/10 flex items-center justify-center">
                      <FaBookmark className="text-[#D9A441] text-sm" />
                    </div>
                    <span className="text-sm text-[#2B2420]">Saved</span>
                  </div>
                  <span
                    className="text-lg font-bold text-[#2B2420]"
                    style={serif}
                  >
                    {currentUser.wishlist?.length || 0}
                  </span>
                </div>

                <div className="flex items-center justify-between p-3 bg-[#FAF3E7] rounded-sm border border-[#E4D9C5]">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-[#4B6B3A]/10 flex items-center justify-center">
                      <FaStar className="text-[#4B6B3A] text-sm" />
                    </div>
                    <span className="text-sm text-[#2B2420]">Reviews</span>
                  </div>
                  <span
                    className="text-lg font-bold text-[#2B2420]"
                    style={serif}
                  >
                    {currentUser.ratings?.length || 0}
                  </span>
                </div>
              </div>

              {/* Sign Out Button */}
              <div className="p-4 border-t border-[#E4D9C5]">
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-[#2B2420] text-[#FAF3E7] rounded-sm font-medium hover:bg-[#1a1513] transition-colors"
                >
                  <FaSignOutAlt className="text-sm" />
                  Sign Out
                </button>
              </div>
            </div>
          </div>

          {/* Right Column - Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Quick Actions */}
            <div className="bg-[#FFFBF3] border border-[#E4D9C5] rounded-sm shadow-sm overflow-hidden">
              <div className="p-5 border-b border-[#E4D9C5]">
                <h3 className="text-sm text-[#2B2420]" style={serif}>
                  Quick Actions
                </h3>
              </div>
              <div className="p-2">
                <button
                  onClick={() => setIsEditing(true)}
                  className="w-full flex items-center justify-between p-3 hover:bg-[#FAF3E7] rounded-sm transition-colors group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[#C1440E]/5 flex items-center justify-center group-hover:bg-[#C1440E]/10 transition-colors">
                      <FaEdit className="text-[#C1440E] text-lg" />
                    </div>
                    <div className="text-left">
                      <p className="text-sm font-medium text-[#2B2420]">
                        Edit Profile
                      </p>
                      <p className="text-xs text-[#2B2420]/50">
                        Update your personal information
                      </p>
                    </div>
                  </div>
                  <FaChevronRight className="text-[#2B2420]/20 text-sm" />
                </button>

                <button
                  onClick={() => navigate("/recipes")}
                  className="w-full flex items-center justify-between p-3 hover:bg-[#FAF3E7] rounded-sm transition-colors group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[#C1440E]/5 flex items-center justify-center group-hover:bg-[#C1440E]/10 transition-colors">
                      <FaUtensils className="text-[#C1440E] text-lg" />
                    </div>
                    <div className="text-left">
                      <p className="text-sm font-medium text-[#2B2420]">
                        Browse Recipes
                      </p>
                      <p className="text-xs text-[#2B2420]/50">
                        Discover new dishes to try
                      </p>
                    </div>
                  </div>
                  <FaChevronRight className="text-[#2B2420]/20 text-sm" />
                </button>

                <button
                  onClick={() => navigate("/dashboard")}
                  className="w-full flex items-center justify-between p-3 hover:bg-[#FAF3E7] rounded-sm transition-colors group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[#4B6B3A]/5 flex items-center justify-center group-hover:bg-[#4B6B3A]/10 transition-colors">
                      <FaBookmark className="text-[#4B6B3A] text-lg" />
                    </div>
                    <div className="text-left">
                      <p className="text-sm font-medium text-[#2B2420]">
                        My Dashboard
                      </p>
                      <p className="text-xs text-[#2B2420]/50">
                        Manage your recipes and wishlist
                      </p>
                    </div>
                  </div>
                  <FaChevronRight className="text-[#2B2420]/20 text-sm" />
                </button>
              </div>
            </div>

            {/* Account Settings */}
            <div className="bg-[#FFFBF3] border border-[#E4D9C5] rounded-sm shadow-sm overflow-hidden">
              <div className="p-5 border-b border-[#E4D9C5]">
                <h3 className="text-sm text-[#2B2420]" style={serif}>
                  Account Settings
                </h3>
              </div>
              <div className="p-2">
                <button
                  onClick={() => setShowChangePassword(true)}
                  className="w-full flex items-center justify-between p-3 hover:bg-[#FAF3E7] rounded-sm transition-colors group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[#D9A441]/5 flex items-center justify-center group-hover:bg-[#D9A441]/10 transition-colors">
                      <FaLock className="text-[#D9A441] text-lg" />
                    </div>
                    <div className="text-left">
                      <p className="text-sm font-medium text-[#2B2420]">
                        Change Password
                      </p>
                      <p className="text-xs text-[#2B2420]/50">
                        Update your security settings
                      </p>
                    </div>
                  </div>
                  <FaChevronRight className="text-[#2B2420]/20 text-sm" />
                </button>

                <button
                  onClick={() => setShowDeleteAccount(true)}
                  className="w-full flex items-center justify-between p-3 hover:bg-[#C1440E]/5 rounded-sm transition-colors group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[#C1440E]/5 flex items-center justify-center group-hover:bg-[#C1440E]/10 transition-colors">
                      <FaTrash className="text-[#C1440E] text-lg" />
                    </div>
                    <div className="text-left">
                      <p className="text-sm font-medium text-[#C1440E]">
                        Delete Account
                      </p>
                      <p className="text-xs text-[#2B2420]/50">
                        Permanently remove your data
                      </p>
                    </div>
                  </div>
                  <FaChevronRight className="text-[#C1440E]/30 text-sm" />
                </button>
              </div>
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
                <div className="mb-6 flex flex-col items-center">
                  <div className="relative">
                    <img
                      src={previewAvatar || defaultAvatar}
                      alt="Profile preview"
                      className="w-24 h-24 rounded-full object-cover border-4 border-[#E4D9C5]"
                      onError={(e) => {
                        e.target.src = defaultAvatar;
                      }}
                    />
                    <div className="absolute bottom-0 right-0 bg-[#C1440E] text-[#FAF3E7] p-1.5 rounded-full border-2 border-[#FFFBF3]">
                      <FaCamera className="w-3 h-3" />
                    </div>
                  </div>
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium text-[#2B2420] mb-2">
                    Avatar URL
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
                    Enter a URL for your profile image
                  </p>
                </div>

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

                <div className="flex gap-3">
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

                <div className="flex gap-3">
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
                    your data will be permanently deleted.
                  </p>
                </div>

                <div className="mb-6">
                  <label className="block text-sm font-medium text-[#2B2420] mb-2">
                    Confirm with your password
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

                <div className="flex gap-3">
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
    </div>
  );
};

export default Profile;
