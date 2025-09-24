// components/dashboard/SkeletonInitiatePayment.tsx
import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const SkeletonInitiatePayment: React.FC = () => {
  return (
    <div className='max-w-lg mx-auto mt-16 p-6 bg-white rounded-2xl shadow-md text-center space-y-4'>
      {/* Title Skeleton */}
      <Skeleton width={200} height={28} className='mx-auto' />

      {/* Error / Message Skeleton */}
      <Skeleton width='80%' height={24} className='mx-auto rounded-md' />

      {/* Amount & Order ID Skeleton */}
      <div className='space-y-2'>
        <Skeleton width='60%' height={20} className='mx-auto' />
        <Skeleton width='50%' height={20} className='mx-auto' />
      </div>

      {/* Button Skeleton */}
      <Skeleton width='100%' height={40} className='rounded-lg' />
    </div>
  );
};

export default SkeletonInitiatePayment;
