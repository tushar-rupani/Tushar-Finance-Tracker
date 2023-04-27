import React, { useState } from 'react'
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { loadDataFromLocal } from '../../Services/localstorage.service'
import VerticalAlignCenterIcon from '@mui/icons-material/VerticalAlignCenter';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import { Link } from 'react-router-dom';
import { Navbar } from '../Home/Navbar';
export const List = () => {
  let allData = loadDataFromLocal();
  let [dataValue, setDataValue] = useState(allData);
  const [sortedOrder, setSortedOrder] = useState("asc");
  let [groupedData, setGroupedData] = useState([]);
  let handleSort = (title) => {
  let sortedData;
    console.log(title);
    if (title === "amount") {
      sortedData = [...dataValue].sort((d1, d2) => {
        if (sortedOrder === "asc") {
          return d1[title] - d2[title];
        } else {
          return d2[title] - d1[title];
        }
      });
    } else {
      sortedData = [...dataValue].sort((d1, d2) => {
        if (sortedOrder === "asc") {
          return d1[title].localeCompare(d2[title])
        } else {
          return d2[title].localeCompare(d1[title])
        }
      });
    }

    setSortedOrder(sortedOrder === "asc" ? "desc" : "asc");
    setDataValue(sortedData);
  }
  var searchingValues;
  const handleChange = (e) => {
    let search = e.target.value;
    searchingValues = allData.map((data) => {
      return data[search]
    })
    searchingValues = [...new Set(searchingValues)]
    let answer = searchingValues.map((searchValue) => (
      allData.filter((data) => {
        return data[search] === searchValue
      })
    ))

    setDataValue([])
    setGroupedData(answer);
  }
  const handleRemoveFilter = () => {
    setDataValue(allData);
    setGroupedData([])
  }
  return (
    <>
      <Navbar />
      <select onChange={handleChange}>
        <option disabled selected>Select Group By</option>
        <option value="month">Month</option>
        <option value="year">Year</option>
        <option value="transaction">Transaction</option>
        <option value="from_account">From Account</option>
        <option value="to_account">To Account</option>
      </select>
      {groupedData.length > 0 && <button onClick={handleRemoveFilter}>Remove Filter</button>}
      
      {dataValue.length > 0 && <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead style={{ background: "rgb(160, 162, 192)", color: "white", cursor: "pointer" }}>
            <TableRow>
              <TableCell onClick={() => handleSort("month")}> Month <VerticalAlignCenterIcon /></TableCell>
              <TableCell align="right" onClick={() => handleSort("year")}>Year <VerticalAlignCenterIcon /></TableCell>
              <TableCell align="right" onClick={() => handleSort("transaction")}>Transaction <VerticalAlignCenterIcon /></TableCell>
              <TableCell align="right" onClick={() => handleSort("from_account")}>From Account <VerticalAlignCenterIcon /></TableCell>
              <TableCell align="right" onClick={() => handleSort("to_account")}>To Account <VerticalAlignCenterIcon /></TableCell>
              <TableCell align="right" onClick={() => handleSort("amount")}>Amount <VerticalAlignCenterIcon /></TableCell>
              <TableCell align="right" onClick={() => handleSort("notes")}>Notes <VerticalAlignCenterIcon /></TableCell>
              <TableCell align="right">Image <VerticalAlignCenterIcon /></TableCell>
              <TableCell align="right">View <RemoveRedEyeIcon /></TableCell>
            </TableRow>
          </TableHead >
          <TableBody>
            {dataValue.map((data, index) => (
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
                  <img src={data.selectedFile} alt='error in loading' width={75} height={75} />
                </TableCell>
                <TableCell align="right"><Link to={`/transaction/${index}`}>View</Link></TableCell>

              </TableRow>
            ))}
          </TableBody>
        </Table >
      </TableContainer >}

      {groupedData.length > 0 && groupedData.map((singleData, index) => (
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead style={{ background: "rgb(160, 162, 192)", color: "white", cursor: "pointer" }}>
            <TableRow>
              <TableCell onClick={() => handleSort("month")}> Month <VerticalAlignCenterIcon /></TableCell>
              <TableCell align="right" onClick={() => handleSort("year")}>Year <VerticalAlignCenterIcon /></TableCell>
              <TableCell align="right" onClick={() => handleSort("transaction")}>Transaction <VerticalAlignCenterIcon /></TableCell>
              <TableCell align="right" onClick={() => handleSort("from_account")}>From Account <VerticalAlignCenterIcon /></TableCell>
              <TableCell align="right" onClick={() => handleSort("to_account")}>To Account <VerticalAlignCenterIcon /></TableCell>
              <TableCell align="right" onClick={() => handleSort("amount")}>Amount <VerticalAlignCenterIcon /></TableCell>
              <TableCell align="right">Image <VerticalAlignCenterIcon /></TableCell>
            </TableRow>
          </TableHead >
          <TableBody>
            {singleData.map((d, index) => (
              <TableRow
                key={index}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell component="th" scope="row">
                  {d.month}
                </TableCell>
                <TableCell align="right">{d.year}</TableCell>
                <TableCell align="right">{d.transaction}</TableCell>
                <TableCell align="right">{d.from_account}</TableCell>
                <TableCell align="right">{d.to_account}</TableCell>
                <TableCell align="right">{d.currency}{d.amount}</TableCell>
                <TableCell align="right">
                  <img src={d.selectedFile} alt='error in loading' width={75} height={75} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ))}


    </>
  )
}

