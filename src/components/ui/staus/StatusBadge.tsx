// components/ui/StatusBadge.tsx
import clsx from "clsx";
import React from "react";

interface StatusBadgeProps {
  status: string | undefined | null;
  className?: string;
}

// Common statuses
export const STATUS = {
  ACTIVE: "active",
  SUCCESS: "success",
  INACTIVE: "inactive",
  PENDING: "pending",
  APPROVED: "approved",
  REJECTED: "rejected",
  WAITING_FOR_APPROVAL: "waiting_for_approval",
};

// Map statuses to colors
const STATUS_COLOR: Record<string, string> = {
  [STATUS.ACTIVE]: "bg-green-500",
  [STATUS.SUCCESS]: "bg-green-500",
  [STATUS.INACTIVE]: "bg-red-500",
  [STATUS.PENDING]: "bg-yellow-500",
  [STATUS.APPROVED]: "bg-green-500",
  [STATUS.REJECTED]: "bg-red-600",
  [STATUS.WAITING_FOR_APPROVAL]: "bg-orange-500",
};

const StatusBadge: React.FC<StatusBadgeProps> = ({ status, className }) => {
  const lowerStatus = status?.toLowerCase() || "";
  const colorClass = STATUS_COLOR[lowerStatus] || "bg-gray-400"; // default gray if unknown

  return (
    <span
      className={clsx(
        "capitalize px-2 py-1 rounded-md text-sm text-white min-w-[80px] text-center inline-flex justify-center items-center",
        colorClass,
        className
      )}
    >
      <span>{status || "-"}</span>
    </span>
  );
};

export default StatusBadge;
