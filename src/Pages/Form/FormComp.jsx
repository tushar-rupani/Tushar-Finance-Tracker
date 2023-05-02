import React, {useEffect, useState } from "react";
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
import { addObjectToLocalStorage, editDataIntoLocal } from "../../Services/localstorage.service";
import { useNavigate } from "react-router-dom";
const FormComp = ({ dataToDisplay }) => {
  
  const INITIAL_STATE = {
    id: new Date().getTime(),
    date: "",
    month: "",
    year: "",
    transactionType: "",
    fromAccount: "",
    toAccount: "",
    currency: "",
    amount: "",
    notes: "",
    fileBase64: "",
  };
  const ERROR_STATE = {
    date: "",
    month: "",
    year: "",
    transactionType: "",
    fromAccount: "",
    toAccount: "",
    currency: "",
    amount: "",
    notes: "",
    fileBase64: "",
  }
  const navigate = useNavigate();
  let errorObj = {};
  // eslint-disable-next-line
  const [fileBase64, setFileBase64] = useState("");
  const [errors, setErrors] = useState(ERROR_STATE);
  let initialDataToShow = dataToDisplay ? dataToDisplay : INITIAL_STATE;
  let showInitialImage = dataToDisplay ? true : false
  const [formState, setFormState] = useState(initialDataToShow);
  const [imageSelected, setImageSelected] = useState(showInitialImage);

  useEffect(() => {
    if(formState.fileBase64 === ""){
      setImageSelected(false);
    }
    // eslint-disable-next-line 
  }, [])
 
  const handleOnChange = (e) => {
    let { name, value } = e.target;
    if(e.target.name === "toAccount"){
      let fromAccount = formState.fromAccount;
      if(e.target.value === fromAccount){
        setErrors((prevState) => ({...prevState, toAccount: "and From Account, Both are same"}))
      }
    }else if(e.target.name === "fromAccount"){
      let toAccount = formState.toAccount;
      if(e.target.value === toAccount){
        setErrors((prevState) => ({...prevState, fromAccount: "and To Account, Both are same"}))
      }else{
        setErrors((prevState) => ({...prevState, toAccount: "", fromAccount: ""}))
      }
    }
    
    
    if(errors[name]){
      setErrors((prev) => ({...prev, [name] : ""}))
    }
    if (name === "amount") {
      value = Number(value);
    }
    setFormState((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleFileSelect = (file) => {
    if (file.file.size > 1024 * 1024) {
      alert("File Should be less than 1MB");
      errorObj["fileBase64"] = "Images with less than 1 MB only";
      return;
    }
    if (!["image/jpeg", "image/png", "image/jpg"].includes(file.type)) {
      errorObj["fileBase64"] = "Only images are allowed";
      return;
    }
    setImageSelected(true);
    setFileBase64(file.base64);
    setFormState((prevState) => ({ ...prevState, fileBase64: file.base64 }));
  };
  const handleSubmit = async (e, text) => {
    e.preventDefault();
    Object.keys(formState).forEach((data) => {
      if (data === "fileBase64") return;
      if (formState[data] === "") {
        errorObj[data] = "is required";
      }
      if(formState["fromAccount"] === formState["toAccount"]){
        errorObj["toAccount"] = "and From account can not be the same"
      }
    });
    setErrors(errorObj);
    if (Object.keys(errorObj).length === 0) {
      if(dataToDisplay){
        editDataIntoLocal(formState.id, formState)
        navigate("/show")
        return
      }
      await addObjectToLocalStorage(formState);
      setFormState(INITIAL_STATE);
      navigate("/show")
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form-add">
      <div>
        <label>Date: </label>
        <input
          type="date"
          name="date"
          onChange={handleOnChange}
          defaultValue={
            formState?.date !== "" &&
            new Date(formState.date).toISOString().slice(0, 10)
          }
        />

        {errors.date && <span>Date {errors.date}</span>}
      </div>
      <div>
        <select name="month" value={formState.month} onChange={handleOnChange}>
          <InitialOption params="Month" />
          {months.map((month, index) => (
            <Option key={index} value={month} myKey={index} />
          ))}
        </select>
        {errors.month && <span>Month {errors.month}</span>}
        <select name="year" value={formState.year} onChange={handleOnChange}>
          <InitialOption params="Year" />
          {years.map((year, index) => (
            <Option value={year} key={index} myKey={index} />
          ))}
        </select>
        {errors.year && <span>Year {errors.year}</span>}
        <select
          name="transactionType"
          value={formState.transactionType}
          onChange={handleOnChange}
        >
          <InitialOption params="Transaction" />
          {transaction_type.map((transaction, index) => (
            <Option key={index} value={transaction} myKey={index} />
          ))}
        </select>
        {errors.transactionType && (
          <span>Transaction {errors.transactionType}</span>
        )}
      </div>

      <div>
        <select
          name="fromAccount"
          value={formState.fromAccount}
          onChange={handleOnChange}
        >
          <InitialOption params="From Account" />
          {accounts.map((accs, index) => (
            <Option value={accs} key={index} myKey={index} />
          ))}
        </select>
        {errors.fromAccount && <span>From Account {errors.fromAccount}</span>}
        <select
          name="toAccount"
          value={formState.toAccount}
          onChange={handleOnChange}
        >
          <InitialOption params="To Account" />
          {accounts.map((accs, index) => (
            <Option value={accs} key={index} myKey={index} />
          ))}
        </select>
        {errors.toAccount && <span>To Account {errors.toAccount}</span>}
      </div>

      <div>
        <select
          name="currency"
          onChange={handleOnChange}
          value={formState.currency}
        >
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
          value={formState.amount}
        />
        {errors.amount && <span>Amount {errors.amount}</span>}
        <br />
        <br />
      </div>
      <label>Notes: </label>
      <textarea
        name="notes"
        onChange={handleOnChange}
        value={formState.notes}
      ></textarea>
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
          <br />
          <br />
          {errors.fileBase64 && <span>{errors.fileBase64}</span>}
          <br />
          <br />
        </div>
      )}
      {imageSelected && (
        <div>
          <img
            src={formState.fileBase64}
            alt="Error in loading"
            width={200}
            height={200}
          />
          <button
            type="button"
            onClick={() => setImageSelected((prev) => !prev)}
          >
            X
          </button>
        </div>
      )}
      <input type="submit" value="Submit" />
    </form>
  );
};

export default FormComp;
