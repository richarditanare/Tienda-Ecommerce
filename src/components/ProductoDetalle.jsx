import { useEffect, useState, useContext } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import "../styles/Productos.css";
import { CarritoContext } from "../contexts/CarritoContext";
import { useAuthContext } from "../contexts/AuthContext";
import { useProductosContext } from "./ProductosContext";
import { AlertaConfirmacionEliminacionProducto } from "../assets/AlertaConfirmacionEliminacionProducto";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaArrowLeft, FaCreditCard, FaLock, FaTruck } from "react-icons/fa";

function ProductoDetalle() {
  const navegar = useNavigate();
  const { admin } = useAuthContext();
  const { agregarAlCarrito } = useContext(CarritoContext);
  const { id } = useParams();
  const { obtenerProducto, eliminarProducto } = useProductosContext();

  const [producto, setProducto] = useState(null);
  const [cantidad, setCantidad] = useState(1);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);
  const [hover, setHover] = useState(false);
  const [agregado, setAgregado] = useState(false);

  
  // Cuando se carga el componente, se busca el producto según su ID
  useEffect(() => {
    const cargarProducto = async () => {
      try {
        setCargando(true);
        const prod = await obtenerProducto(id);
        setProducto(prod);
        setError(null);
      } catch (err) {
        setError(err);
        setProducto(null);
      } finally {
        setCargando(false);
      }
    };

    if (id) {
      cargarProducto();
    }
  }, [id]);

  // Agrega el producto al carrito con la cantidad seleccionada
  const handleAgregarAlCarrito = () => {
    if (producto) {
      agregarAlCarrito({ ...producto, cantidad });
      setAgregado(true);
      toast.success(`Se agregaron ${cantidad} ${producto.nombre} al carrito`, {
        position: "top-right",
        autoClose: 2000,
      });
      setTimeout(() => setAgregado(false), 2500);
    }
  };

  // Dispara una alerta de confirmación antes de eliminar un producto (modo admin)
  const dispararEliminar = () => {
    AlertaConfirmacionEliminacionProducto(
      "Confirmar Eliminación",
      "¿Estás seguro de que deseas eliminar este producto?",
      "warning",
      "Eliminar",
      "Cancelar"
    ).then((confirmado) => {
      if (confirmado) {
        eliminarProducto(id)
          .then(() => navegar("/productos"))
          .catch((error) => {
            alert("Hubo un problema al eliminar el producto.");
            console.error(error);
          });
      }
    });
  };

  if (cargando) {
    return (
      <div className="container my-4">
        <div>Cargando...</div>
      </div>
    );
  }

  if (error || !producto) {
    return (
      <div className="container my-4">
        <div>Producto no encontrado</div>
      </div>
    );
  }

  // Vista principal del detalle del producto
  return (
    <div className="container my-4 position-relative">
      {/* Botón para volver a la lista de productos */}
      <button
        className="position-absolute d-flex align-items-center px-3 py-2 rounded"
        style={{
          top: 0,
          left: 0,
          zIndex: 20,
          background: hover ? "#fff" : "#23272b",
          color: hover ? "#23272b" : "#fff",
          fontWeight: 500,
          border: `2px solid ${hover ? "#6c757d" : "#fff"}`,
          transition: "all 0.15s",
        }}
        onClick={() => navegar("/productos")}
        aria-label="Volver a productos"
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        <FaArrowLeft size={22} className="me-2" />
        <span className="d-none d-md-inline">Volver</span>
      </button>

      <div className="row">
        {/* Imagen y descripción del producto */}
        <div className="col-md-6 text-center">
          <img
            className="img-fluid p-1 rounded"
            src={producto.imagen}
            alt={producto.nombre}
            style={{ maxHeight: "400px", objectFit: "contain" }}
          />
          <p className="mt-3">{producto.descripcion}</p>
        </div>

        {/* Tarjeta lateral con acciones */}
        <div className="col-md-6 d-flex justify-content-center">
          <div
            className="bg-light border border-secondary rounded p-4 d-flex flex-column h-100 w-100"
            style={{ maxWidth: "400px", minHeight: "400px" }}
          >
            <div>
              <h2 className="fw-bold text-start">{producto.nombre}</h2>

              {/* Precio dinámico según la cantidad */}
              <p className="fs-2 d-flex align-items-center">
                $ {(producto.precio * cantidad).toFixed(2)}
              </p>

              {/* Sección de cantidad (solo para usuarios normales) */}
              {!admin && (
                <>
                  <div className="d-flex align-items-center mb-2">Cantidad</div>
                  <div className="d-flex align-items-center mb-3">
                    <button
                      className="btn btn-outline-secondary btn-sm"
                      onClick={() => cantidad > 1 && setCantidad(cantidad - 1)}
                    >
                      -
                    </button>
                    <span
                      className="mx-3 fs-5 px-3 py-1 bg-light border rounded text-center"
                      style={{ minWidth: "50px" }}
                    >
                      {cantidad}
                    </span>
                    <button
                      className="btn btn-outline-secondary btn-sm"
                      onClick={() => setCantidad(cantidad + 1)}
                    >
                      +
                    </button>
                  </div>
                </>
              )}
            </div>

            {/* Acciones finales: stock, botones admin o usuario */}
            <div className="mt-auto">
              <div className="d-flex align-items-center">
                <p className="fs-6 mb-0">Stock:&nbsp;</p>
                <p className="fs-6 text-success mb-0">Disponible</p>
              </div>

              {/* Botones para admin */}
              {admin ? (
                <>
                  <Link to={`/admin/editarProducto/${id}`}>
                    <button className="btn btn-primary my-1 w-100">
                      Editar Producto
                    </button>
                  </Link>
                  <button
                    className="btn btn-danger my-1 w-100"
                    onClick={dispararEliminar}
                  >
                    Eliminar Producto
                  </button>
                </>
              ) : (
                <>
                  {/* Botón para agregar al carrito */}
                  <button
                    className="btn btn-success my-2 w-100"
                    onClick={handleAgregarAlCarrito}
                    disabled={agregado}
                    style={{ fontWeight: agregado ? "bold" : "normal" }}
                  >
                    {agregado ? "Agregado" : "Agregar al Carrito"}
                  </button>

                  {/* Sección de confianza con íconos */}
                  <div className="d-flex flex-column gap-1 mt-2 small text-secondary">
                    <div className="d-flex align-items-center gap-2">
                      <FaCreditCard /> <span>Aceptamos todas las tarjetas</span>
                    </div>
                    <div className="d-flex align-items-center gap-2">
                      <FaLock /> <span>Compra 100% segura</span>
                    </div>
                    <div className="d-flex align-items-center gap-2">
                      <FaTruck /> <span>Envíos gratis a todo el país</span>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Contenedor global de toasts */}
      <ToastContainer />
    </div>
  );
}

export default ProductoDetalle;