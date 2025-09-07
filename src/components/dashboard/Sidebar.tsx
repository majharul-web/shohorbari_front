// components/Dashboard/Sidebar.tsx
import { Box, CreditCard, Home, ShoppingCart, User } from "lucide-react";
import React from "react";
import { NavLink } from "react-router-dom";

const links = [
  { name: "Dashboard", path: "/dashboard", icon: <Home size={20} /> },
  { name: "Profile", path: "/dashboard/profile", icon: <User size={20} /> },
  { name: "Cart", path: "/dashboard/cart", icon: <ShoppingCart size={20} /> },
  { name: "Orders", path: "/dashboard/orders", icon: <CreditCard size={20} /> },
  { name: "Add Product", path: "/dashboard/products/add", icon: <Box size={20} /> },
];

const Sidebar: React.FC = () => {
  return (
    <aside className='drawer-side bg-gray-100 w-64 p-4 hidden lg:block'>
      <ul className='space-y-2'>
        {links.map((link) => (
          <li key={link.name}>
            <NavLink
              to={link.path}
              className={({ isActive }) =>
                `flex items-center space-x-2 p-2 rounded hover:bg-gray-200 ${
                  isActive ? "bg-primary text-white" : "text-gray-700"
                }`
              }
            >
              {link.icon}
              <span>{link.name}</span>
            </NavLink>
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default Sidebar;
