/**
 * Maneja el error cuando una imagen no carga
 * Oculta la imagen fallida y muestra una imagen alternativa
 * @param {Event} e - El evento de error de la imagen
 */
export const handleImageError = (e) => {
  e.target.style.display = "none"; // Oculta la imagen que no carga
  if (e.target.nextSibling) {
    e.target.nextSibling.style.display = "block"; // Muestra el div genérico
  }
};
