import { styled } from "@mui/material/styles";
import { ChangeEvent, useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { FormType } from "../../models/FormTypes/Form";
import { Button, message } from "antd";
import { Link } from "react-router-dom";
import { ExclamationCircleFilled, EyeFilled } from "@ant-design/icons";
import { Modal } from "antd";
import { deleteTransaction } from "../../../reducers/transactions";
import { useDispatch } from "react-redux";
import { SortType } from "../../models/TableTypes/Table";
import { handleSort } from "../../../utils/sorting";
import { useErrorHandler } from "react-error-boundary";
import { Pagination } from "./Pagination";
const { confirm } = Modal;

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
  const handleError = useErrorHandler();
  const dispatch = useDispatch();
  const [dataValue, setDataValue] = useState(items);
  const [sortedOrder, setSortedOrder] = useState<SortType>({
    key: null,
    direction: "asc",
  });

  /* let ans = 3 / 0;
  if (ans === Infinity) {
    handleError(
      "My dawg! Are you seriously trying to divide a number by zero?"
    );
  }
  */

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(2);
  let lengthOfData, pagesNeeded, pageNumbers, indexOfFirstPage, indexOfLastPage;
  lengthOfData = dataValue.length;
  pagesNeeded = Math.ceil(lengthOfData / itemsPerPage);
  pageNumbers = [...Array(pagesNeeded + 1).keys()].slice(1);
  indexOfLastPage = currentPage * itemsPerPage;
  indexOfFirstPage = indexOfLastPage - itemsPerPage;

  const handleDelete = (id: number) => {
    dispatch(deleteTransaction(id));
    message.success("Deleted Successfully!  ");
  };

  useEffect(() => {
    setDataValue([...items]);
  }, [items]);

  const transactionHeader = [
    { title: "Date", functionTitle: "date" },
    { title: "Month - Year", functionTitle: "month" },
    { title: "Transaction", functionTitle: "transaction_type" },
    { title: "From Account", functionTitle: "from_account" },
    { title: "To Account", functionTitle: "to_account" },
    { title: "Amount", functionTitle: "amount" },
    { title: "Notes", functionTitle: "notes" },
  ];

  const askDelete = (id: number) => {
    confirm({
      title: "Do you Want to delete this transaction?",
      icon: <ExclamationCircleFilled />,
      content: "Once deleted it is not possible to recover it.",
      onOk() {
        handleDelete(id);
      },
      onCancel() {
        console.log("Cancel");
      },
    });
  };

  const handlePageSelected = (e: ChangeEvent<HTMLSelectElement>) => {
    // console.log(e.target.value);
    setItemsPerPage(parseInt(e.target.value));
  };

  const causeError = () => {
    // throw new Error("Causing error!");
    handleError("You can not sort images bruv!");
  };
  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              {transactionHeader.map((header, index) => (
                <StyledTableCell
                  key={index}
                  align="right"
                  onClick={() =>
                    handleSort(
                      header.functionTitle,
                      setSortedOrder,
                      setDataValue,
                      dataValue,
                      sortedOrder,
                      items,
                      setCurrentPage
                    )
                  }
                  style={{ cursor: "pointer" }}
                >
                  <span style={{ fontSize: "15px" }}>{header.title}</span>{" "}
                  &nbsp;
                  {sortedOrder.direction === "asc" ? (
                    <>&#8597; </>
                  ) : sortedOrder.direction === "desc" ? (
                    <>&#8593;</>
                  ) : (
                    <>&#8595;</>
                  )}
                </StyledTableCell>
              ))}
              <StyledTableCell onClick={causeError}>Receipt</StyledTableCell>
              <StyledTableCell>Actions</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {dataValue.length > 0 &&
              dataValue
                .slice(indexOfFirstPage, indexOfLastPage)
                .map((element, index) => (
                  <TableRow
                    key={index}
                    style={{
                      background:
                        element.amount < 0
                          ? "rgba(255,0,0,0.1)"
                          : "rgba(61,255,36,0.0)",
                    }}
                  >
                    <StyledTableCell>{element.date}</StyledTableCell>
                    <StyledTableCell>
                      {element.month} - {element.year}
                    </StyledTableCell>
                    <StyledTableCell>
                      {element.transaction_type}
                    </StyledTableCell>
                    <StyledTableCell>{element.from_account}</StyledTableCell>
                    <StyledTableCell>{element.to_account}</StyledTableCell>
                    <StyledTableCell>
                      {element.currency}
                      {element.amount.toLocaleString("en-IN")}
                    </StyledTableCell>
                    <StyledTableCell>
                      {element.notes?.substr(0, 10)}
                      {element.notes.length > 10 ? "..." : ""}
                    </StyledTableCell>
                    <StyledTableCell>
                      <img
                        src={element.fileBase64}
                        width={40}
                        height={40}
                        alt="error"
                      ></img>
                    </StyledTableCell>
                    <StyledTableCell>
                      <Link to={`/transaction/${element.id}`}>
                        <Button>
                          <EyeFilled />
                        </Button>
                      </Link>
                      &nbsp;
                      <Link to={`/form/${element.id}`}>
                        <Button>Edit</Button>{" "}
                      </Link>{" "}
                      <Button danger onClick={() => askDelete(element.id)}>
                        Delete
                      </Button>
                    </StyledTableCell>
                  </TableRow>
                ))}
          </TableBody>
        </Table>
      </TableContainer>
      <br />
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Pagination
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          pageNumbers={pageNumbers}
        />
        <br />
        <select
          defaultValue={""}
          onChange={(e) => handlePageSelected(e)}
          style={{ width: "10%" }}
        >
          <option value="" disabled>
            Per Page
          </option>
          <option value={2}>2</option>
          <option value={5}>5</option>
          <option value={10}>10</option>
        </select>
      </div>
    </>
  );
}
