import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../context/auth";
// import ErrorFullPage from "../pages/errors/ErrorFullPage";

const ProtectedRoutes = ({ children }) => {

  const { user } = useContext(AuthContext) // La función getUser() devuelve el usuario si está logueado o null si no lo está.
  const location = useLocation();

  // Captura el primer valor de la ruta
  let pathAllowed = location.pathname.split("/");
  pathAllowed = pathAllowed[0] === '' ? pathAllowed[1] : pathAllowed[0];

  if (!user) {
    return <Navigate to="/login" />;
  }

  // Definición de Roles
  const { rol } = user;

  if (pathAllowed !== "order" && rol === "mesero") {
    return<>error</>;
  }

  if (pathAllowed !== "retail" && rol === "tendero") {
    return<>error</>;
  }

  return children;
};

export default ProtectedRoutes;