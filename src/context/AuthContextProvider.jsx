import { useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import { apiRequest } from "../services/api";

export const AuthContextProvider = ({ children }) => {
  //to get the current user from local storage
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null,
  );

  // to update the user
  const updateUser = (data) => {  5
    setCurrentUser(data);
  };

  // logout function
  const logout = async () => {
    try {
      await apiRequest.post("/auth/logout");
    } catch (error) {
      console.error("Logout failed:", error);
    } finally {
      setCurrentUser(null);
      localStorage.removeItem("user");
    }
  };

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(currentUser));
  }, [currentUser]);

  return (
    <AuthContext.Provider value={{ currentUser, updateUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
