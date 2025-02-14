import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "./AuthContext";

const EmployeeProtectedRoute = ({ children }) => {
  const { user } = useContext(AuthContext);

  if (!user || user.ssn) {
    // If the user is not logged in or is not an employee, redirect to login
    return <Navigate to="/login" />;
  }

  return children;
};

export default EmployeeProtectedRoute;
