import axios from "axios";

export const APIHeaders = {
  Accept: "application/json",
  "Content-Type": "application/json",
  "Access-Control-Allow-Origin": "*",
 
};

export const API = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_URL,
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
  baseURL: import.meta.env.VITE_APP_BASE_URL,
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
// export async function obtenerImagenesCloudinary() {
//   try {
//     const auth = btoa(`${import.meta.env.API_KEY}:${import.meta.env.API_SECRET}`);
//     const response = await axios.get(
//       `https://api.cloudinary.com/v1_1/${import.meta.env.CLOUD_NAME}/resources/image`,
//       {
//         headers: {
//           Authorization: `Basic ${auth}`,
//         },
//       }
//     );
//     return response.data.resources.map((img) => ({
//       public_id: img.public_id,
//       secure_url: img.secure_url,
//     }));
//   } catch (error) {
//     console.error("Error al obtener imágenes de Cloudinary:", error);
//     return [];
//   }
// }