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

export function esAnterior(fecha){
  const fechaActual = new Date()
  const  fechaEvento = new Date(fecha)

  return fechaActual>fechaEvento
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

import { format, formatDistanceToNow, parseISO } from "date-fns";
import { gl } from "date-fns/locale";

/**
 * Formatea la fecha de un evento con formato largo
 * @param {string} dateString - La fecha en formato ISO
 * @returns {string} - La fecha formateada (ej: "15 novembro, 20:00")
 */
export function formatearFechaEvento(dateString) {
  if (!dateString) return null;
  const fechaEvento = parseISO(dateString);
  return format(fechaEvento, " dd MMMM, HH:mm", { locale: gl });
}

/**
 * Calcula los días faltantes para un evento
 * @param {string} dateString - La fecha en formato ISO
 * @returns {string} - Los días faltantes en formato legible (ej: "3 días")
 */
export function calcularDiasFaltantes(dateString) {
  if (!dateString) return null;
  const fechaEvento = parseISO(dateString);
  return formatDistanceToNow(fechaEvento, {
    unit: "day",
    locale: gl,
  });
}
