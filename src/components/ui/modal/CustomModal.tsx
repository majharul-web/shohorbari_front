import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import React, { useState } from "react";

interface CustomModalProps {
  triggerLabel: string;
  title: string;
  children: (props: { closeModal: () => void }) => React.ReactNode;
}

const CustomModal: React.FC<CustomModalProps> = ({ triggerLabel, title, children }) => {
  const [open, setOpen] = useState(false);

  const closeModal = () => setOpen(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>{triggerLabel}</Button>
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
