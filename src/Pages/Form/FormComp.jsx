import React from "react";
import {
  months,
  years,
  transaction_type,
  accounts,
  currency,
} from "../../Constants/_const";
import Filebase from "react-file-base64";
import { InitialOption } from "../Form/InitialOption";
import { Option } from "../Form/Option";
const FormComp = ({
  handleSubmit,
  handleOnChange,
  handleFileSelect,
  imageSelected,
  setImageSelected,
  fileBase64,
}) => {
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Date: </label>
        <input type="date" name="date" onChange={handleOnChange} />
      </div>
      <div>
        <select name="month" defaultValue={""} onChange={handleOnChange}>
          <InitialOption params="Month" />
          {months.map((month, index) => (
            <Option key={index} value={month} />
          ))}
        </select>

        <select name="year" defaultValue={""} onChange={handleOnChange}>
          <InitialOption params="Year" />
          {years.map((year) => (
            <Option value={year} />
          ))}
        </select>
        <select
          name="transactionType"
          defaultValue={""}
          onChange={handleOnChange}
        >
          <InitialOption params="Transaction" />
          {transaction_type.map((transaction, index) => (
            <Option key={index} value={transaction} />
          ))}
        </select>
      </div>

      <div>
        <select name="fromAccount" defaultValue={""} onChange={handleOnChange}>
          <InitialOption params="From Account" />
          {accounts.map((accs) => (
            <Option value={accs} />
          ))}
        </select>

        <select name="toAccount" defaultValue={""} onChange={handleOnChange}>
          <InitialOption params="To Account" />
          {accounts.map((accs) => (
            <Option value={accs} />
          ))}
        </select>
      </div>

      <div>
        <select name="currency" onChange={handleOnChange} defaultValue={""}>
          <InitialOption params="Currency" />
          {currency.map((cur) => (
            <Option value={cur} />
          ))}
        </select>
        <label>Amount: </label>
        <input
          type="number"
          name="amount"
          placeholder="Enter expenses"
          onChange={handleOnChange}
        />
      </div>
      <label>Notes: </label>
      <textarea name="notes" onChange={handleOnChange}></textarea>
      <br />
      <br />
      {!imageSelected && (
        <Filebase
          type="file"
          name="fileBase64"
          multiple={false}
          onDone={handleFileSelect}
        />
      )}
      {imageSelected && (
        <div>
          <img
            src={fileBase64}
            alt="Error in loading"
            width={200}
            height={200}
          />
          <button onClick={() => setImageSelected((prev) => !prev)}>X</button>
        </div>
      )}
      <input type="submit" value="Submit" />
    </form>
  );
};

export default FormComp;
