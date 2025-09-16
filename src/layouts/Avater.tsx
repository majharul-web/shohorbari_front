import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { logout } from "@/services/auth.services";
import { LayoutDashboardIcon, LogOut, User } from "lucide-react";
import React from "react";
import { useNavigate } from "react-router";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../components/ui/dropdown-menu";

const Avater: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.auth);
  const url = user?.avatar || "https://i.pravatar.cc/40";

  const currentPath = window.location.pathname;
  const isDashboard = currentPath.startsWith("/dashboard");

  return (
    <div className='flex items-center gap-4'>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <div className='py-5'>
            <img
              src={url}
              alt='avatar'
              className='w-10 h-10 rounded-full border border-border cursor-pointer bg-card'
            />
          </div>
        </DropdownMenuTrigger>

        <DropdownMenuContent className='w-48 bg-card text-foreground' align='end'>
          {isDashboard ? (
            <DropdownMenuItem
              className='cursor-pointer hover:bg-accent hover:text-accent-foreground'
              onClick={() => navigate("/")}
            >
              <LayoutDashboardIcon className='mr-2 h-4 w-4' />
              Home
            </DropdownMenuItem>
          ) : (
            <DropdownMenuItem
              className='cursor-pointer hover:bg-accent hover:text-accent-foreground'
              onClick={() => navigate("/dashboard")}
            >
              <LayoutDashboardIcon className='mr-2 h-4 w-4' />
              Dashboard
            </DropdownMenuItem>
          )}

          <DropdownMenuItem
            className='cursor-pointer hover:bg-accent hover:text-accent-foreground'
            onClick={() => navigate("/dashboard/profile")}
          >
            <User className='mr-2 h-4 w-4' />
            Profile
          </DropdownMenuItem>

          <DropdownMenuItem
            className='cursor-pointer hover:bg-destructive hover:text-destructive-foreground'
            onClick={() => logout(dispatch, navigate)}
          >
            <LogOut className='mr-2 h-4 w-4 text-destructive' />
            <span className='text-destructive'>Logout</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default Avater;
