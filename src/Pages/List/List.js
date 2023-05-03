import React, { useState } from 'react'
import { loadDataFromLocal } from '../../Services/localstorage.service'
import { TableComp } from '../../Components/Table';
import { Navbar } from '../Home/Navbar';
import { addIfDoesntExists } from '../../Services/localstorage.service';
export const List = () => {
  addIfDoesntExists();
  const [currentPage, setCurrentPage] = useState(1);
  let allData = loadDataFromLocal();
  let [dataValue, setDataValue] = useState([...allData]);
  const [sortedOrder, setSortedOrder] = useState("asc");
  let [groupedData, setGroupedData] = useState({});
  let [currentTitle, setCurrentTitle] = useState("")
  let [dataFound, setDataFound] = useState("");
  let [allGrouped, setAllGrouped] = useState({});
  
  

  let handleSort = async(title, grid = false, data = "", setCurrentPage, setGroupPage) => {
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
      setGroupPage(1)
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
    console.log(searchTerm);
    if(searchTerm){
      searchTerm = searchTerm.toLowerCase()
    }
    searchTerm = searchTerm.toLowerCase();
    if(searchTerm.length === 0){
      setDataValue(allData);
      setDataFound("")
      return
    }
    let clonedObject = [...allData]
    console.log("called",clonedObject);
    const filteredData = clonedObject.filter((data) => {
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
      return '';
    });
    if(!filteredData.length){
      setDataFound("No data found");
    }else{
      setDataFound(`${filteredData.length} record(s) found!`)
    }
      setDataValue(filteredData);
      setCurrentPage(1)
  }

  const handleGroupedSearch = (e) => {
    const searchedData = {};
    
    let groupedSearchTerm = e.target.value.toLowerCase();
    for(let key in groupedData){
      let array = groupedData[key]
      let filteredData = array.filter((data) => {
        if(data.month.toLowerCase().includes(groupedSearchTerm) ||
        data.year.toLowerCase().includes(groupedSearchTerm) ||
        data.toAccount.toLowerCase().includes(groupedSearchTerm) ||
        data.fromAccount.toLowerCase().includes(groupedSearchTerm) ||
        data.transactionType.toLowerCase().includes(groupedSearchTerm) ||
        data.amount.toString().toLowerCase().includes(groupedSearchTerm)){
          return data
        }else {
          return ''
        }
      })
      searchedData[key] = filteredData
    }
    setGroupedData(searchedData)
  }
  return (
    <>
      <Navbar />
      {
      dataValue.length > 0
      ? <input type='text' placeholder='Enter Search..' onChange={handleSearch} style={{margin: "20px", padding: "10px"}}/>
            
      : <input type='text' placeholder='Type to search on Grouped Data..' onChange={handleGroupedSearch} style={{margin: "20px", padding: "10px"}}/>
      }<br />
      {dataFound} <br />
      <select onChange={handleChange} defaultValue={""} style={{width: "40%"}}>
        <option disabled value="">Select Group By</option>
        <option value="month">Month</option>
        <option value="year">Year</option>
        <option value="transactionType">Transaction</option>
        <option value="fromAccount">From Account</option>
        <option value="toAccount">To Account</option>
      </select>
      {Object.keys(groupedData).length > 0 && <button onClick={handleRemoveFilter}>Remove Filter</button>}

      {dataValue.length > 0 && <TableComp handleSort={handleSort} setDataValue = {setDataValue} dataValue = {dataValue} data = "" grid={false} setCurrentPage = {setCurrentPage} currentPage = {currentPage}/>}

      {Object.keys(groupedData) && Object.keys(groupedData).map((data, index) => (
        <div>
          { groupedData[data].length > 0 &&
          <> 
          <h2>{data}</h2>
          <TableComp 
          handleSort={handleSort}
          dataValue={groupedData[data]}
          data={data}
          grid={true}
          setCurrentPage = {setCurrentPage}
          currentPage = {currentPage}
          />
          </>
        }
        </div>
      ))}
    </>
  )
}

