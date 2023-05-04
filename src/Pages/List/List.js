import React, { useEffect, useState } from 'react'
import { loadDataFromLocal } from '../../Services/localstorage.service'
import { TableComp } from '../../components/Table';
import { Navbar } from '../Home/Navbar';
import { addIfDoesntExists } from '../../Services/localstorage.service';
export const List = () => {
  addIfDoesntExists();
  let allData = loadDataFromLocal();
  let [dataValue, setDataValue] = useState([...allData]);
  let [groupedData, setGroupedData] = useState({});
  let [cloneOfGroupBy, setCloneOfGroupBy] = useState({});
  const handleChange = (e) => {
    let search = e.target.value;
    const groupByCategory = allData.reduce((group, product) => {
      const category = product[search];
      group[category] = group[category] ?? [];
      group[category].push(product);
      return group
    }, {})

    setGroupedData(groupByCategory);
    setCloneOfGroupBy({...groupByCategory})
    setDataValue([])
  }

  const handleRemoveFilter = () => {
    setDataValue(allData);
    setGroupedData({})
  }

  const handleGroupedSearch = (e) => {
    const searchedData = {};
    let groupedSearchTerm = e.target.value.toLowerCase();
    if(groupedSearchTerm.length === 0) {
      setGroupedData(cloneOfGroupBy)
      return
    }
    for (let key in groupedData) {
      let array = groupedData[key]
      let filteredData = array.filter((data) => {
        if (data.month.toLowerCase().includes(groupedSearchTerm) ||
          data.year.toLowerCase().includes(groupedSearchTerm) ||
          data.toAccount.toLowerCase().includes(groupedSearchTerm) ||
          data.fromAccount.toLowerCase().includes(groupedSearchTerm) ||
          data.transactionType.toLowerCase().includes(groupedSearchTerm) ||
          data.amount.toString().toLowerCase().includes(groupedSearchTerm)) {
          return data
        } else {
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
      { Object.keys(groupedData).length !== 0 && <input type='text' placeholder='Enter Group Search..' onChange={handleGroupedSearch} style={{ margin: "20px", padding: "10px" }} /> }
      <select onChange={handleChange} defaultValue={""} style={{ width: "40%" }}>
        <option disabled value="">Select Group By</option>
        <option value="month">Month</option>
        <option value="year">Year</option>
        <option value="transactionType">Transaction</option>
        <option value="fromAccount">From Account</option>
        <option value="toAccount">To Account</option>
      </select>
      {Object.keys(groupedData).length > 0 && <button onClick={handleRemoveFilter}>Remove Filter</button>}

      {Object.keys(groupedData).length === 0 && <TableComp dataValue={dataValue} setDataValue={setDataValue} group={false} />}

      {Object.keys(groupedData) && Object.keys(groupedData).map((data, index) => (
        <div>
          {groupedData[data].length > 0 &&
            <>
              <h2>{data}</h2>
              <TableComp
                dataValue={groupedData[data]}
                setDataValue={setDataValue}
                group = {true}
              />
            </>
          }
        </div>
      ))}
    </>
  )
}

