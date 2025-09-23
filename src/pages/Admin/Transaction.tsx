import Loader from "@/components/ui/loader/Loader";
import { useGetAllPaymentsQuery } from "@/redux/api/paymentsApi";
import { formatDate, toCapitalizeString } from "@/utils/common";
import { useState } from "react";

const TransactionPage: React.FC = () => {
  const [page, setPage] = useState(1);
  const rowsPerPage = 10;

  const { data, isLoading, isError } = useGetAllPaymentsQuery(
    { page, limit: rowsPerPage },
    { refetchOnMountOrArgChange: true }
  );

  const payments = data?.results || [];

  return (
    <div className='space-y-6'>
      {/* Header */}
      <div className='flex items-center justify-between'>
        <p className='text-xl font-bold text-foreground'>Transaction History</p>
      </div>

      {/* Table */}
      <div className='overflow-x-auto rounded-lg border bg-card shadow-sm'>
        <table className='w-full border-collapse text-left'>
          <thead className='bg-muted'>
            <tr>
              <th className='px-4 py-2 text-sm font-medium text-muted-foreground'>#</th>
              <th className='px-4 py-2 text-sm font-medium text-muted-foreground'>Amount</th>
              <th className='px-4 py-2 text-sm font-medium text-muted-foreground'>User</th>
              <th className='px-4 py-2 text-sm font-medium text-muted-foreground'>Status</th>
              <th className='px-4 py-2 text-sm font-medium text-muted-foreground'>Transaction ID</th>
              <th className='px-4 py-2 text-sm font-medium text-muted-foreground'>Created At</th>
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
                  Failed to load transactions
                </td>
              </tr>
            ) : payments.length === 0 ? (
              <tr>
                <td colSpan={6} className='px-4 py-6 text-center text-muted-foreground'>
                  No transactions found
                </td>
              </tr>
            ) : (
              payments.map((payment: Record<string, any>, idx: number) => (
                <tr key={payment.id} className='border-t border-border'>
                  <td className='px-4 py-2'>{(page - 1) * rowsPerPage + idx + 1}</td>
                  <td className='px-4 py-2 text-foreground'>
                    {payment.amount} {payment.currency}
                  </td>
                  <td className='px-4 py-2 text-foreground'>{payment.user?.name || "Unknown User"}</td>
                  <td className='px-4 py-2 text-foreground capitalize'>
                    {toCapitalizeString(payment.status)}
                  </td>
                  <td className='px-4 py-2 text-foreground'>{payment.transaction_id}</td>
                  <td className='px-4 py-2 text-foreground'>{formatDate(payment.created_at)}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TransactionPage;
