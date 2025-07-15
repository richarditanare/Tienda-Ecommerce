import React from "react";
import { Link } from "react-router-dom";
import { FaPhoneAlt, FaEnvelope, FaInstagram, FaFacebookF, FaWhatsapp } from "react-icons/fa";

// Footer que aparece al final de todas las páginas, con enlaces, contacto y redes sociales
function Footer() {
  return (
    <footer className="bg-light border-top border-secondary mt-5 pt-4 pb-3">
      <div className="container">
        <div className="row text-center text-md-start">

          {/* Sección de navegación rápida */}
          <div className="col-md-4 mb-4">
            <h5 className="fw-bold">Navegación</h5>
            <ul className="list-unstyled">
              <li><Link to="/" className="text-decoration-none text-dark">Inicio</Link></li>
              <li><Link to="/productos" className="text-decoration-none text-dark">Productos</Link></li>
              <li><Link to="/nosotros" className="text-decoration-none text-dark">Sobre Nosotros</Link></li>
              <li><Link to="/contacto" className="text-decoration-none text-dark">Contacto</Link></li>
            </ul>
          </div>

          {/* Datos de contacto rápidos */}
          <div className="col-md-4 mb-4">
            <h5 className="fw-bold">Contacto</h5>
            <p className="mb-1"><FaPhoneAlt className="me-2 text-primary" /> +54 11 1234 5678</p>
            <p className="mb-1"><FaEnvelope className="me-2 text-success" /> contacto@tutienda.com</p>
            <p className="mb-0">Buenos Aires, Argentina</p>
          </div>

          {/* Enlaces a redes sociales */}
          <div className="col-md-4 mb-4">
            <h5 className="fw-bold">Seguinos</h5>
            <div className="d-flex justify-content-center justify-content-md-start gap-3">
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-dark fs-4">
                <FaInstagram />
              </a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-dark fs-4">
                <FaFacebookF />
              </a>
              <a href="https://wa.me/541112345678" target="_blank" rel="noopener noreferrer" className="text-dark fs-4">
                <FaWhatsapp />
              </a>
            </div>
          </div>

        </div>

        <hr />
        {/* Texto de derechos reservados */}
        <p className="text-center mb-0">
          © {new Date().getFullYear()} Tu Tienda de Electrónica. Todos los derechos reservados.
        </p>
      </div>
    </footer>
  );
}

export default Footer;