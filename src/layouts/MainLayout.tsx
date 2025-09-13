import { useGetUserByTokenQuery } from "@/redux/api/authApi";
import { Outlet } from "react-router";
import Footer from "./Footer";
import { Navbar } from "./Navbar";

const MainLayout = () => {
  const { data: user } = useGetUserByTokenQuery({}, { refetchOnMountOrArgChange: true });
  return (
    <>
      <Navbar />
      <div className='min-h-[calc(100vh-150px)] max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 '>
        <Outlet />
      </div>
      <Footer />
    </>
  );
};

export default MainLayout;
