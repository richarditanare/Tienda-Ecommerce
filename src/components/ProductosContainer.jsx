import "../styles/Productos.css";
import Card from "./Card";
import { useEffect, useState } from "react";
import { useProductosContext } from "./ProductosContext";
import { useBusquedaContext } from "../contexts/BusquedaContext";
import { Helmet } from "react-helmet";

// Componente que muestra la lista completa de productos con paginación y búsqueda
function ProductosContainer() {
  const { productos, obtenerProductos } = useProductosContext();
  const { busqueda } = useBusquedaContext();
  const [error, setError] = useState(null);
  const [cargando, setCargando] = useState(true);

  // Paginador
  const productosPorPagina = 8; // 4 columnas x 2 filas en pantalla grande
  const [paginaActual, setPaginaActual] = useState(1);

  // Cargo los productos cuando el componente carga
  useEffect(() => {
    obtenerProductos()
      .then(() => setCargando(false))
      .catch((error) => {
        console.error("Error al cargar los productos:", error);
        setError("Hubo un problema al cargar los productos");
        setCargando(false);
      });
  }, []);

  if (cargando) {
    return <div className="text-center mt-5">Cargando productos...</div>;
  }

  if (error) {
    return <div className="text-center mt-5 text-danger">Error: {error}</div>;
  }

  // Buscador
  const productosFiltrados = productos.filter(
    (producto) =>
      typeof producto.nombre === "string" &&
      producto.nombre
        .toLowerCase()
        .includes((busqueda || "").toLowerCase().trim())
  );

  // Cálculo cuántas páginas hay en total
  const totalPaginas = Math.ceil(
    productosFiltrados.length / productosPorPagina
  );

  // Índices para sacar los productos que se muestran en la página actual
  const indiceUltimoProducto = paginaActual * productosPorPagina;
  const indicePrimerProducto = indiceUltimoProducto - productosPorPagina;
  const productosActuales = productosFiltrados.slice(
    indicePrimerProducto,
    indiceUltimoProducto
  );

  // Cambiar de página y hacer scroll hacia arriba para que se vea bien
  const cambiarPagina = (nuevaPagina) => {
    if (nuevaPagina >= 1 && nuevaPagina <= totalPaginas) {
      setPaginaActual(nuevaPagina);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  // Renderizado de paginador
  const renderPaginador = () => (
    <div
      style={{
        borderRadius: 8,
        padding: 12,
        margin: "24px auto 0 auto",
        display: "flex",
        justifyContent: "center",
        boxShadow: "0 1px 8px 0 rgba(60,60,60,0.02)",
      }}
    >
      {/* Botón Anterior */}
      <button
        className="btn btn-link mx-1"
        style={{
          color: paginaActual === 1 ? "#adb5bd" : "#338af3",
          textDecoration: "none",
          fontWeight: 500,
          cursor: paginaActual === 1 ? "not-allowed" : "pointer",
        }}
        onClick={() => cambiarPagina(paginaActual - 1)}
        disabled={paginaActual === 1}
      >
        {"< Anterior"}
      </button>

      {/* Botones de número de página */}
      {Array.from({ length: totalPaginas }, (_, index) => (
        <button
          key={index + 1}
          onClick={() => cambiarPagina(index + 1)}
          className={`mx-1 paginador-btn`}
          style={{
            border:
              paginaActual === index + 1
                ? "2px solid #338af3"
                : "1px solid #d1d5db",
            background: "#fff",
            color: "#222",
            borderRadius: 6,
            minWidth: 40,
            height: 38,
            fontWeight: paginaActual === index + 1 ? 700 : 500,
            outline: paginaActual === index + 1 ? "none" : undefined,
            boxShadow:
              paginaActual === index + 1 ? "0 0 0 2px #e6f0fa" : undefined,
            cursor: "pointer",
          }}
        >
          {index + 1}
        </button>
      ))}

      {/* Botón Siguiente */}
      <button
        className="btn btn-link mx-1"
        style={{
          color: paginaActual === totalPaginas ? "#adb5bd" : "#338af3",
          textDecoration: "none",
          fontWeight: 500,
          cursor: paginaActual === totalPaginas ? "not-allowed" : "pointer",
        }}
        onClick={() => cambiarPagina(paginaActual + 1)}
        disabled={paginaActual === totalPaginas}
      >
        {"Siguiente >"}
      </button>
    </div>
  );

  return (
    <div className="container">
      {/* Título de la página en pestaña del navegador */}
      <Helmet>
        <title>Productos | Mi Tienda</title>
      </Helmet>
      <h2 className="my-4 text-center">Todos los Productos</h2>
      <div className="row">
        {/* Si no hay productos después de filtrar */}
        {productosActuales.length === 0 ? (
          <div className="text-center my-5">
            <h5>No se encontraron productos.</h5>
          </div>
        ) : (
          // Muestro cada producto con el componente Card
          productosActuales.map((producto) => (
            <Card key={producto.id} producto={producto} />
          ))
        )}
      </div>
      {/* Solo muestro el paginador si hay más de una página */}
      {totalPaginas > 1 && renderPaginador()}
    </div>
  );
}

export default ProductosContainer;