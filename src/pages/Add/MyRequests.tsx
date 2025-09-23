import { Alert } from "@/components/ui/alert/Alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import NoDataFound from "@/components/ui/error/NoDataFound";
import Loader from "@/components/ui/loader/Loader";
import { useGetAllAddRequestsQuery, useUpdateAdsStatusMutation } from "@/redux/api/adsApi";
import { toCapitalizeString } from "@/utils/common";
import { motion } from "framer-motion";
import { useState } from "react";
import { useNavigate } from "react-router";

const MyRequestsPage = () => {
  const query: Record<string, any> = { type: "sent" };
  const { data, error, isLoading } = useGetAllAddRequestsQuery(query, {
    refetchOnMountOrArgChange: true,
  });

  const [cancelAd] = useUpdateAdsStatusMutation();
  const [removingIds, setRemovingIds] = useState<string[]>([]);
  const navigate = useNavigate();

  if (isLoading) return <Loader />;
  if (error) return <NoDataFound message='Failed to load rent request.' />;
  if (!data || data?.results?.length === 0) return <NoDataFound message='Your rent request is empty.' />;

  // Cancel / remove request handler
  const handleCancel = async (id: number, adId: number) => {
    try {
      setRemovingIds((prev) => [...prev, id.toString()]);
      await cancelAd({ id, add_id: adId, status: "cancelled" }).unwrap();
      Alert({ type: "success", message: "Request cancelled successfully" });
    } catch (err: any) {
      const errorMessage = err?.data?.detail || "Request cancellation failed";
      Alert({ type: "error", message: toCapitalizeString(errorMessage) });
    } finally {
      setRemovingIds((prev) => prev.filter((x) => x !== id.toString()));
    }
  };

  // Dummy payment handler
  const handlePayment = (id: number, adId: number, amount: number) => {
    navigate(`/payment-initiate?amount=${amount}&orderId=${id}`); // example route
  };

  // Map status to badge styles
   const statusVariant = (status: string) => {
    switch (status) {
      case "accepted":
        return "bg-green-100 text-green-700 border-green-300";
      case "pending":
        return "bg-yellow-100 text-yellow-700 border-yellow-300";
      case "cancelled":
        return "bg-red-100 text-red-700 border-red-300";
      default:
        return "bg-gray-100 text-gray-700 border-gray-300";
    }
  };

  return (
    <div className='max-w-7xl mx-auto py-10 px-4'>
      <p className='text-lg md:text-3xl font-bold mb-8'>My Rent Requests</p>

      <motion.div
        className='grid grid-cols-1 md:grid-cols-2 gap-6'
        initial='hidden'
        animate='visible'
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: { staggerChildren: 0.15 },
          },
        }}
      >
        {data.results.map((item: any) => {
          const isItemRemoving = removingIds.includes(item.id.toString());
          return (
            <motion.div
              key={item.id}
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0 },
              }}
            >
              <Card className='flex flex-col sm:flex-row items-start overflow-hidden shadow-md hover:shadow-lg transition'>
                <img
                  src={item.advertisement.image || `/hero1.jpg`}
                  alt={item.advertisement.title}
                  className='w-full sm:w-56 h-48 sm:h-auto object-cover mx-3 my-4 rounded-lg'
                />

                <div className='flex-1 flex flex-col justify-between'>
                  <CardHeader>
                    <CardTitle className='text-lg font-semibold'>{item.advertisement.title}</CardTitle>
                    <div className='flex items-center gap-2 mt-1'>
                      <p className='text-sm text-muted-foreground'>Requested by {item.sender.name}</p>
                      <Badge variant='outline' className={`${statusVariant(item.status)} text-xs`}>
                        {toCapitalizeString(item.status)}
                      </Badge>
                    </div>
                    <p className='text-xs text-muted-foreground mt-1'>
                      {new Date(item.created_at).toLocaleDateString()}
                    </p>
                  </CardHeader>

                  <CardContent>
                    <p className='font-bold text-primary mb-2'>৳ {item.advertisement.price}/month</p>
                    <p className='text-sm mb-3 italic text-muted-foreground'>“{item.message}”</p>
                    <div className='flex flex-wrap gap-3'>
                      {item.status !== "cancelled" &&
                        item.status !== "accepted" &&
                        item.status !== "advanced" && (
                          <Button
                            variant='destructive'
                            onClick={() => handleCancel(item.id, item.advertisement.id)}
                            disabled={
                              isItemRemoving ||
                              item.status === "cancelled" ||
                              item.status === "accepted" ||
                              item.status === "advanced"
                            }
                          >
                            {isItemRemoving ? "Cancelling..." : "Cancel"}
                          </Button>
                        )}

                      <Button onClick={() => navigate(`/rents/${item.advertisement.id}`)}>
                        View Details
                      </Button>
                      {item.status === "accepted" &&
                        item.status !== "advanced" &&
                        item.status !== "cancelled" && (
                          <Button
                            variant='default'
                            className='bg-green-600 hover:bg-green-700'
                            onClick={() =>
                              handlePayment(item.id, item.advertisement.id, item.advertisement.price)
                            }
                          >
                            Payment
                          </Button>
                        )}
                    </div>
                  </CardContent>
                </div>
              </Card>
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
};

export default MyRequestsPage;
