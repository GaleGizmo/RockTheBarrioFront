export function formatDate(dateString) {
    const dateObj = new Date(dateString);
    const opciones = {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      locale: "gl-ES",
    };
    return dateObj.toLocaleDateString("gl-ES", opciones);
  }
  
  export function esHoy(fecha) {
    const fechaActual = new Date();
    const fechaIntroducida= new Date(fecha)
    const opciones = {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
      locale: "gl-ES",
    };
    const  fechaIntroducidaFormateada=fechaIntroducida.toLocaleDateString("gl-ES", opciones)
    const fechaActualFormateada = fechaActual.toLocaleDateString(
      "gl-ES",
      opciones
    );
    return fechaIntroducidaFormateada === fechaActualFormateada;
  }