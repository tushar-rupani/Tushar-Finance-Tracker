import React, { ChangeEvent, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { FormType } from "../models/FormTypes/Form";
import Sidebar from "../../components/Sidebar/Sidebar";
import TableComponent from "../components/Table/Table";
import { ErrorBoundary } from "react-error-boundary";
import { FilterOutlined } from "@ant-design/icons";
export const List = () => {
  const data = useSelector((state: RootState) => state.transactions.value);
  const [records, setRecords] = useState<FormType[]>(data);
  const [groupBy, setGroupBy] = useState({});
  const [currentFilter, setCurrentFilter] = useState("");

  useEffect(() => {
    setRecords([...data]);
    const groupByCategory = data.reduce((group, product) => {
      const category = product[currentFilter as keyof FormType];
      (group as Record<string, FormType[]>)[category] =
        (group as Record<string, FormType[]>)[category] ?? [];
      (group as Record<string, FormType[]>)[category].push(product);
      return group;
    }, {});

    setGroupBy(groupByCategory);
  }, [data, currentFilter]);

  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    let searchTerm = e.target.value;

    const groupByCategory = data.reduce((group, product) => {
      const category = product[searchTerm as keyof FormType];
      (group as Record<string, FormType[]>)[category] =
        (group as Record<string, FormType[]>)[category] ?? [];
      (group as Record<string, FormType[]>)[category].push(product);
      return group;
    }, {});

    setGroupBy(groupByCategory);
    setCurrentFilter(searchTerm);
    setRecords([]);
  };

  const handleRemoveFilter = (e: React.MouseEvent<HTMLButtonElement>) => {
    setGroupBy({});
    setRecords(data);
    setCurrentFilter("");
  };

  return (
    <>
      <Sidebar>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
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

          {currentFilter !== "" && (
            <button
              style={{ padding: "5px", cursor: "pointer" }}
              onClick={handleRemoveFilter}
            >
              Remove <FilterOutlined />
            </button>
          )}
        </div>
        <br />
        {records.length > 0 && currentFilter === "" && (
          <>
            {" "}
            <ErrorBoundary
              fallbackRender={({ error, resetErrorBoundary }) => (
                <div role="alert" className="error">
                  <h1>Error</h1>
                  <h2>{error.toString()}</h2>
                  <button onClick={resetErrorBoundary}>Reset Error</button>
                </div>
              )}
            >
              <TableComponent items={records} label="" />
            </ErrorBoundary>
          </>
        )}

        {currentFilter !== "" &&
          Object.keys(groupBy).map((dataKey, index) => (
            <>
              <TableComponent
                items={(groupBy as Record<string, FormType[]>)[dataKey]}
                label={dataKey}
              />
            </>
          ))}
      </Sidebar>
    </>
  );
};
