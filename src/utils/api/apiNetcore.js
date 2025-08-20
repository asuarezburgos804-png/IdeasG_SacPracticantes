import axios from "axios";
import environment from "@/config/enviroment";

const BASE_URL = environment.url_backend_netcore;

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    // Authorization: `Bearer ${"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWRfY2xpZW50ZSI6MSwiaWF0IjoxNjk3MTI0NTAwLCJleHAiOjE2OTc3MjkzMDB9.pWd6JkabjleW7PSHOQf3T68UNrsQHRJqc4B1rvoLa5g"}`,
  },
});
const apiTemp = axios.create({
  baseURL: "https://dniruc.apisperu.com/api/v1/dni/",
  // Puedes agregar configuraciones adicionales aquí, como headers, etc.
});

export const makeGetReniec = async (url, params = {}) => {
  try {
    const response = await apiTemp.get(url, { params });
    return response.data;
  } catch (error) {
    console.error("Error making GET request:", error);
    throw error;
  }
};

export const makeGetRequest = async (url, params = {}) => {
  try {
    const response = await api.get(url, { params });
    return response.data;
  } catch (error) {
    console.error("Error making GET request:", error);
    throw error;
  }
};

export const makePostRequestFormData = async (url, formData) => {
  try {
    const response = await api.post(url, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error haciendo la solicitud POST:", error);
    throw error;
  }
};

export const makePostRequest = async (url, data = {}) => {
  try {
    const response = await api.post(url, data);
    return response.data;
  } catch (error) {
    console.error("Error making POST request:", error);
    throw error;
  }
};

export const getFile = async (url, data = {}) => {
  try {

      axios({
        url: BASE_URL+url,
        method: 'POST',
        responseType: 'blob', // Especifica que la respuesta será un objeto Blob
        data: data,
      })
      .then(response => {
        // Crear un enlace temporal y asignarle la respuesta del Blob
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.download = 'archivo.xlsx'; // Nombre del archivo a descargar
        link.click();
  
        // Liberar los recursos creados para el enlace
        window.URL.revokeObjectURL(url);
      })
      .catch(error => {
        console.error('Error al descargar el archivo:', error);
        // Manejar el error de descarga del archivo
      });

    const response = await api.post(url, data);
    return response.data;
  } catch (error) {
    console.error("Error making POST request:", error);
    throw error;
  }
};

export const makePutRequest = async (url, data = {}) => {
  try {
    const response = await api.put(url, data);
    return response.data;
  } catch (error) {
    console.error("Error making PUT request:", error);
    throw error;
  }
};

export const makePatchRequest = async (url, data = {}) => {
  try {
    const response = await api.patch(url, data);
    return response.data;
  } catch (error) {
    console.error("Error making PATCH request:", error);
    throw error;
  }
};

export const makeDeleteRequest = async (url) => {
  try {
    const response = await api.delete(url);
    return response.data;
  } catch (error) {
    console.error("Error making DELETE request:", error);
    throw error;
  }
};
