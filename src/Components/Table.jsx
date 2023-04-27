import React from 'react'
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
export const TableComp = ({handleSort, dataValue, grid, data}) => {
  return (
    <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead style={{ background: "rgb(160, 162, 192)", color: "white", cursor: "pointer" }}>
            <TableRow>
              <TableCell onClick={() => handleSort("month")}> Month <VerticalAlignCenterIcon /></TableCell>
              <TableCell align="right" onClick={() => handleSort("year", grid, data)}>Year <VerticalAlignCenterIcon /></TableCell>
              <TableCell align="right" onClick={() => handleSort("transaction", grid, data)}>Transaction <VerticalAlignCenterIcon /></TableCell>
              <TableCell align="right" onClick={() => handleSort("from_account", grid, data)}>From Account <VerticalAlignCenterIcon /></TableCell>
              <TableCell align="right" onClick={() => handleSort("to_account", grid, data)}>To Account <VerticalAlignCenterIcon /></TableCell>
              <TableCell align="right" onClick={() => handleSort("amount", grid, data)}>Amount <VerticalAlignCenterIcon /></TableCell>
              <TableCell align="right" onClick={() => handleSort("notes", grid, data)}>Notes <VerticalAlignCenterIcon /></TableCell>
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
      </TableContainer >
  )
}
