// components/dashboard/Sidebar.tsx
import { APP_CONFIG } from "@/helpers/config/appconfig";
import { useAppDispatch } from "@/redux/hooks";
import { logout } from "@/services/auth.services";
import { Cross, FolderRoot, GitPullRequest, Home, LayoutDashboard, LogOut, Radar, User } from "lucide-react";
import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Button } from "../ui/button";

interface SidebarProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const links = [
  { name: "Dashboard", path: "/dashboard", icon: LayoutDashboard, exact: true },
  { name: "Category", path: "/dashboard/category", icon: Radar },
  { name: "Ads", path: "/dashboard/ads", icon: Home },
  { name: "Add Request", path: "/dashboard/add-request", icon: GitPullRequest },
  { name: "Profile", path: "/dashboard/profile", icon: User },
  { name: "Home", path: "/", icon: FolderRoot },
];

const Sidebar: React.FC<SidebarProps> = ({ open, setOpen }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  return (
    <aside
      className={`fixed inset-y-0 left-0 z-50 w-64 transform bg-background border-r border-border shadow-md transition-transform duration-200 ease-in-out lg:static lg:translate-x-0 ${
        open ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      {/* Header */}
      <div className='flex items-center justify-between p-4 border-b border-border backdrop-blur-md shadow-sm'>
        <h2 className='text-lg font-bold text-primary cursor-pointer' onClick={() => navigate("/dashboard")}>
          {APP_CONFIG.APP_NAME}
        </h2>
        <Button
          variant='ghost'
          size='icon'
          className='md:hidden text-muted-foreground'
          aria-label='Toggle Menu'
          onClick={() => setOpen((prev) => !prev)}
        >
          <Cross size={24} />
        </Button>
      </div>

      {/* Navigation */}
      <nav className='flex flex-col gap-1 p-4'>
        {links.map((link) => {
          const Icon = link.icon;
          return (
            <NavLink
              key={link.name}
              to={link.path}
              end={link.exact}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
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

      {/* Logout */}
      <div className='absolute bottom-4 w-full px-4'>
        <Button variant='destructive' size='sm' className='w-full' onClick={() => logout(dispatch, navigate)}>
          <LogOut size={18} /> Logout
        </Button>
      </div>
    </aside>
  );
};

export default Sidebar;
