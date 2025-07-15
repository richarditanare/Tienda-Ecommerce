import React, { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../auth/firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";

// Contexto para manejar la autenticación y permisos de usuario
const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null); // Email del usuario logueado o null
  const [admin, setAdmin] = useState(false); // Si el usuario es admin o no
  const [loading, setLoading] = useState(true); // Para saber si Firebase ya respondió

  // Escucho cambios en el estado de autenticación de Firebase
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (usuario) => {
      if (usuario) {
        setUser(usuario.email);
        setAdmin(usuario.email === "admin@gmail.com"); // Solo este email es admin
      } else {
        setUser(null);
        setAdmin(false);
      }
      setLoading(false); // Ya terminó la carga
    });
    return () => unsubscribe(); // Limpio el listener al desmontar
  }, []);

  // Función para cerrar sesión y limpiar el carrito local
  const logout = () => {
    localStorage.removeItem("carrito");
    signOut(auth);
  };

  return (
    <AuthContext.Provider value={{ user, admin, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

// Hook para usar este contexto en cualquier componente
export function useAuthContext() {
  return useContext(AuthContext);
}