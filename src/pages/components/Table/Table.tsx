import { styled } from "@mui/material/styles";
import { useEffect, useState } from "react";
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
import { ExclamationCircleFilled } from "@ant-design/icons";
import { Modal } from "antd";
import { deleteTransaction } from "../../../reducers/transactions";
import { useDispatch } from "react-redux";
import { SortType } from "../../models/TableTypes/Table";
import { handleSort } from "../../../utils/sorting";
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
  const dispatch = useDispatch();
  const [dataValue, setDataValue] = useState(items);
  const [sortedOrder, setSortedOrder] = useState<SortType>({
    key: null,
    direction: "asc",
  });
  const handleDelete = (id: number) => {
    dispatch(deleteTransaction(id));
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
  return (
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
                    items
                  )
                }
                style={{ cursor: "pointer" }}
              >
                {" "}
                <span style={{ fontSize: "15px" }}>{header.title}</span> &nbsp;
                {sortedOrder.direction === "asc" ? (
                  <>&#8597; </>
                ) : sortedOrder.direction === "desc" ? (
                  <>&#8593;</>
                ) : (
                  <>&#8595;</>
                )}
              </StyledTableCell>
            ))}
            <StyledTableCell>Receipt</StyledTableCell>
            <StyledTableCell>Actions</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {dataValue.length > 0 &&
            dataValue.map((element, index) => (
              <TableRow
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
                <StyledTableCell>{element.transaction_type}</StyledTableCell>
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
                  <Link to={`/form/${element.id}`}>
                    <Button>Edit</Button>{" "}
                  </Link>{" "}
                  &nbsp;
                  <Button danger onClick={() => askDelete(element.id)}>
                    Delete
                  </Button>
                </StyledTableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
