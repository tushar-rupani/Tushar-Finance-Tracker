import React from 'react'
import { addIfDoesntExists } from '../../Services/localstorage.service'
import { Navbar } from './Navbar'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { read } from 'xlsx';
import { utils, writeFile } from 'xlsx';
export const Home = () => {
  addIfDoesntExists();
  const tasksObject = [
    {
      title: "Form Design and Validations",
      startDate: "25th April, 2023 | 4:30",
      endDate: "25th April, 2023 | 6:50",
      status: "done"
    },
    {
      title: "Storing data into LocalStorage",
      startDate: "26th April, 2023 | 8:30",
      endDate: "26th April, 2023 | 9:10",
      status: "done"
    },
    {
      title: "Showing Stored Data",
      startDate: "26th April, 2023 | 10:30",
      endDate: "26th April, 2023 | 10:50",
      status: "done"
    },
    {
      title: "Performing Sorting on Data",
      startDate: "26th April, 2023 | 2:30",
      endDate: "26th April, 2023 | 4:30",
      status: "done"
    },
    {
      title: "Pagination",
      startDate: "27th April, 2023 | 9:30",
      endDate: "27th April, 2023 | 9:50",
      status: "done"
    },
    {
      title: "Group By",
      startDate: "27th April, 2023 | 2:30",
      endDate: "27th April, 2023 | 3:50",
      status: "done"
    },
    {
      title: "Performing sorting on paginated data.",
      startDate: "28th April, 2023 | 10:30",
      endDate: "28th April, 2023 | 1:30",
      status: "done"
    },
    {
      title: "Searching",
      startDate: "28th April, 2023 | 4:30",
      endDate: "28th April, 2023 | 4:50",
      status: "done"
    },
    {
      title: "Edit Mode",
      startDate: "29th April, 2023 | 7:30PM",
      endDate: "29th April, 2023 | 9:30 PM",
      status: "done"
    },
    {
      title: "Solving bugs as Senior suggested",
      startDate: "30th April, 2023 | 8:30",
      endDate: "30th April, 2023 | 10:50",
      status: "done"
    },
    {
      title: "Remove and Display Image feature | Sanket Sir suggested.",
      startDate: "28th April, 2023 | 4:30",
      endDate: "28th April, 2023 | 4:35",
      status: "done"
    },
    {
      title: "Export Data To JSON file",
      startDate: "30th April, 2023 | 12:40",
      endDate: "30th April, 2023 | 1:40",
      status: "pending"
    },
    {
      title: "Protected Route",
      startDate: "-",
      endDate: "-",
      status: "pending"
    }
  ]
  const handleImport = (e) => {
    let files = e.target.files;
    if(files.length){
      const file = files[0];
      const reader = new FileReader();
      reader.onload = (e) => {
        const wb = read(e.target.result);
        const sheets = wb.Sheets
        if(sheets.length){
          const rows = utils.sheet_to_json(wb.Sheets[sheets[0]]);
          console.log(rows);
        }
      }

      reader.readAsArrayBuffer(file)
    }
  }
  return (
    <div style={{fontFamily: "arial", fontWeight: "bolder"}}>
      <Navbar />
      <br />
      <input type='file' name='file' onChange={handleImport}/>
      <h4 style={{textAlign: "justify", fontWeight: "300", lineHeight: "25px", margin: "10px 20px"}}>In today's fast-paced world, keeping track of our finances has become more important than ever. Whether it's tracking our expenses, monitoring our income, or keeping an eye on our investments, having a clear understanding of our financial situation is crucial for making informed decisions. That's where the Finance Tracker app comes in. Designed using ReactJS, this app is a powerful tool for managing your finances and gaining greater insight into your financial health. With its intuitive user interface and robust features, the Finance Tracker app makes it easy to stay on top of your finances and achieve your financial goals.</h4>
      <h4> More about this task: <a href="https://dandy-muenster-6f1.notion.site/Finance-Tracker-ReactJS-exercise-f4fe19a5bb044610a87483e81238bd7a">Visit here.</a></h4>
      <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow style={{backgroundColor: "#37268d44"}}>
            <TableCell>Task Name</TableCell>
            <TableCell align="right">Start Date</TableCell>
            <TableCell align="right">Completion Date</TableCell>
            <TableCell align="right">Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {tasksObject.map((object, id) => (
                <TableRow
                key={id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell component="th" scope="row">{object.title}</TableCell>
                <TableCell align="right">{object.startDate}</TableCell>
                <TableCell align="right">{object.endDate}</TableCell>
                <TableCell align="right">{object.status === "done" ? "Finished" : "Pending" }</TableCell>
              </TableRow>
          ))}
        
        </TableBody>
      </Table>
    </TableContainer>
    </div>
  )
}
