import React from "react";
import { FieldError } from "react-hook-form";

type SelectProps = {
  name: string;
  data: string[];
  error: FieldError | undefined;
  register: any;
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
