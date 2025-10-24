import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useGetAllStatesQuery } from "@/redux/api/dashboardApi";
import { BarChart3, CheckCircle, Clock, TrendingUp } from "lucide-react";
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import NoDataFound from "../ui/error/NoDataFound";
import SkeletonDashboard from "./DashBoardSkellton";

const AdminDashboards: React.FC = () => {
  const { data, error, isLoading } = useGetAllStatesQuery({}, { refetchOnMountOrArgChange: true });

  if (isLoading) return <SkeletonDashboard />;
  if (error) return <NoDataFound message='Something went wrong!' />;
  if (!data) return <NoDataFound message='No data found!' />;

  const stats = [
    { label: "Total Ads", value: data.total_ads, icon: BarChart3, color: "text-primary" },
    { label: "Approved Ads", value: data.approved_ads, icon: CheckCircle, color: "text-green-600" },
    { label: "Pending Ads", value: data.pending_ads, icon: Clock, color: "text-yellow-500" },
    { label: "Ads Last 7 Days", value: data.ads_last_7_days, icon: TrendingUp, color: "text-purple-600" },
    { label: "Ads This Month", value: data.ads_current_month, icon: BarChart3, color: "text-indigo-600" },
    { label: "Ads Last Month", value: data.ads_last_month, icon: BarChart3, color: "text-pink-600" },
  ];

  // Prepare chart data
  const chartData = [
    { name: "Total", value: data.total_ads },
    { name: "Approved", value: data.approved_ads },
    { name: "Pending", value: data.pending_ads },
    { name: "7 Days", value: data.ads_last_7_days },
    { name: "This Month", value: data.ads_current_month },
    { name: "Last Month", value: data.ads_last_month },
  ];

  return (
    <div className='space-y-8 px-4 md:px-0'>
      {/* Stat Cards */}
      <div className='grid gap-6 sm:grid-cols-2 lg:grid-cols-3'>
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card
              key={stat.label}
              className='shadow-sm hover:shadow-md border border-border transition-all duration-200 bg-card'
            >
              <CardHeader className='flex items-center justify-between pb-2'>
                <CardTitle className='text-sm font-medium text-muted-foreground'>{stat.label}</CardTitle>
                <Icon className={`h-5 w-5 ${stat.color}`} />
              </CardHeader>
              <CardContent>
                <p className='text-3xl font-bold text-foreground'>{stat.value}</p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Analytics Chart */}
      <Card className='shadow-sm border border-border'>
        <CardHeader>
          <CardTitle className='text-lg font-semibold text-foreground'>Ad Statistics Overview</CardTitle>
        </CardHeader>
        <CardContent className='h-[300px] md:h-[360px]'>
          <ResponsiveContainer width='100%' height='100%'>
            <BarChart data={chartData} margin={{ top: 20, right: 20, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray='3 3' stroke='#E5E7EB' />
              <XAxis dataKey='name' stroke='#9CA3AF' />
              <YAxis stroke='#9CA3AF' />
              <Tooltip
                contentStyle={{
                  backgroundColor: "white",
                  borderRadius: "8px",
                  border: "1px solid #E5E7EB",
                }}
              />
              <Bar dataKey='value' fill='#567DF2' radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminDashboards;
