import { Navigate, useNavigate } from "react-router-dom";
import { useAuthContext } from "../contexts/AuthContext.jsx";

// Componente de la página de administración
// Solo se puede ver si el usuario está logueado
export default function Admin() {
  const navigate = useNavigate();
  const { user, logout } = useAuthContext();

  // Si no hay usuario logueado, mando a la página de login
  if (!user) {
    return <Navigate to={"/login"} replace />;
  }

  // Manejo de sesión
  // Cuando el admin hace click en "Cerrar Sesión"
  const handleLogout = (e) => {
    e.preventDefault();
    logout();      // Cierra la sesión del usuario
    navigate("/"); // Redirige al home
  };

  return (
    <form onSubmit={handleLogout}>
      <h1>Usted ha iniciado sesión como Admin</h1>
      <h2>Bienvenido</h2>
      <button type="submit">Cerrar Sesión</button>
    </form>
  );
}