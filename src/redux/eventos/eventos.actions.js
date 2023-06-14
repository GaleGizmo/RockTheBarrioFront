import { API, APIIMAGES } from "../../shared/api.js";
import store from "../store.js";

const { dispatch } = store;

const getAllEventos = () => async () => {
  dispatch({ type: "LOADING_EVENTOS" });

  const resultado = await API.get("/evento");

  dispatch({ type: "GET_EVENTOS", contenido: resultado.data });
};

const getEventoById = (id) => async () => {
  dispatch({ type: "CLEAR_EVENTO" });
  dispatch({ type: "LOADING_EVENTOS" });

  const resultado = await API.get(`/evento/getbyid/${id}`);
  dispatch({ type: "GET_EVENTO", contenido: resultado.data });
};

const addEvento = (eventoData, navigate, userId) => async () => {
  dispatch({ type: "LOADING_EVENTOS" });

  try {
    const formData = new FormData();
    eventoData.user_creator = userId.user;

    formData.append("title", eventoData.title);
    formData.append("subtitle", eventoData.subtitle);
    formData.append("site", eventoData.site);
    formData.append("price", eventoData.price);
    formData.append("date_start", eventoData.date_start);
    if (eventoData.date_end) {
      formData.append("date_end", eventoData.date_end);
    }

    formData.append("genre", eventoData.genre);
    formData.append("content", eventoData.content);
    formData.append("url", eventoData.url);
    if (eventoData.image[0] !== undefined) {
      formData.append("image", eventoData.image[0]);
    }
    formData.append("user_creator", eventoData.user_creator);

    // APIIMAGES.post("/evento", formData).then((resultado) => {
    //   dispatch({ type: "ADD_EVENTO", contenido: resultado.data });
    //   navigate("/");
    // });

    const resultado = await APIIMAGES.post("/evento", formData);
    dispatch({ type: "ADD_EVENTO", contenido: resultado.data });
    navigate("/");

    // dispatch({ type: "ADD_EVENTO", contenido: resultado.data });
  } catch (error) {
    dispatch({ type: "ERROR_EVENTO", contenido: error.message });
  }
};
const editEvento = (id, eventoData, navigate) => {
  return async (dispatch) => {
    dispatch({ type: "LOADING_EVENTOS" });

    try {
      const formData = new FormData();

      formData.append("title", eventoData.title);
      formData.append("subtitle", eventoData.subtitle);
      formData.append("site", eventoData.site);
      formData.append("price", eventoData.price);
      formData.append("date_start", eventoData.date_start);
      if (eventoData.date_end) {
        formData.append("date_end", eventoData.date_end);
      }

      formData.append("genre", eventoData.genre);
      formData.append("content", eventoData.content);
      formData.append("url", eventoData.url);
      if (eventoData.image[0] !== undefined) {
        formData.append("image", eventoData.image[0]);
      }
      const resultado = await APIIMAGES.put(`/evento/${id}`, formData);

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
    await API.delete(`/evento/${eventoId}`);
    dispatch({ type: "DELETE_EVENTO", contenido: eventoId });
    navigate("/");
  } catch (error) {
    dispatch({ type: "ERROR_EVENTO", contenido: error.message });
  }
};

export { getAllEventos, getEventoById, addEvento, deleteEvento, editEvento };
