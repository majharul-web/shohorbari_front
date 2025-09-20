import RentModal from "@/components/rents/RentModal";
import { Alert } from "@/components/ui/alert/Alert";
import ConfirmDialog from "@/components/ui/alert/ConfirmDialog";
import { Button } from "@/components/ui/button";
import Loader from "@/components/ui/loader/Loader";
import { useApproveAdMutation, useDeleteAdMutation, useGetAllAdsQuery } from "@/redux/api/adsApi";
import { formatDate, toCapitalizeString } from "@/utils/common";
import React, { useState } from "react";
import { useNavigate } from "react-router";

const AdminAddList: React.FC = () => {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const rowsPerPage = 10;
  const [loadingId, setLoadingId] = useState<string | null>(null);

  // RTK Query fetch ads
  const { data, isLoading, isError } = useGetAllAdsQuery(
    {
      page,
      limit: rowsPerPage,
    },
    { refetchOnMountOrArgChange: true }
  );

  const ads = data?.results || [];

  const [deleteAd, { isLoading: isDeleting }] = useDeleteAdMutation();
  const [approveAd, { isLoading: isApproving }] = useApproveAdMutation();

  // ✅ Handle delete
  const handleDelete = async (id: string) => {
    try {
      setLoadingId(id);
      await deleteAd(id).unwrap();
      Alert({
        type: "success",
        message: "Ad deleted successfully",
      });
    } catch (err: any) {
      const errorMessage = err?.data?.detail || "Ad deletion failed";
      Alert({
        type: "error",
        message: toCapitalizeString(errorMessage),
      });
    } finally {
      setLoadingId(null);
    }
  };

  // ✅ Handle approve
  const handleApprove = async (id: string) => {
    try {
      setLoadingId(id);
      await approveAd(id).unwrap();
      Alert({
        type: "success",
        message: "Ad approved successfully",
      });
    } catch (err: any) {
      const errorMessage = err?.data?.detail || "Ad approval failed";
      Alert({
        type: "error",
        message: toCapitalizeString(errorMessage),
      });
    } finally {
      setLoadingId(null);
    }
  };

  return (
    <div className='space-y-6'>
      {/* Header */}
      <div className='flex justify-between items-center'>
        <p className='text-xl font-bold text-foreground'>Admin Ads List</p>
        <RentModal mode='add' />
      </div>

      {/* Table */}
      <div className='overflow-x-auto rounded-lg border border-border bg-card shadow-sm'>
        <table className='w-full border-collapse text-left'>
          <thead className='bg-muted'>
            <tr>
              <th className='px-4 py-2 text-sm font-medium text-muted-foreground'>#</th>
              <th className='px-4 py-2 text-sm font-medium text-muted-foreground'>Title</th>
              <th className='px-4 py-2 text-sm font-medium text-muted-foreground'>Price</th>
              <th className='px-4 py-2 text-sm font-medium text-muted-foreground'>Booked</th>
              <th className='px-4 py-2 text-sm font-medium text-muted-foreground'>Created At</th>
              <th className='px-4 py-2 text-sm font-medium text-muted-foreground'>Status / Action</th>
            </tr>
          </thead>

          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan={6} className='px-4 py-6 text-center'>
                  <Loader />
                </td>
              </tr>
            ) : isError ? (
              <tr>
                <td colSpan={6} className='px-4 py-6 text-center text-destructive'>
                  Failed to load ads
                </td>
              </tr>
            ) : ads.length === 0 ? (
              <tr>
                <td colSpan={6} className='px-4 py-6 text-center text-muted-foreground'>
                  No ads found
                </td>
              </tr>
            ) : (
              ads.map((ad: any, idx: number) => (
                <tr key={ad.id} className='border-t border-border hover:bg-muted/50 transition'>
                  <td className='px-4 py-2'>{(page - 1) * rowsPerPage + idx + 1}</td>
                  <td className='px-4 py-2 font-medium'>{ad.title}</td>
                  <td className='px-4 py-2'>৳ {ad.price}</td>
                  <td className='px-4 py-2'>{ad.booked ? "Yes" : "No"}</td>
                  <td className='px-4 py-2'>{formatDate(ad.created_at)}</td>
                  <td className='px-4 py-2'>
                    <div className='flex gap-2 flex-wrap justify-between'>
                      {/* Approved / Approve Button */}
                      {ad.approved ? (
                        <span className='text-green-600 font-semibold'>Published</span>
                      ) : (
                        <Button
                          variant='default'
                          size='sm'
                          onClick={() => handleApprove(ad.id)}
                          disabled={(isApproving && loadingId === ad.id) || ad.approved}
                        >
                          {isApproving && loadingId === ad.id ? "Approving..." : "Approve"}
                        </Button>
                      )}

                      {/* Delete Button */}
                      <ConfirmDialog
                        triggerLabel={isDeleting && loadingId === ad.id ? "Deleting..." : "Delete"}
                        title='Delete Ad'
                        description={`Are you sure you want to delete "${ad.title}"? This action cannot be undone.`}
                        onConfirm={() => handleDelete(ad.id)}
                        loading={isDeleting && loadingId === ad.id}
                        variant='destructive'
                        confirmLabel='Confirm Delete'
                      />

                      {/* Edit Button */}
                      <RentModal mode='edit' initialData={ad} />

                      {/* details */}
                      <Button variant='outline' size='sm' onClick={() => navigate(`/dashboard/ads/${ad.id}`)}>
                        Details
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

export default AdminAddList;
