import { Button } from "@/components/ui/button";
import StatusBadge from "@/components/ui/staus/StatusBadge";
import { DataTable } from "@/components/ui/table/DataTable";
import { useDebounced } from "@/hooks/useDebounced";
import { useGetAllPaymentsQuery } from "@/redux/api/paymentsApi";
import { formatDate } from "@/utils/common";
import { useState } from "react";
import { useNavigate } from "react-router";

export const getStatusClass = (status: string) => {
  switch (status) {
    case "initiated":
      return "text-gray-500";
    case "pending":
      return "text-yellow-500";
    case "success":
      return "text-green-600";
    case "failed":
      return "text-red-600";
    case "cancelled":
      return "text-orange-500";
    default:
      return "text-foreground";
  }
};

const TransactionPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [statusFilter, setStatusFilter] = useState<string>("");
  const [page, setPage] = useState(1);
  const rowsPerPage = 10;
  const navigate = useNavigate();

  // Debounced search (to avoid API spam)
  const debouncedTerm = useDebounced({ searchQuery, delay: 600 });

  const query: Record<string, any> = {
    page,
    page_size: rowsPerPage,
  };

  if (debouncedTerm) query["search"] = debouncedTerm;
  if (statusFilter) query["status"] = statusFilter;

  const { data, isLoading, isError } = useGetAllPaymentsQuery(query, {
    refetchOnMountOrArgChange: true,
  });

  const payments = data?.results || [];
  const pagination = data?.pagination || {};
  const totalCount = pagination.count || payments.length;
  const currentPage = pagination.current_page || 1;

  const columns = [
    {
      key: "index",
      label: "#",
      render: (_: any, idx: number) => (currentPage - 1) * rowsPerPage + idx + 1,
      className: "w-[50px]",
    },
    {
      key: "amount",
      label: "Amount",
      render: (item: any) => (
        <span className='text-foreground'>
          {item.amount} {item.currency}
        </span>
      ),
    },
    {
      key: "user",
      label: "User",
      render: (item: any) => item.user?.name || "Unknown User",
    },
    {
      key: "status",
      label: "Status",
      render: (item: any) => <StatusBadge status={item.status} />,
    },
    {
      key: "transaction_id",
      label: "Transaction ID",
    },
    {
      key: "created_at",
      label: "Created At",
      render: (item: any) => formatDate(item.created_at),
    },
  ];

  return (
    <div className='space-y-6'>
      {/* Page Header */}
      <p className='text-xl font-bold text-foreground'>Transaction History</p>

      {/* Filters */}
      <div className='flex items-center justify-between'>
        <div className='flex gap-x-4'>
          <input
            type='text'
            placeholder='Search by user or ID...'
            className='rounded-md px-3 py-2 shadow-sm border border-border focus:outline-none focus:border-primary transition'
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className='rounded-md px-3 py-2 shadow-sm border border-border focus:outline-none focus:border-primary transition'
          >
            <option value=''>All</option>
            <option value='initiated'>Initiated</option>
            <option value='pending'>Pending</option>
            <option value='success'>Success</option>
            <option value='failed'>Failed</option>
            <option value='cancelled'>Cancelled</option>
          </select>
        </div>
      </div>

      {/* Data Table */}
      <DataTable
        columns={columns}
        data={payments}
        page={currentPage}
        totalCount={totalCount}
        rowsPerPage={rowsPerPage}
        isLoading={isLoading}
        isError={isError}
        onChangePage={(newPage) => setPage(newPage)}
        renderActions={(item: any) => (
          <div className='flex gap-x-2'>
            <Button
              variant='outline'
              onClick={() => navigate(`/rents/${item?.rent_request?.advertisement?.id}`)}
            >
              View Details
            </Button>
          </div>
        )}
      />
    </div>
  );
};

export default TransactionPage;
