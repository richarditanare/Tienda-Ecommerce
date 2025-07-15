import Swal from 'sweetalert2';

export function AlertaAgregarAlCarrito(titulo, mensaje, icono, textoBoton) {
    Swal.fire({
        title: titulo,
        html: mensaje,
        icon: icono,
        confirmButtonText: textoBoton,
    });
}

