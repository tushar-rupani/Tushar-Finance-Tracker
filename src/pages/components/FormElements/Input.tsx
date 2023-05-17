import { UseFormRegister, FieldError } from "react-hook-form";
import { formValues } from "../../models/FormTypes/Form";
type InputProps = {
  name:
    | "date"
    | "month"
    | "year"
    | "transaction_type"
    | "from_account"
    | "to_account"
    | "currency"
    | "amount"
    | "notes";
  type: string;
  register: UseFormRegister<formValues>;
  error: FieldError | undefined;
  label: string;
};

export const Input = ({ name, type, register, error, label }: InputProps) => {
  return (
    <div>
      <br />
      <label>{label} </label>
      <br />
      <input {...register(name)} type={type} name={name} />
      <div style={{ color: "red" }}>{error && error.message}</div>
    </div>
  );
};
