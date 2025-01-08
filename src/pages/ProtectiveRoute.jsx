import { Navigate } from "react-router-dom";
import { AppContext } from "../AppContext";
import { useContext } from "react";

const ProtectiveRoute = ({ children, employee }) => {
  const { userType } = useContext(AppContext);

  const userId = localStorage.getItem("userId");
  if (!userId || (employee && userType === "Employee")) {
    return <Navigate to="/" replace />;
  }
  return children;
};

export default ProtectiveRoute;
