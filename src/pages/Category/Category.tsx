import CategoryModal from "@/components/category/CategoryModal";
import { Alert } from "@/components/ui/alert/Alert";
import { Button } from "@/components/ui/button";
import Loader from "@/components/ui/loader/Loader";
import { useDeleteCategoryMutation, useGetAllCategoriesQuery } from "@/redux/api/categoryApi";
import { formatDate, toCapitalizeString } from "@/utils/common";
import React, { useState } from "react";

const CategoryPage: React.FC = () => {
  const [page, setPage] = useState(1);
  const rowsPerPage = 10;

  // RTK Query fetch categories
  const { data, isLoading, isError } = useGetAllCategoriesQuery({
    page: page,
    limit: rowsPerPage,
  });

  const categories = data?.results || [];

  const [deleteCategory] = useDeleteCategoryMutation();

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this category?")) {
      try {
        await deleteCategory(id).unwrap();
        Alert({
          type: "success",
          message: "Category deleted successfully",
        });
      } catch (err: any) {
        console.error("Error:", err);
        const errorMessage = err?.data?.detail || "Category deletion failed";
        Alert({
          type: "error",
          message: `${toCapitalizeString(errorMessage)}`,
        });
      }
    }
  };

  return (
    <div className='space-y-6'>
      {/* Header */}
      <div className='flex items-center justify-between'>
        <p className='text-lg font-bold'>Category Page</p>
        {/* Add Modal */}
        <CategoryModal mode='add' />
      </div>

      {/* Table */}
      <div className='overflow-x-auto rounded-lg border bg-white shadow-sm'>
        <table className='w-full border-collapse text-left'>
          <thead className='bg-gray-50'>
            <tr>
              <th className='px-4 py-2 text-sm font-medium text-gray-600'>#</th>
              <th className='px-4 py-2 text-sm font-medium text-gray-600'>Name</th>
              <th className='px-4 py-2 text-sm font-medium text-gray-600'>Created At</th>
              <th className='px-4 py-2 text-sm font-medium text-gray-600'>Action</th>
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
                <td colSpan={4} className='px-4 py-6 text-center text-red-500'>
                  Failed to load categories
                </td>
              </tr>
            ) : categories?.length === 0 ? (
              <tr>
                <td colSpan={4} className='px-4 py-6 text-center text-gray-500'>
                  No categories found
                </td>
              </tr>
            ) : (
              categories?.map((cat: any, idx: number) => (
                <tr key={cat.id} className='border-t'>
                  <td className='px-4 py-2'>{(page - 1) * rowsPerPage + idx + 1}</td>
                  <td className='px-4 py-2'>{cat.name}</td>
                  <td className='px-4 py-2'>{formatDate(cat.created_at)}</td>
                  <td className='px-4 py-2'>
                    <div className='flex gap-x-2.5'>
                      {/* Edit Modal */}
                      <CategoryModal mode='edit' initialData={{ id: cat.id, name: cat.name }} />
                      <Button onClick={() => handleDelete(cat.id)} className='text-red-500'>
                        Delete
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

export default CategoryPage;
