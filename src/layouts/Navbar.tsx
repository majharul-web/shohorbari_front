import { APP_CONFIG } from "@/helpers/config/appconfig";
import { useAppSelector } from "@/redux/hooks";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import Avater from "./Avater";

export const Navbar = () => {
  const [open, setOpen] = useState(false);
  const user = useAppSelector((state) => state.auth);

  const links = [
    { name: "Home", path: "/", visible: true },
    { name: "About", path: "/about", visible: true },
    { name: "Services", path: "/services", visible: true },
    { name: "Contact", path: "/contact", visible: true },
    { name: "Login", path: "/login", visible: !user?.userId },
    { name: "Register", path: "/register", visible: !user?.userId },
  ];

  return (
    <nav className='bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-50 border-b'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between h-16 items-center'>
        {/* Logo */}
        <NavLink to='/' className='text-2xl font-bold text-primary'>
          {APP_CONFIG.APP_NAME}
        </NavLink>

        {/* Desktop links */}
        <div className='hidden md:flex items-center gap-8'>
          {links
            .filter((link) => link.visible)
            .map((link) => (
              <NavLink
                key={link.name}
                to={link.path}
                className={({ isActive }) =>
                  `relative text-sm font-medium transition-colors hover:text-primary ${
                    isActive
                      ? "text-primary after:absolute after:-bottom-1 after:left-0 after:h-[2px] after:w-full after:bg-primary after:rounded-full"
                      : "text-gray-600"
                  }`
                }
              >
                {link.name}
              </NavLink>
            ))}
          {user?.userId && <Avater />}
        </div>

        {/* Mobile menu button */}
        <button
          className='md:hidden p-2 rounded-md text-gray-600 hover:bg-gray-100 transition'
          onClick={() => setOpen(!open)}
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile dropdown */}
      {open && (
        <div className='md:hidden bg-white border-t shadow-md px-4 py-3 space-y-2 animate-in slide-in-from-top'>
          {links
            .filter((link) => link.visible)
            .map((link) => (
              <NavLink
                key={link.name}
                to={link.path}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  `block rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-gray-50 ${
                    isActive ? "text-primary bg-gray-50" : "text-gray-700"
                  }`
                }
              >
                {link.name}
              </NavLink>
            ))}
          {user?.userId && <Avater />}
        </div>
      )}
    </nav>
  );
};
