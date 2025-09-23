import Loader from "@/components/ui/loader/Loader";
import { useGetAllUserPaymentsQuery } from "@/redux/api/paymentsApi";
import { formatDate } from "@/utils/common";
import { useState } from "react";

const MyOrdersPage: React.FC = () => {
  const [page, setPage] = useState(1);
  const rowsPerPage = 10;

  const { data, isLoading, isError } = useGetAllUserPaymentsQuery(
    { page, limit: rowsPerPage },
    { refetchOnMountOrArgChange: true }
  );
  const orders = data?.results || [];

  return (
    <div className='space-y-6'>
      {/* Header */}
      <div className='flex items-center justify-between'>
        <p className='text-xl font-bold text-foreground'>My Orders</p>
      </div>

      {/* Table */}
      <div className='overflow-x-auto rounded-lg border bg-card shadow-sm'>
        <table className='w-full border-collapse text-left'>
          <thead className='bg-muted'>
            <tr>
              <th className='px-4 py-2 text-sm font-medium text-muted-foreground'>Order ID</th>
              <th className='px-4 py-2 text-sm font-medium text-muted-foreground'>Details</th>
              <th className='px-4 py-2 text-sm font-medium text-muted-foreground'>Txn ID</th>
              <th className='px-4 py-2 text-sm font-medium text-muted-foreground'>Amount</th>
              <th className='px-4 py-2 text-sm font-medium text-muted-foreground'>Date</th>
              <th className='px-4 py-2 text-sm font-medium text-muted-foreground'>Status</th>
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
                  Failed to load orders
                </td>
              </tr>
            ) : orders.length === 0 ? (
              <tr>
                <td colSpan={5} className='px-4 py-6 text-center text-muted-foreground'>
                  No orders found
                </td>
              </tr>
            ) : (
              orders.map((order: Record<string, any>, idx: number) => (
                <tr key={order.id} className='border-t border-border'>
                  <td className='px-4 py-2 text-foreground'>{order.id}</td>
                  <td className='px-4 py-2 text-foreground'>{order.details}</td>
                  <td className='px-4 py-2 text-foreground'>{order.transaction_id}</td>
                  <td className='px-4 py-2 text-foreground'>
                    {order.amount} {order.currency}
                  </td>
                  <td className='px-4 py-2 text-foreground'>{formatDate(order.created_at)}</td>
                  <td className='px-4 py-2 text-foreground capitalize'>{order.status}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyOrdersPage;
