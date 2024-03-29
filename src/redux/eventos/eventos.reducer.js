const INITIAL_STATE = {
  eventos: [],
  eventosFiltrados: [],
  eventosCalendar:[],
  loading: false,
  evento: null,
  error: null,
  isCalendarOpen:false,
  eventosEnviados: "",
  filtradosFromCalendar:false
};
export const eventosReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "LOADING_EVENTOS":
      return { ...state, loading: true, error: null };
    case "GET_EVENTOS":
      return { ...state, loading: false, eventos: [...action.contenido] };
    case "GET_EVENTOSCALENDAR":
      return { ...state, loading: false, eventosCalendar: [...action.contenido] };
    case "GET_EVENTO":
      return { ...state, loading: false, evento: action.contenido };
    case "ADD_EVENTO":
      return {
        ...state,
        loading: false,
        eventos: [...state.eventos, action.contenido],
      };
    case "EDIT_EVENTO":
      return {
        ...state,
        eventos: state.eventos.map((evento) =>
          evento._id === action.id ? { ...evento, ...action.datos } : evento
        ),
        evento:
          state.evento._id === action.id
            ? { ...state.evento, ...action.datos }
            : state.evento,
        loading: false,
        error: null,
      };
    case "DELETE_EVENTO":
      return {
        ...state,
        eventos: state.eventos.filter(
          (evento) => evento._id !== action.contenido
        ),
      };
    case "GET_EVENTOBYID":
      return {
        ...state,
        loading: false,
        evento: state.eventos.find((evento) => evento._id === action.contenido),
      };

    case "EVENTOS_ENVIADOS":
      return {
        ...state,
        loading: false,
        eventosEnviados: action.contenido,
      };
    case "CLEAR_EVENTO":
      return { ...state, evento: null };
      break;
    case "ERROR_EVENTO":
      return {
        ...state,
        loading: false,
        error: action.contenido,
      };
    case "CLEAR_MENSAJES":
      return {
        ...state,
        eventosEnviados: "",
        error: null,
      };
      case "GET_EVENTOSFILTRADOS":
        
        return {
          ...state,
          loading: false,
          eventosFiltrados: action.contenido,
        };
      case "SET_FILTRADOSFROMCALENDAR":
        return{
          ...state,
          filtradosFromCalendar:true
        }
      case "DELETE_EVENTOSFILTRADOS":
        return{
          ...state,
          filtradosFromCalendar:false,
          eventosFiltrados:[],
        }
      case "TOGGLE_CALENDAR":
        return{
          ...state,
          isCalendarOpen:action.contenido
        }
    default:
      return state;
  }
};
