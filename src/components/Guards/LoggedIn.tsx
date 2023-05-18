import React from "react";
import { getCookie } from "../../utils/getCookie";
import { Navigate, Outlet } from "react-router-dom";
export const LoggedIn = () => {
  let token = getCookie("finance-tracker");

  return token ? <Navigate to="/" /> : <Outlet />;
};
