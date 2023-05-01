import React, { useState } from 'react'
import { loadDataFromLocal } from '../../Services/localstorage.service'
import { TableComp } from '../../Components/Table';
import { Navbar } from '../Home/Navbar';
import { addIfDoesntExists } from '../../Services/localstorage.service';
export const List = () => {
  addIfDoesntExists()
  let allData = loadDataFromLocal();
  let [dataValue, setDataValue] = useState([...allData]);
  const [sortedOrder, setSortedOrder] = useState("asc");
  let [groupedData, setGroupedData] = useState({});
  let [currentTitle, setCurrentTitle] = useState("")

  const itemsPerPage = 2;
  const lengthOfData = dataValue.length;

  const pagesNeeded = Math.ceil(lengthOfData / itemsPerPage);
  const pageNumbers = [...Array(pagesNeeded + 1).keys()].slice(1)

  const [currentPage, setCurrentPage] = useState(1);

  const indexOfLastPage = currentPage * itemsPerPage;
  const indexOfFirstPage = indexOfLastPage - itemsPerPage;

  let handleSort = async(title, grid = false, data = "") => {
    let groupSortData;
    let cloneData;
    setCurrentTitle(title)
    if(title !== currentTitle){
      console.log("coming inside");
      setSortedOrder("asc");
      console.log(sortedOrder);
    }
    // const itemsOnPage = dataValue.slice(indexOfFirstPage, indexOfLastPage)
    if (!grid) {
      if (title === "amount") {
        if(sortedOrder === "asc"){
          cloneData = dataValue.sort((a, b) => a[title] - b[title])
        }else if(sortedOrder === "desc"){
          cloneData = dataValue.sort((a, b) => b[title] - a[title])
        }
        else{
          setDataValue(allData);
          return
        }
      } else {
        if(sortedOrder === "asc"){
          cloneData = dataValue.sort((a, b) => a[title] > b[title] ? 1 : -1)
        }
        else if(sortedOrder === "desc"){
          cloneData = dataValue.sort((a, b) => a[title] < b[title] ? 1 : -1)
        }else{
          // cloneData = allData
          setDataValue(allData);
          setSortedOrder("asc")
          return
        }
      }
      setSortedOrder(prev => {
        if(prev === "asc") return "desc"
        else if(prev === "desc") return "original"
        else if(prev === "original") return "asc"
      })
      
      setDataValue(cloneData);
      setCurrentPage(1)
    } else {
      let objToUpdate = groupedData[data];
      if (title === "amount") {
        groupSortData = [...objToUpdate].sort((d1, d2) => {
          if (sortedOrder === "asc") {
            return d1[title] - d2[title];
          } else {
            return d2[title] - d1[title];
          }
        });
      } else {
        groupSortData = [...objToUpdate].sort((d1, d2) => {
          if (sortedOrder === "asc") {
            return d1[title].localeCompare(d2[title])
          } else {
            return d2[title].localeCompare(d1[title])
          }
        })
      }
      setSortedOrder(sortedOrder === "asc" ? "desc" : "asc");
      groupedData[data] = groupSortData;
      setGroupedData(groupedData)
    }

  }

  // Creating an array of objects when clicked on Group By
  var searchingValues;
  const handleChange = (e) => {
    let search = e.target.value;
    searchingValues = allData.map((data) => {
      return data[search]
    })
    searchingValues = [...new Set(searchingValues)]
    const answerObj = {}
    searchingValues.forEach((searchValue) => {
      answerObj[searchValue] = allData.filter((data) => {
        return data[search] === searchValue
      })
    })
    setDataValue([])
    setGroupedData(answerObj);
  }

  // Handle remove function
  const handleRemoveFilter = () => {
    setDataValue(allData);
    setGroupedData({})
  }

  // handle search functionality
  const handleSearch = (e) => {
    let searchTerm = e.target.value;
    if(searchTerm.length === 0){
      setDataValue(allData);
      return
    }
    let clonedObject = [...allData]
    console.log("called",clonedObject);
    const filteredData = clonedObject.filter((data) => {
      if (
        data.month.includes(searchTerm) ||
        data.year.includes(searchTerm) ||
        data.toAccount.includes(searchTerm) ||
        data.fromAccount.includes(searchTerm) ||
        data.transactionType.includes(searchTerm) ||
        data.amount.toString().includes(searchTerm)
      ) {
        return data;
      }
      return '';
    });
      setDataValue(filteredData);
      setCurrentPage(1)
  }
  return (
    <>
      <Navbar />

      <input type='text' placeholder='Enter Search..' onChange={handleSearch} style={{margin: "20px", padding: "10px"}}/>
      <br />
      <select onChange={handleChange} defaultValue={""} style={{width: "40%"}}>
        <option disabled value="">Select Group By</option>
        <option value="month">Month</option>
        <option value="year">Year</option>
        <option value="transactionType">Transaction</option>
        <option value="fromAccount">From Account</option>
        <option value="toAccount">To Account</option>
      </select>
      {Object.keys(groupedData).length > 0 && <button onClick={handleRemoveFilter}>Remove Filter</button>}

      {dataValue.length > 0 && <TableComp handleSort={handleSort} setDataValue = {setDataValue} dataValue = {dataValue} data = "" grid={false} indexOfFirstPage = {indexOfFirstPage} indexOfLastPage = {indexOfLastPage} pageNumbers = {pageNumbers} currentPage = {currentPage} setCurrentPage = {setCurrentPage} />}
      {Object.keys(groupedData) && Object.keys(groupedData).map((data, index) => (
        <div>
          <h2>{data}</h2>
          <TableComp 
          handleSort={handleSort}
          dataValue={groupedData[data]}
          data={data}
          grid={true}
          pageNumbers = {pageNumbers} currentPage = {currentPage} setCurrentPage = {setCurrentPage}
          />
        </div>
      ))}
    </>
  )
}

