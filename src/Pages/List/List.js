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
export const List = () => {
  let allData = loadDataFromLocal();
  // const [constantState, setConstantState] = useState(allData);
  let [dataValue, setDataValue] = useState(allData);
  const [sortedOrder, setSortedOrder] = useState("asc");
  let handleSort = (title) => {
    console.log(title);
    let sortedData = [...dataValue].sort((d1, d2) => {
      if(sortedOrder === "asc"){
        return d1[title].localeCompare(d2[title])
      }else{
        return d2[title].localeCompare(d1[title])
      }
    }) ;
    setSortedOrder(sortedOrder === "asc" ? "desc" : "asc");
    setDataValue(sortedData);
    console.log(dataValue);
  }
  
  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead style={{ background: "rgb(160, 162, 192)", color: "white" }}>
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
            {dataValue.map((data, index) => (
              <TableRow
              // ! Update Keys method
                key={index}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell component="th" scope="row">
                  {data.month}
                </TableCell>
                <TableCell align="right">{data.year}</TableCell>
                <TableCell align="right">{data.transaction}</TableCell>
                <TableCell align="right">{data.from_account}</TableCell>
                <TableCell align="right">{data.to_account}</TableCell>
                <TableCell align="right">{data.amount}</TableCell>
                <TableCell align="right">
                  <img src={data.selectedFile} alt='error in loading' width={75} height={75} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table >
      </TableContainer >

    </>
  )
}
