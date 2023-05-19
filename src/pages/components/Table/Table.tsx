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
import { useDispatch, useSelector } from "react-redux";
import { SortType } from "../../models/TableTypes/Table";
import { handleSort } from "../../../utils/sorting";
import { useErrorHandler } from "react-error-boundary";
import { Pagination } from "./Pagination";
import { RootState } from "../../../store";
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

export default function TableComponent({
  items,
  label,
}: {
  items: FormType[];
  label: string | undefined;
}) {
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

  const language = useSelector((state: RootState) => state.language.value);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(2);
  const [dataFound, setDataFound] = useState("");
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
    { title: language.date, functionTitle: "date" },
    { title: language.month, functionTitle: "month" },
    { title: language.transcation, functionTitle: "transaction_type" },
    { title: language.from_account, functionTitle: "from_account" },
    { title: language.to_account, functionTitle: "to_account" },
    { title: language.amount, functionTitle: "amount" },
    { title: language.notes, functionTitle: "notes" },
  ];

  const askDelete = (id: number) => {
    confirm({
      title: language.warning,
      icon: <ExclamationCircleFilled />,
      content: language.warningdesc,
      okText: language.ok,
      cancelText: language.cancel,
      onOk() {
        handleDelete(id);
      },
      onCancel() {
        console.log("Cancel");
      },
    });
  };

  const handlePageSelected = (e: ChangeEvent<HTMLSelectElement>) => {
    setItemsPerPage(parseInt(e.target.value));
    setCurrentPage(1);
  };

  const causeError = () => {
    // throw new Error("Causing error!");
    handleError("You can not sort images bruv!");
  };

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    // console.log(e.target.value);
    let searchTerm = e.target.value;
    searchTerm = searchTerm.toLowerCase();
    if (searchTerm.length === 0) {
      setDataValue(items);
      setDataFound("");

      return;
    }
    const filteredData = items.filter((data) => {
      if (
        data.month.toLowerCase().includes(searchTerm) ||
        data.year.toLowerCase().includes(searchTerm) ||
        data.to_account.toLowerCase().includes(searchTerm) ||
        data.from_account.toLowerCase().includes(searchTerm) ||
        data.transaction_type.toLowerCase().includes(searchTerm) ||
        data.amount.toString().toLowerCase().includes(searchTerm) ||
        data.notes.toString().toLowerCase().includes(searchTerm)
      ) {
        return data;
      }
      return "";
    });
    setDataValue(filteredData);
    if (!filteredData.length) {
      setDataFound("No Records Found");
    } else {
      setDataFound("");
    }
  };
  return (
    <>
      <input
        type="text"
        placeholder="Search Here..."
        style={{ width: "40%" }}
        onChange={handleSearch}
      />
      {dataFound}
      {dataValue.length > 0 && (
        <TableContainer component={Paper}>
          <div style={{ textAlign: "center", padding: "4px", fontWeight: 800 }}>
            {label !== "" && label}
          </div>
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
                <StyledTableCell onClick={causeError}>
                  {language.receipt}
                </StyledTableCell>
                <StyledTableCell>{language.action}</StyledTableCell>
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
                          <Button>{language.edit}</Button>{" "}
                        </Link>{" "}
                        <Button danger onClick={() => askDelete(element.id)}>
                          {language.delete}
                        </Button>
                      </StyledTableCell>
                    </TableRow>
                  ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
      <br />
      {dataValue.length > 0 && (
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
            defaultValue={itemsPerPage}
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
      )}
    </>
  );
}
