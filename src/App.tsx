import React from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Form from "./pages/Form/Form";
import { List } from "./pages/List/List";
import Transaction from "./pages/List/Transaction";
import Login from "./pages/Authentication/Login";
import { CheckToken } from "./components/Guards/CheckToken";
import { LoggedIn } from "./components/Guards/LoggedIn";
function App() {
  return (
    <Router>
      <Routes>
        <Route element={<CheckToken />}>
          <Route path="/" element={<List />} />
          <Route path="/form" element={<Form />} />
          <Route path="/form/:id" element={<Form />} />
          <Route path="/transaction/:id" element={<Transaction />} />
        </Route>
        <Route element={<LoggedIn />}>
          <Route path="/login" element={<Login />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
