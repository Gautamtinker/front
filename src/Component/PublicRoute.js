import { Navigate } from "react-router-dom";

const PublicRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  console.log(token);
  return token ? <Navigate to="/Dashborad" replace /> : children;
};

export default PublicRoute;
