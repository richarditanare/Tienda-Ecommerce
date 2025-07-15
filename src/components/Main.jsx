import React from "react";
import { Link } from "react-router-dom";
import {
  MdLocalShipping,
  MdVerifiedUser,
  MdSupportAgent,
} from "react-icons/md";
import { FaStar } from "react-icons/fa";
import "../styles/TarjetaProyecto.css";

// Componente principal de la página de inicio
function Main({ equipo }) {
  return (
    <main className="container my-5">
      {/* Sección principal (hero) con bienvenida y botón para ver productos */}
      <div className="text-center mb-5">
        <h1 className="fw-bold mb-3">Bienvenido a Tu Tienda de Electrónica</h1>
        <p className="fs-5 mb-4">
          Descubrí tecnología de calidad para tu día a día con envíos rápidos y
          soporte especializado.
        </p>
        <Link to="/productos">
          <button className="btn btn-primary btn-lg " data-aos="zoom-in" data-aos-duration="600">Ver Productos</button>
        </Link>
      </div>

      {/* Sección de beneficios para el usuario */}
      <div className="row g-4 mb-5">
        <div className="col-md-4" data-aos="fade-up" data-aos-delay="100">
          <div className="bg-light border border-secondary rounded p-4 text-center h-100 hover-shadow">
            <MdLocalShipping size={50} className="mb-2 text-primary" />
            <h5 className="fw-bold">Envíos Rápidos</h5>
            <p className="fs-6">
              Entregamos tus productos en tiempo récord a todo el país con
              seguimiento en tiempo real.
            </p>
          </div>
        </div>

        <div className="col-md-4" data-aos="fade-up" data-aos-delay="200">
          <div className="bg-light border border-secondary rounded p-4 text-center h-100 hover-shadow">
            <MdVerifiedUser size={50} className="mb-2 text-success" />
            <h5 className="fw-bold">Calidad Garantizada</h5>
            <p className="fs-6">
              Productos originales con garantía y control de calidad para tu
              tranquilidad.
            </p>
          </div>
        </div>

        <div className="col-md-4" data-aos="fade-up" data-aos-delay="300">
          <div className="bg-light border border-secondary rounded p-4 text-center h-100 hover-shadow">
            <MdSupportAgent size={50} className="mb-2 text-danger" />
            <h5 className="fw-bold">Soporte Especializado</h5>
            <p className="fs-6">
              Te asesoramos antes y después de tu compra para que elijas con
              confianza.
            </p>
          </div>
        </div>
      </div>

      {/* Sección de testimonios de clientes */}
      <div className="mt-5">
        <h2 className="text-center fw-bold mb-4">
          Lo que dicen nuestros clientes
        </h2>
        <div className="row g-4">
          {/* Testimonio 1 */}
          <div className="col-md-4" data-aos="fade-up" data-aos-delay="50">
            <div className="bg-light border border-secondary rounded p-4 h-100 text-center">
              <img
                src={equipo[0].imagen}
                alt="María G."
                className="rounded-circle mb-3"
                style={{ width: "100px", height: "100px", objectFit: "cover" }}
              />
              {/* Estrellas de calificación */}
              <div className="mb-2">
                {[...Array(5)].map((_, index) => (
                  <FaStar key={index} className="text-warning" />
                ))}
              </div>
              <p className="fs-5 fst-italic">
                "Excelente atención, me asesoraron para elegir el celular
                perfecto y llegó rapidísimo."
              </p>
              <p className="fw-bold mb-0">María G.</p>
            </div>
          </div>

          {/* Testimonio 2 */}
          <div className="col-md-4" data-aos="fade-up" data-aos-delay="50">
            <div className="bg-light border border-secondary rounded p-4 h-100 text-center">
              <img
                src={equipo[1].imagen}
                alt="Lucas P."
                className="rounded-circle mb-3"
                style={{ width: "100px", height: "100px", objectFit: "cover" }}
              />
              {/* Estrellas de calificación */}
              <div className="mb-2">
                {[...Array(5)].map((_, index) => (
                  <FaStar key={index} className="text-warning" />
                ))}
              </div>
              <p className="fs-5 fst-italic">
                "Muy buena calidad de productos, el notebook que compré funciona
                perfecto. Los recomiendo."
              </p>
              <p className="fw-bold mb-0">Lucas P.</p>
            </div>
          </div>

          {/* Testimonio 3 */}
          <div className="col-md-4" data-aos="fade-up" data-aos-delay="50">
            <div className="bg-light border border-secondary rounded p-4 h-100 text-center">
              <img
                src={equipo[2].imagen}
                alt="Ana S."
                className="rounded-circle mb-3"
                style={{ width: "100px", height: "100px", objectFit: "cover" }}
              />
              {/* Estrellas de calificación */}
              <div className="mb-2">
                {[...Array(5)].map((_, index) => (
                  <FaStar key={index} className="text-warning" />
                ))}
              </div>
              <p className="fs-5 fst-italic">
                "Me encanta la variedad de productos y los precios competitivos,
                siempre compro aquí."
              </p>
              <p className="fw-bold mb-0">Simón F.</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Main;