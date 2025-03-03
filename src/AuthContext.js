import React, { createContext, useState, useEffect, useRef } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem("authToken"));
  const logoutTimer = useRef(null);

  // Login function
  const login = (token) => {
    localStorage.setItem("authToken", token);
    setIsAuthenticated(true);
    resetTimer(); // Reset inactivity timer on login
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem("authToken");
    setIsAuthenticated(false);
    window.location.href = "/login"; // Redirect to login page
  };

  // Reset inactivity timer
  const resetTimer = () => {
    if (logoutTimer.current) {
      clearTimeout(logoutTimer.current);
    }
    logoutTimer.current = setTimeout(() => {
      alert("You have been logged out due to inactivity.");
      logout();
    }, 15 * 60 * 1000); // 15 minutes
  };

  // Auto logout after inactivity
  useEffect(() => {
    const activityEvents = ["mousemove", "keydown", "click"];
    activityEvents.forEach((event) => window.addEventListener(event, resetTimer));

    resetTimer(); // Start timer when component mounts

    return () => {
      if (logoutTimer.current) clearTimeout(logoutTimer.current);
      activityEvents.forEach((event) => window.removeEventListener(event, resetTimer));
    };
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
