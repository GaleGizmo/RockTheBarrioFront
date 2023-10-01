import axios from "axios";

export const APIHeaders = {
  Accept: "application/json",
  "Content-Type": "application/json",
  "Access-Control-Allow-Origin": "*",
  Authorization: localStorage.getItem("token"),
};

export const API = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_URL,
  headers: APIHeaders,
});

export const APIHeaders2 = {
  Accept: "application/json",
  "Content-Type": "multipart/form-data",
  "Access-Control-Allow-Origin": "*",
  Authorization: localStorage.getItem("token"),
};

export const APIIMAGES = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_URL,
  headers: APIHeaders2,
});

export const getToken =()=>{
  const token=localStorage.getItem("token")
  const config = {
    headers: {
      "Authorization": `Bearer ${token}`,
    },
  };
  return config
}