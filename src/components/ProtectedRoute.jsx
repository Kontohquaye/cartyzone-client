import { useContext } from "react";
import { Store } from "../services/Store";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const {
    state: { userInfo },
  } = useContext(Store);
  return userInfo.username && userInfo.token ? (
    children
  ) : (
    <Navigate to={"/account/signin"} />
  );
};

export default ProtectedRoute;
