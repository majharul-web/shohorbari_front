import { Outlet } from "react-router";
import Footer from "./Footer";
import { Navbar } from "./Navbar";
import { useGetUserByTokenQuery } from "@/redux/api/authApi";

const MainLayout = () => {
  const { data: user } = useGetUserByTokenQuery({}, { refetchOnMountOrArgChange: true });
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
};

export default MainLayout;
