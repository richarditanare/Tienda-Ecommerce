import React, { useState } from "react";
import { useAuthContext } from "../contexts/AuthContext";
import { Navigate } from "react-router-dom";
import { useProductosContext } from "./ProductosContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Formulario para que el admin agregue productos nuevos
function FormularioProducto() {
  const { agregarProducto } = useProductosContext();
  const { admin } = useAuthContext();

  // Estado para guardar lo que el usuario escribe en el formulario
  const [producto, setProducto] = useState({
    nombre: "",
    precio: "",
    descripcion: "",
    imagen: "",
  });

  // Placeholders para mostrar ejemplos en los campos
  const [placeholders, setPlaceholders] = useState({
    nombre: "Samsung Galaxy S23+",
    imagen: "https://ejemplo.com/imagen.jpg",
    precio: "15.49",
    descripcion: "Smartphone de gama alta con excelente cámara",
  });

  // Al enfocar un campo, saco el placeholder para que quede vacío
  const handleFocus = (field) => {
    setPlaceholders((prev) => ({ ...prev, [field]: "" }));
  };

  // Si el campo queda vacío al salir, vuelvo a mostrar el placeholder original
  const handleBlur = (field) => {
    if (!producto[field]) {
      const defaultPlaceholders = {
        nombre: "Samsung Galaxy S23+",
        imagen: "https://ejemplo.com/imagen.jpg",
        precio: "15.49",
        descripcion: "Smartphone de gama alta con excelente cámara",
      };
      setPlaceholders((prev) => ({
        ...prev,
        [field]: defaultPlaceholders[field],
      }));
    }
  };

  // Validar que los datos sean correctos antes de agregar el producto
  const validarFormulario = () => {
    if (!producto.nombre.trim()) return "El nombre es obligatorio.";
    if (!producto.precio || producto.precio <= 0) return "El precio debe ser mayor a 0.";
    if (!producto.descripcion.trim() || producto.descripcion.length < 10) return "La descripción debe tener al menos 10 caracteres.";
    if (!producto.imagen.trim()) return "La URL de la imagen no debe estar vacía.";
    return true;
  };

  // Guardar cambios de cada campo en el estado
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProducto({ ...producto, [name]: value });
  };

  // Cuando se envía el formulario
  const handleSubmit2 = (e) => {
    e.preventDefault();
    const validarForm = validarFormulario();
    if (validarForm === true) {
      // Si todo está bien, agrego el producto y muestro mensaje
      agregarProducto(producto)
        .then(() => {
          setProducto({ nombre: "", precio: "", descripcion: "", imagen: "" });
          toast.success("Producto agregado correctamente.", {
            position: "top-right",
            autoClose: 2000,
          });
        })
        .catch((error) => {
          toast.error(`Hubo un problema al agregar el producto: ${error}`, {
            position: "top-right",
            autoClose: 2000,
          });
        });
    } else {
      // Si hay errores, los muestro con un toast
      toast.error(validarForm, {
        position: "top-right",
        autoClose: 2000,
      });
    }
  };

  // Si no es admin, redirijo al login
  if (!admin) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="container my-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="bg-light border border-secondary rounded p-4">
            <h2 className="text-center mb-4">Agregar Producto</h2>

            {/* Formulario para cargar el producto */}
            <form onSubmit={handleSubmit2}>
              <div className="mb-3">
                <label className="form-label fw-bold">Nombre:</label>
                <input
                  type="text"
                  name="nombre"
                  value={producto.nombre}
                  onChange={handleChange}
                  onFocus={() => handleFocus("nombre")}
                  onBlur={() => handleBlur("nombre")}
                  required
                  className="form-control"
                  placeholder={placeholders.nombre}
                />
              </div>

              <div className="mb-3">
                <label className="form-label fw-bold">URL de la Imagen:</label>
                <input
                  type="text"
                  name="imagen"
                  value={producto.imagen}
                  onChange={handleChange}
                  onFocus={() => handleFocus("imagen")}
                  onBlur={() => handleBlur("imagen")}
                  required
                  className="form-control"
                  placeholder={placeholders.imagen}
                />
              </div>

              <div className="mb-3">
                <label className="form-label fw-bold">Precio:</label>
                <input
                  type="number"
                  name="precio"
                  value={producto.precio}
                  onChange={handleChange}
                  onFocus={() => handleFocus("precio")}
                  onBlur={() => handleBlur("precio")}
                  required
                  min="0"
                  step="0.01"
                  className="form-control"
                  placeholder={placeholders.precio}
                />
              </div>

              <div className="mb-4">
                <label className="form-label fw-bold">Descripción:</label>
                <textarea
                  name="descripcion"
                  value={producto.descripcion}
                  onChange={handleChange}
                  onFocus={() => handleFocus("descripcion")}
                  onBlur={() => handleBlur("descripcion")}
                  required
                  className="form-control"
                  rows={3}
                  placeholder={placeholders.descripcion}
                />
              </div>

              {/* Botón para agregar el producto */}
              <button type="submit" className="btn btn-success w-100">
                Agregar Producto
              </button>
              {/* Para mostrar mensajes de toast */}
              <ToastContainer
                position="top-right"
                autoClose={10000}
                hideProgressBar
              />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FormularioProducto;