import React, { useState } from 'react'

export const GroupedPagination = ({dataValue}) => {
  const [groupedPage, setGroupedPage] = useState(1);
  let lengthOfData, pagesNeeded, pageNumbers, indexOfFirstPage, indexOfLastPage;
  lengthOfData = dataValue.length;
  let itemsPerPage =2
  pagesNeeded = Math.ceil(lengthOfData / itemsPerPage);
  pageNumbers = [...Array(pagesNeeded + 1).keys()].slice(1)
  indexOfLastPage = groupedPage * itemsPerPage;
  indexOfFirstPage = indexOfLastPage - itemsPerPage;
  const handlePagination = (number) => {
    setGroupedPage(number)
}
  return (
    
    <div>
        <div>
            {pageNumbers.map((number, index) => (
                <span key={index} className={`pagination ${groupedPage === number && 'active'}`} onClick={() => handlePagination(number)}>{number}</span>
            ))}
        </div>
    </div>
  )
}
