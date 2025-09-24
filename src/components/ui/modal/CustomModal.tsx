import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useAppSelector } from "@/redux/hooks";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Alert } from "../alert/Alert";

interface CustomModalProps {
  triggerLabel: string;
  title: string;
  children: (props: { closeModal: () => void }) => React.ReactNode;
  requireAuth?: boolean; // Optional flag for login check
}

const CustomModal: React.FC<CustomModalProps> = ({ triggerLabel, title, children, requireAuth = false }) => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  // Example: replace with your real auth check
  const isLoggedIn = useAppSelector((state) => state.auth.userId);
  // const { user } = useAuth(); // If using context/store

  const closeModal = () => setOpen(false);

  const handleTriggerClick = () => {
    if (requireAuth && !isLoggedIn) {
      Alert({
        type: "error",
        message: "You must be logged in to perform this action.",
      });
      navigate("/login"); // optional redirect
      return;
    }
    setOpen(true);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button onClick={handleTriggerClick}>{triggerLabel}</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        {children({ closeModal })}
      </DialogContent>
    </Dialog>
  );
};

export default CustomModal;
