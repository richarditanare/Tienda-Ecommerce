import { useEffect, useState } from "react";
import { useParams, Navigate } from "react-router-dom";
import { useProductosContext } from "./ProductosContext";
import { useAuthContext } from "../contexts/AuthContext";
import { ToastContainer, toast } from "react-toastify";

// Formulario para editar los datos de un producto (solo lo ve el admin)
function FormularioEdicion() {
  const { admin } = useAuthContext();
  const { obtenerProducto } = useProductosContext();
  const { id } = useParams(); // Obtengo el id del producto desde la URL
  const [productoEncontrado, setProductoEncontrado] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  // Si no está logueado como admin, mando al login
  if (!admin) {
    return <Navigate to={"/login"} replace />;
  }

  // Traigo el producto a editar cuando carga el componente
  useEffect(() => {
    obtenerProducto(id)
      .then((productoEncontrado) => {
        setProductoEncontrado(productoEncontrado);
        setCargando(false);
      })
      .catch((error) => {
        setError("Producto no encontrado");
        setCargando(false);
      });
  }, [id]);

  // Manejo los cambios en los campos del formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductoEncontrado({ ...productoEncontrado, [name]: value });
  };

  // Valido que todos los campos sean correctos antes de actualizar
  const validarFormulario = () => {
    if (!productoEncontrado.nombre.trim()) {
      return "El nombre es obligatorio.";
    }
    if (!productoEncontrado.precio || productoEncontrado.precio <= 0) {
      return "El precio debe ser mayor a 0.";
    }
    if (!productoEncontrado.descripcion.trim() || productoEncontrado.descripcion.length < 10) {
      return "La descripción debe tener al menos 10 caracteres.";
    }
    if (!productoEncontrado.imagen.trim()) {
      return "La URL de la imagen no debe estar vacía.";
    } else {
      return true;
    }
  };

  // Cuando se envía el formulario, intento actualizar el producto
  const handleSubmit = async (e) => {
    e.preventDefault();
    const validarForm = validarFormulario();
    if (validarForm === true) {
      try {
        const respuesta = await fetch(
          `https://68191e811ac115563503f8cd.mockapi.io/productos/${productoEncontrado.id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(productoEncontrado),
          }
        );
        if (!respuesta.ok) {
          throw new Error("Error al actualizar el producto.");
        }
        await respuesta.json();
        toast.success("Producto actualizado correctamente.")
      } catch (error) {
        console.error(error.message);
        alert("Hubo un problema al actualizar el producto.");
      }
    } else {
      alert(validarForm);
    }
  };

  // Muestro mensaje si está cargando o si hay error
  if (cargando) return <div className="text-center mt-5">Cargando producto...</div>;
  if (error) return <div className="text-center mt-5 text-danger">{error}</div>;

  return (
    <div className="container my-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="bg-light border border-secondary rounded p-4">
            <h2 className="text-center mb-4">Editar Producto</h2>

            {/* Formulario para editar los datos del producto */}
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label fw-bold">Nombre:</label>
                <input
                  type="text"
                  name="nombre"
                  value={productoEncontrado.nombre || ""}
                  onChange={handleChange}
                  required
                  className="form-control"
                />
              </div>

              <div className="mb-3">
                <label className="form-label fw-bold">URL de la Imagen:</label>
                <input
                  type="text"
                  name="imagen"
                  value={productoEncontrado.imagen || ""}
                  onChange={handleChange}
                  required
                  className="form-control"
                />
              </div>

              <div className="mb-3">
                <label className="form-label fw-bold">Precio:</label>
                <input
                  type="number"
                  name="precio"
                  value={productoEncontrado.precio || ""}
                  onChange={(e) =>
                    setProductoEncontrado({
                      ...productoEncontrado,
                      [e.target.name]: e.target.value.replace(",", "."),
                    })
                  }
                  step="0.01"
                  min="0"
                  required
                  className="form-control"
                />
              </div>

              <div className="mb-4">
                <label className="form-label fw-bold">Descripción:</label>
                <textarea
                  name="descripcion"
                  value={productoEncontrado.descripcion || ""}
                  onChange={handleChange}
                  required
                  className="form-control"
                  rows={3}
                />
              </div>

              <button type="submit" className="btn btn-primary w-100">
                Actualizar Producto
              </button>
              <ToastContainer />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FormularioEdicion;