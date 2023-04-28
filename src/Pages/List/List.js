import React, { useState } from 'react'
import { loadDataFromLocal } from '../../Services/localstorage.service'
import { TableComp } from '../../Components/Table';
import { Navbar } from '../Home/Navbar';
import { addIfDoesntExists } from '../../Services/localstorage.service';
export const List = () => {
  let allData = loadDataFromLocal();
  let [dataValue, setDataValue] = useState([...allData]);
  addIfDoesntExists()
  const [sortedOrder, setSortedOrder] = useState("asc");
  let [groupedData, setGroupedData] = useState({});
  let handleSort = (title, grid = false, data = "") => {
    let groupSortData;
    let cloneData;
    if (!grid) {
      if (title === "amount") {
        if(sortedOrder === "asc"){
          cloneData = dataValue.sort((a, b) => a[title] - b[title])
        }else if(sortedOrder === "desc"){
          cloneData = dataValue.sort((a, b) => b[title] - a[title])
        }
        else{
          cloneData = allData
        }
      } else {
        if(sortedOrder === "asc"){
          cloneData = dataValue.sort((a, b) => a[title] > b[title] ? 1 : -1)
        }
        else if(sortedOrder === "desc"){
          cloneData = dataValue.sort((a, b) => a[title] < b[title] ? 1 : -1)
        }else{
          cloneData = allData
        }
      }
      setSortedOrder(prev => {
        if(prev === "asc") return "desc"
        else if(prev === "desc") return "original"
        else if(prev === "original") return "asc"
      })
      console.log(sortedOrder);
      setDataValue(cloneData);
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
    let clonedObject = [...dataValue]
    const filteredData = clonedObject.filter((data) => {
      if (
        data.month.includes(searchTerm) ||
        data.year.includes(searchTerm) ||
        data.to_account.includes(searchTerm) ||
        data.from_account.includes(searchTerm) ||
        data.transaction.includes(searchTerm) ||
        data.amount.toString().includes(searchTerm)
      ) {
        return data;
      }
      return '';
    });
    if(filteredData.length > 0)
      setDataValue(filteredData);
  }

  
  return (
    <>
      <Navbar />

      <input type='text' placeholder='Enter Search..' onChange={handleSearch}/>
      <select onChange={handleChange} defaultValue={""}>
        <option disabled value="">Select Group By</option>
        <option value="month">Month</option>
        <option value="year">Year</option>
        <option value="transaction">Transaction</option>
        <option value="from_account">From Account</option>
        <option value="to_account">To Account</option>
      </select>
      {Object.keys(groupedData).length > 0 && <button onClick={handleRemoveFilter}>Remove Filter</button>}

      {dataValue.length > 0 && <TableComp handleSort={handleSort} setDataValue = {setDataValue} dataValue = {dataValue} data = "" grid={false}  />}
      {Object.keys(groupedData) && Object.keys(groupedData).map((data, index) => (
        <div>
          <h2>{data}</h2>
          <TableComp 
          handleSort={handleSort}
          dataValue={groupedData[data]}
          data={data}
          grid={true}
          />
        </div>
      ))}
    </>
  )
}

