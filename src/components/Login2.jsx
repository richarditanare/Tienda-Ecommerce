import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../contexts/AuthContext";
import { crearUsuario, loginEmailPass } from "../auth/firebase";
import { toast } from "react-toastify";
import { FiMail, FiLock, FiEye, FiEyeOff, FiUser } from "react-icons/fi";

function Login2() {
  const [usuario, setUsuario] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLogin, setIsLogin] = useState(true);

  const { login, user, logout, admin } = useAuthContext();
  const navigate = useNavigate();

  const handleTogglePassword = (e) => {
    e.preventDefault();
    setShowPassword(!showPassword);
  };

  function registrarUsuario(e) {
    e.preventDefault();
    crearUsuario(usuario, password)
      .then(() => {
        toast.success("Te has registrado correctamente", { position: "top-right", autoClose: 2000 });
      })
      .catch((error) => {
        if (error.code === "auth/email-already-in-use") {
          toast.error("El correo ya está registrado", { position: "top-right", autoClose: 2000 });
        } else if (error.code === "auth/weak-password") {
          toast.error("La contraseña debe tener al menos 6 caracteres", { position: "top-right", autoClose: 2000 });
        } else {
          toast.error(`Error: ${error.message}`, { position: "top-right", autoClose: 2000 });
        }
      });
  }

  function iniciarSesionEmailPass(e) {
    e.preventDefault();
    loginEmailPass(usuario, password)
      .then(() => {
        toast.success("Has iniciado sesión correctamente", { position: "top-right", autoClose: 2000 });
        setTimeout(() => navigate("/"), 2100); // espera para mostrar toast antes de redirigir
      })
      .catch((error) => {
        if (error.code === "auth/invalid-credential" || error.code === "auth/user-not-found") {
          toast.error("Clave o usuario incorrecto", { position: "top-right", autoClose: 2000 });
        } else {
          toast.error(`Error: ${error.message}`, { position: "top-right", autoClose: 2000 });
        }
      });
  }

  const handleLogout = (e) => {
    e.preventDefault();
    logout();
    localStorage.removeItem("authToken");
    toast.success("Has cerrado sesión correctamente", { position: "top-right", autoClose: 2000 });
  };

  if (user) {
    const telefonoSimulado = "+54 11 1234 5678";
    const infoSimulada = "Dirección: Calle Falsa 123, Buenos Aires";

    return (
      <div className="container my-5 d-flex justify-content-center">
        <div
          className="bg-light border border-secondary rounded p-4 text-center"
          style={{ maxWidth: "400px", width: "100%" }}
        >
          {/* Avatar */}
          <div className="mb-3 d-flex justify-content-center">
            <div
              className="bg-light rounded-circle d-flex justify-content-center align-items-center"
              style={{ width: 120, height: 120 }}
            >
              <FiUser size={120} className="text-secondary" />
            </div>
          </div>

          {/* Etiqueta de rol */}
          <div className="mb-2">
            <span className={`badge ${admin ? "bg-success" : "bg-primary"}`}>
              {admin ? "Admin" : "Usuario"}
            </span>
          </div>

          <h2 className="fw-bold mb-3">Sesión iniciada</h2>
          <p className="fs-5">Bienvenido, has iniciado sesión correctamente.</p>

          <div className="text-start mb-3">
            <p><strong>Correo:</strong> {user}</p>
            <p><strong>Teléfono:</strong> {telefonoSimulado}</p>
            <p><strong>Información adicional:</strong> {infoSimulada}</p>
          </div>

          <button
            className="btn btn-danger mt-3 w-100 fw-bold"
            onClick={handleLogout}
          >
            Cerrar sesión
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container my-5 d-flex justify-content-center">
      <div
        className="bg-light border border-secondary rounded p-4"
        style={{ maxWidth: "400px", width: "100%" }}
      >
        <h2 className="fw-bold mb-3 text-center">{isLogin ? "Iniciar Sesión" : "Registrarse"}</h2>
        <form onSubmit={isLogin ? iniciarSesionEmailPass : registrarUsuario}>
          <div className="mb-3">
            <label className="form-label fw-bold">Email:</label>
            <div className="input-group">
              <span className="input-group-text">
                <FiMail />
              </span>
              <input
                type="email"
                className="form-control"
                placeholder="ejemplo@email.com"
                value={usuario}
                onChange={(e) => setUsuario(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="mb-3">
            <label className="form-label fw-bold">Contraseña:</label>
            <div className="input-group">
              <span className="input-group-text">
                <FiLock />
              </span>
              <input
                type={showPassword ? "text" : "password"}
                className="form-control"
                placeholder="Tu contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                className="btn btn-outline-secondary"
                type="button"
                onClick={handleTogglePassword}
              >
                {showPassword ? <FiEyeOff /> : <FiEye />}
              </button>
            </div>
          </div>
          <button type="submit" className="btn btn-primary w-100">
            {isLogin ? "Iniciar Sesión" : "Registrarse"}
          </button>
        </form>
        <button
          className="btn btn-success w-100 mt-2"
          onClick={() => setIsLogin(!isLogin)}
        >
          {isLogin ? "¿No tienes cuenta? Regístrate" : "¿Ya tienes cuenta? Inicia Sesión"}
        </button>
      </div>
    </div>
  );
}

export default Login2;
