// src/context/AuthContext.js
import React, { createContext, useState } from "react";
import { useCookies } from "react-cookie";

// Create a Context
export const AuthContext = createContext();

// Create the AuthProvider component
export const AuthProvider = ({ children }) => {
  // State to hold authentication info
  const [user, setUser] = useState(null); // Store user data if needed
  const [cookies, setCookie, removeCookie] = useCookies();

  // Login method
  const login = async (userData) => {
    console.log("Login Data: ", userData.data);
    setCookie("token", userData.data.token);
    setUser(userData.data);
  };
  
  // Logout method
  const logout = () => {
    console.log("Envoked logout:");
    removeCookie("token");
    setUser(null);
  };

  // Provide context values
  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
