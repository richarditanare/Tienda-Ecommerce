
# Proyecto Final - E-Commerce (ReactJS)

Este proyecto es un sitio web de e-commerce desarrollado con ReactJS como entrega final del curso. 

---

## ✅ Características del proyecto

### 🔒 Autenticación (Firebase)
- Registro y login de usuarios.
- Persistencia de sesión.
- Protección de rutas (ej: acceso al panel de administración restringido a admin).

### 🛍️ Catálogo de productos
- Cards de productos con imagen, nombre y botón "ver más".
- Vista de detalle por producto con ruta dinámica (`useParams`).
- Formulario para agregar nuevos productos.
- Edición de productos (solo admin).
- Eliminación de productos con confirmación.
- Gestión completa de productos usando Context API.

### 🛒 Carrito de compras
- Agregar productos al carrito.
- Eliminar productos individuales.
- Vaciar el carrito completamente.
- Mostrar precio total.
- Persistencia en sesión.
- Contador de productos en NavBar.

### 📱 Diseño responsivo
- Enfoque Mobile First con Bootstrap.
- Diseño adaptable a múltiples resoluciones.

### 🔎 Funcionalidades extra
- Búsqueda de productos por nombre o descripción.
- Paginación para lista de productos.
- Galería de intereses con diseño visual atractivo.
- Sección About y sección Contacto.
- Toasts y alertas personalizadas para feedback al usuario.
- Footer y Navbar visibles en todas las vistas.

---

## 📁 Estructura de carpetas destacadas

```
/src
  /components
    - Admin.jsx
    - Card.jsx
    - Carrito.jsx
    - Contacto.jsx
    - FormularioProducto.jsx
    - FormularioEdicion.jsx
    - Login2.jsx
    - ProductoDetalle.jsx
    - ProductosContainer.jsx
    - Nav.jsx
    - Footer.jsx
    - Main.jsx
    - About.jsx
  /contexts
    - AuthContext.jsx
    - CarritoContext.jsx
    - BusquedaContext.jsx
  /layouts
    - Home.jsx
    - Productos.jsx
  /auth
    - firebase.js
```

---

## 🛠️ Tecnologías utilizadas

- ReactJS + Vite
- Firebase (Authentication)
- Context API + Hooks (`useState`, `useContext`, `useEffect`, `useParams`)
- Bootstrap (responsive)
- react-toastify (notificaciones)
- SweetAlert
- JavaScript (ES6+)
- CSS personalizado
- React Icons
- Helmet

---

## 👥 Usuarios

Usuarios registrados en Firebase para acceder a la aplicación y verificar las funcionalidades:

- 👤 **Usuario normal**
  - Correo: `test@test.com`
  - Clave: `123456`

- 🛠️ **Usuario administrador**
  - Correo: `admin@gmail.com`
  - Clave: `test12`

Además, la aplicación permite **crear nuevos usuarios** mediante el formulario de registro, los cuales serán autenticados y gestionados por Firebase.

---

## 👨‍💻 Autor del proyecto

Richard Itanare

Este proyecto fue realizado como entrega final del curso de ReactJS (Argentina Programa). Fue diseñado con enfoque en buenas prácticas, separación de componentes, y experiencia de usuario.

---

## 📷 Capturas de la aplicación

- Home con listado de productos.
- Detalle de producto.
- Panel de administración.
- Carrito de compras.
- Formulario de contacto.
- Vista mobile.