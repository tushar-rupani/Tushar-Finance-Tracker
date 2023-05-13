import React, { useState, useEffect } from "react";

import { TableComp } from "../../components/Table/Table";
import { Navbar } from "../Home/Navbar";
import { useSelector } from "react-redux";
export const List = () => {

  // const { data } = useContext(GlobalContext);
  const data = useSelector((state) => state.persistedReducer.transactions.value)
  const [dataValue, setDataValue] = useState([])
  const [groupedData, setGroupedData] = useState({});
  const [cloneOfGroupBy, setCloneOfGroupBy] = useState({});
  const [search, setSearch] = useState("");
  useEffect(() => {
    setDataValue([...data])
  }, [data])

  useEffect(() => {
    const groupByCategory = data.reduce((group, product) => {
      const category = product[search];
      group[category] = group[category] ?? [];
      group[category].push(product);
      return group;
    }, {});
    setGroupedData(groupByCategory)
  }, [search, data])


  const handleChange = (e) => {
    let searchTerm = e.target.value;
    setSearch(searchTerm)
    const groupByCategory = data.reduce((group, product) => {
      const category = product[searchTerm];
      group[category] = group[category] ?? [];
      group[category].push(product);
      return group;
    }, {});

    setGroupedData(groupByCategory);
    setCloneOfGroupBy({ ...groupByCategory });
    setDataValue([]);
  };

  const handleRemoveFilter = () => {
    setDataValue(data);
    setGroupedData({});
    setSearch("")
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
      {search !== "" && (
        <button onClick={handleRemoveFilter}>Remove Filter</button>
      )}

      {search === "" && <><TableComp data={dataValue} /></>}

      {search !== "" &&
        Object.keys(groupedData).map((data, index) => (
          <div key={index}>
            {groupedData[data].length > 0 && (
              <div>
                <h2>{data}</h2>
                <TableComp data={groupedData[data]} />
              </div>
            )}
          </div>
        ))}

    </>
  );
};
