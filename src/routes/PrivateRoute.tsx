// PrivateRoute.tsx
import { authKey } from "@/constant/storageKey";
import { getFromCookie } from "@/utils/cookie";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = () => {
  const token = getFromCookie(authKey);
  return token ? <Outlet /> : <Navigate to='/login' replace />;
};

export default PrivateRoute;
