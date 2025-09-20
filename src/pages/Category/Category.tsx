import CategoryModal from "@/components/category/CategoryModal";
import { Alert } from "@/components/ui/alert/Alert";
import ConfirmDialog from "@/components/ui/alert/ConfirmDialog";
import Loader from "@/components/ui/loader/Loader";

import { useDeleteCategoryMutation, useGetAllCategoriesQuery } from "@/redux/api/categoryApi";
import { formatDate, toCapitalizeString } from "@/utils/common";
import { useState } from "react";

const CategoryPage: React.FC = () => {
  const [page, setPage] = useState(1);
  const rowsPerPage = 10;

  const { data, isLoading, isError } = useGetAllCategoriesQuery(
    { page, limit: rowsPerPage },
    { refetchOnMountOrArgChange: true }
  );
  const categories = data?.results || [];

  const [deleteCategory, { isLoading: isDeleting }] = useDeleteCategoryMutation();
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const handleDelete = async (id: string) => {
    try {
      setDeletingId(id);
      await deleteCategory(id).unwrap();
      Alert({ type: "success", message: "Category deleted successfully" });
    } catch (err: any) {
      const errorMessage = err?.data?.detail || "Category deletion failed";
      Alert({ type: "error", message: toCapitalizeString(errorMessage) });
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className='space-y-6'>
      {/* Header */}
      <div className='flex items-center justify-between'>
        <p className='text-xl font-bold text-foreground'>Category Page</p>
        <CategoryModal mode='add' />
      </div>

      {/* Table */}
      <div className='overflow-x-auto rounded-lg border bg-card shadow-sm'>
        <table className='w-full border-collapse text-left'>
          <thead className='bg-muted'>
            <tr>
              <th className='px-4 py-2 text-sm font-medium text-muted-foreground'>#</th>
              <th className='px-4 py-2 text-sm font-medium text-muted-foreground'>Name</th>
              <th className='px-4 py-2 text-sm font-medium text-muted-foreground'>Created At</th>
              <th className='px-4 py-2 text-sm font-medium text-muted-foreground'>Action</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan={4} className='px-4 py-6 text-center'>
                  <Loader />
                </td>
              </tr>
            ) : isError ? (
              <tr>
                <td colSpan={4} className='px-4 py-6 text-center text-destructive'>
                  Failed to load categories
                </td>
              </tr>
            ) : categories.length === 0 ? (
              <tr>
                <td colSpan={4} className='px-4 py-6 text-center text-muted-foreground'>
                  No categories found
                </td>
              </tr>
            ) : (
              categories.map((cat: Record<string, any>, idx: number) => (
                <tr key={cat.id} className='border-t border-border'>
                  <td className='px-4 py-2'>{(page - 1) * rowsPerPage + idx + 1}</td>
                  <td className='px-4 py-2 text-foreground'>{cat.name}</td>
                  <td className='px-4 py-2 text-foreground'>{formatDate(cat.created_at)}</td>
                  <td className='px-4 py-2'>
                    <div className='flex gap-x-2.5'>
                      {/* Edit */}
                      <CategoryModal mode='edit' initialData={{ id: cat.id, name: cat.name }} />

                      {/* Delete using ConfirmDialog */}
                      <ConfirmDialog
                        triggerLabel={isDeleting && deletingId === cat.id ? "Deleting..." : "Delete"}
                        title='Delete Category'
                        description={`Are you sure you want to delete "${cat.name}"? This action cannot be undone.`}
                        onConfirm={() => handleDelete(cat.id)}
                        loading={isDeleting && deletingId === cat.id}
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

export default CategoryPage;
