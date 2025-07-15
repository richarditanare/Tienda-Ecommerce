import React, { createContext, useState, useContext } from "react";

// Contexto para manejar todo lo relacionado con productos
const ProductosContext = createContext();

// Provider que envuelve la app y da acceso a productos y funciones relacionadas
export function ProductosProvider({ children }) {
  const [productos, setProductos] = useState([]); // Lista de productos
  const [cargando, setCargando] = useState(true); // Estado para saber si está cargando

  // Función para traer todos los productos desde la API
  function obtenerProductos() {
    return new Promise((res, rej) => {
      fetch("https://68191e811ac115563503f8cd.mockapi.io/productos")
        .then((respuesta) => respuesta.json())
        .then((datos) => {
          setProductos(datos);
          setCargando(false);
          res(datos); // Promise resuelta con los datos
        })
        .catch((error) => {
          console.error("Error al cargar los productos:", error);
          rej("error al cargar los productos"); // Promise rechazada
          setCargando(false);
        });
    });
  }

  // Traer un producto específico por su id
  function obtenerProducto(id) {
    return fetch(`https://68191e811ac115563503f8cd.mockapi.io/productos/${id}`)
      .then((res) => res.json())
      .catch((err) => {
        console.error("Error al obtener el producto:", err);
        throw "Producto no encontrado"; // Lanzar error para manejarlo afuera
      });
  }

  // Eliminar un producto por su id
  function eliminarProducto(id) {
    return fetch(
      `https://68191e811ac115563503f8cd.mockapi.io/productos/${id}`,
      {
        method: "DELETE",
      }
    )
      .then((res) => {
        if (!res.ok) {
          throw new Error("Error al eliminar el producto");
        }
        return res.json();
      })
      .catch((err) => {
        console.error("Error al eliminar el producto:", err);
        throw "Error al eliminar el producto"; // Lanzar error para manejarlo afuera
      });
  }

  // Agregar un nuevo producto a la API
  const agregarProducto = (producto) => {
    return new Promise(async (res, rej) => {
      try {
        const respuesta = await fetch(
          "https://68191e811ac115563503f8cd.mockapi.io/productos",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(producto),
          }
        );

        if (!respuesta.ok) {
          throw new Error("Error al agregar el producto.");
        }
        const data = await respuesta.json();
        console.log("Producto agregado:", data);
        res(data); // Promise resuelta con el nuevo producto
      } catch (error) {
        console.error(error.message);
        rej(error.message); // Promise rechazada con el error
      }
    });
  };

  return (
    <ProductosContext.Provider
      value={{
        productos,
        obtenerProductos,
        obtenerProducto,
        eliminarProducto,
        agregarProducto,
      }}
    >
      {children}
    </ProductosContext.Provider>
  );
}

// Hook personalizado para usar el contexto de productos en cualquier componente
export function useProductosContext() {
  return useContext(ProductosContext);
}