// DashboardLayout.tsx
import Navbar from "@/components/dashboard/Navbar";
import Sidebar from "@/components/dashboard/Sidebar";
import React, { useState } from "react";
import { Outlet } from "react-router-dom";

const DashboardLayout: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className='flex min-h-screen bg-gray-50'>
      {/* Sidebar */}
      <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />

      {/* Content area */}
      <div className='flex flex-col flex-1'>
        <Navbar setOpen={setSidebarOpen} />

        <main className='flex-1 p-6'>
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
