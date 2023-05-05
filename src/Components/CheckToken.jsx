import React from "react";
import Login from "../Pages/Authentication/Login";
import { Navigate } from "react-router-dom";

const CheckToken = () => {
  let token = localStorage.getItem("token");
  return token ? <Navigate to="/show" /> : <Login />;
};

export default CheckToken;
