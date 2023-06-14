export function formatDate(dateString) {
  const dateObj = new Date(dateString);
  return dateObj.toLocaleDateString("es-ES", opciones);
}
export function esHoy(fecha) {
  const fechaActual = new Date();
  const fechaActualFormateada = fechaActual.toLocaleDateString(
    "es-ES",
    opciones
  );
  return fecha === fechaActualFormateada;
}

const opciones = {
  weekday: "short",
  year: "numeric",
  month: "short",
  day: "numeric",
};
