import { Alert } from "@/components/ui/alert/Alert";
import ConfirmDialog from "@/components/ui/alert/ConfirmDialog";
import Loader from "@/components/ui/loader/Loader";
import { useDeleteAdMutation, useGetAllAdsQuery } from "@/redux/api/adsApi";
import { formatDate, toCapitalizeString } from "@/utils/common";
import React, { useState } from "react";

const AdminAddList: React.FC = () => {
  const [page, setPage] = useState(1);
  const rowsPerPage = 10;

  // RTK Query fetch ads
  const { data, isLoading, isError } = useGetAllAdsQuery({
    page: page,
    limit: rowsPerPage,
  });

  const ads = data?.results || [];

  const [deleteAd, { isLoading: isDeleting }] = useDeleteAdMutation();
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const handleDelete = async (id: string) => {
    try {
      setDeletingId(id);
      await deleteAd(id).unwrap();
      Alert({
        type: "success",
        message: "Ad deleted successfully",
      });
    } catch (err: any) {
      console.error("Error:", err);
      const errorMessage = err?.data?.detail || "Ad deletion failed";
      Alert({
        type: "error",
        message: `${toCapitalizeString(errorMessage)}`,
      });
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div>
      <h1 className='text-lg font-semibold mb-4 text-foreground'>Admin Ads List</h1>

      <div className='overflow-x-auto rounded-lg border border-border bg-card shadow-sm'>
        <table className='w-full border-collapse text-left'>
          <thead className='bg-muted'>
            <tr>
              <th className='px-4 py-2 text-sm font-medium text-muted-foreground'>#</th>
              <th className='px-4 py-2 text-sm font-medium text-muted-foreground'>Title</th>
              <th className='px-4 py-2 text-sm font-medium text-muted-foreground'>Price</th>
              <th className='px-4 py-2 text-sm font-medium text-muted-foreground'>Created At</th>
              <th className='px-4 py-2 text-sm font-medium text-muted-foreground'>Action</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan={5} className='px-4 py-6 text-center'>
                  <Loader />
                </td>
              </tr>
            ) : isError ? (
              <tr>
                <td colSpan={5} className='px-4 py-6 text-center text-destructive'>
                  Failed to load ads
                </td>
              </tr>
            ) : ads.length === 0 ? (
              <tr>
                <td colSpan={5} className='px-4 py-6 text-center text-muted-foreground'>
                  No ads found
                </td>
              </tr>
            ) : (
              ads.map((ad: any, idx: number) => (
                <tr key={ad.id} className='border-t border-border'>
                  <td className='px-4 py-2'>{(page - 1) * rowsPerPage + idx + 1}</td>
                  <td className='px-4 py-2'>{ad.title}</td>
                  <td className='px-4 py-2'>{ad.price}</td>
                  <td className='px-4 py-2'>{formatDate(ad.created_at)}</td>
                  <td className='px-4 py-2'>
                    <div className='flex gap-x-2.5'>
                      {/* <Button
                        variant='destructive'
                        size='sm'
                        onClick={() => handleDelete(ad.id)}
                        disabled={isDeleting && deletingId === ad.id}
                      >
                        {isDeleting && deletingId === ad.id ? "Deleting..." : "Delete"}
                      </Button> */}

                      <ConfirmDialog
                        triggerLabel={isDeleting && deletingId === ad.id ? "Deleting..." : "Delete"}
                        title='Delete Ad'
                        description={`Are you sure you want to delete "${ad.title}"? This action cannot be undone.`}
                        onConfirm={() => handleDelete(ad.id)}
                        loading={isDeleting && deletingId === ad.id}
                        variant='destructive'
                        confirmLabel='Confirm Delete'
                      />
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
