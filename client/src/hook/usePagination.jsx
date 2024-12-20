import { renderRangeNumber } from "@/lib/fn";
import PropTypes from "prop-types";
import { useMemo } from "react";
const usePagination = ({
  total = 0,
  currentPage = 1,
  limit = 1,
  sibling = 0,
}) => {
  const PaginationArray = useMemo(() => {
    const pageSize = +limit; // số lượng item 1 trang
    const pageNumber = Math.ceil(total / pageSize); // tổng số trang
    const totalPageItems = 5 + sibling * 2;

    if (pageNumber < totalPageItems) {
      return renderRangeNumber(1, pageNumber);
    }
    const isShowPageInLeft = currentPage - sibling > 3;
    const isShowPageInRight = currentPage + sibling <= pageNumber - 2;

    if (isShowPageInLeft && !isShowPageInRight) {
      const rightStart = pageNumber - 2 - sibling * 2;
      const rightArray = renderRangeNumber(rightStart, pageNumber);
      return [1, "...", ...rightArray];
    }
    if (!isShowPageInLeft && isShowPageInRight  ) {
      const leftArray = renderRangeNumber(1, 3 + sibling * 2);
      return [...leftArray, "...", pageNumber];
    }
    const siblingLeft = Math.max(1, currentPage - sibling);
    const siblingRight = Math.min(pageNumber, currentPage + sibling);
    if (isShowPageInLeft && isShowPageInRight) {
      const middleArray = renderRangeNumber(siblingLeft, siblingRight);
      return [1, "...", ...middleArray, "...", pageNumber];
    }
  }, [total, currentPage, limit, sibling]);

  return PaginationArray;
};

export default usePagination;
usePagination.prototype = {
  total: PropTypes.number,
  currentPage: PropTypes.number,
  limit: PropTypes.number,
  sibling: PropTypes.number,
};
