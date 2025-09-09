// components/dashboard/Sidebar.tsx
import { useAppDispatch } from "@/redux/hooks";
import { logout } from "@/services/auth.services";
import { Cross, Home, LogOut, Settings, ShoppingCart, User } from "lucide-react";
import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Button } from "../ui/button";

interface SidebarProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const links = [
  { name: "Dashboard", path: "/dashboard", icon: Home, exact: true }, // ✅ exact match
  { name: "Profile", path: "/dashboard/profile", icon: User },
  { name: "Cart", path: "/dashboard/cart", icon: ShoppingCart },
  { name: "Settings", path: "/dashboard/settings", icon: Settings },
];

const Sidebar: React.FC<SidebarProps> = ({ open, setOpen }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  return (
    <aside
      className={`fixed inset-y-0 left-0 z-50 w-64 transform bg-white border-r shadow-md transition-transform duration-200 ease-in-out lg:static lg:translate-x-0 ${
        open ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <div className='flex items-center justify-between p-4 border-b backdrop-blur-md shadow-sm'>
        <h2 className='text-lg font-bold text-primary'>ShohorBari</h2>
        <Button
          variant='ghost'
          size='icon'
          className='md:hidden'
          aria-label='Toggle Menu'
          onClick={() => setOpen((prev) => !prev)}
        >
          <Cross size={24} className='text-gray-500' />
        </Button>
      </div>

      <nav className='flex flex-col gap-1 p-4'>
        {links.map((link) => {
          const Icon = link.icon;
          return (
            <NavLink
              key={link.name}
              to={link.path}
              end={link.exact} // ✅ exact matching only for Dashboard
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                  isActive ? "bg-primary text-white" : "text-gray-700 hover:bg-gray-100"
                }`
              }
              onClick={() => setOpen(false)}
            >
              <Icon size={18} />
              {link.name}
            </NavLink>
          );
        })}
      </nav>

      {/* Logout at bottom */}
      <div className='absolute bottom-4 w-full px-4'>
        <Button variant='destructive' size='sm' fullWidth onClick={() => logout(dispatch, navigate)}>
          <LogOut size={18} /> Logout
        </Button>
      </div>
    </aside>
  );
};

export default Sidebar;
