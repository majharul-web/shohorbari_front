// components/dashboard/Navbar.tsx
import { Menu } from "lucide-react";
import React from "react";
import { Button } from "../ui/button";

interface NavbarProps {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const Navbar: React.FC<NavbarProps> = ({ setOpen }) => {
  return (
    <header className='sticky top-0 z-40 w-full border-b bg-white/80 backdrop-blur-md shadow-sm'>
      <div className='flex h-[60px] items-center justify-between px-4'>
        {/* Mobile menu button */}
        <Button
          variant='ghost'
          size='icon'
          className='md:hidden'
          aria-label='Toggle Menu'
          onClick={() => setOpen((prev) => !prev)}
        >
          <Menu size={24} className='text-gray-500' />
        </Button>

        {/* Logo */}
        <p className='text-base font-bold text-primary'>Dashboard</p>

        {/* Right side */}
        <div className='flex items-center gap-4'>
          <span className='hidden sm:block text-sm text-gray-600'>Welcome, User</span>
          <img src='https://i.pravatar.cc/40' alt='avatar' className='w-10 h-10 rounded-full border' />
        </div>
      </div>
    </header>
  );
};

export default Navbar;
