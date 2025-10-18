import RentModal from "@/components/rents/RentModal";
import { Alert } from "@/components/ui/alert/Alert";
import ConfirmDialog from "@/components/ui/alert/ConfirmDialog";
import { Button } from "@/components/ui/button";
import StatusBadge from "@/components/ui/staus/StatusBadge";
import { DataTable } from "@/components/ui/table/DataTable";
import { useDebounced } from "@/hooks/useDebounced";
import { useApproveAdMutation, useDeleteAdMutation, useGetAllAdsQuery } from "@/redux/api/adsApi";
import { useGetAllCategoriesQuery } from "@/redux/api/categoryApi";
import { useAppSelector } from "@/redux/hooks";
import { formatDate, toCapitalizeString } from "@/utils/common";
import { useMemo, useState } from "react";
import { useNavigate } from "react-router";

const AdminAdsPage: React.FC = () => {
  const user = useAppSelector((state) => state.auth);
  const navigate = useNavigate();

  const [searchQuery, setSearchQuery] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [statusFilter, setStatusFilter] = useState<string>("");
  const [page, setPage] = useState(1);
  const rowsPerPage = 10;
  const [loadingId, setLoadingId] = useState<string | null>(null);

  const query: Record<string, any> = { page, limit: rowsPerPage };

  const isAdmin = user && typeof user.role === "string" && user.role === "admin";
  if (!isAdmin) query["my"] = true;

  const debouncedTerm = useDebounced({ searchQuery, delay: 600 });
  if (debouncedTerm) query["search"] = debouncedTerm;
  if (category) query["category"] = category;
  if (statusFilter) query["approved"] = statusFilter === "approved" ? true : false;

  const { data: cats } = useGetAllCategoriesQuery(
    {
      status: "active",
      page_size: 100,
    },
    { refetchOnMountOrArgChange: true }
  );
  const categories = useMemo(
    () => cats?.results?.map((cat: Record<string, any>) => ({ label: cat.name, value: cat.id.toString() })),
    [cats]
  );

  console.log("cats", cats);

  const { data, isLoading, isError } = useGetAllAdsQuery(query, { refetchOnMountOrArgChange: true });
  const ads = data?.results || [];
  const pagination = data?.pagination || {};
  const totalCount = pagination.count || ads.length;
  const currentPage = pagination.current_page || 1;

  const [deleteAd, { isLoading: isDeleting }] = useDeleteAdMutation();
  const [approveAd, { isLoading: isApproving }] = useApproveAdMutation();

  const handleDelete = async (id: string) => {
    try {
      setLoadingId(id);
      await deleteAd(id).unwrap();
      Alert({ type: "success", message: "Ad deleted successfully" });
    } catch (err: any) {
      const errorMessage = err?.data?.detail || "Ad deletion failed";
      Alert({ type: "error", message: toCapitalizeString(errorMessage) });
    } finally {
      setLoadingId(null);
    }
  };

  const handleApprove = async (id: string) => {
    try {
      setLoadingId(id);
      await approveAd(id).unwrap();
      Alert({ type: "success", message: "Ad approved successfully" });
    } catch (err: any) {
      const errorMessage = err?.data?.detail || "Ad approval failed";
      Alert({ type: "error", message: toCapitalizeString(errorMessage) });
    } finally {
      setLoadingId(null);
    }
  };

  const columns = [
    {
      key: "index",
      label: "#",
      render: (_: any, idx: number) => (currentPage - 1) * rowsPerPage + idx + 1,
      className: "w-[50px]",
    },
    { key: "title", label: "Title" },
    { key: "category", label: "Category", render: (item: any) => item.category?.name || "N/A" },
    { key: "price", label: "Price", render: (item: any) => `৳ ${item.price}` },
    { key: "booked", label: "Booked", render: (item: any) => (item.booked ? "Yes" : "No") },
    { key: "created_at", label: "Created At", render: (item: any) => formatDate(item.created_at) },
    {
      key: "status",
      label: "Status / Action",
      render: (ad: any) => (
        <div className='flex gap-2 flex-wrap justify-between'>
          {ad.approved ? (
            <StatusBadge status='approved' />
          ) : (
            <>
              {" "}
              {isAdmin && (
                <Button
                  variant='default'
                  size='sm'
                  onClick={() => handleApprove(ad.id)}
                  disabled={(isApproving && loadingId === ad.id) || ad.approved}
                >
                  {" "}
                  {isApproving && loadingId === ad.id ? "Approving..." : "Approve"}{" "}
                </Button>
              )}{" "}
            </>
          )}

          <ConfirmDialog
            triggerLabel={isDeleting && loadingId === ad.id ? "Deleting..." : "Delete"}
            title='Delete Ad'
            description={`Are you sure you want to delete "${ad.title}"? This action cannot be undone.`}
            onConfirm={() => handleDelete(ad.id)}
            loading={isDeleting && loadingId === ad.id}
            variant='destructive'
            confirmLabel='Confirm Delete'
          />

          <RentModal
            mode='edit'
            initialData={{
              id: ad?.id,
              category: ad?.category.id.toString(),
              title: ad?.title,
              description: ad?.description,
              price: ad?.price,
            }}
          />

          <button
            className='px-3 py-1.5 rounded-md border border-border text-sm'
            onClick={() => navigate(`/dashboard/ads/advance/${ad.id}`)}
          >
            Details
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className='space-y-6'>
      <p className='text-xl font-bold text-foreground'>Advertisement List</p>
      <div className='flex justify-between items-center flex-col md:flex-row'>
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
            aria-label='Filter by category'
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className='rounded-md px-3 py-2 shadow-sm border border-border focus:outline-none focus:border-primary transition'
          >
            <option value=''>All Categories</option>
            {categories?.map((cat: Record<string, any>) => (
              <option key={cat.value} value={cat.value}>
                {cat.label}
              </option>
            ))}
          </select>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className='rounded-md px-3 py-2 shadow-sm border border-border focus:outline-none focus:border-primary transition'
          >
            <option value=''>All</option>
            <option value='approved'>Approved</option>
            <option value='pending'>Pending</option>
          </select>
        </div>
        <RentModal mode='add' />
      </div>

      <DataTable
        columns={columns}
        data={ads}
        page={currentPage}
        totalCount={totalCount}
        rowsPerPage={rowsPerPage}
        isLoading={isLoading}
        isError={isError}
        onChangePage={(newPage) => setPage(newPage)}
      />
    </div>
  );
};

export default AdminAdsPage;
