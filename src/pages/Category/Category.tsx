import CategoryModal from "@/components/category/CategoryModal";
import { Alert } from "@/components/ui/alert/Alert";
import ConfirmDialog from "@/components/ui/alert/ConfirmDialog";
import StatusBadge from "@/components/ui/staus/StatusBadge";
import { DataTable } from "@/components/ui/table/DataTable";
import { useDebounced } from "@/hooks/useDebounced";
import { useDeleteCategoryMutation, useGetAllCategoriesQuery } from "@/redux/api/categoryApi";
import { formatDate, toCapitalizeString } from "@/utils/common";
import { useState } from "react";

const CategoryPage: React.FC = () => {
  const query: Record<string, any> = {};
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [statusFilter, setStatusFilter] = useState<string>("");
  const [page, setPage] = useState(1);
  const rowsPerPage = 10; // use backend page_size

  query.page = page;
  query.page_size = rowsPerPage;
  const debouncedTerm = useDebounced({
    searchQuery,
    delay: 600,
  });

  if (!!debouncedTerm) {
    query["search"] = debouncedTerm;
  }

  if (statusFilter) {
    query["status"] = statusFilter;
  }

  const { data, isLoading, isError } = useGetAllCategoriesQuery(query, { refetchOnMountOrArgChange: true });

  const categories = data?.results || [];
  const pagination = data?.pagination || {};

  const totalCount = pagination.count || categories.length; // total items
  const currentPage = pagination.current_page || 1;

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

  const columns = [
    {
      key: "index",
      label: "#",
      render: (_: any, idx: number) => (currentPage - 1) * rowsPerPage + idx + 1,
      className: "w-[50px]",
    },
    {
      key: "name",
      label: "Name",
    },
    {
      key: "status",
      label: "Status",
      render: (item: any) => <StatusBadge status={item?.status} />,
    },
    {
      key: "created_at",
      label: "Created At",
      render: (item: any) => formatDate(item.created_at),
    },
  ];

  return (
    <div className='space-y-6'>
      <p className='text-xl font-bold text-foreground'>Categories</p>
      <div className='flex items-center justify-between'>
        <div className='flex gap-x-4'>
          <input
            type='text'
            placeholder='Search by name...'
            className=' rounded-md px-3 py-2 shadow-sm border border-border focus:outline-none focus:border-primary transition'
            onChange={(e) => {
              setSearchQuery(e.target.value);
            }}
          />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className='rounded-md px-3 py-2 shadow-sm border border-border focus:outline-none focus:border-primary transition'
          >
            <option value=''>All</option>
            <option value='active'>Active</option>
            <option value='inactive'>Inactive</option>
          </select>
        </div>
        <CategoryModal mode='add' />
      </div>

      <DataTable
        columns={columns}
        data={categories}
        page={currentPage}
        totalCount={totalCount}
        rowsPerPage={rowsPerPage}
        isLoading={isLoading}
        isError={isError}
        onChangePage={(newPage) => setPage(newPage)}
        renderActions={(cat: any) => (
          <div className='flex gap-x-2.5'>
            <CategoryModal mode='edit' initialData={{ id: cat.id, name: cat.name, status: cat.status }} />
            <ConfirmDialog
              triggerLabel={isDeleting && deletingId === cat.id ? "Deleting..." : "Delete"}
              title='Delete Category'
              description={`Are you sure you want to delete "${cat.name}"?`}
              onConfirm={() => handleDelete(cat.id)}
              loading={isDeleting && deletingId === cat.id}
              variant='destructive'
              confirmLabel='Confirm Delete'
            />
          </div>
        )}
      />
    </div>
  );
};

export default CategoryPage;
