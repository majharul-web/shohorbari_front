import ReviewSlider from "@/components/rents/ReviewSlider";
import { Alert } from "@/components/ui/alert/Alert";
import NoDataFound from "@/components/ui/error/NoDataFound";
import Loader from "@/components/ui/loader/Loader";
import {
  useApproveAdMutation,
  useDeleteAdMutation,
  useGetAdByIdQuery,
  useGetAdRequestQuery,
} from "@/redux/api/adsApi";
import { motion } from "framer-motion";
import { useParams } from "react-router-dom";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";

import RentModal from "@/components/rents/RentModal";
import ReviewModal from "@/components/rents/ReviewModal";
import SkeletonRentDetails from "@/components/rents/SkeletonRentDetails";
import UploadImagesModal from "@/components/rents/UploadImagesModal";
import ConfirmDialog from "@/components/ui/alert/ConfirmDialog";
import { Button } from "@/components/ui/button";
import { formatDate, toCapitalizeString } from "@/utils/common";
import { useState } from "react";
import { useNavigate } from "react-router";

const RentAdvanceDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const { data: adData, isLoading } = useGetAdByIdQuery({ id: Number(id) }, { skip: !id });

  const [loadingId, setLoadingId] = useState<string | null>(null);

  const {
    data: adRequests,
    error,
    isLoading: isLoadingRequests,
  } = useGetAdRequestQuery(
    { add_id: Number(id) },
    {
      refetchOnMountOrArgChange: true,
      skip: !id,
    }
  );

  console.log("adRequests", adRequests);

  // ✅ Handle delete
  const handleDelete = async (id: string) => {
    try {
      setLoadingId(id);
      await deleteAd(id).unwrap();
      Alert({
        type: "success",
        message: "Ad deleted successfully",
      });
    } catch (err: any) {
      const errorMessage = err?.data?.detail || "Ad deletion failed";
      Alert({
        type: "error",
        message: toCapitalizeString(errorMessage),
      });
    } finally {
      setLoadingId(null);
    }
  };

  // ✅ Handle approve
  const handleApprove = async (id: string) => {
    try {
      setLoadingId(id);
      await approveAd(id).unwrap();
      Alert({
        type: "success",
        message: "Ad approved successfully",
      });
    } catch (err: any) {
      const errorMessage = err?.data?.detail || "Ad approval failed";
      Alert({
        type: "error",
        message: toCapitalizeString(errorMessage),
      });
    } finally {
      setLoadingId(null);
    }
  };

  const images = adData?.images?.length ? adData.images?.map((img: any) => img.image) : [`/hero1.jpg`];

  // ✅ move these up before any return
  const [deleteAd, { isLoading: isDeleting }] = useDeleteAdMutation();
  const [approveAd, { isLoading: isApproving }] = useApproveAdMutation();

  if (isLoading) return <SkeletonRentDetails />;
  if (!adData) return <NoDataFound />;

  return (
    <motion.div
      className='max-w-6xl mx-auto px-4 space-y-10'
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      {/* 🔹 Image Manager */}
      <div className='space-y-4'>
        {/* Manage Images */}
        <p className='text-lg font-semibold'>Manage Images</p>
        <div className='flex flex-col md:flex-row md:items-start md:justify-between gap-4'>
          {/* Images Grid */}
          <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4'>
            {images?.slice(0, 4)?.map((img: string, idx: number) => (
              <div
                key={idx}
                className='relative w-full aspect-square rounded-md overflow-hidden border shadow-sm'
              >
                <img src={img} alt={`ad-img-${idx}`} className='w-full h-full object-cover' />
                {/* Remove Button */}
                <ConfirmDialog
                  triggerLabel='Remove'
                  title='Remove Image'
                  description='Are you sure you want to remove this image?'
                  onConfirm={() => console.log("remove image", idx)}
                  variant='destructive'
                />
              </div>
            ))}
          </div>

          {/* Upload New */}
          <div className='shrink-0'>
            <UploadImagesModal adId={adData.id} />
          </div>
        </div>
      </div>

      {/* 🔹 Rent Details + Actions */}
      <motion.div
        className='space-y-3'
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        {/* Title */}
        <h1 className='text-2xl sm:text-3xl md:text-4xl font-bold'>{adData.title}</h1>

        {/* Status */}
        <div className='flex flex-wrap items-center gap-2 sm:gap-x-4'>
          <p className='text-muted-foreground text-lg sm:text-2xl'>Status:</p>
          {adData.approved && <span className='text-green-600 font-semibold'>Published</span>}
        </div>

        {/* Price */}
        <p className='text-xl sm:text-2xl font-semibold text-primary'>৳ {adData.price}/month</p>

        {/* Description */}
        <p className='text-gray-700'>{adData.description}</p>

        {/* Actions */}
        <div className='flex flex-wrap gap-3 mt-4 items-center'>
          <RentModal
            mode='edit'
            initialData={{
              id: adData.id,
              category: adData.category.id.toString(),
              title: adData.title,
              description: adData.description,
              price: adData.price,
            }}
          />
          <ConfirmDialog
            triggerLabel={isDeleting && loadingId === adData.id ? "Deleting..." : "Delete"}
            title='Delete Ad'
            description={`Are you sure you want to delete "${adData.title}"? This action cannot be undone.`}
            onConfirm={() => handleDelete(adData.id)}
            loading={isDeleting && loadingId === adData.id}
            variant='destructive'
            confirmLabel='Confirm Delete'
          />
          <Button variant='outline' size='sm' onClick={() => navigate(`/dashboard/ads/${adData.id}`)}>
            Details
          </Button>
        </div>
      </motion.div>

      {/* 🔹 Rent Requests */}
      {isLoadingRequests ? (
        <Loader />
      ) : error ? (
        <p className='text-red-600'>Failed to load requests</p>
      ) : (
        <div className='space-y-4'>
          <p className='text-lg font-semibold'>Rent Requests</p>
          <div className='overflow-x-auto rounded-lg border border-border bg-card shadow-sm'>
            <table className='w-full border-collapse text-left'>
              <thead className='bg-muted'>
                <tr>
                  <th className='px-4 py-2 text-sm font-medium'>#</th>
                  <th className='px-4 py-2 text-sm font-medium'>Sender</th>
                  <th className='px-4 py-2 text-sm font-medium'>Message</th>
                  <th className='px-4 py-2 text-sm font-medium'>Status</th>
                  <th className='px-4 py-2 text-sm font-medium'>Created At</th>
                  <th className='px-4 py-2 text-sm font-medium'>Actions</th>
                </tr>
              </thead>
              <tbody>
                {adRequests?.results && adRequests?.results?.length > 0 ? (
                  adRequests?.results?.map((req: any, idx: number) => (
                    <tr key={req.id} className='border-t hover:bg-muted/50'>
                      <td className='px-4 py-2'>{idx + 1}</td>
                      <td className='px-4 py-2 font-medium'>{req.sender.name}</td>
                      <td className='px-4 py-2 text-sm text-muted-foreground'>{req.message || "-"}</td>
                      <td className='px-4 py-2'>
                        <span
                          className={`px-2 py-1 text-xs rounded-full ${
                            req.status === "accepted"
                              ? "bg-green-100 text-green-700"
                              : req.status === "advanced"
                              ? "bg-yellow-100 text-yellow-700"
                              : "bg-gray-100 text-gray-700"
                          }`}
                        >
                          {toCapitalizeString(req.status)}
                        </span>
                      </td>
                      <td className='px-4 py-2'>{formatDate(req.created_at)}</td>
                      <td className='px-4 py-2'>
                        <div className='flex gap-2 flex-wrap'>
                          {req.status !== "accepted" && (
                            <Button size='sm' onClick={() => console.log("approve req", req.id)}>
                              Accept
                            </Button>
                          )}
                          <ConfirmDialog
                            triggerLabel='Delete'
                            title='Delete Request'
                            description={`Delete request from "${req.sender.name}"?`}
                            onConfirm={() => console.log("delete req", req.id)}
                            variant='destructive'
                          />
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={6} className='px-4 py-6 text-center text-muted-foreground'>
                      No rent requests found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Reviews */}
      <motion.div
        className='space-y-6'
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
      >
        <ReviewSlider reviews={adData.reviews} />
        <div className='flex justify-center'>
          <ReviewModal adId={adData.id} />
        </div>
      </motion.div>
    </motion.div>
  );
};

export default RentAdvanceDetails;
