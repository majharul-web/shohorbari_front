// AppRoutes.tsx
import DashboardLayout from "@/layouts/DashboardLayout";
import MainLayout from "@/layouts/MainLayout";
import About from "@/pages/About";
import ActivateAccount from "@/pages/ActivateAccount";
import AdRequestPage from "@/pages/Add/Add-Request";
import AdminAddList from "@/pages/Add/AdminAddList";
import MyRequestsPage from "@/pages/Add/MyRequests";
import Dashboard from "@/pages/Admin/Dashboard";
import Transaction from "@/pages/Admin/Transaction";
import CategoryPage from "@/pages/Category/Category";
import ContactPage from "@/pages/ContactUs";
import Home from "@/pages/Home/Home";
import Login from "@/pages/Login";
import NotFound from "@/pages/NotFound";
import PasswordResetEmail from "@/pages/PasswordResetEmail";
import PasswordResetConfirm from "@/pages/PasswprdResetConfirm";
import TermsOfService from "@/pages/PrivacyPolicy";
import ProfilePage from "@/pages/Profile";
import Register from "@/pages/Register";
import MyOrdersPage from "@/pages/Rents/MyOrdersPage";
import RentDetails from "@/pages/Rents/RentDetails";
import Rents from "@/pages/Rents/Rents";
import ResendActivation from "@/pages/ResendActivation";
import PrivacyPolicy from "@/pages/TermsOfService";
import WishList from "@/pages/WishList";
import { Route, Routes } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route element={<MainLayout />}>
        <Route path='/' element={<Home />} />
        <Route path='/home' element={<Home />} />
        <Route path='rents' element={<Rents />} />
        <Route path='rents/:id' element={<RentDetails />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='activate/:uid/:token' element={<ActivateAccount />} />
        <Route path='resend-activation' element={<ResendActivation />} />
        <Route path='forgot-password' element={<PasswordResetEmail />} />
        <Route path='password-reset/:uid/:token' element={<PasswordResetConfirm />} />
        <Route path='profile' element={<ProfilePage />} />
        <Route path='contact-us' element={<ContactPage />} />
        <Route path='about' element={<About />} />
        <Route path='privacy' element={<PrivacyPolicy />} />
        <Route path='terms' element={<TermsOfService />} />
        <Route path='/wishlist' element={<WishList />} />
        <Route path='/my-requests' element={<MyRequestsPage />} />
        <Route path='/my-orders' element={<MyOrdersPage />} />
        <Route path='*' element={<NotFound />} /> {/* Catch-all 404 */}
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
        <Route path='category' element={<CategoryPage />} />
        <Route path='ads' element={<AdminAddList />} />
        <Route path='ads/:id' element={<RentDetails />} />
        <Route path='add-request' element={<AdRequestPage />} />
        <Route path='transactions' element={<Transaction />} />
        <Route path='profile' element={<ProfilePage />} />
        <Route path='*' element={<NotFound />} /> {/* Catch-all 404 */}
      </Route>
    </Routes>
  );
};

export default AppRoutes;
