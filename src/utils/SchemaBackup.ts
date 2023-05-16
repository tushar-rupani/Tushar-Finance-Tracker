import * as Yup from "yup";
import { imageType } from "./_const";
export const schema = Yup.object().shape({
  date: Yup.string().required("Date is required!"),
  month: Yup.string().required("Month is Required"),
  year: Yup.string().required("Year is Required"),
  transaction_type: Yup.string().required("Transaction Type is Required"),
  from_account: Yup.string().required("From Account is Required!"),
  to_account: Yup.string()
    .notOneOf([Yup.ref("from_account")])
    .required("To Account Required"),
  amount: Yup.number()
    .min(1, "Should be Greater than 1")
    .max(10000, "Should not be greater than 10000")
    .required("Amount is required"),
  notes: Yup.string().required("Note is required"),
  currency: Yup.string().required("Currency is required"),
  fileBase64: Yup.mixed<FileList>().test(
    "fileType",
    "File is Greater than 1 MB",
    (files) =>
      !files || // Check if `files` is defined
      files.length === 0 || // Check if `files` is not an empty list
      Array.from(files).every((file) => file.size <= 1024 * 1024)
  ),
});
