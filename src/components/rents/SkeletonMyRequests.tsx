// components/dashboard/SkeletonMyRequests.tsx
import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

interface SkeletonMyRequestsProps {
  count?: number; // number of skeleton cards
}

const SkeletonMyRequests: React.FC<SkeletonMyRequestsProps> = ({ count = 4 }) => {
  const skeletonCards = Array.from({ length: count }, (_, i) => i);

  return (
    <div className='max-w-7xl mx-auto py-10'>
      <Skeleton width={250} height={30} className='mb-8' /> {/* Page title */}
      <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
        {skeletonCards.map((index) => (
          <div
            key={index}
            className='flex flex-col sm:flex-row items-start overflow-hidden shadow-md rounded-lg p-4 gap-4'
          >
            {/* Image */}
            <Skeleton className='rounded-lg' width={224} height={192} />

            {/* Content */}
            <div className='flex-1 flex flex-col justify-between gap-2'>
              {/* Header */}
              <div className='space-y-2'>
                <Skeleton width='60%' height={20} /> {/* Title */}
                <Skeleton width='40%' height={16} /> {/* Requested by */}
                <Skeleton width='20%' height={16} /> {/* Badge */}
                <Skeleton width='30%' height={12} /> {/* Date */}
              </div>

              {/* Body */}
              <div className='space-y-2'>
                <Skeleton width='30%' height={18} /> {/* Price */}
                <Skeleton count={2} height={12} /> {/* Message */}
              </div>

              {/* Buttons */}
              <div className='flex flex-wrap gap-3 mt-2'>
                <Skeleton width={100} height={36} />
                <Skeleton width={100} height={36} />
                <Skeleton width={100} height={36} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SkeletonMyRequests;
