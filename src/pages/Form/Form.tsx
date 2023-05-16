import React, { useState } from "react";
import "./style.css";
import { FormType, formValues } from "../models/FormTypes/Form";
import {
  months,
  years,
  transaction_type,
  accounts,
  currency,
  INITIAL_STATE,
} from "../../utils/_const";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { schema } from "../../utils/ValidationSchema";
import { Select } from "../components/FormElements/Select";
import { Input } from "../components/FormElements/Input";
import { base64 } from "../../utils/base64Converter";
import { addTransactions } from "../../reducers/transactions";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

function Form() {
  const [formState, setFormState] = useState<FormType>(INITIAL_STATE);
  const values = formState;
  const [receipt, setReceipt] = useState<string>("");
  const [imageSelected, setImageSelected] = useState<boolean>(false);
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<formValues>({ values, resolver: yupResolver(schema) });
  const onSubmit = handleSubmit((data) => {
    const newObject: FormType = {
      ...data,
      fileBase64: receipt,
      id: new Date().getTime(),
      user: "tushar",
    };
    dispatch(addTransactions(newObject));
  });

  const handleFileSelect = async (selectorFiles: FileList) => {
    let ans: string | unknown = await base64(selectorFiles[0]);
    if (ans) {
      setReceipt(ans as string);
      setImageSelected(true);
    }
  };

  const handleImageCancel = () => {
    setReceipt("");
    setImageSelected(false);
  };

  return (
    <>
      <form onSubmit={onSubmit}>
        <Input
          name="date"
          type="date"
          register={register}
          error={errors.date}
          label="Date"
        />
        <Select
          name="month"
          data={months}
          register={register}
          error={errors.month}
        />
        <Select
          name="year"
          data={years}
          register={register}
          error={errors.year}
        />
        <Select
          name="transaction_type"
          data={transaction_type}
          register={register}
          error={errors.transaction_type}
        />
        <Select
          name="from_account"
          data={accounts}
          register={register}
          error={errors.from_account}
        />
        <Select
          name="to_account"
          data={accounts}
          register={register}
          error={errors.to_account}
        />
        <Select
          name="currency"
          data={currency}
          register={register}
          error={errors.currency}
        />
        <Input
          name="amount"
          type="number"
          register={register}
          error={errors.amount}
          label="Amount:"
        />
        <Input
          name="notes"
          type="text"
          register={register}
          error={errors.notes}
          label="Notes:"
        />
        {imageSelected ? (
          <>
            <img src={receipt} alt="Oops Error" width={40} height={40} />{" "}
            <button type="button" onClick={handleImageCancel}>
              X
            </button>
            {errors && errors.fileBase64?.message}
          </>
        ) : (
          <>
            <input
              type="file"
              {...register("fileBase64", {
                onChange: (e) => handleFileSelect(e.target.files),
              })}
            />
          </>
        )}

        <button type="submit">Submit</button>
        <Link to="/">
          <button type="submit">Go to List</button>
        </Link>
      </form>
    </>
  );
}

export default Form;
