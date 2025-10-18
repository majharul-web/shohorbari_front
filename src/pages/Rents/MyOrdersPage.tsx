import { Button } from "@/components/ui/button";
import StatusBadge from "@/components/ui/staus/StatusBadge";
import { DataTable } from "@/components/ui/table/DataTable";
import { useDebounced } from "@/hooks/useDebounced";
import { useGetAllUserPaymentsQuery } from "@/redux/api/paymentsApi";
import { formatDate } from "@/utils/common";
import { useState } from "react";
import { useNavigate } from "react-router";

const MyOrdersPage: React.FC = () => {
  const navigate = useNavigate();

  // Pagination & Filters
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [statusFilter, setStatusFilter] = useState<string>("");
  const [page, setPage] = useState(1);
  const rowsPerPage = 10;

  // Debounced search
  const debouncedTerm = useDebounced({ searchQuery, delay: 600 });

  // Build query params
  const query: Record<string, any> = {
    page,
    page_size: rowsPerPage,
  };
  if (debouncedTerm) query["search"] = debouncedTerm;
  if (statusFilter) query["status"] = statusFilter;

  // API Call
  const { data, isLoading, isError } = useGetAllUserPaymentsQuery(query, {
    refetchOnMountOrArgChange: true,
  });

  const orders = data?.results || [];
  const pagination = data?.pagination || {};
  const totalCount = pagination.count || orders.length;
  const currentPage = pagination.current_page || 1;

  // Table Columns
  const columns = [
    {
      key: "index",
      label: "#",
      render: (_: any, idx: number) => (currentPage - 1) * rowsPerPage + idx + 1,
      className: "w-[50px]",
    },
    {
      key: "id",
      label: "Order ID",
    },
    {
      key: "transaction_id",
      label: "Txn ID",
    },
    {
      key: "rent_request",
      label: "Advertisement",
      render: (item: any) => (
        <span className='text-foreground'>{item.rent_request?.advertisement?.title || "-"}</span>
      ),
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
      key: "created_at",
      label: "Date",
      render: (item: any) => formatDate(item.created_at),
    },
    {
      key: "status",
      label: "Status",
      render: (item: any) => <StatusBadge status={item.status} />,
    },
  ];

  return (
    <div className='space-y-6'>
      {/* Page Header */}
      <p className='text-xl font-bold text-foreground'>My Orders</p>

      {/* Filters */}
      <div className='flex items-center justify-between'>
        <div className='flex gap-x-4'>
          <input
            type='text'
            placeholder='Search by order ID or transaction ID...'
            className='rounded-md px-3 py-2 shadow-sm border border-border focus:outline-none focus:border-primary transition'
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className='rounded-md px-3 py-2 shadow-sm border border-border focus:outline-none focus:border-primary transition'
          >
            <option value=''>All</option>
            <option value='pending'>Pending</option>
            <option value='success'>Success</option>
            <option value='failed'>Failed</option>
          </select>
        </div>
      </div>

      {/* Data Table */}
      <DataTable
        columns={columns}
        data={orders}
        page={currentPage}
        totalCount={totalCount}
        rowsPerPage={rowsPerPage}
        isLoading={isLoading}
        isError={isError}
        onChangePage={(newPage) => setPage(newPage)}
        renderActions={(order: any) => (
          <div className='flex gap-x-2'>
            <Button
              variant='outline'
              onClick={() => navigate(`/rents/${order?.rent_request?.advertisement?.id}`)}
            >
              View Details
            </Button>
          </div>
        )}
      />
    </div>
  );
};

export default MyOrdersPage;
