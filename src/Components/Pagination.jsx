import React from 'react'

export const Pagination = ({ pageNumbers, currentPage, setCurrentPage }) => {
    const handlePagination = (number) => {
        setCurrentPage(number)
    }
    return (
        <div>
            {pageNumbers.map((number, index) => (
                <span key={index} className={`pagination ${currentPage === number && 'active'}`} onClick={() => handlePagination(number)}>{number}</span>
            ))}
        </div>
    )
}
