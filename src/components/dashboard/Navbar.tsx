// components/Dashboard/Navbar.tsx
import { Menu } from "lucide-react";
import React from "react";

interface NavbarProps {
  sidebarOpen: boolean;
  onToggle?: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ sidebarOpen, onToggle }) => {
  return (
    <header className='w-full bg-white shadow-md px-4 py-3 flex items-center justify-between'>
      {/* Sidebar toggle button */}
      <button className='md:hidden text-gray-700 hover:text-primary' onClick={onToggle}>
        <Menu size={24} />
      </button>

      {/* Logo / Title */}
      <h1 className='text-xl font-bold text-primary'>Dashboard</h1>

      {/* Right side actions */}
      <div className='flex items-center space-x-4'>
        {/* Example: notifications / profile */}
        <button className='text-gray-600 hover:text-primary'>🔔</button>
        <button className='text-gray-600 hover:text-primary'>👤</button>
      </div>
    </header>
  );
};

export default Navbar;
