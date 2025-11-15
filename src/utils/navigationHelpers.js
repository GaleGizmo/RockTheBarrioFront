/**
 * Navega a la página de inicio
 * @param {function} navigate - La función de navegación de react-router
 */
export const goToHome = (navigate) => {
  navigate("/");
};

/**
 * Navega a la página de edición de un evento
 * @param {function} navigate - La función de navegación de react-router
 * @param {string} eventoId - El ID del evento a editar
 */
export const goToEditEvento = (navigate, eventoId) => {
  navigate(`/editar-evento/${eventoId}`);
};
