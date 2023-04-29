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
  errors
}) => {
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Date: </label>
        <input type="date" name="date" onChange={handleOnChange} />
        {errors.date && "Date " + errors.date}
      </div>
      <div>
        <select name="month" defaultValue={""} onChange={handleOnChange}>
          <InitialOption params="Month" />
          {months.map((month, index) => (
            <Option key={index} value={month} myKey={index}/>
          ))}
        </select>
          {errors.month && "Month " + errors.month}
        <select name="year" defaultValue={""} onChange={handleOnChange}>
          <InitialOption params="Year" />
          {years.map((year, index) => (
            <Option value={year} key={index} myKey={index}/>
          ))}
        </select>
        {errors.year && "Year " + errors.year}
        <select
          name="transactionType"
          defaultValue={""}
          onChange={handleOnChange}
          >
          <InitialOption params="Transaction" />
          {transaction_type.map((transaction, index) => (
            <Option key={index} value={transaction} myKey={index} />
            ))}
        </select>
            {errors.transactionType && "Transaction " + errors.transactionType}
      </div>

      <div>
        <select name="fromAccount" defaultValue={""} onChange={handleOnChange}>
          <InitialOption params="From Account" />
          {accounts.map((accs, index) => (
            <Option value={accs} key={index} myKey={index} />
          ))}
        </select>
        {errors.fromAccount && "From Account " + errors.fromAccount}
        <select name="toAccount" defaultValue={""} onChange={handleOnChange}>
          <InitialOption params="To Account" />
          {accounts.map((accs, index) => (
            <Option value={accs} key={index} myKey={index}/>
          ))}
        </select>
        {errors.toAccount && "To Account " + errors.toAccount}
      </div>

      <div>
        <select name="currency" onChange={handleOnChange}> 
          <InitialOption params="Currency" />
          {currency.map((cur, index) => (
            <Option value={cur} key={index} myKey={index} />
          ))}
        </select>
        <br />
        <label>Amount: </label>
        <input
          type="number"
          name="amount"
          placeholder="Enter expenses"
          onChange={handleOnChange}
        />
         {errors.amount && "Amount " + errors.amount}
         <br /><br />
      </div>
      <label>Notes: </label>
      <textarea name="notes" onChange={handleOnChange}></textarea>
      {errors.notes && <span>"Notes" {errors.notes}</span>}
      <br />
      <br />

      {!imageSelected && (
        <div>
        <Filebase
          type="file"
          name="fileBase64"
          multiple={false}
          onDone={handleFileSelect}
        />
        <br /><br />
        {errors.fileBase64 && errors.fileBase64}
        <br /><br />
        </div>
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
