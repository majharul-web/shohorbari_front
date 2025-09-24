import RentRequestModal from "@/components/rents/RentRequestModal";
import ReviewModal from "@/components/rents/ReviewModal";
import ReviewSlider from "@/components/rents/ReviewSlider";
import SkeletonRentDetails from "@/components/rents/SkeletonRentDetails";
import { Alert } from "@/components/ui/alert/Alert";
import { Button } from "@/components/ui/button";
import NoDataFound from "@/components/ui/error/NoDataFound";
import { authKey } from "@/constant/storageKey";
import { useGetAdByIdQuery } from "@/redux/api/adsApi";
import { useAddToWishlistMutation } from "@/redux/api/authApi";
import { useAppSelector } from "@/redux/hooks";
import { getFromCookie } from "@/utils/cookie";
import { motion } from "framer-motion";
import { Link, useParams } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";

const RentDetails = () => {
  const user = useAppSelector((state) => state.auth);
  const { id } = useParams<{ id: string }>();
  const { data: adData, isLoading } = useGetAdByIdQuery({ id: Number(id) }, { skip: !id });

  const [addToWishlist, { isLoading: adding }] = useAddToWishlistMutation();

  if (isLoading) return <SkeletonRentDetails />;
  if (!adData) return <NoDataFound />;

  const handleWishlist = async (id: number) => {
    const auth = getFromCookie(authKey);
    if (!auth) return Alert({ type: "error", message: "Please login to add to wishlist ❌" });
    try {
      await addToWishlist({ advertisement: id }).unwrap();
      Alert({ type: "success", message: "Added to wishlist ❤" });
    } catch (err: any) {
      Alert({ type: "error", message: err?.data?.detail || "Failed to add to wishlist ❌" });
    }
  };

  const images = adData.images?.length ? adData.images?.map((img: any) => img.image) : [`/hero1.jpg`];

  const sliderSettings = {
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    dots: true,
    appendDots: (dots: React.ReactNode) => <div className='mt-3 flex justify-center'>{dots}</div>,
    customPaging: () => <button className='w-3 h-3 rounded-full bg-gray-300 mx-1' />,
  };

  return (
    <motion.div
      className='max-w-5xl mx-auto py-10 px-4 space-y-8'
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      {/* Images Slider */}
      <Slider {...sliderSettings}>
        {images.map((img: string, idx: number) => (
          <motion.div
            key={idx}
            className='overflow-hidden rounded-lg'
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
          >
            <img
              src={img}
              alt={`${adData.title}-${idx}`}
              className='w-full h-96 object-contain rounded-lg shadow-md'
            />
          </motion.div>
        ))}
      </Slider>

      {/* Advertisement Info */}
      <motion.div
        className='space-y-3'
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <h1 className='text-3xl md:text-4xl font-bold'>{adData.title}</h1>
        <p className='text-muted-foreground text-sm md:text-base'>{adData.location}</p>
        <p className='text-2xl md:text-3xl font-semibold text-primary'>৳ {adData.price}/month</p>
        <p className='text-gray-700 text-sm md:text-base'>{adData.description}</p>
        {user?.userId === adData?.owner?.id && (
          <div className=''>
            <span className='text-gray-700  italic'>You are the owner of this advertisement. </span>
            <Link className='text-blue-500 hover:underline' to={`/dashboard/ads/advance/${adData.id}/`}>
              {" "}
              See Advance Details
            </Link>
          </div>
        )}
      </motion.div>

      {/* Action Buttons */}
      <motion.div
        className='flex flex-col sm:flex-row gap-4'
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        <Button onClick={() => handleWishlist(adData.id)} disabled={adding}>
          ❤ Wishlist
        </Button>
        <RentRequestModal adId={adData.id} />
        {/* <Button variant='outline' className='flex-1'>
          Request for Get
        </Button> */}
      </motion.div>

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

export default RentDetails;
