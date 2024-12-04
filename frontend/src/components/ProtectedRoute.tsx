import React from "react";
import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const logout = () => {
    localStorage.removeItem("token"); // Clear the token
    window.location.href = "/login"; // Redirect to login
  };
  const token = localStorage.getItem("token");

  if (token) {
    try {
      const decodedToken: any = jwtDecode(token);
      const currentTime = Date.now() / 1000; // Current time in seconds
      if (decodedToken.exp < currentTime) {
        logout(); // Logout if the token is expired
        return <Navigate to="/login" />;
      }
      return <>{children}</>;
    } catch (error) {
      logout(); // Logout if the token is invalid
      return <Navigate to="/login" />;
    }
  } else {
    return <Navigate to="/login" />;
  }
};

export default ProtectedRoute;
