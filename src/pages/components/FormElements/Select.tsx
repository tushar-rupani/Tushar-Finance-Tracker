import React from "react";
import { FieldError, UseFormRegister } from "react-hook-form";
import { formValues } from "../../models/FormTypes/Form";

type SelectProps = {
  name:
    | "date"
    | "month"
    | "year"
    | "transaction_type"
    | "from_account"
    | "to_account"
    | "currency"
    | "amount"
    | "notes"
    | "fileBase64";
  data: string[];
  error: FieldError | undefined;
  register: UseFormRegister<formValues>;
};

export const Select = ({ name, register, data, error }: SelectProps) => {
  return (
    <>
      <select {...register(name)}>
        <option value={""}>Select {name}</option>
        {data.map((element, index) => (
          <option key={index} value={element}>
            {element}
          </option>
        ))}
      </select>
      <span style={{ color: "red" }}>{error && error.message}</span>
      <br />
    </>
  );
};
