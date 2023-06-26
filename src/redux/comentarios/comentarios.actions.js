import { API } from "../../shared/api.js";
import store from "../store.js";

const { dispatch } = store;

const getAllComentarios = () => async () => {
  dispatch({ type: "LOADING_COMENTARIOS" });
  try {
    const resultado = await API.get("/comentario");
    dispatch({ type: "GET_COMENTARIOS", contenido: resultado.data });
  } catch (error) {
    dispatch({
      type: "ERROR_COMENTARIOS",
      contenido: error.response.data.message,
    });
  }
};

const addComentario = (comentarioData, eventId) => async (dispatch) => {
  dispatch({ type: "LOADING_COMENTARIOS" });
  try {
    await API.post("/comentario", comentarioData);
    // const resultadoGet = await API.get(`/comentario/getbyevent/${eventId}`)
    // console.log(resultadoGet);
    // dispatch({ type: "ADD_COMENTARIO", contenido: resultadoGet.data });
   
    getComentariosByEvent(eventId);
  } catch (error) {
    dispatch({
      type: "ERROR_COMENTARIOS",
      contenido: error.response.data.message,
    });
  }
};

const getComentariosByEvent = async (eventId) => {
  dispatch({ type: "LOADING_COMENTARIOS" });
  try {
    const resultado = await API.get(`/comentario/getbyevent/${eventId}`);

    dispatch({ type: "GET_COMENTARIOSBYEVENTO", contenido: resultado.data });
  } catch (error) {
    dispatch({
      type: "ERROR_COMENTARIOS",
      contenido: error.response.data.message,
    });
  }
};

const editComentario = (idComentario, comentarioData) => async (dispatch) => {
  dispatch({ type: "LOADING_COMENTARIOS" });
  try {
    const resultado = await API.put(
      `/comentario/${idComentario}`,
      comentarioData
    );
getComentariosByEvent(resultado.data.event)
    console.log(resultado.data);

    dispatch({ type: "EDIT_COMENTARIO", contenido: resultado.data });
  } catch (error) {
    dispatch({
      type: "ERROR_COMENTARIOS",
      contenido: error.response.data.message,
    });
  }
};

const deleteComentario = (idComentario) => async () => {
  dispatch({ type: "LOADING_COMENTARIOS" });
  try {
    const resultado = await API.delete(`/comentario/${idComentario}`);

    dispatch({ type: "DELETE_COMENTARIO", contenido: resultado.data });
  } catch (error) {
    dispatch({ type: "ERROR_COMENTARIOS", contenido: error.message });
  }
};

export {
  addComentario,
  getAllComentarios,
  getComentariosByEvent,
  editComentario,
  deleteComentario,
};
