import { API, APIIMAGES, getToken } from "../../shared/api.js";
import store from "../store.js";

const { dispatch } = store;



const getEventosDesdeHoy = () => async () => {
  dispatch({ type: "LOADING_EVENTOS" });

  const resultado = await API.get(`/evento/eventosDesdeHoy`);

  dispatch({ type: "GET_EVENTOS", contenido: resultado.data });

}

const getEventosParaCalendar=()=>async ()=>{
  dispatch({ type: "LOADING_EVENTOS" });

  const resultado = await API.get(`/evento/eventosParaCalendar`);

  dispatch({ type: "GET_EVENTOSCALENDAR", contenido: resultado.data });


}
const sendEventosDiarios = () => async (dispatch) => {
 
  try {
    clearMensajes()
    const response=await API.get("/evento/sendEventosDiarios/");
    dispatch({ type: "EVENTOS_ENVIADOS", contenido: response.data.message });
  } catch (error) {
    dispatch({ type: "ERROR_EVENTO", contenido: error.response.data.message });
    throw error
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

const createFormData = (eventoData) => {
  const formData = new FormData();

  formData.append("title", eventoData.title);
  formData.append("artist", eventoData.artist);
  formData.append("site", eventoData.site);
  formData.append("price", eventoData.price);
  formData.append("date_start", eventoData.date_start);
  if (eventoData.date_end) {
    formData.append("date_end", eventoData.date_end);
  }
  if (eventoData.youtubeVideoId) {
    formData.append("youtubeVideoId", eventoData.youtubeVideoId);
  }
  if(eventoData.status) {
    formData.append("status", eventoData.status);
  }
  formData.append("buy_ticket", eventoData.buy_ticket);
  formData.append("payWhatYouWant", eventoData.payWhatYouWant)
  formData.append("genre", eventoData.genre);
  formData.append("content", eventoData.content);
  formData.append("url", eventoData.url);
  if (eventoData.image[0] !== undefined && eventoData.image[0]!=="h") {
    formData.append("image", eventoData.image[0]);
  } else if (eventoData.image[0]==="h") {
    formData.append("image", eventoData.image);
  }
  formData.append("user_creator", eventoData.user_creator);

  return formData;
};

const addEvento = (eventoData, navigate, userId) => async (dispatch) => {
  dispatch({ type: "LOADING_EVENTOS" });

  try {
    eventoData.user_creator = userId.user;
    const formData = createFormData(eventoData);
    formData.forEach((value, key) => {
      console.log(`${key}: ${value}`);
    });
    const resultado = await APIIMAGES.post("/evento", formData, getToken());
    dispatch({ type: "ADD_EVENTO", contenido: resultado.data });
    navigate("/");
    return Promise.resolve(resultado);
  } catch (error) {
    dispatch({ type: "ERROR_EVENTO", contenido: error.message });
    return Promise.reject(error);
  }
};

const editEvento = (id, eventoData, navigate) => {
  return async (dispatch) => {
    dispatch({ type: "LOADING_EVENTOS" });

    try {
      const formData = createFormData(eventoData);

      const resultado = await APIIMAGES.put(`/evento/${id}`, formData, getToken());

      dispatch({
        type: "EDIT_EVENTO",
        contenido: { id: id, datos: resultado.data },
      });

      navigate(`/evento/${id}`);
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
  return  { type: "CLEAR_MENSAJES" };
};

const setEvento = (eventoId) => (dispatch) => {
  dispatch({ type: "GET_EVENTOBYID", contenido: eventoId });
};
const setFiltradosFromCalendar=()=>(dispatch)=>{
  dispatch({type: "SET_FILTRADOSFROMCALENDAR"})
}
const setFilteredEventos =(resultadoFiltrado)=>(dispatch)=>{
  dispatch({ type: "GET_EVENTOSFILTRADOS", contenido: resultadoFiltrado })
}
const toggleCalendar=(data)=>(dispatch)=>{
  dispatch({type: "TOGGLE_CALENDAR", contenido:data})
}
const deleteFilteredEventos =()=>(dispatch)=>{
  dispatch({type: "DELETE_EVENTOSFILTRADOS"})
}
export {
  
  getEventosDesdeHoy,
  getEventosParaCalendar,
  getEventoById,
  addEvento,
  deleteEvento,
  editEvento,
  sendEventosDiarios,
  clearMensajes,
  setEvento,
  setFilteredEventos,
  deleteFilteredEventos,
  toggleCalendar,
  setFiltradosFromCalendar
};
