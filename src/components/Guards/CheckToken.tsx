import { Navigate, Outlet } from "react-router-dom";
import { getCookie } from "../../utils/getCookie";
export const CheckToken = () => {
  let token = getCookie("finance-tracker");
  console.log(token);
  return token ? <Outlet /> : <Navigate to="/login" />;
};
