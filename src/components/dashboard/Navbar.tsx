import Avater from "@/layouts/Avater";
import { useAppSelector } from "@/redux/hooks";
import { Loader, Menu } from "lucide-react";
import React from "react";
import { Button } from "../ui/button";

interface NavbarProps {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const Navbar: React.FC<NavbarProps> = ({ setOpen }) => {
  const user: any = useAppSelector((state) => state.auth);

  return (
    <header className='sticky top-0 z-40 w-full border-b border-border bg-background/80 backdrop-blur-md shadow-sm'>
      <div className='max-w-7xl mx-auto flex h-[60px] items-center justify-between px-4 sm:px-6 lg:px-8'>
        {/* Mobile menu button */}
        <Button
          variant='ghost'
          size='icon'
          className='md:hidden text-muted-foreground'
          aria-label='Toggle Menu'
          onClick={() => setOpen((prev) => !prev)}
        >
          <Menu size={24} />
        </Button>

        {/* Logo / Title */}
        {user?.role ? (
          <p className='text-lg font-bold text-primary text-center'>
            {user?.role === "admin" ? "Admin Dashboard" : "User Dashboard"}
          </p>
        ) : (
          <Loader className='h-4 w-4 animate-spin' />
        )}

        {/* Right side */}
        <div className='flex items-center gap-4'>
          <Avater />
        </div>
      </div>
    </header>
  );
};

export default Navbar;
