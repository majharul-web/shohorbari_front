// PrivateRoute.tsx
import PageLoader from "@/components/ui/loader/PageLoader";
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
    return <PageLoader />;
  }

  // If user exists, render children, else redirect to login
  return user ? <>{children}</> : <Navigate to='/login' replace />;
};

export default PrivateRoute;
