// components/dashboard/SidebarSkeleton.tsx
import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export const SidebarSkeleton: React.FC = () => {
  const linksCount = 7; // Number of sidebar links

  return (
    <aside className='fixed inset-y-0 left-0 z-50 w-64 bg-background border-r border-border shadow-md p-4'>
      {/* Header */}
      <div className='mb-6'>
        <Skeleton height={30} width={150} />
      </div>

      {/* Links */}
      <nav className='flex flex-col gap-3'>
        {Array.from({ length: linksCount }).map((_, idx) => (
          <div key={idx} className='flex items-center gap-3 px-3 py-2 rounded-md bg-[#f9f9f9]'>
            <Skeleton circle height={18} width={18} />
            <Skeleton width={100} height={18} />
          </div>
        ))}
      </nav>

      {/* Logout */}
      <div className='absolute bottom-4 w-full px-4'>
        <Skeleton height={35} />
      </div>
    </aside>
  );
};

export default SidebarSkeleton;
