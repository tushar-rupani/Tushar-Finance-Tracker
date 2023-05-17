import Sidebar from "../../components/Sidebar/Sidebar";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { useParams } from "react-router-dom";
import { FormType } from "../models/FormTypes/Form";
import { ErrorBoundary } from "react-error-boundary";
import CardComponent from "./Card";

export const Transaction = () => {
  const data = useSelector((state: RootState) => state.transactions.value);
  const { id } = useParams();

  const dataToShow = data.find(
    (data: FormType) => data.id === parseInt(id ?? "")
  );

  return (
    <Sidebar>
      <ErrorBoundary
        fallbackRender={({ error, resetErrorBoundary }) => (
          <div role="alert" className="error">
            <h1>Error</h1>
            <h2>{error.toString()}</h2>
            <button onClick={resetErrorBoundary}>Reset Error</button>
          </div>
        )}
      >
        {dataToShow ? (
          <CardComponent dataToShow={dataToShow} />
        ) : (
          "Could not found the transaction!"
        )}
      </ErrorBoundary>
    </Sidebar>
  );
};

export default Transaction;
