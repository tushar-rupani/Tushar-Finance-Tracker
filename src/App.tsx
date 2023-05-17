import React from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Form from "./pages/Form/Form";
import { List } from "./pages/List/List";
import ErrorBoundary from "./ErrorBoundry";
import Transaction from "./pages/List/Transaction";
function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <ErrorBoundary fallback="Error Occured">
              <List />
            </ErrorBoundary>
          }
        />
        <Route path="/form" element={<Form />} />
        <Route path="/form/:id" element={<Form />} />
        <Route path="/transaction/:id" element={<Transaction />} />
      </Routes>
    </Router>
  );
}

export default App;
