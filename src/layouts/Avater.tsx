// components/dashboard/Avater.tsx
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { logout } from "@/services/auth.services";
import { LogOut, User } from "lucide-react";
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

  return (
    <div className='flex items-center gap-4'>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <div className='py-5'>
            <img src={url} alt='avatar' className='w-10 h-10 rounded-full border cursor-pointer' />
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent className='w-48' align='end'>
          <DropdownMenuItem onClick={() => navigate("/dashboard/profile")}>
            <User className='mr-2 h-4 w-4' />
            <span>Profile</span>
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => {
              logout(dispatch, navigate);
            }}
          >
            <LogOut className='mr-2 h-4 w-4 text-red-500' />
            <span className='text-red-500'>Logout</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default Avater;
