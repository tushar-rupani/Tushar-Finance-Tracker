import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { FormType } from "../../models/FormTypes/Form";
import { Button } from "antd";
import { Link } from "react-router-dom";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

export default function TableComponent({ items }: { items: FormType[] }) {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Date</StyledTableCell>
            <StyledTableCell>Month - Year</StyledTableCell>
            <StyledTableCell>Transaction Type</StyledTableCell>
            <StyledTableCell>From Account</StyledTableCell>
            <StyledTableCell>To Account</StyledTableCell>
            <StyledTableCell>Amount</StyledTableCell>
            <StyledTableCell>Notes</StyledTableCell>
            <StyledTableCell>Image</StyledTableCell>
            <StyledTableCell>Actions</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {items.length > 0 &&
            items.map((element, index) => (
              <TableRow>
                <StyledTableCell>{element.date}</StyledTableCell>
                <StyledTableCell>
                  {element.month} - {element.year}
                </StyledTableCell>
                <StyledTableCell>{element.transaction_type}</StyledTableCell>
                <StyledTableCell>{element.from_account}</StyledTableCell>
                <StyledTableCell>{element.to_account}</StyledTableCell>
                <StyledTableCell>{element.amount}</StyledTableCell>
                <StyledTableCell>{element.notes}</StyledTableCell>
                <StyledTableCell>
                  <img
                    src={element.fileBase64}
                    width={40}
                    height={40}
                    alt="error"
                  ></img>
                </StyledTableCell>
                <StyledTableCell>
                  <Link to={`/form/${element.id}`}>
                    <Button>Edit</Button>{" "}
                  </Link>{" "}
                  &nbsp;
                  <Button danger>Delete</Button>
                </StyledTableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
