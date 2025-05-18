import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import authService from "../services/authService";

function PrivateRoute({ children }: { children: JSX.Element }) {
  const [isValidating, setIsValidating] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const validateToken = async () => {
      const isValid = await authService.verifyToken();
      setIsAuthenticated(isValid);
      setIsValidating(false);
    };

    validateToken();
  }, []);

  if (isValidating) {
    // Exibe um loading enquanto verifica o token
    return <div className="flex justify-center items-center h-screen">Carregando...</div>;
  }

  return isAuthenticated ? children : <Navigate to="/" />;
}

export default PrivateRoute;