import Loader from "@/components/ui/loader/Loader";
import { TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import TablePagination from "./TablePagination"; // import your pagination

interface Column<T> {
  key: keyof T | string;
  label: string;
  render?: (item: T, index: number) => React.ReactNode;
  className?: string;
}

interface DataTableProps<T> {
  columns: Column<T>[];
  data: T[];
  page: number;
  totalCount: number; // total items from backend
  rowsPerPage: number; // backend page_size
  isLoading?: boolean;
  isError?: boolean;
  onChangePage?: (page: number) => void;
  renderActions?: (item: T) => React.ReactNode;
}

export function DataTable<T>({
  columns,
  data,
  page,
  totalCount,
  rowsPerPage,
  isLoading = false,
  isError = false,
  onChangePage,
  renderActions,
}: DataTableProps<T>) {
  return (
    <div>
      <div className='rounded-lg border bg-card shadow-sm overflow-hidden'>
        <table className='w-full border-collapse text-left'>
          <TableHeader className='bg-muted'>
            <TableRow>
              {columns.map((col) => (
                <TableHead key={col.key.toString()} className={col.className}>
                  {col.label}
                </TableHead>
              ))}
              {renderActions && <TableHead>Action</TableHead>}
            </TableRow>
          </TableHeader>

          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={columns.length + 1} className='text-center py-6'>
                  <Loader />
                </TableCell>
              </TableRow>
            ) : isError ? (
              <TableRow>
                <TableCell colSpan={columns.length + 1} className='text-center text-destructive py-6'>
                  Failed to load data
                </TableCell>
              </TableRow>
            ) : data.length === 0 ? (
              <TableRow>
                <TableCell colSpan={columns.length + 1} className='text-center text-muted-foreground py-6'>
                  <div className='flex justify-center items-center flex-col gap-4 py-16'>
                    <img className='w-[160px]' src='/no-data.svg' alt='' />
                    <p className=''>No data found!</p>
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              data.map((item, idx) => (
                <TableRow key={idx} className='hover:bg-muted/50'>
                  {columns.map((col) => (
                    <TableCell key={col.key.toString()}>
                      {col.render ? col.render(item, idx) : (item as any)[col.key]}
                    </TableCell>
                  ))}
                  {renderActions && <TableCell>{renderActions(item)}</TableCell>}
                </TableRow>
              ))
            )}
          </TableBody>
        </table>
      </div>

      {/* Use your TablePagination here */}
      <TablePagination
        currentPage={page}
        rowCount={totalCount}
        rowsPerPage={rowsPerPage}
        onChangePage={onChangePage || (() => {})}
      />
    </div>
  );
}
