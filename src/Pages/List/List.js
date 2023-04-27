import React, { useState } from 'react'
import { loadDataFromLocal } from '../../Services/localstorage.service'
import { TableComp } from '../../Components/Table';
import { Navbar } from '../Home/Navbar';
import { addIfDoesntExists } from '../../Services/localstorage.service';
export const List = () => {
  let allData = loadDataFromLocal();
  let [dataValue, setDataValue] = useState(allData);
  addIfDoesntExists()
  const [sortedOrder, setSortedOrder] = useState("desc");
  let [groupedData, setGroupedData] = useState({});
  let handleSort = (title, grid = false, data = "") => {
    let sortedData;
    let groupSortData;
    if (!grid) {
      if (title === "amount") {
        sortedData = [...dataValue].sort((d1, d2) => {
          if (sortedOrder === "asc") {
            return d1[title] - d2[title];
          } else {
            return d2[title] - d1[title];
          }
        });
      } else {
        sortedData = [...dataValue].sort((d1, d2) => {
          if (sortedOrder === "asc") {
            return d1[title].localeCompare(d2[title])
          } else {
            return d2[title].localeCompare(d1[title])
          }
        });
      }
      setSortedOrder(sortedOrder === "asc" ? "desc" : "asc");
      setDataValue(sortedData);
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
  const handleRemoveFilter = () => {
    setDataValue(allData);
    setGroupedData({})
  }
  return (
    <>
      <Navbar />
      <select onChange={handleChange} defaultValue={"basic"}>
        <option disabled value="basic">Select Group By</option>
        <option value="month">Month</option>
        <option value="year">Year</option>
        <option value="transaction">Transaction</option>
        <option value="from_account">From Account</option>
        <option value="to_account">To Account</option>
      </select>
      {Object.keys(groupedData).length > 0 && <button onClick={handleRemoveFilter}>Remove Filter</button>}

      {dataValue.length > 0 && <TableComp handleSort={handleSort} dataValue = {dataValue} data = "" grid={false}  />}
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

