import AddCategoryModal from "@/components/category/AddCategoryModal";
import TablePagination from "@/components/ui/table/TablePagination";
import { useGetAllCategoriesQuery } from "@/redux/api/categoryApi";
import React, { useState } from "react";

const CategoryPage: React.FC = () => {
  const [page, setPage] = useState(1);
  const rowsPerPage = 10;
  const totalRows = 97; // E

  // RTK Query fetch categories
  const { data, isLoading, isError } = useGetAllCategoriesQuery({
    page: page,
    limit: rowsPerPage,
  });

  console.log("data:", data);

  return (
    <div className='space-y-6'>
      {/* Header */}
      <div className='flex items-center justify-between'>
        <p className='text-lg font-bold'>Category Page</p>
        <AddCategoryModal />
      </div>

      {/* Table */}
      <div className='overflow-x-auto rounded-lg border bg-white shadow-sm'>
        <table className='w-full border-collapse text-left'>
          <thead className='bg-gray-50'>
            <tr>
              <th className='px-4 py-2 text-sm font-medium text-gray-600'>#</th>
              <th className='px-4 py-2 text-sm font-medium text-gray-600'>Name</th>
              <th className='px-4 py-2 text-sm font-medium text-gray-600'>Created At</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan={3} className='px-4 py-6 text-center'>
                  Loading...
                </td>
              </tr>
            ) : isError ? (
              <tr>
                <td colSpan={3} className='px-4 py-6 text-center text-red-500'>
                  Failed to load categories
                </td>
              </tr>
            ) : data?.length === 0 ? (
              <tr>
                <td colSpan={3} className='px-4 py-6 text-center text-gray-500'>
                  No data found
                </td>
              </tr>
            ) : (
              data?.map((cat: any, idx: number) => (
                <tr key={cat.id} className='border-t'>
                  <td className='px-4 py-2'>{(page - 1) * rowsPerPage + idx + 1}</td>
                  <td className='px-4 py-2'>{cat.name}</td>
                  <td className='px-4 py-2'>{new Date(cat.createdAt).toLocaleDateString()}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <TablePagination
        currentPage={page}
        rowCount={totalRows}
        rowsPerPage={rowsPerPage}
        onChangePage={setPage}
      />
    </div>
  );
};

export default CategoryPage;
