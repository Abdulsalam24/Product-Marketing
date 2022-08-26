import { Navigate, Outlet } from "react-router-dom";
import useGetAuthStatus from "../hooks/useGetAuthStatus";
import Spinner from "./Spinner";

function PrivateRoute() {
  const { logged, checkStatus } = useGetAuthStatus();

  if (checkStatus) {
    return <Spinner />;
  }

  return logged ? <Outlet /> : <Navigate to="/sign-in" />;
}

export default PrivateRoute;
