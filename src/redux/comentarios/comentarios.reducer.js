const INITIAL_STATE = {
  comentarios: [],
  loading: false,
  error: null, 
  escribiendoComentario: false
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
    case "SWITCH_CREATECOMENTARIO":
      return {
        ...state,
        escribiendoComentario: action.contenido
      }
    case "ERROR_COMENTARIOS":
      return {
        ...state,
        loading: false,
        error: action.contenido,
      };
    case "CLEAR_ERRORCOMENTARIOS":
      return {
        ...state,
        error: null,
      }  
    default:
      return state;
  }
};
