export function formatDate(dateString, locale) {
  const dateObj = new Date(dateString);
  const opciones = {
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    locale
   
  };
  return dateObj.toLocaleDateString(locale, opciones);
}

export function esHoy(fecha) {
  const fechaActual = new Date();
  const fechaIntroducida = new Date(fecha);
  const opciones = {
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric",
    locale: "gl",
  };
  const fechaIntroducidaFormateada = fechaIntroducida.toLocaleDateString(
    "gl",
    opciones
  );
  const fechaActualFormateada = fechaActual.toLocaleDateString(
    "gl",
    opciones
  );
  return fechaIntroducidaFormateada === fechaActualFormateada;
}
