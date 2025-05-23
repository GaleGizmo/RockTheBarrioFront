import axios from "axios";

export const APIHeaders = {
  Accept: "application/json",
  "Content-Type": "application/json",
  "Access-Control-Allow-Origin": "*",
 
};

export const API = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_URL_LOCAL,
  headers: APIHeaders,
});
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
export const APIHeaders2 = {
  Accept: "application/json",
  "Content-Type": "multipart/form-data",
  "Access-Control-Allow-Origin": "*",
  
};

export const APIIMAGES = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_URL_LOCAL,
  headers: APIHeaders2,
});
APIIMAGES.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
export const getToken =()=>{
  const token=localStorage.getItem("token")
  const config = {
    headers: {
      "Authorization": `Bearer ${token}`,
    },
  };
  return config
}
export const sendCorreccion = async (correccion) => {
 
  const response = await API.post(`/evento/correccion`, correccion);
  
  return response.data;
};

export const addMessage = async (messageData) => {
 
  const response = await API.post(`/usuario/message`, messageData);

  return response.data;
};

export const getBorradores = async () => {
  const response = await API.get(`/borrador`);
  return response.data;
}
export const getBorrador = async (id) => {
  const response = await API.get(`/borrador/getbyid/${id}`);
  return response.data;
};
export const addBorrador = async (borradorData) => {
  
 
  try {
    const response = await APIIMAGES.post(`/borrador`, borradorData);
    
    return response;
  } catch (err) {
    console.error("Error ao engadir o borrador:", err);
    throw err;
  }
};
export const editBorrador = async (id, borradorData) => {
  const response = await APIIMAGES.put(`/borrador/${id}`, borradorData);
  return response.data;
};