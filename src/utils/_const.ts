const months: string[] = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const years: string[] = ["2023", "2024", "2025"];
const transaction_type: string[] = [
  "Home Expenses",
  "Personal Expenses",
  "Income",
];
const accounts: string[] = [
  "Personal Account",
  "Real Living",
  "My Dream Home",
  "Full Circle",
  "Core Realtors",
  "Big Block",
];
const currency: string[] = ["$", "₹", "¥"];
const imageType: string[] = ["image/png", "image/jpeg", "image/jpg"];

const INITIAL_STATE = {
  id: new Date().getTime(),
  user: "tushar",
  date: "",
  month: "",
  year: "",
  transaction_type: "",
  from_account: "",
  to_account: "",
  currency: "",
  amount: 0,
  notes: "",
  fileBase64: "",
};
const records: string = JSON.parse(
  localStorage.getItem("expense-data") || "[]"
);

export {
  months,
  years,
  transaction_type,
  accounts,
  currency,
  imageType,
  records,
  INITIAL_STATE,
};
