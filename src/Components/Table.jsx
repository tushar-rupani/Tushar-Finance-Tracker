import React, { useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import SortIcon from "@mui/icons-material/Sort";
import TableRowComp from "./TableRowComp";
import { Pagination } from "./Pagination";
import { loadDataFromLocal } from "../Services/localstorage.service";

const allData = loadDataFromLocal();
export const TableComp = ({
  dataValue,
  setDataValue,
  group,
  setGroupedData,
}) => {
  let handleSort = async (title) => {
    // setCurrentTitle(title);
    // if (currentTitle !== title) {
    //   setSortedOrder("asc");
    // } else if (currentTitle === title) {
    setSortedOrder((prev) => {
      if (prev === "asc") return "desc";
      else if (prev === "desc") return "original";
      else if (prev === "original") return "asc";
    });
    // }
    let cloneData;
    if (title === "amount") {
      if (sortedOrder === "asc") {
        cloneData = dataValue.sort((a, b) => a[title] - b[title]);
      } else if (sortedOrder === "desc") {
        cloneData = dataValue.sort((a, b) => b[title] - a[title]);
      } else {
        setDataValue(allData);
        setSortedOrder("asc");
        return;
      }
    } else {
      if (sortedOrder === "asc") {
        cloneData = dataValue.sort((a, b) => (a[title] > b[title] ? 1 : -1));
      } else if (sortedOrder === "desc") {
        cloneData = dataValue.sort((a, b) => (a[title] < b[title] ? 1 : -1));
      } else {
        setDataValue(allData);
        setSortedOrder("asc");
        return;
      }
    }

    setCurrentPage(1);
    if (group) {
      setGroupedData((prev) => ({ ...prev, data: cloneData }));
    } else {
      setDataValue(cloneData);
    }
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
        data.toAccount.toLowerCase().includes(searchTerm) ||
        data.fromAccount.toLowerCase().includes(searchTerm) ||
        data.transactionType.toLowerCase().includes(searchTerm) ||
        data.amount.toString().toLowerCase().includes(searchTerm)
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
    console.log(cloneData);
    setCurrentPage(1);
  };
  const itemsPerPage = 3;
  const [sortedOrder, setSortedOrder] = useState("asc");
  // const [currentTitle, setCurrentTitle] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [dataFound, setDataFound] = useState("");
  // eslint-disable-next-line
  const [cloneData, setCloneData] = useState([...dataValue]);
  var lengthOfData, pagesNeeded, pageNumbers, indexOfFirstPage, indexOfLastPage;
  lengthOfData = dataValue.length;
  pagesNeeded = Math.ceil(lengthOfData / itemsPerPage);
  pageNumbers = [...Array(pagesNeeded + 1).keys()].slice(1);
  indexOfLastPage = currentPage * itemsPerPage;
  indexOfFirstPage = indexOfLastPage - itemsPerPage;

  const transactionHeader = [
    { title: "Date", functionTitle: "date" },
    { title: "Month", functionTitle: "month" },
    { title: "Year", functionTitle: "year" },
    { title: "Transaction", functionTitle: "transactionType" },
    { title: "From Account", functionTitle: "fromAccount" },
    { title: "To Account", functionTitle: "toAccount" },
    { title: "Amount", functionTitle: "amount" },
    { title: "Notes", functionTitle: "notes" },
  ];
  return (
    <div>
      {group === false && (
        <input
          type="text"
          placeholder="Enter Search.."
          onChange={handleSearch}
          style={{ margin: "20px", padding: "10px" }}
        />
      )}
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
                  <SortIcon />
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
                .map((data, index) => (
                  <TableRowComp data={data} index={index} />
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
