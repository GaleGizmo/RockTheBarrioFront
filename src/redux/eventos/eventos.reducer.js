import { getBorradores } from "../../shared/api";

const INITIAL_STATE = {
  eventos: [],
  eventosFiltrados: [],
  eventosCalendar: [],
  borradores: [],
  borrador: null,
  isSpecialEvent: false,
  loading: false,
  evento: null,
  error: null,
  isCalendarOpen: false,
  eventosEnviados: "",
  filtradosFromCalendar: false,
};
export const eventosReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "LOADING_EVENTOS":
      return { ...state, loading: true, error: null };
    case "GET_EVENTOS":
      return { ...state, loading: false, eventos: [...action.contenido] };
    case "GET_EVENTOSCALENDAR":
      return {
        ...state,
        loading: false,
        eventosCalendar: [...action.contenido],
      };
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
    case "GET_BORRADORES":
      return {
        ...state,
        loading: false,
        borradores: action.contenido,
      };
    case "GET_BORRADOR":
      return {
        ...state,
        loading: false,
        borrador: action.contenido,
      };
    case "ADD_BORRADOR":
      return {
        ...state,
        loading: false,
        borradores: [...state.borradores, action.contenido],
      };
    case "EDIT_BORRADOR":
      return {
        ...state,
        borradores: state.borradores.map((borrador) =>
          borrador._id === action.id
            ? { ...borrador, ...action.datos }
            : borrador
        ),
        borrador:
          state.borrador._id === action.id
            ? { ...state.borrador, ...action.datos }
            : state.borrador,
        loading: false,
        error: null,
      };
    case "DELETE_BORRADOR":
      return {
        ...state,
        borradores: state.borradores.filter(
          (borrador) => borrador._id !== action.contenido
        ),
      };
 
    case "EVENTOS_ENVIADOS":
      return {
        ...state,
        loading: false,
        eventosEnviados: action.contenido,
      };
    case "CLEAR_EVENTO":
      return { ...state, evento: null };

    case "CLEAR_BORRADOR":
      return { ...state, borrador: null };

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
    case "SET_EVENTOSFILTRADOS":
      return {
        ...state,
        loading: false,
        isSpecialEvent: action.contenido.isEventoEspecial,
        eventosFiltrados: action.contenido.eventos,
      };
    case "SET_FILTRADOSFROMCALENDAR":
      return {
        ...state,
        filtradosFromCalendar: true,
      };
    case "DELETE_EVENTOSFILTRADOS":
      return {
        ...state,
        filtradosFromCalendar: false,
        eventosFiltrados: [],
      };
    case "TOGGLE_CALENDAR":
      return {
        ...state,
        isCalendarOpen: action.contenido,
      };
    default:
      return state;
  }
};
