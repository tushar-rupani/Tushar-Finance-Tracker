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
const records = [{id:1683609404905,user:"tushar",date:"2023-05-26",month:"February",year:"2024", transaction_type:"Personal Expenses",from_account:"My Dream Home",to_account:"Real Living",currency:"₹",amount:5645,notes:"regr", fileBase64: ""},

{id:1683609404906,user:"tushar",date:"2023-05-26",month:"March",year:"2024", transaction_type:"Personal Expenses",from_account:"My Dream Home",to_account:"Real Living",currency:"₹",amount:5645,notes:"Test By Tushar", fileBase64: ""}, 

{id:1683609404907,user:"tushar",date:"2023-05-28",month:"March",year:"2025", transaction_type:"Personal Expenses",from_account:"My Dream Home",to_account:"Real Living",currency:"₹",amount:5645,notes:"Test By Jayesyh", fileBase64: ""}
]

export {months, years, transaction_type, accounts, currency, imageType, records, INITIAL_STATE}
