import {
  addBorrador,
  API,
  APIIMAGES,
  editBorrador,
  getBorrador,
  getBorradores,
  getEventosFromFestival,
  getToken,
} from "../../shared/api.js";
import store from "../store.js";

const { dispatch } = store;

const getEventosDesdeHoy = () => async () => {
  dispatch({ type: "LOADING_EVENTOS" });

  const resultado = await API.get(`/evento/eventosDesdeHoy`);

  dispatch({ type: "GET_EVENTOS", contenido: resultado.data });
};

const getEventosParaCalendar = () => async () => {
  dispatch({ type: "LOADING_EVENTOS" });

  const resultado = await API.get(`/evento/eventosParaCalendar`);

  dispatch({ type: "GET_EVENTOSCALENDAR", contenido: resultado.data });
};
const sendEventosDiarios = () => async (dispatch) => {
  try {
    clearMensajes();
    const response = await API.get("/evento/sendEventosDiarios/");
    dispatch({ type: "EVENTOS_ENVIADOS", contenido: response.data.message });
  } catch (error) {
    dispatch({ type: "ERROR_EVENTO", contenido: error.response.data.message });
    throw error;
  }
};

const getEventoById = (id) => async (dispatch) => {
  dispatch({ type: "CLEAR_EVENTO" });
  dispatch({ type: "LOADING_EVENTOS" });
  try {
    const resultado = await API.get(`/evento/getbyid/${id}`);

    dispatch({ type: "GET_EVENTO", contenido: resultado.data });
  } catch (error) {
    dispatch({ type: "ERROR_EVENTO", contenido: error.message });
  }
};

const getEventosFromFestivalAction = (festivalId) => async (dispatch) => {
  dispatch({ type: "LOADING_EVENTOS" });
  dispatch({ type: "DELETE_EVENTOSFILTRADOS" });
  try {
    const resultado = await getEventosFromFestival(festivalId);
    dispatch({
      type: "SET_EVENTOSFILTRADOS",
      contenido: { eventos: resultado, isEventoEspecial: true },
    });
  } catch (error) {
    dispatch({ type: "ERROR_EVENTO", contenido: error.message });
  }
};

const getBorradoresAction = () => async (dispatch) => {
  dispatch({ type: "LOADING_EVENTOS" });
  try {
    const resultado = await getBorradores();
    dispatch({ type: "GET_BORRADORES", contenido: resultado });
  } catch (error) {
    dispatch({ type: "ERROR_EVENTO", contenido: error.message });
  }
};
const getBorradorById = (id) => async (dispatch) => {
  dispatch({ type: "CLEAR_BORRADOR" });
  dispatch({ type: "LOADING_EVENTOS" });
  try {
    const resultado = await getBorrador(id);
    console.log("resultado", resultado);
    dispatch({ type: "GET_BORRADOR", contenido: resultado });
  } catch (error) {
    dispatch({ type: "ERROR_EVENTO", contenido: error.message });
  }
};
const createFormData = (eventoData) => {
  const formData = new FormData();

  try {
    formData.append("title", eventoData.title);
    formData.append("artist", eventoData.artist || "");
    formData.append("site", eventoData.site || "");
    formData.append("location", eventoData.location || "");
    formData.append("price", eventoData.price || 0);
    formData.append("date_start", eventoData.date_start || "");
    formData.append("youtubeVideoId", eventoData.youtubeVideoId || "");
    formData.append("status", eventoData.status);
    formData.append("buy_ticket", eventoData.buy_ticket || "");
    formData.append("payWhatYouWant", eventoData.payWhatYouWant);
    formData.append("genre", eventoData.genre || "");
    formData.append("content", eventoData.content);
    formData.append("url", eventoData.url || "");
    formData.append("highlighted", eventoData.highlighted);
    if (eventoData.image && eventoData.image[0] !== "h") {
      formData.append("image", eventoData.image[0]);
    } else if (eventoData.image && eventoData.image[0] === "h") {
      formData.append("image", eventoData.image);
    } else if (eventoData.image == null) {
      formData.append("image", "");
    }
    formData.append("user_creator", eventoData.user_creator);
  } catch (err) {
    console.error("Error ao crear FormData:", err);
  }

  return formData;
};

const addEvento = (eventoData, navigate, userId) => async (dispatch) => {
  dispatch({ type: "LOADING_EVENTOS" });

  try {
    eventoData.user_creator = userId.user;
    const formData = createFormData(eventoData);
    if (eventoData.status === "draft") {
      const addedDraft = await addBorrador(formData);
      
      navigate("/");
      return Promise.resolve(addedDraft);
    } else {
      const resultado = await APIIMAGES.post("/evento", formData, getToken());
     
      dispatch({ type: "ADD_EVENTO", contenido: resultado.data });
      navigate("/" + resultado.data.evento._id, { state: { fromCreate: true } });
      return Promise.resolve(resultado);
    }
  } catch (error) {
    dispatch({ type: "ERROR_EVENTO", contenido: error.message });
    return Promise.reject(error);
  }
};

const editEvento = (id, eventoData, navigate) => {
  return async (dispatch) => {
    dispatch({ type: "LOADING_EVENTOS" });
    console.log("id", id, "eventoData", eventoData);
    try {
      const formData = createFormData(eventoData);
      let resultado;
      if (eventoData.status === "draft") {
        resultado = await editBorrador(id, eventoData);
        dispatch({
          type: "EDIT_BORRADOR",
          contenido: { id: id, datos: resultado.data },
        });
        navigate("/");
      } else {
        resultado = await APIIMAGES.put(`/evento/${id}`, formData, getToken());
        dispatch({
          type: "EDIT_EVENTO",
          contenido: { id: id, datos: resultado.data },
        });

        navigate(`/evento/${id}`);
      }
    } catch (error) {
      dispatch({ type: "ERROR_EVENTO", contenido: error.message });
    }
  };
};

const deleteEvento = (eventoId, navigate) => async () => {
  dispatch({ type: "LOADING_EVENTOS" });

  try {
    await API.delete(`/evento/${eventoId}`, getToken());
    dispatch({ type: "DELETE_EVENTO", contenido: eventoId });
    navigate("/");
  } catch (error) {
    dispatch({ type: "ERROR_EVENTO", contenido: error.message });
  }
};
const clearMensajes = () => {
  return { type: "CLEAR_MENSAJES" };
};

const setEvento = (eventoId) => (dispatch) => {
  dispatch({ type: "GET_EVENTOBYID", contenido: eventoId });
};
const setFiltradosFromCalendar = () => (dispatch) => {
  dispatch({ type: "SET_FILTRADOSFROMCALENDAR" });
};
const setFilteredEventos = (resultadoFiltrado) => (dispatch) => {
  dispatch({
    type: "SET_EVENTOSFILTRADOS",
    contenido: { eventos: resultadoFiltrado, isEventoEspecial: false },
  });
};
const toggleCalendar = (data) => (dispatch) => {
  dispatch({ type: "TOGGLE_CALENDAR", contenido: data });
};
const deleteFilteredEventos = () => (dispatch) => {
  dispatch({ type: "DELETE_EVENTOSFILTRADOS" });
};
export {
  getEventosDesdeHoy,
  getEventosParaCalendar,
  getEventoById,
  getEventosFromFestivalAction,
  getBorradoresAction,
  addEvento,
  deleteEvento,
  editEvento,
  sendEventosDiarios,
  clearMensajes,
  setEvento,
  setFilteredEventos,
  deleteFilteredEventos,
  toggleCalendar,
  setFiltradosFromCalendar,
  getBorradorById,
};
