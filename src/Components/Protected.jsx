import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const Protected = () => {
  let token = localStorage.getItem("token");
  return token ? <Outlet /> : <Navigate to="/" />;
};

export default Protected;
