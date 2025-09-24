import AdminDashboards from "@/components/dashboard/AdminDashboards";
import UserDashboards from "@/components/dashboard/UserDashboards";
import Loader from "@/components/ui/loader/Loader";
import { useAppSelector } from "@/redux/hooks";

const Dashboard = () => {
  const user: any = useAppSelector((state) => state.auth);
  if (!user?.role) return <Loader />;

  if (user?.role !== "admin") {
    return <UserDashboards />;
  } else {
    return <AdminDashboards />;
  }
};

export default Dashboard;
