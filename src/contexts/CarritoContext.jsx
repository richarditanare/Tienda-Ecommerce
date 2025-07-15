import React, { createContext, useState, useEffect } from "react";

// Creo el contexto para manejar el carrito
export const CarritoContext = createContext();

// Provider que da acceso al carrito y funciones para modificarlo
export const CarritoProvider = ({ children }) => {
  // Estado del carrito, inicializo leyendo del localStorage si hay datos guardados
  const [productosCarrito, setProductosCarrito] = useState(() => {
    const guardado = localStorage.getItem("carrito");
    return guardado ? JSON.parse(guardado) : [];
  });

  // Guardo el carrito en localStorage cada vez que cambia para que persista
  useEffect(() => {
    localStorage.setItem("carrito", JSON.stringify(productosCarrito));
  }, [productosCarrito]);

  // Agrego un producto al carrito. Si ya existe, sumo la cantidad, sino lo agrego nuevo
  const agregarAlCarrito = (producto) => {
    setProductosCarrito((prevCarrito) => {
      const existe = prevCarrito.find((item) => item.id === producto.id);
      if (existe) {
        // Sumo la cantidad seleccionada o 1 si no viene definida
        return prevCarrito.map((item) =>
          item.id === producto.id
            ? { ...item, cantidad: item.cantidad + (producto.cantidad || 1) }
            : item
        );
      } else {
        // Agrego el producto nuevo con la cantidad que viene o 1
        return [...prevCarrito, { ...producto, cantidad: producto.cantidad || 1 }];
      }
    });
  };

  // Elimino un producto del carrito por su id
  const eliminarProductoCarrito = (id) => {
    setProductosCarrito((prevCarrito) =>
      prevCarrito.filter((item) => item.id !== id)
    );
  };

  // Vacío todo el carrito
  const vaciarCarrito = () => {
    setProductosCarrito([]);
  };

  // Aumento en 1 la cantidad de un producto en el carrito
  const aumentarCantidad = (id) => {
    setProductosCarrito((prevCarrito) =>
      prevCarrito.map((item) =>
        item.id === id
          ? { ...item, cantidad: item.cantidad + 1 }
          : item
      )
    );
  };

  // Disminuyo en 1 la cantidad de un producto, si queda 0 lo elimino del carrito
  const disminuirCantidad = (id) => {
    setProductosCarrito((prevCarrito) =>
      prevCarrito
        .map((item) =>
          item.id === id
            ? { ...item, cantidad: item.cantidad - 1 }
            : item
        )
        .filter((item) => item.cantidad > 0)
    );
  };

  return (
    <CarritoContext.Provider
      value={{
        productosCarrito,
        agregarAlCarrito,
        eliminarProductoCarrito,
        vaciarCarrito,
        aumentarCantidad,
        disminuirCantidad,
        setProductosCarrito,
      }}
    >
      {children}
    </CarritoContext.Provider>
  );
};