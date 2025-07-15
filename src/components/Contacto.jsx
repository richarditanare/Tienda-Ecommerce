import React from "react";
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";
import "../styles/TarjetaProyecto.css";

// Página de contacto, para que los usuarios puedan escribirnos o ver nuestros datos
function Contacto() {
  return (
    <div className="container my-5">
      <h1 className="text-center mb-4 fw-bold">Contacto</h1>
      <p className="fs-5 text-center mb-5">
        Estamos aquí para ayudarte. Envíanos un mensaje y nos pondremos en
        contacto contigo a la brevedad.
      </p>

      {/* Formulario de contacto para mensajes de los usuarios */}
      <div className="bg-light border border-secondary rounded p-4 mb-5">
        <h4 className="fw-bold mb-3 text-center">Envíanos un mensaje</h4>
        <form>
          <div className="mb-3">
            <label className="form-label fw-bold">Nombre:</label>
            <input
              type="text"
              className="form-control"
              placeholder="Juan Pérez"
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label fw-bold">Email:</label>
            <input
              type="email"
              className="form-control"
              placeholder="juan@email.com"
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label fw-bold">Mensaje:</label>
            <textarea
              className="form-control"
              rows="4"
              placeholder="Escribe tu consulta aquí..."
              required
            />
          </div>
          <div className="text-center">
            <button type="submit" className="btn btn-success btn-lg">
              Enviar Mensaje
            </button>
          </div>
        </form>
      </div>

      {/* Tarjetas con info de contacto: teléfono, email y ubicación */}
      <div className="row g-4">
        {/* Teléfono */}
        <div className="col-md-4">
          <div className="bg-light border border-secondary rounded p-3 text-center h-100">
            <FaPhoneAlt size={40} className="mb-2 text-primary" />
            <h5 className="fw-bold">Teléfono</h5>
            <p className="fs-6 mb-0">+54 11 1234 5678</p>
          </div>
        </div>

        {/* Email */}
        <div className="col-md-4">
          <div className="bg-light border border-secondary rounded p-3 text-center h-100">
            <FaEnvelope size={40} className="mb-2 text-success" />
            <h5 className="fw-bold">Email</h5>
            <p className="fs-6 mb-0">contacto@tutienda.com</p>
          </div>
        </div>

        {/* Ubicación */}
        <div className="col-md-4">
          <div className="bg-light border border-secondary rounded p-3 text-center h-100">
            <FaMapMarkerAlt size={40} className="mb-2 text-danger" />
            <h5 className="fw-bold">Ubicación</h5>
            <p className="fs-6 mb-0">Buenos Aires, Argentina</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contacto;
