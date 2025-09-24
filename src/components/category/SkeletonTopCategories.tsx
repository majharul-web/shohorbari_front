// components/dashboard/SkeletonTopCategories.tsx
import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

interface SkeletonTopCategoriesProps {
  count?: number; // Number of skeleton cards
}

const SkeletonTopCategories: React.FC<SkeletonTopCategoriesProps> = ({ count = 4 }) => {
  const skeletonCards = Array.from({ length: count }, (_, index) => index);

  return (
    <section className='max-w-7xl mx-auto '>
      <div className='grid grid-cols-2 sm:grid-cols-4 gap-6 md:gap-8'>
        {skeletonCards.map((index) => (
          <div
            key={index}
            className='flex flex-col items-center justify-center p-6 rounded-xl border border-border bg-card'
          >
            <Skeleton circle width={50} height={50} className='mb-2' />
            <Skeleton width={80} height={20} />
          </div>
        ))}
      </div>
    </section>
  );
};

export default SkeletonTopCategories;
