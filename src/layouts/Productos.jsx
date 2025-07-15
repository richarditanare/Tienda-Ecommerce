import "../styles/Productos.css"
import Card from "./Card";
import { useEffect, useState } from "react";

function Productos(){
    const [productos, setProductos] = useState([]); 
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch('https://68191e811ac115563503f8cd.mockapi.io/productos')
            .then((respuesta) => respuesta.json())
            .then((datos) => {
                console.log('Productos cargados:', datos);
                setProductos(datos);
                setCargando(false);
            })
            .catch((error) => {
                console.error("Error al cargar los productos:", error);
                setError("Hubo un problema al cargar los productos");
                setCargando(false);
            });
    }, []);

    if (cargando) {
        return <div>Cargando productos...</div>
    }

    if (error) {
        return <div>Error: {error}</div>
    }

    return (
        <div>
            <div className="productos-container">
                {productos.map((producto) => (
                    <Card
                        key={producto.id}
                        producto={producto}
                    />             
                ))}
            </div>
        </div>
    );
}

export default Productos;