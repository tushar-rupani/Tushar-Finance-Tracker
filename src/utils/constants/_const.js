const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const years = [2023, 2024, 2025];
const transaction_type = ["Home Expenses", "Personal Expenses", "Income"];
const accounts = ["Personal Account", "Real Living", "My Dream Home", "Full Circle", "Core Realtors", "Big Block"];
const currency = ["$", "₹", "¥"];
const imageType = ["image/png", "image/jpeg", "image/jpg"]
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
    amount: "",
    notes: "",
    fileBase64: "",
};
const records = JSON.parse(localStorage.getItem('expense-data'))

export {months, years, transaction_type, accounts, currency, imageType, records, INITIAL_STATE}
