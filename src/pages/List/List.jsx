import React, { useState } from "react";
import {
  loadDataFromLocal,
  addIfDoesntExists,
} from "../../services/localstorage.service";
import { TableComp } from "../../components/Table/Table";
import { Navbar } from "../Home/Navbar";
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
      return group;
    }, {});

    setGroupedData(groupByCategory);
    setCloneOfGroupBy({ ...groupByCategory });
    setDataValue([]);
  };

  const handleRemoveFilter = () => {
    setDataValue(allData);
    setGroupedData({});
  };

  // The below code handles code for searching "Grouped Data" with single search box, instead of having search box for each different table. However we are not using this anymore as Sanket Sir said.
  // eslint-disable-next-line
  const handleGroupedSearch = (e) => {
    const searchedData = {};
    let groupedSearchTerm = e.target.value.toLowerCase();
    if (groupedSearchTerm.length === 0) {
      setGroupedData(cloneOfGroupBy);
      return;
    }
    for (let key in groupedData) {
      let array = groupedData[key];
      let filteredData = array.filter((data) => {
        if (
          data.month.toLowerCase().includes(groupedSearchTerm) ||
          data.year.toLowerCase().includes(groupedSearchTerm) ||
          data.to_account.toLowerCase().includes(groupedSearchTerm) ||
          data.from_account.toLowerCase().includes(groupedSearchTerm) ||
          data.transaction_type.toLowerCase().includes(groupedSearchTerm) ||
          data.amount.toString().toLowerCase().includes(groupedSearchTerm)
        ) {
          return data;
        } else {
          return "";
        }
      });
      searchedData[key] = filteredData;
    }
    setGroupedData(searchedData);
  };

  return (
    <>
      <Navbar />
      <select
        onChange={handleChange}
        defaultValue={""}
        style={{ width: "40%" }}
      >
        <option disabled value="">
          Select Group By
        </option>
        <option value="month">Month</option>
        <option value="year">Year</option>
        <option value="transaction_type">Transaction</option>
        <option value="from_account">From Account</option>
        <option value="to_account">To Account</option>
      </select>
      {Object.keys(groupedData).length > 0 && (
        <button onClick={handleRemoveFilter}>Remove Filter</button>
      )}

      {Object.keys(groupedData).length === 0 && <TableComp data={dataValue} />}

      {Object.keys(groupedData) &&
        Object.keys(groupedData).map((data, index) => (
          <div>
            {groupedData[data].length > 0 && (
              <>
                <h2>{data}</h2>
                <TableComp data={groupedData[data]} />
              </>
            )}
          </div>
        ))}
    </>
  );
};
