import { Alert } from "@/components/ui/alert/Alert";
import ConfirmDialog from "@/components/ui/alert/ConfirmDialog";
import { Button } from "@/components/ui/button";
import Loader from "@/components/ui/loader/Loader";
import { APP_CONFIG } from "@/helpers/config/appconfig";
import {
  useDeleteAdRequestMutation,
  useGetAllAddRequestsQuery,
  useUpdateAdsStatusMutation,
} from "@/redux/api/adsApi";
import { formatDate, isSuccess, toCapitalizeString } from "@/utils/common";
import React, { useState } from "react";
import { useNavigate } from "react-router";

const AdRequestPage: React.FC = () => {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const rowsPerPage = 10;
  const [loadingId, setLoadingId] = useState<string | null>(null);

  // ✅ Fetch ad requests
  const { data, isLoading, isError } = useGetAllAddRequestsQuery(
    { page, limit: rowsPerPage, type: "received" },
    { refetchOnMountOrArgChange: true }
  );

  const ads = data?.results || [];

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

  return (
    <div className='space-y-6'>
      {/* Header */}
      <div className='flex justify-between items-center'>
        <p className='text-xl font-bold text-foreground'>Ad Requests</p>
        <p className='text-sm text-muted-foreground'>Total: {data?.count || 0}</p>
      </div>

      {/* Table */}
      <div className='overflow-x-auto rounded-lg border border-border bg-card shadow-sm'>
        <table className='w-full border-collapse text-left'>
          <thead className='bg-muted'>
            <tr>
              <th className='px-4 py-2 text-sm font-medium text-muted-foreground'>#</th>
              <th className='px-4 py-2 text-sm font-medium text-muted-foreground'>Advertisement</th>
              <th className='px-4 py-2 text-sm font-medium text-muted-foreground'>Sender</th>
              <th className='px-4 py-2 text-sm font-medium text-muted-foreground'>Message</th>
              <th className='px-4 py-2 text-sm font-medium text-muted-foreground'>Status</th>
              <th className='px-4 py-2 text-sm font-medium text-muted-foreground'>Created At</th>
              <th className='px-4 py-2 text-sm font-medium text-muted-foreground'>Actions</th>
            </tr>
          </thead>

          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan={7} className='px-4 py-6 text-center'>
                  <Loader />
                </td>
              </tr>
            ) : isError ? (
              <tr>
                <td colSpan={7} className='px-4 py-6 text-center text-destructive'>
                  Failed to load ad requests
                </td>
              </tr>
            ) : ads.length === 0 ? (
              <tr>
                <td colSpan={7} className='px-4 py-6 text-center text-muted-foreground'>
                  No ad requests found
                </td>
              </tr>
            ) : (
              ads.map((req: any, idx: number) => (
                <tr key={req.id} className='border-t border-border hover:bg-muted/50 transition'>
                  {/* Serial */}
                  <td className='px-4 py-2'>{(page - 1) * rowsPerPage + idx + 1}</td>

                  {/* Advertisement */}
                  <td className='px-4 py-2'>
                    <div className='flex items-center gap-3'>
                      <img
                        src={req.advertisement.image || `https://placehold.co/60x60?text=No+Image`}
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
                  </td>

                  {/* Sender */}
                  <td className='px-4 py-2'>
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
                  </td>

                  {/* Message */}
                  <td className='px-4 py-2 text-sm text-muted-foreground'>{req.message || "-"}</td>

                  {/* Status */}
                  <td className='px-4 py-2'>
                    <span
                      className={`px-2 py-1 text-xs rounded-full ${
                        req.status === "accepted"
                          ? "bg-green-100 text-green-700"
                          : req.status === "advanced"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-gray-100 text-gray-700"
                      }`}
                    >
                      {toCapitalizeString(req.status)}
                    </span>
                  </td>

                  {/* Created At */}
                  <td className='px-4 py-2'>{formatDate(req.created_at)}</td>

                  {/* Actions */}
                  <td className='px-4 py-2'>
                    <div className='flex gap-2 flex-wrap'>
                      {/* Approve Button */}
                      {req.status === "accepted" || req.status === "advanced" ? null : (
                        <Button
                          size='sm'
                          onClick={() => handleApprove(req.id, req.advertisement.id)}
                          disabled={
                            (isApproving && loadingId === req.id.toString()) ||
                            req.status === "accepted" ||
                            req.status === "advanced"
                          }
                        >
                          {isApproving && loadingId === req.id.toString() ? "Accepting..." : "Accept"}
                        </Button>
                      )}

                      {/* Delete Button */}

                      {req.status === "accepted" || req.status === "advanced" ? null : (
                        <ConfirmDialog
                          triggerLabel={
                            isDeleting && loadingId === req.id.toString() ? "Deleting..." : "Delete"
                          }
                          title='Delete Ad Request'
                          description={`Are you sure you want to delete request for "${req.advertisement.title}"? This action cannot be undone.`}
                          onConfirm={() => handleDelete(req.id, req.advertisement.id)}
                          loading={isDeleting && loadingId === req.id.toString()}
                          variant='destructive'
                          confirmLabel='Confirm Delete'
                        />
                      )}

                      {/* Details */}
                      <Button
                        variant='outline'
                        size='sm'
                        onClick={() => navigate(`/dashboard/ads/${req.advertisement.id}`)}
                      >
                        Rent Details
                      </Button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdRequestPage;
