// PrivateRoute.tsx
import { useAppSelector } from "@/redux/hooks";
import type { ReactNode } from "react";
import React from "react";

import { Navigate } from "react-router-dom";

interface PrivateRouteProps {
  children: ReactNode;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const user = useAppSelector((state) => state.auth);

  if (user === null) {
    // Loading state while auth is being determined
    return <p>Loading...</p>;
  }

  // If user exists, render children, else redirect to login
  return user ? <>{children}</> : <Navigate to='/login' replace />;
};

export default PrivateRoute;
