import React from "react";
import Login from "../../pages/Authentication/Login";
import { Navigate } from "react-router-dom";

const CheckToken = () => {
  let token = localStorage.getItem("token");
  return token ? <Navigate to="/show" /> : <Login />;
};

export default CheckToken;
