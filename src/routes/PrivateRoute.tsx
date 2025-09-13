// PrivateRoute.tsx
import { authKey } from "@/constant/storageKey";
import { getFromCookie } from "@/utils/cookie";
import type { ReactNode } from "react";
import React from "react";

import { Navigate } from "react-router-dom";

interface PrivateRouteProps {
  children: ReactNode;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const token = getFromCookie(authKey);

  // If user exists, render children, else redirect to login
  return token ? <>{children}</> : <Navigate to='/login' replace />;
};

export default PrivateRoute;
