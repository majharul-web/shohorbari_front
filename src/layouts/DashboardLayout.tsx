// DashboardLayout.tsx
import Navbar from "@/components/dashboard/Navbar";
import Sidebar from "@/components/dashboard/Sidebar";
import type { ChangeEvent } from "react";
import React, { useState } from "react";
import { Outlet } from "react-router-dom";

const DashboardLayout: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);

  const toggleSidebar = (e: ChangeEvent<HTMLInputElement>) => {
    setSidebarOpen(e.target.checked);
  };

  return (
    <div className='drawer lg:drawer-open'>
      {/* Mobile drawer checkbox */}
      <input
        id='drawer-toggle'
        type='checkbox'
        className='drawer-toggle'
        checked={sidebarOpen}
        onChange={toggleSidebar}
      />

      {/* Page content */}
      <div className='drawer-content flex flex-col'>
        {/* Navbar */}
        <Navbar sidebarOpen={sidebarOpen} />

        {/* Main content */}
        <main className='p-6'>
          <Outlet />
        </main>
      </div>

      {/* Sidebar */}
      <Sidebar />
    </div>
  );
};

export default DashboardLayout;
