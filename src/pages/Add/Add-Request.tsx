import { Alert } from "@/components/ui/alert/Alert";
import ConfirmDialog from "@/components/ui/alert/ConfirmDialog";
import { Button } from "@/components/ui/button";
import StatusBadge from "@/components/ui/staus/StatusBadge";
import { DataTable } from "@/components/ui/table/DataTable";
import { APP_CONFIG } from "@/helpers/config/appconfig";
import { useDebounced } from "@/hooks/useDebounced";
import {
  useDeleteAdRequestMutation,
  useGetAllAddRequestsQuery,
  useUpdateAdsStatusMutation,
} from "@/redux/api/adsApi";
import { formatDate, isSuccess, toCapitalizeString } from "@/utils/common";
import { useState } from "react";
import { useNavigate } from "react-router";

const AdRequestPage: React.FC = () => {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const rowsPerPage = 10;
  const [loadingId, setLoadingId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [statusFilter, setStatusFilter] = useState<string>("");

  const query: Record<string, any> = { page, limit: rowsPerPage };
  query["type"] = "received";

  const debouncedTerm = useDebounced({ searchQuery, delay: 600 });
  if (debouncedTerm) query["search"] = debouncedTerm;
  if (statusFilter) query["status"] = statusFilter;

  // Fetch ad requests
  const { data, isLoading, isError } = useGetAllAddRequestsQuery(query, { refetchOnMountOrArgChange: true });

  const ads = data?.results || [];
  const totalCount = data?.count || ads.length;

  const [deleteAd, { isLoading: isDeleting }] = useDeleteAdRequestMutation();
  const [approveAd, { isLoading: isApproving }] = useUpdateAdsStatusMutation();

  // ✅ Delete handler
  const handleDelete = async (id: number, adId: number) => {
    try {
      setLoadingId(id.toString());
      const res = await deleteAd({ id, add_id: adId }).unwrap();
      if (isSuccess(res?.status)) {
        Alert({ type: "success", message: "Ad request deleted successfully" });
      }
    } catch (err: any) {
      const errorMessage = err?.data?.detail || "Ad request deletion failed";
      Alert({ type: "error", message: toCapitalizeString(errorMessage) });
    } finally {
      setLoadingId(null);
    }
  };

  // ✅ Approve handler
  const handleApprove = async (id: number, adId: number) => {
    try {
      setLoadingId(id.toString());
      await approveAd({ id, add_id: adId, status: "accepted" }).unwrap();
      Alert({ type: "success", message: "Ad approved successfully" });
    } catch (err: any) {
      const errorMessage = err?.data?.detail || "Ad approval failed";
      Alert({ type: "error", message: toCapitalizeString(errorMessage) });
    } finally {
      setLoadingId(null);
    }
  };

  // ✅ Define reusable columns
  const columns = [
    {
      key: "index",
      label: "#",
      render: (_: any, idx: number) => (page - 1) * rowsPerPage + idx + 1,
      className: "w-[50px]",
    },
    {
      key: "advertisement",
      label: "Advertisement",
      render: (req: any) => (
        <div className='flex items-center gap-3'>
          <img
            src={req.advertisement.image || "https://placehold.co/60x60?text=No+Image"}
            alt={req.advertisement.title}
            className='w-14 h-14 object-cover rounded-md border'
          />
          <div>
            <p className='font-medium'>{req.advertisement.title}</p>
            <p className='text-sm text-muted-foreground'>৳ {req.advertisement.price} / month</p>
            <p className='text-xs text-muted-foreground'>
              {req.advertisement.booked ? "Booked" : "Available"}
            </p>
          </div>
        </div>
      ),
    },
    {
      key: "sender",
      label: "Sender",
      render: (req: any) => (
        <div className='flex items-center gap-2'>
          <img
            src={req.sender.profile_image || APP_CONFIG.DEFAULT_PROFILE_IMAGE}
            alt={req.sender.name}
            className='w-8 h-8 rounded-full object-cover'
          />
          <div>
            <p className='font-medium'>{req.sender.name}</p>
            <p className='text-xs text-muted-foreground'>{req.sender.email}</p>
          </div>
        </div>
      ),
    },
    { key: "message", label: "Message", render: (req: any) => req.message || "-" },
    { key: "status", label: "Status", render: (req: any) => <StatusBadge status={req.status} /> },
    { key: "created_at", label: "Created At", render: (req: any) => formatDate(req.created_at) },
    {
      key: "actions",
      label: "Actions",
      render: (req: any) => (
        <div className='flex gap-2 flex-wrap'>
          {/* ✅ Approve */}
          {req.status === "accepted" || req.status === "advanced" ? null : (
            <Button
              size='sm'
              onClick={() => handleApprove(req.id, req.advertisement.id)}
              disabled={isApproving && loadingId === req.id.toString()}
            >
              {isApproving && loadingId === req.id.toString() ? "Accepting..." : "Accept"}
            </Button>
          )}

          {/* ✅ Delete */}
          {req.status === "accepted" || req.status === "advanced" ? null : (
            <ConfirmDialog
              triggerLabel={isDeleting && loadingId === req.id.toString() ? "Deleting..." : "Delete"}
              title='Delete Ad Request'
              description={`Are you sure you want to delete request for "${req.advertisement.title}"?`}
              onConfirm={() => handleDelete(req.id, req.advertisement.id)}
              loading={isDeleting && loadingId === req.id.toString()}
              variant='destructive'
              confirmLabel='Confirm Delete'
            />
          )}

          {/* ✅ Details */}
          <Button
            variant='outline'
            size='sm'
            onClick={() => navigate(`/dashboard/ads/${req.advertisement.id}`)}
          >
            Rent Details
          </Button>
        </div>
      ),
    },
  ];

  const STATUS_CHOICES = [
    { value: "pending", label: "Pending" },
    { value: "accepted", label: "Accepted" },
    { value: "rejected", label: "Rejected" },
    { value: "canceled", label: "Canceled" },
    { value: "completed", label: "Completed" },
    { value: "advanced", label: "Advanced" },
    { value: "closed", label: "Closed" },
  ];
  return (
    <div className='space-y-6'>
      <div className='flex justify-between items-center'>
        <p className='text-xl font-bold text-foreground'>Ad Requests</p>
        <p className='text-sm text-muted-foreground'>Total: {totalCount}</p>
      </div>
      {/* Filters */}
      <div className='flex flex-col md:flex-row gap-3 w-full pb-6'>
        <input
          type='text'
          aria-label='Search rentals'
          placeholder='Search title...'
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className='w-full md:w-1/4 rounded-md px-3 py-2 shadow-sm border border-border focus:outline-none focus:border-primary transition'
        />

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className='rounded-md px-3 py-2 shadow-sm border border-border focus:outline-none focus:border-primary transition'
        >
          <option value=''>All</option>
          {STATUS_CHOICES.map((status) => (
            <option key={status.value} value={status.value}>
              {status.label}
            </option>
          ))}
        </select>
      </div>

      <DataTable
        columns={columns}
        data={ads}
        page={page}
        totalCount={totalCount}
        rowsPerPage={rowsPerPage}
        isLoading={isLoading}
        isError={isError}
        onChangePage={setPage}
      />
    </div>
  );
};

export default AdRequestPage;
