export function formatDate(dateString) {
    const dateObj = new Date(dateString);
    const opciones = {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      locale: "es-ES",
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
      locale: "es-ES",
    };
    const  fechaIntroducidaFormateada=fechaIntroducida.toLocaleDateString("es-ES", opciones)
    const fechaActualFormateada = fechaActual.toLocaleDateString(
      "es-ES",
      opciones
    );
    return fechaIntroducidaFormateada === fechaActualFormateada;
  }