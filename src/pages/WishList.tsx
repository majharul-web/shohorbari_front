import { Alert } from "@/components/ui/alert/Alert";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import NoDataFound from "@/components/ui/error/NoDataFound";
import { useGetWishlistQuery, useRemoveFromWishlistMutation } from "@/redux/api/authApi";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";
import { useNavigate } from "react-router";

import SkeletonWishList from "@/components/rents/SkeletonWishList";
import { useState } from "react";

const WishList = () => {
  const { data, error, isLoading } = useGetWishlistQuery({}, { refetchOnMountOrArgChange: true });
  const [removeFromWishlist] = useRemoveFromWishlistMutation();
  const [removingIds, setRemovingIds] = useState<number[]>([]); // track IDs being removed
  const navigate = useNavigate();

  if (isLoading) return <SkeletonWishList />;
  if (error) return <NoDataFound message='Failed to load wishlist.' />;
  if (!data || data?.results?.length === 0) return <NoDataFound message='Your wishlist is empty.' />;

  const handleRemove = async (id: number) => {
    try {
      setRemovingIds((prev) => [...prev, id]); // start loading for this item
      await removeFromWishlist(id).unwrap();
      Alert({ type: "success", message: "Removed from wishlist  ❤" });
    } catch (err: any) {
      const errMessage = err?.data?.detail || "Failed to remove from wishlist  ❤";
      Alert({ type: "error", message: errMessage });
    } finally {
      setRemovingIds((prev) => prev.filter((itemId) => itemId !== id)); // stop loading
    }
  };

  return (
    <div className='max-w-7xl mx-auto py-10'>
      <p className='text-lg md:text-3xl font-bold mb-8 '>My Wishlist</p>

      <motion.div
        className='space-y-4 grid grid-cols-1 md:grid-cols-2  gap-6'
        initial='hidden'
        animate='visible'
        variants={{
          hidden: { opacity: 0 },
          visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
        }}
      >
        {data.results.map((item: any) => {
          const isItemRemoving = removingIds.includes(item.id); // check loading per item
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
                    <p className='text-sm text-muted-foreground'>by {item.user.name}</p>
                  </CardHeader>

                  <CardContent>
                    <p className='font-bold text-primary mb-4'>৳ {item.advertisement.price}/month</p>
                    <div className='flex gap-3'>
                      <Button
                        variant='outline'
                        onClick={() => handleRemove(item.id)}
                        disabled={isItemRemoving}
                      >
                        {isItemRemoving && <Loader2 className='w-4 h-4 mr-2 animate-spin' />}
                        Remove
                      </Button>
                      <Button onClick={() => navigate(`/rents/${item.advertisement.id}`)}>
                        View Details
                      </Button>
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

export default WishList;
