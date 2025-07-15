import Swal from 'sweetalert2'

export const AlertaConfirmacionEliminacionProducto = (titulo, mensaje, icono, textoBoton, textoBotonC) => {
    return Swal.fire({
        title: titulo,
        html: mensaje,
        icon: icono,
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: textoBoton,
        cancelButtonText: textoBotonC,
    }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire({
                title: "¡Producto Eliminado!",
                text: "",
                icon: "success"
            });
            return true;
        }
        return false;
    });
}