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
import { addIfDoesntExists } from '../../Services/localstorage.service';
export const List = () => {
  let allData = loadDataFromLocal();
  let [dataValue, setDataValue] = useState(allData);
  addIfDoesntExists()
  const [sortedOrder, setSortedOrder] = useState("desc");
  let [groupedData, setGroupedData] = useState({});
  let handleSort = (title, grid = false, data = "") => {
    let sortedData;
    let groupSortData;
    if (!grid) {
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
    } else {
      console.log("Executing Grid One");
      let objToUpdate = groupedData[data];
      if (title === "amount") {
        groupSortData = [...objToUpdate].sort((d1, d2) => {
          if (sortedOrder === "asc") {
            return d1[title] - d2[title];
          } else {
            return d2[title] - d1[title];
          }
        });
      } else {
        groupSortData = [...objToUpdate].sort((d1, d2) => {
          if (sortedOrder === "asc") {
            return d1[title].localeCompare(d2[title])
          } else {
            return d2[title].localeCompare(d1[title])
          }
        })
      }

      setSortedOrder(sortedOrder === "asc" ? "desc" : "asc");
      groupedData[data] = groupSortData;
      setGroupedData(groupedData)
    }



  }
  var searchingValues;
  const handleChange = (e) => {
    let search = e.target.value;
    searchingValues = allData.map((data) => {
      return data[search]
    })
    searchingValues = [...new Set(searchingValues)]
    const answerObj = {}
    searchingValues.forEach((searchValue) => {
      answerObj[searchValue] = allData.filter((data) => {
        return data[search] === searchValue
      })
    })
    console.log(answerObj);

    setDataValue([])
    setGroupedData(answerObj);
  }
  const handleRemoveFilter = () => {
    setDataValue(allData);
    setGroupedData({})
  }
  return (
    <>
      <Navbar />
      <select onChange={handleChange} defaultValue={"basic"}>
        <option disabled value="basic">Select Group By</option>
        <option value="month">Month</option>
        <option value="year">Year</option>
        <option value="transaction">Transaction</option>
        <option value="from_account">From Account</option>
        <option value="to_account">To Account</option>
      </select>
      {Object.keys(groupedData).length > 0 && <button onClick={handleRemoveFilter}>Remove Filter</button>}

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
            {dataValue.length > 0 && dataValue.map((data, index) => (
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
                <TableCell align="right"><Link to={`/transaction/${data.id}`}>View</Link></TableCell>

              </TableRow>
            ))}
          </TableBody>
        </Table >
      </TableContainer >}
      {Object.keys(groupedData) && Object.keys(groupedData).map((data, index) => (
        <div>
          <h2>{data}</h2>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead style={{ background: "rgb(160, 162, 192)", color: "white", cursor: "pointer" }}>
              <TableRow>
                <TableCell onClick={() => handleSort("month", true, data)}> Month <VerticalAlignCenterIcon /></TableCell>
                <TableCell align="right" onClick={() => handleSort("year", true, data)}>Year <VerticalAlignCenterIcon /></TableCell>
                <TableCell align="right" onClick={() => handleSort("transaction", true, data)}>Transaction <VerticalAlignCenterIcon /></TableCell>
                <TableCell align="right" onClick={() => handleSort("from_account", true, data)}>From Account <VerticalAlignCenterIcon /></TableCell>
                <TableCell align="right" onClick={() => handleSort("to_account", true, data)}>To Account <VerticalAlignCenterIcon /></TableCell>
                <TableCell align="right" onClick={() => handleSort("amount", true, data)}>Amount <VerticalAlignCenterIcon /></TableCell>
                <TableCell align="right">Image <VerticalAlignCenterIcon /></TableCell>
              </TableRow>
            </TableHead >
            <TableBody>
              {groupedData[data].map((d, index) => (
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
                  <TableCell align="right">{d.currency}{d.amount.toLocaleString("en-IN")}</TableCell>
                  <TableCell align="right">
                    <img src={d.selectedFile} alt='error in loading' width={75} height={75} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      ))}


    </>
  )
}

