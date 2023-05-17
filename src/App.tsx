import React from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Form from "./pages/Form/Form";
import { List } from "./pages/List/List";
import ErrorBoundary from "./ErrorBoundry";
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
      </Routes>
    </Router>
  );
}

export default App;
