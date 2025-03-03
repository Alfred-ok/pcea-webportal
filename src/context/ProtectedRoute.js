import React, { useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";

const ProtectedRoute = ({ children, allowedRoles }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const [userRole, setUserRole] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const roleId = localStorage.getItem("roleId");

    if (!token || !roleId) {
      setIsAuthenticated(false);
      setUserRole(null);
      return;
    }

    try {
      // Decode JWT safely
      const decodedToken = JSON.parse(atob(token.split(".")[1])); 
      const expiry = decodedToken?.exp ? decodedToken.exp * 1000 : 0; 

      if (expiry < Date.now()) {
        console.warn("Token expired, logging out...");
        localStorage.clear();
        setIsAuthenticated(false);
        setUserRole(null);
      } else {
        setIsAuthenticated(true);
        setUserRole(parseInt(roleId, 10));
      }
    } catch (error) {
      console.error("Error decoding token:", error);
      localStorage.clear();
      setIsAuthenticated(false);
      setUserRole(null);
    }
  }, []);

  
  const roleRedirects = {
    1: "/dashboard",
    2: "/reports",
    
  };

 
  if (isAuthenticated === false) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (isAuthenticated === true && !allowedRoles.includes(userRole)) {
    return <Navigate to={roleRedirects[userRole] || "/login"} replace />;
  }

  return children;
};

export default ProtectedRoute;
