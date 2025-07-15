// import "../styles/Productos.css";
import { Link } from "react-router-dom";

// Componente que muestra la tarjeta de cada producto individual
function Card({ producto }) {
  return (
    <div className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4 d-flex justify-content-center">
      <div
        className="card bg-light h-100 d-flex flex-column justify-content-between"
        style={{ width: "100%" }}
      >
        <div className="card-body d-flex flex-column align-items-center text-center p-2">
          
          {/* Nombre del producto */}
          <h2
            className="card-title fs-6 fw-bold text-truncate m-1"
            style={{ whiteSpace: "normal", overflowWrap: "break-word" }}
          >
            {producto.nombre}
          </h2>
          
          {/* Imagen del producto */}
          <img
            className="img-fluid p-1 rounded-circle"
            style={{
              maxWidth: "200px",
              maxHeight: "200px",
              objectFit: "cover",
            }}
            src={producto.imagen}
            alt={producto.nombre}
          />
          
          {/* Precio del producto */}
          <p className="card-text fs-5 mt-1">{`$${producto.precio}`}</p>
        </div>
        <div className="text-center pb-2">
          
          {/* Botón para ver más detalles del producto */}
          <Link to={`/productos/${producto.id}`}>
            <button className="btn btn-primary">Ver más</button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Card;
