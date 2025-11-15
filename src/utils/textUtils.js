/**
 * Verifica si un título es largo y no contiene espacios
 * @param {string} title - El título a verificar
 * @returns {boolean} - True si el título es largo sin espacios
 */
export const isLongTitle = (title) => {
  return title && title.length > 10 && !title.includes(" ");
};
