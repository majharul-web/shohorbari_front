// components/ui/table-pagination.tsx
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import * as React from "react";

interface TablePaginationProps {
  currentPage: number;
  rowCount: number;
  rowsPerPage: number;
  onChangePage: (page: number) => void;
}

const TablePagination: React.FC<TablePaginationProps> = ({
  currentPage,
  rowCount,
  rowsPerPage,
  onChangePage,
}) => {
  const totalPages = Math.ceil(rowCount / rowsPerPage);

  if (totalPages <= 1) return null;

  const renderPages = () => {
    const pages: (number | "ellipsis")[] = [];
    const maxVisible = 5;

    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      if (currentPage <= 3) {
        pages.push(1, 2, 3, 4, "ellipsis", totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1, "ellipsis", totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
      } else {
        pages.push(1, "ellipsis", currentPage - 1, currentPage, currentPage + 1, "ellipsis", totalPages);
      }
    }
    return pages;
  };

  return (
    <Pagination className='py-4'>
      <PaginationContent>
        {/* Prev button */}
        <PaginationItem>
          <PaginationPrevious
            href='#'
            onClick={(e) => {
              e.preventDefault();
              if (currentPage > 1) onChangePage(currentPage - 1);
            }}
          />
        </PaginationItem>

        {/* Page numbers */}
        {renderPages().map((page, idx) => (
          <PaginationItem key={idx}>
            {page === "ellipsis" ? (
              <PaginationEllipsis />
            ) : (
              <PaginationLink
                href='#'
                isActive={page === currentPage}
                onClick={(e) => {
                  e.preventDefault();
                  onChangePage(page);
                }}
              >
                {page}
              </PaginationLink>
            )}
          </PaginationItem>
        ))}

        {/* Next button */}
        <PaginationItem>
          <PaginationNext
            href='#'
            onClick={(e) => {
              e.preventDefault();
              if (currentPage < totalPages) onChangePage(currentPage + 1);
            }}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

export default TablePagination;
