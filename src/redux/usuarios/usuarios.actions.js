import { API, APIIMAGES } from "../../shared/api";
import store from "../store";

const { dispatch } = store;

const setUserData = (resultado, navigate) => {
  dispatch({
    type: "LOGIN",
    contenido: {
      user: resultado.data.user,
      token: resultado.data.token,
    },
  });

  localStorage.setItem("token", resultado.data.token);
  localStorage.setItem("user", JSON.stringify(resultado.data.user));

  navigate("/");
};

const login = (datos, navigate) => async () => {
  dispatch({ type: "LOADING_USUARIOS_LOGIN" });
  try {
    const resultado = await API.post("/usuario/login", datos);
    setUserData(resultado, navigate);
  } catch (error) {
    if (error.response && error.response.data && error.response.data.message) {
      dispatch({
        type: "ERROR_USUARIO",
        contenido: error.response.data.message,
      });
    } else {
      dispatch({ type: "ERROR_USUARIO", contenido: "Error desconocido" });
    }
  }
};

const setUser = (userData) => {
  return {
    type: "SET_USER",
    contenido: userData,
  };
};

const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  dispatch({ type: "LOGOUT" });
};

const checkSesion = () => () => {
  try {
    const userJson = localStorage.getItem("user");
    const tokenJson = localStorage.getItem("token");

    if (userJson && tokenJson) {
      dispatch({
        type: "LOGIN",
        contenido: {
          user: JSON.parse(userJson),
          token: tokenJson.replaceAll('"', ""),
        },
      });
    }
  } catch (error) {
    console.log(error);
  }
};

const registerUser = (datos, navigate) => async () => {
  try {
    const formData = new FormData();
    datos.birthday=""
    formData.append("email", datos.email);
    formData.append("username", datos.username);
    formData.append("password", datos.password);
    formData.append("birthday", datos.birthday);
    formData.append("newsletter", datos.newsletter);
    formData.append("newevent", datos.newevent);
    if (datos.image[0] !== undefined) {
      formData.append("avatar", datos.image[0]);
    }

    const resultado = await APIIMAGES.post("/usuario/register", formData);
    dispatch({ type: "SET_USER", contenido: resultado.data.user });
    setUserData(resultado, navigate);
  } catch (error) {
    
    if (error.response && error.response.data && error.response.data.message) {
      dispatch({
        type: "ERROR_USUARIO",
        contenido: error.response.data.message,
      });
    } else {
      dispatch({ type: "ERROR_USUARIO", contenido: "Error desconocido" });
    }
  }
};
const updateUser = (datos, navigate) => async (dispatch) => {
  try {
    const formData = new FormData();
    datos.birthday="";
    
    formData.append("email", datos.email);
    formData.append("username", datos.username);
    // formData.append("password", datos.password);
    formData.append("birthday", datos.birthday);
    formData.append("newsletter", datos.newsletter);
    formData.append("newevent", datos.newevent);
    if (datos.image[0] !== undefined) {
      formData.append("avatar", datos.image[0]);
    }

    const resultado = await APIIMAGES.put(`/usuario/${datos._id}`, formData);
    dispatch({ type: "SET_USER", contenido: resultado.data.user });
    
    navigate("/perfil");

  } catch (error) {
    if (error.response && error.response.data && error.response.data.message) {
      dispatch({
        type: "ERROR_USUARIO",
        contenido: error.response.data.message,
      });
    } else {
      dispatch({ type: "ERROR_USUARIO", contenido: "Error desconocido" });
    }
  }
};

const deleteUser = (userId, navigate) => async () => {
  try {
    await API.delete(`/usuario/${userId}`);
    dispatch({ type: "LOGOUT" });
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  } catch (error) {
    if (error.response && error.response.data && error.response.data.message) {
      dispatch({
        type: "ERROR_USUARIO",
        contenido: error.response.data.message,
      });
    } else {
      dispatch({ type: "ERROR_USUARIO", contenido: "Error desconocido" });
    }
  }
};
const forgotPassword = (email) => async () => {
  dispatch({ type: "LOADING_USUARIOS" });
  try {
    await API.post("/usuario/recuperar-password/", { email });
    dispatch({ type: "FORGOT_PASSWORD_SUCCESS", contenido: "Enviouse un correo electrónico de recuperación de contrasinal"});
  } catch (error) {
    if (error.response && error.response.data && error.response.data.message) {
      dispatch({ type: "ERROR_USUARIO", contenido: error.response.data.message });
    } else {
      dispatch({ type: "ERROR_USUARIO", contenido: "Error desconocido" });
    }
  }
};
const resetPassword = (token, password, navigate) => async () => {
  dispatch({ type: "LOADING_USUARIOS" });
  try {
    await API.post("/usuario/reset-password", { token, password });
    navigate("/login")
  } catch (error) {
    if (error.response && error.response.data && error.response.data.message) {
      dispatch({ type: "ERROR_USUARIO", contenido: error.response.data.message });
    } else {
      dispatch({ type: "ERROR_USUARIO", contenido: "Error desconocido" });
    }
  }
};
const unsubscribeEmail = (email, unsubscribe, userId, navigate)=> async ()=>{
  dispatch({ type: "LOADING_USUARIOS" });
  try {
    await API.put(`/usuario/reset-password/unsubscribe/${userId}`, { email, unsubscribe });
    dispatch({ type: "FORGOT_PASSWORD_SUCCESS", contenido: "Axustes de suscripción modificados"});

    navigate("/")
  } catch (error) {
    if (error.response && error.response.data && error.response.data.message) {
      dispatch({ type: "ERROR_USUARIO", contenido: error.response.data.message });
    } else {
      dispatch({ type: "ERROR_USUARIO", contenido: "Error desconocido" });
    }
  }
}
const addToFavorites=(eventId, userId, add)=> async()=>{
  dispatch({ type: "LOADING_USUARIOS" });
  
  try {
    await API.patch(`/usuario/add-favorite`, { eventId, userId, add });
    const user = JSON.parse(localStorage.getItem("user"));
    const updatedUser = { ...user, favorites: add ? [...user.favorites, eventId] : user.favorites.filter(id => id !== eventId) };
    dispatch({ type: "SET_USER", contenido: updatedUser });
    localStorage.setItem("user", JSON.stringify(updatedUser));

      } catch (error) {
    if (error.response && error.response.data && error.response.data.message) {
      dispatch({ type: "ERROR_USUARIO", contenido: error.response.data.message });
    } else {
      dispatch({ type: "ERROR_USUARIO", contenido: "Error desconocido" });
    }
  }
}
export { login, logout, setUser, checkSesion, registerUser, updateUser, resetPassword, forgotPassword, unsubscribeEmail, deleteUser, addToFavorites};
