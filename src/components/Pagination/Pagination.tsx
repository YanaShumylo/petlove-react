import React from "react";
import css from "./Pagination.module.css";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  }

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  if (totalPages <= 1) return null;

  const range = (start: number, end: number) => {
    const length = end - start + 1;
    return Array.from({ length }, (_, i) => start + i);
  };

  const getPaginationRange = (): (number | string)[]  => {
    const totalPageNumbers = 1; 

    if (totalPages <= totalPageNumbers) {
      return range(1, totalPages);
    }

    let startPage = Math.max(currentPage - 1, 1);
    const endPage = Math.min(startPage + 1, totalPages);

    if (endPage - startPage < 2) {
      startPage = Math.max(endPage - 2, 1);
    }

   const pages: (number | string)[] = range(startPage, endPage);

    if (startPage > 1) {
      pages.unshift("...");
      pages.unshift(1);
    }

    if (endPage < totalPages) {
      pages.push("...");
      pages.push(totalPages);
    }

    return pages;
  };

  const paginationRange = getPaginationRange();

  return (
    <div className={css.pagination}>
      <button
        onClick={() => onPageChange(1)}
        disabled={currentPage === 1}
        className={css.arrow}
      >
        &lt;&lt;
      </button>
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={css.arrow}
      >
        &lt;
      </button>

      {paginationRange.map((page, idx) =>
        page === "..." ? (
          <span key={idx} className={css.dots}>
            ...
          </span>
        ) : (
          <button
            key={idx}
            onClick={() => onPageChange(Number(page))}
            className={`${css.page} ${currentPage === page ? css.active : ""}`}
          >
            {page}
          </button>
        )
      )}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={css.arrow}
      >
        &gt;
      </button>
      <button
        onClick={() => onPageChange(totalPages)}
        disabled={currentPage === totalPages}
        className={css.arrow}
      >
        &gt;&gt;
      </button>
    </div>
  );
};

export default Pagination;
