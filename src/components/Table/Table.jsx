import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import TableRowComp from "./TableRowComp";
import { Pagination } from "../Pagination";

export const TableComp = ({ data }) => {
  console.log("data", data);
  const itemsPerPage = 3;
  const [sortedOrder, setSortedOrder] = useState({
    key: null,
    direction: "asc",
  });
  const [dataValue, setDataValue] = useState([]);

  useEffect(() => {
    setDataValue([...data])
  }, [data])


  // eslint-disable-next-line
  const [cloneOfData, setCloneOfData] = useState([...data]);
  const [currentPage, setCurrentPage] = useState(1);
  const [dataFound, setDataFound] = useState("");
  // eslint-disable-next-line
  const [cloneData, setCloneData] = useState([...data]);
  let handleSort = async (title) => {
    let cloneData;
    switch (title) {
      case "amount":
        if (sortedOrder.key !== title || sortedOrder.direction === "asc") {
          cloneData = dataValue.sort((a, b) => a[title] - b[title]);
          setDataValue(cloneData);
          setSortedOrder({ key: title, direction: "desc" });
        } else if (sortedOrder.direction === "desc") {
          cloneData = dataValue.sort((a, b) => b[title] - a[title]);
          setDataValue(cloneData);
          setSortedOrder({ key: title, direction: null });
        } else {
          setDataValue(cloneOfData);
          console.log(data);
          setSortedOrder({ key: title, direction: "asc" });
        }
        break;

      case "date":
        if (sortedOrder.key !== title || sortedOrder.direction === "asc") {
          cloneData = dataValue.sort(
            (a, b) =>
              new Date(a[title]).getTime() - new Date(b[title]).getTime()
          );
          setDataValue(cloneData);
          setSortedOrder({ key: title, direction: "desc" });
        } else if (sortedOrder.direction === "desc") {
          cloneData = dataValue.sort(
            (a, b) =>
              new Date(b[title]).getTime() - new Date(a[title]).getTime()
          );
          setDataValue(cloneData);
          setSortedOrder({ key: title, direction: null });
        } else {
          setDataValue(cloneOfData);
          setSortedOrder({ key: title, direction: "asc" });
        }
        break;

      default:
        if (sortedOrder.key !== title || sortedOrder.direction === "asc") {
          cloneData = dataValue.sort((a, b) => (a[title] > b[title] ? 1 : -1));
          setDataValue(cloneData);
          setSortedOrder({ key: title, direction: "desc" });
        } else if (sortedOrder.direction === "desc") {
          cloneData = dataValue.sort((a, b) => (a[title] < b[title] ? 1 : -1));
          setDataValue(cloneData);
          setSortedOrder({ key: title, direction: null });
        } else {
          setDataValue(cloneOfData);
          setSortedOrder({ key: title, direction: "asc" });
        }
    }
    setCurrentPage(1);
  };
  const handleSearch = (e) => {
    let searchTerm = e.target.value;
    searchTerm = searchTerm.toLowerCase();
    if (searchTerm.length === 0) {
      setDataValue(cloneData);
      setDataFound("");
      return;
    }
    const filteredData = cloneData.filter((data) => {
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
    if (!filteredData.length) {
      setDataFound("No data found");
    } else {
      setDataFound(`${filteredData.length} record(s) found!`);
    }
    setDataValue(filteredData);
    setCurrentPage(1);
  };

  let lengthOfData, pagesNeeded, pageNumbers, indexOfFirstPage, indexOfLastPage;
  lengthOfData = dataValue.length;
  pagesNeeded = Math.ceil(lengthOfData / itemsPerPage);
  pageNumbers = [...Array(pagesNeeded + 1).keys()].slice(1);
  indexOfLastPage = currentPage * itemsPerPage;
  indexOfFirstPage = indexOfLastPage - itemsPerPage;

  const transactionHeader = [
    { title: "Date", functionTitle: "date" },
    { title: "Month", functionTitle: "month" },
    { title: "Year", functionTitle: "year" },
    { title: "Transaction", functionTitle: "transaction_type" },
    { title: "From Account", functionTitle: "from_account" },
    { title: "To Account", functionTitle: "to_account" },
    { title: "Amount", functionTitle: "amount" },
    { title: "Notes", functionTitle: "notes" },
  ];
  return (
    <div>
      <input
        type="text"
        placeholder="Enter Search.."
        onChange={handleSearch}
        style={{ margin: "20px", padding: "10px" }}
      />

      {dataFound}
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead
            style={{
              background: "rgb(160, 162, 192)",
              color: "white",
              cursor: "pointer",
            }}
          >
            <TableRow>
              {transactionHeader.map((header, index) => (
                <TableCell
                  key={index}
                  align="right"
                  onClick={() => handleSort(header.functionTitle)}
                >
                  {" "}
                  <span style={{ fontSize: "15px" }}>{header.title}</span>{" "}
                  &nbsp;
                  {sortedOrder.direction === "asc" ? (
                    <>&#8597; </>
                  ) : sortedOrder.direction === "desc" ? (
                    <>&#8593;</>
                  ) : (
                    <>&#8595;</>
                  )}
                </TableCell>
              ))}
              <TableCell align="right">Image</TableCell>
              <TableCell align="right">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {dataValue.length > 0 &&
              dataValue
                .slice(indexOfFirstPage, indexOfLastPage)
                .map((element, index) => (
                  <TableRowComp row={element} index={index} />
                ))}
          </TableBody>
        </Table>
      </TableContainer>
      <br />
      <br />
      {
        <Pagination
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          pageNumbers={pageNumbers}
        />
      }
    </div>
  );
};
