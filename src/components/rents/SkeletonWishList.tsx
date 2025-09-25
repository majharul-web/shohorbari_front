// components/rents/SkeletonWishList.tsx
import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

interface SkeletonWishListProps {
  count?: number; // number of skeleton cards
}

const SkeletonWishList: React.FC<SkeletonWishListProps> = ({ count = 4 }) => {
  const skeletonCards = Array.from({ length: count }, (_, i) => i);

  return (
    <div className='max-w-7xl mx-auto py-10 px-4'>
      {/* Page Title Skeleton */}
      <Skeleton width={200} height={28} className='mb-8' />

      <div className='grid grid-cols-1 md:grid-cols-2 gap-6 space-y-4'>
        {skeletonCards.map((index) => (
          <div
            key={index}
            className='flex flex-col sm:flex-row items-start shadow-md rounded-lg overflow-hidden p-4 gap-4'
          >
            {/* Image Skeleton */}
            <Skeleton width={224} height={192} className='rounded-lg' />

            {/* Content Skeleton */}
            <div className='flex-1 flex flex-col justify-between gap-2'>
              {/* Header */}
              <div className='space-y-2'>
                <Skeleton width='60%' height={20} /> {/* Title */}
                <Skeleton width='40%' height={16} /> {/* User */}
              </div>

              {/* Price Skeleton */}
              <Skeleton width='30%' height={18} className='mt-2' />

              {/* Buttons Skeleton */}
              <div className='flex gap-3 mt-3'>
                <Skeleton width={100} height={36} className='rounded-md' />
                <Skeleton width={100} height={36} className='rounded-md' />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SkeletonWishList;
