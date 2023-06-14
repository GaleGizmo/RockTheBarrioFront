const INITIAL_STATE = {
  comentarios: [],
  loading: false,
  error: null, // Agregamos una propiedad "error" al estado inicial
};

export const comentariosReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "LOADING_COMENTARIOS":
      return { ...state, loading: true, error: null };

    case "GET_COMENTARIOSBYEVENTO":
      return {
        ...state,
        loading: false,
        comentarios: action.contenido,
        error: null,
      };

    case "ADD_COMENTARIO":
      return {
        ...state,
        loading: false,
        comentarios: [...state.comentarios, action.contenido],
        error: null,
      };

    case "EDIT_COMENTARIO":
      return {
        ...state,
        loading: false,
        comentarios: state.comentarios.map((comentario) =>
          comentario._id === action.contenido._id
            ? action.contenido
            : comentario
        ),
        error: null,
      };

    case "DELETE_COMENTARIO":
      return {
        ...state,
        loading: false,
        comentarios: state.comentarios.filter(
          (comentario) => comentario._id !== action.contenido._id
        ),
        error: null,
      };

    case "ERROR_COMENTARIOS":
      return {
        ...state,
        loading: false,
        error: action.contenido,
      };

    default:
      return state;
  }
};
