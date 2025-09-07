import { useState } from "react";
import { NavLink } from "react-router-dom";

const links = [
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
  { name: "Services", path: "/services" },
  { name: "Contact", path: "/contact" },
];

export const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <nav className='bg-white shadow-md sticky top-0 z-50'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between h-16 items-center'>
        <NavLink to='/' className='text-2xl font-bold text-primary'>
          MyBrand
        </NavLink>

        <div className='hidden md:flex space-x-6'>
          {links.map((link) => (
            <NavLink
              key={link.name}
              to={link.path}
              className={({ isActive }) => `block font-medium ${isActive ? "text-primary" : "text-gray-700"}`}
            >
              {link.name}
            </NavLink>
          ))}
        </div>

        <button className='md:hidden' onClick={() => setOpen(!open)}>
          {open ? "✕" : "☰"}
        </button>
      </div>

      {open && (
        <div className='md:hidden bg-white px-4 py-2 space-y-2'>
          {links.map((link) => (
            <NavLink
              key={link.name}
              to={link.path}
              onClick={() => setOpen(false)}
              className={({ isActive }) => `block font-medium ${isActive ? "text-primary" : "text-gray-700"}`}
            >
              {link.name}
            </NavLink>
          ))}
        </div>
      )}
    </nav>
  );
};
