import React, { useContext } from "react";
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import { Link } from 'react-router-dom';
import { Button } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import { RemoveRedEyeOutlined } from "@mui/icons-material";
import { GlobalContext } from "../../context/GlobalContext";
const TableRowComp = ({ row, index }) => {
  const { setData, data } = useContext(GlobalContext);
  const handleDelete = (id) => {
    let choice = window.confirm("Are you sure you want to delete this?")
    if (choice) {
      let cloneData = [...data];
      cloneData = cloneData.filter((data) => data.id !== id);
      setData(cloneData);
    }
  }
  return (
    <>
      <TableRow
        key={index}
        sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
      >
        <TableCell component="th" scope="row">
          {/* {new Date(data.date).toLocaleDateString()} */}
          {row.date}
        </TableCell>
        <TableCell align="right">{row.month}</TableCell>
        <TableCell align="right">{row.year}</TableCell>
        <TableCell align="right">{row.transaction_type}</TableCell>
        <TableCell align="right">{row.from_account}</TableCell>
        <TableCell align="right">{row.to_account}</TableCell>
        <TableCell align="right">
          {row.currency}
          {row.amount.toLocaleString("en-IN")}
        </TableCell>
        <TableCell align="right">{row.notes.substr(0, 15)}{row.notes.length > 15 ? "..." : ""}</TableCell>
        <TableCell align="right">
          {row.fileBase64 ? <img
            src={row.fileBase64}
            alt="Did not select"
            width={75}
            height={75}
          /> : "No Image Selected"}

        </TableCell>
        <TableCell align="right">
          <Button style={{ color: "white" }}><Link to={`/transaction/${row.id}`}><RemoveRedEyeOutlined /></Link></Button> &nbsp; |
          &nbsp; <Button><Link to={`/edit/${row.id}`}> <EditIcon /></Link></Button> &nbsp; <Button onClick={() => handleDelete(row.id)}>Delete</Button>


        </TableCell>
        {/* <CustomModal open={open} setOpen={setOpen} handleClose={handleClose} id={data.id} setDataValue={setDataValue} dataValue={setDataValue} /> */}
      </TableRow>
    </>

  );
};

export default TableRowComp;
