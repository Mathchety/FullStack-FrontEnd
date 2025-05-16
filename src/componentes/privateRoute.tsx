import { Navigate } from "react-router-dom";

function privateRoute({ children }: { children: JSX.Element }) {
  const token = localStorage.getItem("token");
  return token ? children : <Navigate to="/" />;
}

export default privateRoute;