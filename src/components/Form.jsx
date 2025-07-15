import React, { useState } from 'react'; 

export default function Formulario() { 
  const [nombre, setNombre] = useState(''); // Estado para guardar lo que el usuario escribe

  // Cuando se envía el formulario
  function manejarEnvio(evento) { 
      evento.preventDefault(); 
      alert(`Formulario enviado por: ${nombre}`); 
      setNombre(''); // Limpiar el campo después de enviar
  } 

  return ( 
      <form onSubmit={manejarEnvio}> 
          {/* Campo para escribir el nombre */}
          <input
              type="text" 
              value={nombre} 
              onChange={(e) => setNombre(e.target.value)} 
              placeholder="Ingresa tu nombre" 
          /> 
          {/* Botón para enviar */}
          <button type="submit">Enviar</button> 
      </form> 
  ); 
}  