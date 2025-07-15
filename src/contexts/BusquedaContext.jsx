import { createContext, useContext, useState } from "react";

// Contexto para manejar la búsqueda global en la app
const BusquedaContext = createContext();

// Hook para usar la búsqueda en cualquier componente
export function useBusquedaContext() {
  return useContext(BusquedaContext);
}

// Provider que guarda el estado de la búsqueda y lo comparte
export function BusquedaProvider({ children }) {
  const [busqueda, setBusqueda] = useState(""); // Texto que el usuario escribe para buscar

  return (
    <BusquedaContext.Provider value={{ busqueda, setBusqueda }}>
      {children}
    </BusquedaContext.Provider>
  );
}