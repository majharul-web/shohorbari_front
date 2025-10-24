import { useGetAllAdsQuery } from "@/redux/api/adsApi";
import { useAddToWishlistMutation } from "@/redux/api/authApi";
import { useAppSelector } from "@/redux/hooks";
import { motion } from "framer-motion";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Alert } from "../ui/alert/Alert";
import { Button } from "../ui/button";
import NoDataFound from "../ui/error/NoDataFound";
import TablePagination from "../ui/table/TablePagination";
import SkeletonRentList from "./SkeletonRentList";

interface IProps {
  title?: string;
  clsses?: string;
  query?: Record<string, any>;
  limit?: number;
}

export interface IRentListItem {
  id: number;
  title: string;
  price: number;
  location: string;
  images: { image: string }[];
  description: string;
}

const RentList: React.FC<IProps> = ({ title = "Featured Rentals", clsses, query, limit }) => {
  const [page, setPage] = useState(1);
  const rowsPerPage = 10;

  const isLoggedIn = useAppSelector((state) => state.auth.userId);
  const safeQuery = { ...(query || {}), user: true, page, page_size: rowsPerPage };

  const { data, isLoading } = useGetAllAdsQuery(safeQuery, {
    refetchOnMountOrArgChange: true,
  });
  const dataList = limit ? data?.results.slice(0, limit) : data?.results || [];
  const navigate = useNavigate();

  const pagination = data?.pagination || {};
  const totalCount = pagination.count || dataList?.length;
  const currentPage = pagination.current_page || 1;

  const [addToWishlist] = useAddToWishlistMutation();
  const [addingId, setAddingId] = useState<number | null>(null); // track item being added

  if (isLoading) return <SkeletonRentList clsses='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16' />;
  if (dataList?.length === 0) return <NoDataFound />;

  const handleWishlist = async (id: number) => {
    if (!isLoggedIn) {
      Alert({
        type: "error",
        message: "You must be logged in to perform this action.",
      });
      navigate("/login"); // optional redirect
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
      <div className='flex'>
        <h2 className='text-2xl md:text-3xl font-bold mb-8'>{title}</h2>
        {title == "Featured Rentals" && (
          <Button variant='outline' className='ml-auto' onClick={() => navigate("/rents")}>
            View All
          </Button>
        )}
      </div>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8'>
        {dataList?.map((item: IRentListItem) => {
          const isAdding = addingId === item.id; // only this item shows loading
          return (
            <motion.div
              key={item.id}
              whileHover={{ scale: 1.03 }}
              className='border border-border rounded-lg overflow-hidden bg-card flex flex-col cursor-pointer'
              onClick={() => navigate(`/rents/${item.id}`)}
            >
              <img
                src={item?.images?.[0]?.image ?? "/hero1.jpg"}
                alt={`House ${item.id}`}
                className='w-full h-48 md:h-56 object-cover'
              />
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
      {title !== "Featured Rentals" && (
        <TablePagination
          currentPage={currentPage}
          rowCount={totalCount}
          rowsPerPage={rowsPerPage}
          onChangePage={(newPage) => setPage(newPage)}
        />
      )}
    </section>
  );
};

export default RentList;
