import type { FC } from "react";
import usePagination from "../hooks/usePagination";

interface Props {
  onPageChange: (page: number) => void;
  totalCount: number;
  siblingCount?: number;
  currentPage: number;
  pageSize: number;
  className?: string;
}

const Pagination: FC<Props> = ({
  onPageChange,
  totalCount,
  siblingCount = 1,
  currentPage,
  pageSize,
  className = "",
}) => {
  const paginationRange = usePagination({
    currentPage,
    totalCount,
    siblingCount,
    pageSize,
  });

  // If there are less than 2 times in pagination range we shall not render the component
  if (currentPage === 0 || paginationRange.length < 2) {
    return null;
  }

  const onNext = () => {
    onPageChange(currentPage + 1);
  };

  const onPrevious = () => {
    onPageChange(currentPage - 1);
  };

  const lastPage = paginationRange[paginationRange.length - 1];

  const baseStyles =
    "px-2.5 py-1 flex justify-center items-center font-inter text-[0.813rem] hover:text-black hover:bg-purple-100 border-neutral-200 select-none cursor-pointer bg-[#ffffff1a] text-white rounded";

  return (
    <ul className={`flex justify-center flex-wrap gap-[2px] ${className} `}>
      <li
        className={`${baseStyles} rounded-l-[4px] !px-1 ${
          currentPage === 1 ? "hover:bg-white" : ""
        }`}
        onClick={() => {
          if (currentPage !== 1) onPrevious();
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
        >
          <path
            d="M10 12L6 8L10 4"
            stroke={"#B7B7B7"}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </li>
      {paginationRange.map((pageNumber, index) => {
        if (pageNumber === "DOTS") {
          return (
            <li key={index} className="select-none text-white px-2.5">
              ...
            </li>
          );
        }
        return (
          <li
            key={index}
            className={`${baseStyles} ${
              pageNumber === currentPage ? "text-black !bg-purple-600" : ""
            }`}
            onClick={() => onPageChange(pageNumber)}
          >
            {pageNumber}
          </li>
        );
      })}
      <li
        className={`${baseStyles} rounded-r-[4px] !px-1 ${
          currentPage === lastPage ? "hover:bg-white" : ""
        }`}
        onClick={() => {
          if (currentPage !== lastPage) onNext();
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
        >
          <path
            d="M6 12L10 8L6 4"
            stroke={currentPage === lastPage ? "#333333" : "#B7B7B7"}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </li>
    </ul>
  );
};

export default Pagination;
