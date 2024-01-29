
export const alert_status_description = (status, extra) => {

    switch (status) {
        case 201:
            return {
                type: "success",
                msg: extra ? extra : "Registro Creado correctamente!",
            };
        case 200:
            return {
                type: "success",
                msg: extra ? extra : "Registro Editado correctamente!",
            };
        case 204:
            return {
                type: "success",
                msg: extra ? extra : "Registro Eliminado correctamente!",
            };
        case 400:
            return {
                type: "error",
                msg: extra ? extra : "Solicitud incorrecta. Revise los datos enviados.",
            };
        case 401:
            return {
                type: "error",
                msg: extra ? extra : "No autorizado. Inicie sesión para acceder.",
            };
        case 404:
            return {
                type: "error",
                msg: extra ? extra : "404! Recurso no encontrado",
            };
        case 405:
            return {
                type: "error",
                msg: extra ? extra : "Metodo no permitido. Verifique la URL.",
            };
        default:
            return {
                type: "error",
                msg: extra ? extra : "Error desconocido. Contáctese con el Equipo de Soporte",
            };
    }

} 