import { useGetUserByTokenQuery } from "@/redux/api/authApi";
import { Outlet, useLocation } from "react-router";
import Footer from "./Footer";
import { Navbar } from "./Navbar";

const MainLayout = () => {
  const { data: user } = useGetUserByTokenQuery({}, { refetchOnMountOrArgChange: true });
  const location = useLocation();

  // Check if current path is "/" or "/home"
  const isHomePage = location.pathname === "/" || location.pathname === "/home";

  return (
    <>
      <Navbar />
      <div
        className={`min-h-[calc(100vh-150px)] ${isHomePage ? "" : "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"}`}
      >
        <Outlet />
      </div>
      <Footer />
    </>
  );
};

export default MainLayout;
