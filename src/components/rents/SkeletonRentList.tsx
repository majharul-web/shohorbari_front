// components/dashboard/SkeletonRentList.tsx
import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

interface SkeletonRentListProps {
  count?: number; // number of skeleton cards
  title?: string;
  clsses?: string;
}

const SkeletonRentList: React.FC<SkeletonRentListProps> = ({
  count = 6,
  title = "Featured Rentals",
  clsses,
}) => {
  const skeletonCards = Array.from({ length: count }, (_, index) => index);

  return (
    <section className={clsses}>
      <h2 className='text-2xl md:text-3xl font-bold mb-8'>
        <Skeleton width={200} height={30} />
      </h2>

      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8'>
        {skeletonCards.map((index) => (
          <div key={index} className='border border-border rounded-lg overflow-hidden bg-card flex flex-col'>
            <Skeleton width='100%' height={192} /> {/* image skeleton */}
            <div className='p-4 flex-1 flex flex-col gap-2'>
              <Skeleton width='60%' height={20} /> {/* title */}
              <Skeleton width='40%' height={16} /> {/* location */}
              <Skeleton width='30%' height={18} /> {/* price */}
              <Skeleton count={3} height={12} /> {/* description */}
              <div className='mt-auto flex gap-2'>
                <Skeleton width='50%' height={36} /> {/* Details button */}
                <Skeleton width='50%' height={36} /> {/* Wishlist button */}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default SkeletonRentList;
