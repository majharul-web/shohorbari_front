// components/dashboard/SkeletonDashboard.tsx
import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

interface SkeletonDashboardProps {
  count?: number;
}

const SkeletonDashboard: React.FC<SkeletonDashboardProps> = ({ count = 6 }) => {
  const skeletonCards = Array.from({ length: count }, (_, index) => index);

  return (
    <div className=' space-y-6 px-4 md:px-0'>
      <div className='grid gap-6 sm:grid-cols-2 lg:grid-cols-3'>
        {skeletonCards.map((index) => (
          <div key={index} className='shadow-sm hover:shadow-md border border-border rounded-lg p-4'>
            <div className='flex items-center justify-between pb-2'>
              <Skeleton width={120} height={20} />
              <Skeleton circle width={20} height={20} />
            </div>
            <div>
              <Skeleton width={60} height={30} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SkeletonDashboard;
