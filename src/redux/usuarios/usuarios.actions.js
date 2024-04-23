import { API, APIIMAGES, getToken } from "../../shared/api";
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
  dispatch({ type: "CLEAR_ERROR" });
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
      dispatch({ type: "ERROR_USUARIO", contenido: "Error descoñecido" });
    }
  }
};

const updateLocalStorage = (userData) => {
  dispatch({
    type: "SET_USER",
    contenido: userData,
  });
  localStorage.setItem("user", JSON.stringify(userData));
};

const updateUserSubscriptions = (unsubscribe) => {
  dispatch({
    type: "CHANGE_SUBSCRIPTION_SUCCESS",
    contenido: {
      fieldToUpdate: unsubscribe,

      message: "Axustes de suscripción modificados",
    },
  });
  const userData = JSON.parse(localStorage.getItem("user"));

  // Verificar si el objeto user existe y si la propiedad coincide con unsubscribe
  if (userData && userData[unsubscribe] !== undefined) {
    // Cambiar el valor de la propiedad a false
    userData[unsubscribe] = false;

    // Actualizar el objeto user en el localStorage
    localStorage.setItem("user", JSON.stringify(userData));
  }
};

const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  dispatch({ type: "LOGOUT" });
};

// const checkSesion = () => () => {
//   try {
//     const userJson = localStorage.getItem("user");
//     const tokenJson = localStorage.getItem("token");

//     if (userJson && tokenJson) {
//       dispatch({
//         type: "LOGIN",
//         contenido: {
//           user: JSON.parse(userJson),
//           token: tokenJson,
//         },
//       });
//     }
//   } catch (error) {
//     console.log(error);
//   }
// };

const registerUser = (datos, navigate) => async () => {
  dispatch({ type: "CLEAR_ERROR" });
  try {
    const resultado = await APIIMAGES.post("/usuario/register", datos);

    setUserData(resultado, navigate);
  } catch (error) {
    if (error.response && error.response.data && error.response.data.message) {
      dispatch({
        type: "ERROR_USUARIO",
        contenido: error.response.data.message,
      });
    } else {
      dispatch({ type: "ERROR_USUARIO", contenido: "Error descoñecido" });
    }
  }
};
const updateUser = (datos, userId, navigate) => async (dispatch) => {
  dispatch({ type: "CLEAR_ERROR" });
  try {
    const resultado = await APIIMAGES.put(
      `/usuario/${userId}`,
      datos,
      getToken()
    );
    console.log(resultado.data);

    updateLocalStorage(resultado.data);
    navigate("/");
  } catch (error) {
    if (error.response && error.response.data && error.response.data.message) {
      dispatch({
        type: "ERROR_USUARIO",
        contenido: error.response.data.message,
      });
    } else {
      dispatch({ type: "ERROR_USUARIO", contenido: "Error descoñecido" });
    }
  }
};

const deleteUser = (userId, navigate) => async () => {
  dispatch({ type: "CLEAR_ERROR" });
  try {
    await API.delete(`/usuario/${userId}`, getToken());
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
      dispatch({ type: "ERROR_USUARIO", contenido: "Error descoñecido" });
    }
  }
};
const forgotPassword = (email) => async () => {
  dispatch({ type: "LOADING_USUARIOS" });
  dispatch({ type: "CLEAR_ERROR" });
  try {
    await API.post("/usuario/recuperar-password/", { email });
    dispatch({
      type: "FORGOT_PASSWORD_SUCCESS",
      contenido:
        "Enviouse un correo electrónico de recuperación de contrasinal.",
    });
  } catch (error) {
    if (error.response && error.response.data && error.response.data.message) {
      dispatch({
        type: "ERROR_USUARIO",
        contenido: error.response.data.message,
      });
    } else {
      dispatch({ type: "ERROR_USUARIO", contenido: "Error descoñecido" });
    }
  }
};
const resetPassword = (token, password, navigate) => async () => {
  dispatch({ type: "LOADING_USUARIOS" });
  dispatch({ type: "CLEAR_ERROR" });
  try {
    await API.post("/usuario/reset-password", { token, password });
    navigate("/login");
  } catch (error) {
    if (error.response && error.response.data && error.response.data.message) {
      dispatch({
        type: "ERROR_USUARIO",
        contenido: error.response.data.message,
      });
    } else {
      dispatch({ type: "ERROR_USUARIO", contenido: "Error descoñecido" });
    }
  }
};
const unsubscribeEmail = (email, unsubscribe, userId) => async (dispatch) => {
  dispatch({ type: "LOADING_USUARIOS" });
  dispatch({ type: "CLEAR_ERROR" });
  try {
    await API.put(`/usuario/reset-password/unsubscribe/${userId}`, {
      email,
      unsubscribe,
    });
    updateUserSubscriptions(unsubscribe);
    // dispatch({
    //   type: "FORGOT_PASSWORD_SUCCESS",
    //   contenido: "Axustes de suscripción modificados",
    // });
    return true;
  } catch (error) {
    if (error.response && error.response.data && error.response.data.message) {
      dispatch({
        type: "ERROR_USUARIO",
        contenido: error.response.data.message,
      });
    } else {
      dispatch({ type: "ERROR_USUARIO", contenido: "Error descoñecido" });
    }
    return false;
  }
};
const addToFavorites = (eventId, userId, add) => async () => {
  dispatch({ type: "LOADING_USUARIOS" });
  dispatch({ type: "CLEAR_ERROR" });
  try {
    const response=await API.patch(`/usuario/add-favorite`, { eventId, userId, add });
    const user = JSON.parse(localStorage.getItem("user"));
    const updatedUser = {
      ...user,
      favorites: add
        ? [...user.favorites, eventId]
        : user.favorites.filter((id) => id !== eventId),
    };
    dispatch({ type: "SET_USER", contenido: updatedUser });
    localStorage.setItem("user", JSON.stringify(updatedUser));
    return response
  } catch (error) {
    if (error.response && error.response.data && error.response.data.message) {
      dispatch({
        type: "ERROR_USUARIO",
        contenido: error.response.data.message,
      });
    } else {
      dispatch({ type: "ERROR_USUARIO", contenido: "Error descoñecido" });
    }
  }
};
const clearError = () => () => {
  dispatch({ type: "CLEAR_ERROR" });
};

export {
  login,
  logout,
  updateLocalStorage,
  registerUser,
  updateUser,
  resetPassword,
  forgotPassword,
  unsubscribeEmail,
  deleteUser,
  addToFavorites,
  clearError,
};
