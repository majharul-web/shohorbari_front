// AppRoutes.tsx
import DashboardLayout from "@/layouts/DashboardLayout";
import MainLayout from "@/layouts/MainLayout";
import CategoryPage from "@/pages/Category/Category";
import Dashboard from "@/pages/Dashboard/Dashboard";
import Home from "@/pages/Home/Home";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import { Route, Routes } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route element={<MainLayout />}>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
      </Route>

      {/* Private Routes */}
      <Route
        path='dashboard/*'
        element={
          <PrivateRoute>
            <DashboardLayout />
          </PrivateRoute>
        }
      >
        <Route index element={<Dashboard />} />
        <Route path='category' element={<CategoryPage />} /> {/* ✅ relative path */}
      </Route>
    </Routes>
  );
};

export default AppRoutes;
