import React from 'react';
import './App.css';
import Nav from './components/Nav';
import Footer from './components/Footer';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import ProductosContainer from './components/ProductosContainer';
import Carrito from './components/Carrito';
import About from './components/About';
import Contacto from './components/Contacto';
import ProductoDetalle from './components/ProductoDetalle';
import Login2 from './components/Login2';
import Admin from './components/Admin';
import FormularioProducto from './components/FormularioProducto';
import { useAuthContext } from './contexts/AuthContext';
import FormularioEdicion from './components/FormularioEdicion';
import Main from "./components/Main";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const equipo = [
  { nombre: 'Silvia', rol: 'Product Owner', imagen:
    'https://this-person-does-not-exist.com/img/avatar-genf144e6d0e6fe3b76cda46c41e9241943.jpg' },
  { nombre: 'Luis', rol: 'Diseñador UX/UI', imagen:
    'https://this-person-does-not-exist.com/img/avatar-gen288ad2ba78bde8e5458d73a49edbe8fe.jpg' },
  { nombre: 'Matías', rol: 'Desarrollador', imagen:
    'https://this-person-does-not-exist.com/img/avatar-gen920afd8996f55547e3ba4e4749ab87d8.jpg' },
  { nombre: 'Sabrina', rol: 'Desarrolladora', imagen:
    'https://this-person-does-not-exist.com/img/avatar-gen61320026076034e2eadc4ff27990e3a7.jpg' },
];

function App() {
  const { admin } = useAuthContext();

  const agregarProducto = async (producto) => {
    try {
      const respuesta = await fetch('https://68191e811ac115563503f8cd.mockapi.io/productos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(producto),
      });

      if (!respuesta.ok) {
        throw new Error('Error al agregar el producto.');
      }

      const data = await respuesta.json();
      console.log('Producto agregado:', data);
      alert('Producto agregado correctamente');
    } catch (error) {
      console.error(error.message);
      alert('Hubo un problema al agregar el producto.');
    }
  };

  return (
    <Router>
      <div className="app-wrapper">
        <Nav />
        <main className="main-container">
          <Routes>
            <Route path="/" element={<Main equipo={equipo} />} />
            <Route path="/login" element={<Login2 />} />
            <Route path='/productos' element={<ProductosContainer />} />
            <Route path='/productos/:id' element={<ProductoDetalle />} />
            <Route path='/carrito' element={<Carrito />} />
            <Route path='/contacto' element={<Contacto />} />
            <Route path='/nosotros' element={<About equipo={equipo} />} />
            <Route path='/admin' element={admin ? <Admin /> : <Navigate to="/login" replace />} />
            <Route path='/admin/agregarProductos' element={
              admin ? <FormularioProducto onAgregar={agregarProducto} /> : <Navigate to="/login" replace />
            } />
            <Route path='/admin/editarProducto/:id' element={
              admin ? <FormularioEdicion /> : <Navigate to="/login" replace />
            } />
          </Routes>
        </main>
        <Footer />

        {/* ToastContainer para notificaciones */}
        <ToastContainer position="top-right" autoClose={2000} hideProgressBar />
      </div>
    </Router>
  );
}

export default App;
