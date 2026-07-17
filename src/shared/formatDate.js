import { format, formatDistanceToNow, parseISO } from "date-fns";
import { gl, es } from "date-fns/locale";

const getDateFnsLocale = (localeKey) =>
  String(localeKey || "gl").startsWith("es") ? es : gl;

export function formatDate(dateString, locale = "gl") {
  const dateObj = new Date(dateString);
  const localeKey = String(locale || "gl").startsWith("es") ? "es-ES" : "gl-ES";
  const opciones = {
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
   
  };
  return dateObj.toLocaleDateString(localeKey, opciones);
}

export function esAnterior(fecha){
  const fechaActual = new Date()
  const  fechaEvento = new Date(fecha)

  return fechaActual>fechaEvento
}

export function esHoy(fecha) {
  const fechaActual = new Date();
  const fechaIntroducida = new Date(fecha);
  return (
    fechaIntroducida.getFullYear() === fechaActual.getFullYear() &&
    fechaIntroducida.getMonth() === fechaActual.getMonth() &&
    fechaIntroducida.getDate() === fechaActual.getDate()
  );
}

/**
 * Formatea la fecha de un evento con formato largo
 * @param {string} dateString - La fecha en formato ISO
 * @returns {string} - La fecha formateada (ej: "15 novembro, 20:00")
 */
export function formatearFechaEvento(dateString, locale = "gl") {
  if (!dateString) return null;
  const fechaEvento = parseISO(dateString);
  return format(fechaEvento, " dd MMMM, HH:mm", {
    locale: getDateFnsLocale(locale),
  });
}

/**
 * Calcula los días faltantes para un evento
 * @param {string} dateString - La fecha en formato ISO
 * @returns {string} - Los días faltantes en formato legible (ej: "3 días")
 */
export function calcularDiasFaltantes(dateString, locale = "gl") {
  if (!dateString) return null;
  const fechaEvento = parseISO(dateString);
  return formatDistanceToNow(fechaEvento, {
    unit: "day",
    locale: getDateFnsLocale(locale),
  });
}
