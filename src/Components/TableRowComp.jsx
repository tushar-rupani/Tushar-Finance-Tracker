import React from "react";
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import { Link } from 'react-router-dom';
const TableRowComp = ({data, index}) => {
  return (
    <TableRow
      key={index}
      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
    >
      <TableCell component="th" scope="row">
        {/* {new Date(data.date).toLocaleDateString()} */}
        {data.date}
      </TableCell>
      <TableCell align="right">{data.month}</TableCell>
      <TableCell align="right">{data.year}</TableCell>
      <TableCell align="right">{data.transactionType}</TableCell>
      <TableCell align="right">{data.fromAccount}</TableCell>
      <TableCell align="right">{data.toAccount}</TableCell>
      <TableCell align="right">
        {data.currency}
        {data.amount.toLocaleString("en-IN")}
      </TableCell>
      <TableCell align="right">{data.notes.substr(0, 15)}...</TableCell>
      <TableCell align="right">
        <img
          src={data.fileBase64}
          alt="Did not select"
          width={75}
          height={75}
        />
      </TableCell>
      <TableCell align="right">
        <Link to={`/transaction/${data.id}`}>View</Link>
      </TableCell>
      <TableCell align="right">
        <Link to={`/edit/${data.id}`}>
          Edit
        </Link>
      </TableCell>
    </TableRow>
  );
};

export default TableRowComp;
