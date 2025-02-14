import React from "react";
import { Navigate } from "react-router-dom";

interface ProtectedRouteProps {
  isLoggedIn: boolean;
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  isLoggedIn,
  children,
}) => {
  if (isLoggedIn) {
    return <>{children}</>;
  } else {
    return <Navigate to="/" />;
  }
};

export default ProtectedRoute;
