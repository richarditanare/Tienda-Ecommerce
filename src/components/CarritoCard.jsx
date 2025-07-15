import { useContext } from "react";
import { CarritoContext } from "../contexts/CarritoContext";
import { AlertaConfirmacionEliminacionProducto } from "../assets/AlertaConfirmacionEliminacionProducto";
import { Button } from "react-bootstrap";

// Tarjeta individual para cada producto dentro del carrito
function CarritoCard({ producto, funcionDisparadora }) {
  const { aumentarCantidad, disminuirCantidad } = useContext(CarritoContext);

  // Confirmacion de borrado de producto del carrito
  async function borrarDelCarrito() {
    const confirmacion = await AlertaConfirmacionEliminacionProducto(
      "¿Estás seguro?",
      `¿Deseas eliminar <br><b>${producto.cantidad}</b> ${producto.nombre}?`,
      "warning",
      "Confirmar",
      "Cancelar"
    );
    if (confirmacion) {
      funcionDisparadora(producto.id);
    }
  }

  return (
    <div className="d-flex align-items-center justify-content-between border rounded shadow-sm p-3 bg-white w-100">
      {/* Imagen y datos del producto */}
      <div className="d-flex align-items-center flex-grow-1 gap-3">
        <img
          src={producto.imagen}
          alt={producto.nombre}
          style={{ width: "90px", height: "90px", objectFit: "contain" }}
        />
        <div className="d-flex flex-column justify-content-center">
          {/* Nombre y descripción */}
          <h6 className="mb-1 text-start">{producto.nombre}</h6>
          <p className="text-muted mb-1 text-start" style={{ fontSize: "0.85rem" }}>
            {producto.descripcion}
          </p>
          {/* Botones para cambiar la cantidad */}
          <div className="d-flex align-items-center">
            <Button
              variant="outline-secondary"
              size="sm"
              onClick={() => disminuirCantidad(producto.id)}
            >
              -
            </Button>
            <span className="mx-2">{producto.cantidad}</span>
            <Button
              variant="outline-secondary"
              size="sm"
              onClick={() => aumentarCantidad(producto.id)}
            >
              +
            </Button>
          </div>
        </div>
      </div>

      {/* Precio unitario y subtotal del producto */}
      <div className="d-flex flex-column align-items-end justify-content-center me-3">
        <div style={{ fontSize: "0.9rem" }}>
          Precio unitario: ${Number(producto.precio).toFixed(2)}
        </div>
        <div style={{ fontSize: "0.9rem" }}>
          Subtotal: ${(Number(producto.precio) * producto.cantidad).toFixed(2)}
        </div>
      </div>

      {/* Botón para eliminar el producto del carrito */}
      <Button
        variant="outline-danger"
        size="sm"
        onClick={borrarDelCarrito}
      >
        X
      </Button>
    </div>
  );
}

export default CarritoCard;