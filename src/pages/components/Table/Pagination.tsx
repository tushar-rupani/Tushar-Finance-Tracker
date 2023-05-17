import React from "react";
type PropsType = {
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  pageNumbers: number[];
};
export const Pagination = ({
  currentPage,
  setCurrentPage,
  pageNumbers,
}: PropsType) => {
  const handlePagination = (num: number) => {
    setCurrentPage(num);
  };
  return (
    <div>
      {pageNumbers.map((number, index) => (
        <span
          key={index}
          className={`pagination ${currentPage === number && "active"}`}
          onClick={() => handlePagination(number)}
        >
          {number}
        </span>
      ))}
    </div>
  );
};
