import React, { useState } from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import VerticalAlignCenterIcon from '@mui/icons-material/VerticalAlignCenter';

import TableRowComp from './TableRowComp';
import { Pagination } from './Pagination';
export const TableComp = ({ handleSort, dataValue, grid, data, setCurrentPage, currentPage }) => {
  const itemsPerPage = 2;

  const [groupedPage, setGroupedPage] = useState(1);
  var lengthOfData, pagesNeeded, pageNumbers, indexOfFirstPage, indexOfLastPage;
  lengthOfData = dataValue.length;
  pagesNeeded = Math.ceil(lengthOfData / itemsPerPage);
  pageNumbers = [...Array(pagesNeeded + 1).keys()].slice(1)

  if (!grid) {
    indexOfLastPage = currentPage * itemsPerPage;
    indexOfFirstPage = indexOfLastPage - itemsPerPage;
  } else {
    indexOfLastPage = groupedPage * itemsPerPage;
    indexOfFirstPage = indexOfLastPage - itemsPerPage;
  }

  console.log(indexOfFirstPage, indexOfLastPage);

  const transactionHeader = [
    { title: "Date", functionTitle: "date" },
    { title: "Month", functionTitle: "month" },
    { title: "Year", functionTitle: "year" },
    { title: "Transaction", functionTitle: "transactionType" },
    { title: "From Account", functionTitle: "fromAccount" },
    { title: "To Account", functionTitle: "toAccount" },
    { title: "Amount", functionTitle: "amount" },
    { title: "Notes", functionTitle: "notes" },
  ]
  return (
    <div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead style={{ background: "rgb(160, 162, 192)", color: "white", cursor: "pointer" }}>
            <TableRow>
              {transactionHeader.map((header, index) => (
                <TableCell key={index} align='right' onClick={() => handleSort(header.functionTitle, grid, data, setCurrentPage, setGroupedPage)}> {header.title} <VerticalAlignCenterIcon /></TableCell>
              ))}
              <TableCell align="right">Image</TableCell>
              <TableCell align="right">Action</TableCell>
            </TableRow>
          </TableHead >
          <TableBody>
            {dataValue.length > 0 && dataValue.slice(indexOfFirstPage, indexOfLastPage).map((data, index) => (
              <TableRowComp data={data} index={index} />
            ))}
          </TableBody>
        </Table >
      </TableContainer >
      <br />
      {<Pagination grid={grid} currentPage={grid ? groupedPage : currentPage} setCurrentPage={grid ? setGroupedPage : setCurrentPage} pageNumbers={pageNumbers} />}

    </div>
  )
}
