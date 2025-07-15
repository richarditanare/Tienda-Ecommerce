import { Navigate } from "react-router-dom";
import { useContext } from "react";
import { CarritoContext } from "../contexts/CarritoContext.jsx";
import { useAuthContext } from "../contexts/AuthContext.jsx";
import CarritoCard from "./CarritoCard.jsx";
import { Container, Button, Row, Col } from "react-bootstrap";
import Swal from "sweetalert2";
import { AlertaConfirmacionEliminacionProducto } from "../assets/AlertaConfirmacionEliminacionProducto.js";

// En esta página se muestran los productos agregardos al carrito de compras
function Carrito() {
  const { user, loading } = useAuthContext(); // Info de usuario y estado de carga
  const {
    productosCarrito,
    vaciarCarrito,
    eliminarProductoCarrito,
    sumarCantidad,
    restarCantidad
  } = useContext(CarritoContext);

  // Se calcula el total, sumando todos los productos y sus cantidades
  const total = productosCarrito.reduce(
    (subTotal, producto) => subTotal + Number(producto.precio) * producto.cantidad,
    0
  );

  // Elimina un producto individual del carrito por id
  const funcionDisparadora = (id) => {
    eliminarProductoCarrito(id);
  };

  // Espero a que Firebase cargue la info del usuario antes de redirigir
  if (loading) return null;
  // Si no hay usuario logueado, redirijo al login
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Al hacer checkout (comprar), muestro alerta de confirmación y limpio el carrito
  const handleCheckout = () => {
    Swal.fire({
      title: "Confirmar compra",
      html: `Total a pagar: <b>$${total.toFixed(2)}</b>`,
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Confirmar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "¡Compra realizada!",
          text: "Gracias por tu compra.",
          icon: "success",
          confirmButtonText: "Aceptar",
        });
        vaciarCarrito();
      }
    });
  };

  // Al hacer click en "Vaciar carrito", muestro alerta de confirmación
  const handleVaciarCarrito = async () => {
    const confirmado = await AlertaConfirmacionEliminacionProducto(
      "¿Estás seguro?",
      "¿Deseas vaciar todo el carrito?",
      "warning",
      "Confirmar",
      "Cancelar"
    );
    if (confirmado) {
      vaciarCarrito();
    }
  };

  return (
    <Container className="my-5">
      <h2 className="text-center mb-4 fw-bold">Tu Carrito</h2>

      {/* Si hay productos, muestro el listado y el resumen. Si no, aviso que está vacío */}
      {productosCarrito.length > 0 ? (
        <Row className="g-4">
          <Col xs={12} md={8}>
            <div className="d-flex flex-column gap-3">
              {/* Muestro cada producto del carrito */}
              {productosCarrito.map((producto) => (
                <CarritoCard
                  key={producto.id}
                  producto={producto}
                  funcionDisparadora={funcionDisparadora}
                  sumarCantidad={sumarCantidad}
                  restarCantidad={restarCantidad}
                />
              ))}
            </div>
          </Col>
          <Col xs={12} md={4}>
            <div className="border rounded p-3 shadow-sm bg-white">
              <h5 className="mb-3">Resumen de compra</h5>
              <p className="mb-1">
                Productos: {productosCarrito.reduce((acc, p) => acc + p.cantidad, 0)}
              </p>
              <p className="mb-3">
                Total a pagar: <b>${total.toFixed(2)}</b>
              </p>
              {/* Botón para comprar */}
              <Button
                variant="success"
                className="w-100 mb-2"
                onClick={handleCheckout}
              >
                Continuar compra
              </Button>
              {/* Botón para vaciar el carrito */}
              <Button
                variant="outline-danger"
                className="w-100"
                onClick={handleVaciarCarrito}
              >
                Vaciar carrito
              </Button>
            </div>
          </Col>
        </Row>
      ) : (
        // Si el carrito está vacío, muestro mensaje y emoji
        <div className="text-center mt-5">
          <p className="fs-4 text-muted">Tu carrito está vacío 🛒</p>
        </div>
      )}
    </Container>
  );
}

export default Carrito;