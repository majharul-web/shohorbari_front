// components/dashboard/SkeletonRentDetails.tsx
import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import SkeletonReviewSlider from "./SkeletonReviewSliderProps";

const SkeletonRentDetails: React.FC = () => {
  const skeletonReviews = Array.from({ length: 3 }, (_, i) => i); // mimic review cards

  return (
    <div className='max-w-5xl mx-auto py-10 space-y-8'>
      {/* Images Slider Skeleton */}
      <div className='space-y-4'>
        <Skeleton className='rounded-lg' width='100%' height={384} />
      </div>

      {/* Advertisement Info Skeleton */}
      <div className='space-y-3'>
        <Skeleton width='60%' height={36} /> {/* Title */}
        <Skeleton width='40%' height={20} /> {/* Location */}
        <Skeleton width='30%' height={28} /> {/* Price */}
        <Skeleton count={3} height={14} /> {/* Description */}
        <Skeleton width='50%' height={16} /> {/* Owner info link */}
      </div>

      {/* Action Buttons Skeleton */}
      <div className='flex flex-col sm:flex-row gap-4'>
        <Skeleton width={120} height={36} />
        <Skeleton width={120} height={36} />
        <Skeleton width={120} height={36} />
      </div>

      <SkeletonReviewSlider />
    </div>
  );
};

export default SkeletonRentDetails;
