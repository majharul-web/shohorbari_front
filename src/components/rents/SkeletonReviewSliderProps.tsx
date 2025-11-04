// components/dashboard/SkeletonReviewSlider.tsx
import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

interface SkeletonReviewSliderProps {
  count?: number; // number of skeleton cards
}

const SkeletonReviewSlider: React.FC<SkeletonReviewSliderProps> = ({ count = 3 }) => {
  const skeletonCards = Array.from({ length: count }, (_, index) => index);

  return (
    <div className='max-w-7xl mx-auto py-16 md:px-0'>
      {/* Skeleton for heading */}
      <Skeleton width={300} height={30} className='mb-2' />
      <Skeleton width={200} height={20} className='mb-8' />

      <div className='grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 gap-6'>
        {skeletonCards.map((index) => (
          <div key={index} className='p-3'>
            <div className='bg-white rounded-xl shadow-md p-6 flex flex-col justify-between h-full'>
              <div>
                <Skeleton width={100} height={20} className='mb-2' /> {/* Title */}
                <Skeleton count={3} height={12} className='mb-4' /> {/* Comment */}
                <div className='flex space-x-1 mb-4'>
                  {Array(5)
                    .fill(0)
                    .map((_, idx) => (
                      <Skeleton key={idx} circle width={16} height={16} />
                    ))}
                </div>
              </div>
              <div className='flex items-center gap-3 mt-4'>
                <Skeleton circle width={40} height={40} /> {/* Avatar */}
                <div>
                  <Skeleton width={80} height={14} className='mb-1' /> {/* Name */}
                  <Skeleton width={60} height={12} /> {/* Role */}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SkeletonReviewSlider;
