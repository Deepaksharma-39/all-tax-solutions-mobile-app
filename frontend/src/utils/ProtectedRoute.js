import { useContext, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const ProtectedRoute = () => {
  const { isAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('../admin');
    }
  }, [isAuthenticated, navigate]);

  return isAuthenticated ? <Outlet /> : null; // Return null or another component when not authenticated
}

export default ProtectedRoute;
