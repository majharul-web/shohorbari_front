// components/dashboard/Navbar.tsx
import Avater from "@/layouts/Avater";
import { useAppSelector } from "@/redux/hooks";
import { Menu } from "lucide-react";
import React from "react";
import { Button } from "../ui/button";

interface NavbarProps {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const Navbar: React.FC<NavbarProps> = ({ setOpen }) => {
  const user: any = useAppSelector((state) => state.auth);
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
        <p className='text-base font-bold text-primary'>
          {user.role === "admin" ? "Admin Dashboard" : "User Dashboard"}
        </p>

        {/* Right side */}
        <Avater />
      </div>
    </header>
  );
};

export default Navbar;
