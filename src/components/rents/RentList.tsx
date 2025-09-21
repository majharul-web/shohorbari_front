import { authKey } from "@/constant/storageKey";
import { useGetAllAdsQuery } from "@/redux/api/adsApi";
import { useAddToWishlistMutation } from "@/redux/api/authApi";
import { getFromCookie } from "@/utils/cookie";
import { motion } from "framer-motion";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Alert } from "../ui/alert/Alert";
import { Button } from "../ui/button";
import NoDataFound from "../ui/error/NoDataFound";
import Loader from "../ui/loader/Loader";

interface IProps {
  title?: string;
  clsses?: string;
  query?: Record<string, any>;
}

export interface IRentListItem {
  id: number;
  title: string;
  price: number;
  location: string;
  imageUrl: string;
  description: string;
}

const RentList: React.FC<IProps> = ({ title = "Featured Rentals", clsses, query }) => {
  const { data, isLoading } = useGetAllAdsQuery(query, {
    refetchOnMountOrArgChange: true,
  });
  const dataList = data?.results || [];
  const navigate = useNavigate();

  const [addToWishlist] = useAddToWishlistMutation();
  const [addingId, setAddingId] = useState<number | null>(null); // track item being added

  if (isLoading) return <Loader />;
  if (dataList.length === 0) return <NoDataFound />;

  const handleWishlist = async (id: number) => {
    const auth = getFromCookie(authKey);
    if (!auth) {
      Alert({ type: "error", message: "Please login to add to wishlist ❤" });
      return;
    }
    try {
      setAddingId(id); // start loading for this item
      await addToWishlist({ advertisement: id }).unwrap();
      Alert({ type: "success", message: "Added to wishlist ❤" });
    } catch (err: any) {
      const errMessage = err?.data?.detail || "Failed to add to wishlist ❤";
      Alert({ type: "error", message: errMessage });
    } finally {
      setAddingId(null); // reset after done
    }
  };

  return (
    <section className={clsses}>
      <h2 className='text-2xl md:text-3xl font-bold mb-8'>{title}</h2>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8'>
        {dataList?.map((item: IRentListItem) => {
          const isAdding = addingId === item.id; // only this item shows loading
          return (
            <motion.div
              key={item.id}
              whileHover={{ scale: 1.03 }}
              className='border border-border rounded-lg overflow-hidden bg-card flex flex-col'
            >
              <img src={`/hero1.jpg`} alt={`House ${item.id}`} className='w-full h-48 md:h-56 object-cover' />
              <div className='p-4 flex-1 flex flex-col'>
                <h3 className='font-semibold text-lg mb-1'>{item.title}</h3>
                <p className='text-sm text-muted-foreground mb-2'>{item.location}</p>
                <p className='font-bold text-primary mb-4'>৳ {item.price}/month</p>
                <p className='text-sm text-muted-foreground mb-2'>{item.description.slice(0, 100)}...</p>

                <div className='mt-auto flex gap-2'>
                  <Button onClick={() => navigate(`/rents/${item.id}`)} variant='outline' className='w-1/2'>
                    Details
                  </Button>
                  <Button onClick={() => handleWishlist(item.id)} disabled={isAdding} className='w-1/2'>
                    {isAdding ? "Adding..." : "❤ Wishlist"}
                  </Button>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};

export default RentList;
