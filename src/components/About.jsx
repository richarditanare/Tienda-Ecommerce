import React from "react";
import { FaLaptop, FaMobileAlt, FaHeadphonesAlt } from "react-icons/fa";
import { MdLocalShipping, MdVerified } from "react-icons/md";
import { GiTechnoHeart } from "react-icons/gi";
import { Link } from "react-router-dom"; 
import "../styles/TarjetaProyecto.css"; 

function About() {
  // Página de presentación de la tienda
  return (
    <div className="container my-5">
      <h1 className="text-center mb-4 fw-bold">Sobre Nosotros</h1>
      <p className="fs-5 text-center mb-5">
        Bienvenido a tu tienda de tecnología, donde cada dispositivo es seleccionado con pasión para mejorar tu vida con innovación, calidad y estilo.
      </p>

      <div className="row g-4">

        {/* Variedad Tecnológica */}
        <div className="col-md-4">
          <div className="bg-light border border-secondary rounded p-3 text-center h-100 hover-shadow">
            <FaLaptop size={50} className="mb-2 text-primary" />
            <h5 className="fw-bold">Variedad Tecnológica</h5>
            <p className="fs-6">
              Notebooks, smartphones, consolas y gadgets seleccionados para cada necesidad tecnológica.
            </p>
          </div>
        </div>

        {/* Calidad Garantizada */}
        <div className="col-md-4">
          <div className="bg-light border border-secondary rounded p-3 text-center h-100 hover-shadow">
            <MdVerified size={50} className="mb-2 text-success" />
            <h5 className="fw-bold">Calidad Garantizada</h5>
            <p className="fs-6">
              Productos originales con garantía de fábrica, asegurando confianza en cada compra.
            </p>
          </div>
        </div>

        {/* Experiencia Sonora */}
        <div className="col-md-4">
          <div className="bg-light border border-secondary rounded p-3 text-center h-100 hover-shadow">
            <FaHeadphonesAlt size={50} className="mb-2 text-danger" />
            <h5 className="fw-bold">Experiencia Sonora</h5>
            <p className="fs-6">
              Auriculares premium y parlantes con sonido claro para cada momento.
            </p>
          </div>
        </div>

        {/* Envíos a Todo el País */}
        <div className="col-md-4">
          <div className="bg-light border border-secondary rounded p-3 text-center h-100 hover-shadow">
            <MdLocalShipping size={50} className="mb-2 text-warning" />
            <h5 className="fw-bold">Envíos a Todo el País</h5>
            <p className="fs-6">
              Envíos rápidos y seguros a toda la Argentina, con seguimiento de tu compra.
            </p>
          </div>
        </div>

        {/* Pasión por la Tecnología */}
        <div className="col-md-4">
          <div className="bg-light border border-secondary rounded p-3 text-center h-100 hover-shadow">
            <GiTechnoHeart size={50} className="mb-2 text-info" />
            <h5 className="fw-bold">Pasión por la Tecnología</h5>
            <p className="fs-6">
              Amamos la tecnología y acercarte lo mejor para que disfrutes cada experiencia.
            </p>
          </div>
        </div>

        {/* Soporte Especializado */}
        <div className="col-md-4">
          <div className="bg-light border border-secondary rounded p-3 text-center h-100 hover-shadow">
            <FaMobileAlt size={50} className="mb-2 text-secondary" />
            <h5 className="fw-bold">Soporte Especializado</h5>
            <p className="fs-6">
              Te asesoramos para que elijas el dispositivo adecuado para tu vida.
            </p>
          </div>
        </div>

      </div>

      <p className="fs-5 text-center mt-5 mb-3">
        Gracias por confiar en nosotros para tu próxima compra tecnológica. Juntos, descubramos el futuro.
      </p>

      {/* CTA Button */}
      <div className="text-center">
        <Link to="/productos">
          <button className="btn btn-primary btn-lg" data-aos="zoom-in" data-aos-duration="600">
            Ver Productos
          </button>
        </Link>
      </div>
    </div>
  );
}

export default About;