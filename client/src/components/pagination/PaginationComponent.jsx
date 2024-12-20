import React, { memo } from "react";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "../ui/pagination";
import usePagination from "@/hook/usePagination";
import { useLocation, useNavigate } from "react-router-dom";
import { createSearchParams } from "react-router-dom";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
const PaginationComponent = ({ total, currentPage, limit  }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const paginationArray = usePagination({
    total: total,
    currentPage: currentPage,
    limit: limit,
    sibling: 0,
  });
  const handleChangePage = (number) => {
    navigate({
      pathname: location.pathname,
      search: createSearchParams({ page: +number }).toString(),
    });
  };
  console.log(paginationArray)
  return (
    <div>
      <Pagination>
        <PaginationContent>
          {paginationArray?.length > 1 && (
            <PaginationItem>
              <PaginationPrevious
                onClick={() => handleChangePage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className={cn(`${currentPage === 1 ? "?opacity-50" : ""} `)}
              />
            </PaginationItem>
          )}
          {paginationArray?.map((page, index) => (
            <PaginationItem key={index}>
              {page === "..." && typeof page !== "number" ? (
                <PaginationEllipsis />
              ) : (
                <PaginationLink
                  onClick={() => handleChangePage(page)}
                  isActive={currentPage === page}
                >
                  {page}
                </PaginationLink>
              )}
            </PaginationItem>
          ))}
          {paginationArray?.length > 1 && (
            <PaginationItem>
              <PaginationNext
                onClick={() =>
                  handleChangePage(
                    Math.min(Math.ceil(total / limit), currentPage + 1)
                  )
                }
                disabled={currentPage === Math.ceil(total / limit)}
                className={`${currentPage === 1 ? "?opacity-50" : ""} `}
              />
            </PaginationItem>
          )}
        </PaginationContent>
      </Pagination>
    </div>
  );
};

export default memo(PaginationComponent);
