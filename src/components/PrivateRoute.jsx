import { Navigate, Outlet } from "react-router-dom";
import useGetAuthStatus from "../hooks/useGetAuthStatus";

function PrivateRoute() {
  const { logged, checkStatus } = useGetAuthStatus();

  if(checkStatus){
    return (<h3>Loading ...</h3>)
  }

  return logged ? <Outlet /> : <Navigate to="/sign-in" />;
}

export default PrivateRoute;
