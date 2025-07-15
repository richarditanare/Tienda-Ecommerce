import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { CarritoProvider } from "./contexts/CarritoContext.jsx";
import { AuthProvider } from "./contexts/AuthContext.jsx";
import { ProductosProvider } from "./components/ProductosContext.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import AOS from "aos";
import "aos/dist/aos.css";
import { BusquedaProvider } from "./contexts/BusquedaContext";

// Inicializar AOS
AOS.init();

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BusquedaProvider>
      <ProductosProvider>
        <AuthProvider>
          <CarritoProvider>
            <App />
          </CarritoProvider>
        </AuthProvider>
      </ProductosProvider>
    </BusquedaProvider>
  </StrictMode>
);
