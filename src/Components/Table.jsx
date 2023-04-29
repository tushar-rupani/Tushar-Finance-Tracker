import React, { useState } from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import VerticalAlignCenterIcon from '@mui/icons-material/VerticalAlignCenter';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import { Link } from 'react-router-dom';

export const TableComp = ({ handleSort, dataValue, grid, data, setDataValue }) => {
  const itemsPerPage = 2;
  const lengthOfData = dataValue.length;

  const pagesNeeded = Math.ceil(lengthOfData / itemsPerPage);
  const pageNumbers = [...Array(pagesNeeded + 1).keys()].slice(1)

  const [currentPage, setCurrentPage] = useState(1);

  const indexOfLastPage = currentPage * itemsPerPage;
  const indexOfFirstPage = indexOfLastPage - itemsPerPage;

  const [tempData, setTempData] = useState(dataValue.slice(indexOfFirstPage, indexOfLastPage));
  const transactionHeader = [{ title: "Month", functionTitle: "month"  },
  { title: "Year", functionTitle: "year"  },
  { title: "Transaction", functionTitle: "transaction" },
  { title: "From Account", functionTitle: "from_account"},
  { title: "To Account", functionTitle: "to_account"},
  { title: "Amount", functionTitle: "amount"},
  { title: "Notes", functionTitle: "notes"},
  ]

  const handlePagination = (number) => {
    setCurrentPage(number)
    setTempData(dataValue.slice(indexOfFirstPage, indexOfLastPage))
    console.log(tempData);
  }


  return (
    <div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead style={{ background: "rgb(160, 162, 192)", color: "white", cursor: "pointer" }}>
            <TableRow>
              {transactionHeader.map((header, index) => (
                <TableCell key={index} align='right' onClick={() => handleSort(header.functionTitle, grid, data, indexOfFirstPage, indexOfLastPage )}> {header.title} <VerticalAlignCenterIcon /></TableCell>
              ))}
              <TableCell align="right">Image <VerticalAlignCenterIcon /></TableCell>
              <TableCell align="right">View <RemoveRedEyeIcon /></TableCell>
              <TableCell align="right">Edit <RemoveRedEyeIcon /></TableCell>
            </TableRow>
          </TableHead >
          <TableBody>
            {dataValue.length > 0 && dataValue.slice(indexOfFirstPage, indexOfLastPage).map((data, index) => (
              <TableRow
                key={index}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell component="th" scope="row">
                  {data.month}
                </TableCell>
                <TableCell align="right">{data.year}</TableCell>
                <TableCell align="right">{data.transaction}</TableCell>
                <TableCell align="right">{data.from_account}</TableCell>
                <TableCell align="right">{data.to_account}</TableCell>
                <TableCell align="right">{data.currency}{data.amount.toLocaleString('en-IN')}</TableCell>
                <TableCell align="right">{data.notes.substr(0, 15)}...</TableCell>
                <TableCell align="right">
                  <img src={data.selectedFile} alt='Did not select' width={75} height={75} />
                </TableCell>
                <TableCell align="right"><Link to={`/transaction/${data.id}`}>View</Link></TableCell>
                <TableCell align="right"><Link to={`/add`} state={data.id}>Edit</Link></TableCell>

              </TableRow>
            ))}
          </TableBody>
        </Table >
      </TableContainer >
      <br />
      {pageNumbers.map((number, index) => (
        <span key={index} className={`pagination ${currentPage === number && 'active'}`} onClick={() => handlePagination(number) }>{number}</span>
      ))}

    </div>
  )
}
