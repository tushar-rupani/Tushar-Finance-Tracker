import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { FormType } from "../models/FormTypes/Form";
import Sidebar from "../../components/Sidebar/Sidebar";
import TableComponent from "../components/Table/Table";
import { ErrorBoundary } from "react-error-boundary";
export const List = () => {
  const data = useSelector((state: RootState) => state.transactions.value);
  const [records, setRecords] = useState<FormType[]>(data);

  useEffect(() => {
    setRecords([...data]);
  }, [data]);

  return (
    <>
      <Sidebar>
        {records.length > 0 ? (
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
              <TableComponent items={records} />
            </ErrorBoundary>
          </>
        ) : (
          "No Records Found!"
        )}
      </Sidebar>
    </>
  );
};
