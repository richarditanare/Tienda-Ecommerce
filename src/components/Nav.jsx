import { Link, useLocation, useNavigate } from "react-router-dom";
import { useContext, useState, useRef } from "react";
import { CarritoContext } from "../contexts/CarritoContext";
import { useAuthContext } from "../contexts/AuthContext";
import { useBusquedaContext } from "../contexts/BusquedaContext";
import { useProductosContext } from "./ProductosContext";
import { BsCartFill } from "react-icons/bs";
import { FaSearch } from "react-icons/fa";
import {
  Navbar,
  Nav,
  Container,
  Badge,
  Form,
  FormControl,
  ListGroup,
} from "react-bootstrap";

function NavBar() {
  const { productosCarrito } = useContext(CarritoContext);
  const { admin, user } = useAuthContext();
  const { busqueda, setBusqueda } = useBusquedaContext();
  const { productos } = useProductosContext();
  const location = useLocation();
  const navigate = useNavigate();
  const [expanded, setExpanded] = useState(false);
  const inputRef = useRef(null);

  const isActive = (path) => location.pathname === path;
  const handleCloseMenu = () => setExpanded(false);

  const productosFiltrados = productos.filter(
    (producto) =>
      producto.nombre &&
      producto.nombre
        .toLowerCase()
        .includes((busqueda || "").toLowerCase().trim())
  );

  const handleNavigate = (id) => {
    navigate(`/productos/${id}`);
    setBusqueda(""); // Limpio búsqueda al seleccionar producto
    setExpanded(false);
  };

  return (
    <Navbar
      bg="dark"
      variant="dark"
      expand="md"
      className="mb-3"
      expanded={expanded}
    >
      <Container>
        <Navbar.Brand as={Link} to="/" className="fw-bold fs-4 text-white">
          Mi Tienda
        </Navbar.Brand>
        <Navbar.Toggle
          aria-controls="basic-navbar-nav"
          onClick={() => setExpanded(expanded ? false : "expanded")}
        />
        <Navbar.Collapse id="basic-navbar-nav" className="position-relative">
          {/* Barra de búsqueda */}
          <Form
            className="d-flex ms-auto me-3 position-relative"
            style={{ maxWidth: "300px", width: "100%" }}
          >
            <FaSearch
              style={{
                position: "absolute",
                top: "50%",
                right: "10px",
                transform: "translateY(-50%)",
                color: "#6c757d",
                pointerEvents: "none",
              }}
              size={14}
            />

            <FormControl
              ref={inputRef}
              type="search"
              placeholder="Buscar productos..."
              className="pe-4"
              aria-label="Buscar"
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
              onBlur={() => setTimeout(() => setBusqueda(""), 150)} // limpio tras salir del input
            />

            {busqueda.trim() !== "" && (
              <ListGroup
                className="position-absolute start-0"
                style={{
                  top: "100%",
                  zIndex: 999,
                  width: inputRef.current
                    ? `${inputRef.current.offsetWidth}px`
                    : "auto",
                  borderRadius: "0.375rem",
                  border: "1px solid #ced4da",
                  maxHeight: "250px",
                  overflowY: "auto",
                  backgroundColor: "white",
                }}
              >
                {productosFiltrados.length > 0 ? (
                  productosFiltrados.slice(0, 5).map((producto) => (
                    <ListGroup.Item
                      action
                      key={producto.id}
                      onClick={() => handleNavigate(producto.id)}
                      className="d-flex justify-content-between align-items-center"
                    >
                      <span
                        className="text-truncate d-inline-block"
                        style={{ maxWidth: "200px" }}
                      >
                        {producto.nombre}
                      </span>
                      <span className="text-success">${producto.precio}</span>
                    </ListGroup.Item>
                  ))
                ) : (
                  <ListGroup.Item disabled className="text-center text-muted">
                    No se encontraron productos
                  </ListGroup.Item>
                )}
              </ListGroup>
            )}
          </Form>

          <Nav className="align-items-center">
            <Nav.Link
              as={Link}
              to="/"
              onClick={handleCloseMenu}
              className={`fs-6 text-white ${
                isActive("/") ? "fw-bold active-zoom" : ""
              }`}
            >
              Inicio
            </Nav.Link>
            <Nav.Link
              as={Link}
              to="/productos"
              onClick={handleCloseMenu}
              className={`fs-6 text-white ${
                isActive("/productos") ? "fw-bold active-zoom" : ""
              }`}
            >
              Productos
            </Nav.Link>
            <Nav.Link
              as={Link}
              to="/contacto"
              onClick={handleCloseMenu}
              className={`fs-6 text-white ${
                isActive("/contacto") ? "fw-bold active-zoom" : ""
              }`}
            >
              Contacto
            </Nav.Link>
            <Nav.Link
              as={Link}
              to="/nosotros"
              onClick={handleCloseMenu}
              className={`fs-6 text-white ${
                isActive("/nosotros") ? "fw-bold active-zoom" : ""
              }`}
            >
              About
            </Nav.Link>
            {admin && (
              <Nav.Link
                as={Link}
                to="/admin/agregarProductos"
                onClick={handleCloseMenu}
                className={`fs-6 text-white ${
                  isActive("/admin/agregarProductos")
                    ? "fw-bold active-zoom"
                    : ""
                }`}
              >
                Agregar Productos
              </Nav.Link>
            )}
            <Nav.Link
              as={Link}
              to="/carrito"
              onClick={handleCloseMenu}
              className={`d-flex align-items-center fs-6 text-white ${
                isActive("/carrito") ? "fw-bold active-zoom" : ""
              }`}
            >
              <BsCartFill className="me-1" />
              Carrito
              {productosCarrito?.length > 0 && (
                <Badge bg="light" text="dark" className="ms-1">
                  {productosCarrito.length}
                </Badge>
              )}
            </Nav.Link>
            <Nav.Link
              as={Link}
              to="/login"
              onClick={handleCloseMenu}
              className={`fs-6 text-white ${
                isActive("/login") ? "fw-bold active-zoom" : ""
              }`}
            >
              {user ? user : "Login"}
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;
