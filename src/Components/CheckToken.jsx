import React from "react";
import { get } from "../Services/localstorage.service";
import Login from "../Pages/Authentication/Login";
import { Navigate } from "react-router-dom";

const CheckToken = () => {
  let token = get("token");
  return token ? <Navigate to="/show" /> : <Login />;
};

export default CheckToken;
