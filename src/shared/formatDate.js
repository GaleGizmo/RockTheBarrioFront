export function formatDate(dateString) {
    const dateObj = new Date(dateString);
    const opciones = {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
    };
    return dateObj.toLocaleDateString("es-ES", opciones);
  }
  
  export function esHoy(fecha) {
    const fechaActual = new Date();
    const fechaIntroducida= new Date(fecha)
    const opciones = {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
    };
    const  fechaIntroducidaFormateada=fechaIntroducida.toLocaleDateString("es-Es", opciones)
    const fechaActualFormateada = fechaActual.toLocaleDateString(
      "es-ES",
      opciones
    );
    return fechaIntroducidaFormateada === fechaActualFormateada;
  }