import { useEffect, useState, useCallback } from "react";
import { AuthContext } from "./AuthContext";
import { apiRequest } from "../services/api";

export const AuthContextProvider = ({ children }) => {
  // Get current user from local storage
  const [currentUser, setCurrentUser] = useState(() => {
    try {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        const parsed = JSON.parse(storedUser);
        if (parsed && (parsed._id || parsed.id)) {
          return parsed;
        }
      }
      return null;
    } catch {
      return null;
    }
  });

  const [loading, setLoading] = useState(true);

  // Verify user session on mount
  useEffect(() => {
    const verifySession = async () => {
      try {
        const response = await apiRequest.get("/auth/me");
        if (response.data && response.data.data) {
          setCurrentUser(response.data.data);
          localStorage.setItem("user", JSON.stringify(response.data.data));
        } else if (response.data && response.data._id) {
          setCurrentUser(response.data);
          localStorage.setItem("user", JSON.stringify(response.data));
        }
      } catch (error) {
        if (error.response?.status === 401) {
          localStorage.removeItem("user");
          setCurrentUser(null);
        }
      } finally {
        setLoading(false);
      }
    };

    const hasToken = document.cookie
      .split(";")
      .some((cookie) => cookie.trim().startsWith("token="));
    if (hasToken) {
      verifySession();
    } else {
      setLoading(false);
    }
  }, []);

  // Update user function
  const updateUser = useCallback((data) => {
    if (data) {
      const userData = {
        ...data,
        _id: data._id || data.id,
        id: data.id || data._id,
      };
      setCurrentUser(userData);
      localStorage.setItem("user", JSON.stringify(userData));
    } else {
      setCurrentUser(null);
      localStorage.removeItem("user");
    }
  }, []);

  // Logout function
  const logout = useCallback(async () => {
    try {
      await apiRequest.post("/auth/logout");
    } catch (error) {
      console.error("Logout failed:", error);
    } finally {
      setCurrentUser(null);
      localStorage.removeItem("user");
      sessionStorage.clear();
    }
  }, []);

  const contextValue = {
    currentUser,
    loading,
    updateUser,
    logout,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};
