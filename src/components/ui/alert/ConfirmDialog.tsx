import React from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";

interface ConfirmDialogProps {
  triggerLabel: string;
  confirmLabel?: string;
  cancelLabel?: string;
  title: string;
  description: string;
  onConfirm: () => void;
  loading?: boolean;
  variant?: "default" | "destructive" | "secondary" | "outline";
}

const ConfirmDialog: React.FC<ConfirmDialogProps> = ({
  triggerLabel,
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
  title,
  description,
  onConfirm,
  loading = false,
  variant = "destructive",
}) => {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant={variant} disabled={loading}>
          {loading ? "Processing..." : triggerLabel}
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>{cancelLabel}</AlertDialogCancel>
          <AlertDialogAction
            onClick={onConfirm}
            className='bg-destructive text-white hover:bg-destructive/90'
          >
            {confirmLabel}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default ConfirmDialog;
