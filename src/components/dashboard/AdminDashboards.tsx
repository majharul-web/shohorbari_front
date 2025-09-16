import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useGetAllStatesQuery } from "@/redux/api/dashboardApi";
import { BarChart, CheckCircle, Clock } from "lucide-react";
import NoDataFound from "../ui/error/NoDataFound";
import Loader from "../ui/loader/Loader";

const AdminDashboards: React.FC = () => {
  const { data, error, isLoading } = useGetAllStatesQuery({}, { refetchOnMountOrArgChange: true });

  if (isLoading) return <Loader />;
  if (error) return <NoDataFound message='Something went wrong!' />;
  if (!data) return <NoDataFound message='No data found!' />;

  const stats = [
    { label: "Total Ads", value: data.total_ads, icon: BarChart, color: "text-primary" },
    { label: "Approved Ads", value: data.approved_ads, icon: CheckCircle, color: "text-green-600" },
    { label: "Pending Ads", value: data.pending_ads, icon: Clock, color: "text-yellow-500" },
    { label: "Ads Last 7 Days", value: data.ads_last_7_days, icon: BarChart, color: "text-purple-600" },
    { label: "Ads This Month", value: data.ads_current_month, icon: BarChart, color: "text-indigo-600" },
    { label: "Ads Last Month", value: data.ads_last_month, icon: BarChart, color: "text-pink-600" },
  ];

  return (
    <div className='p-6'>
      <div className='grid gap-6 sm:grid-cols-2 lg:grid-cols-3'>
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card
              key={stat.label}
              className='shadow-sm hover:shadow-md border border-border transition-all duration-200'
            >
              <CardHeader className='flex items-center justify-between pb-2'>
                <CardTitle className='text-sm font-medium text-muted-foreground'>{stat.label}</CardTitle>
                <Icon className={`h-5 w-5 ${stat.color}`} />
              </CardHeader>
              <CardContent>
                <p className='text-2xl font-bold text-foreground'>{stat.value}</p>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default AdminDashboards;
