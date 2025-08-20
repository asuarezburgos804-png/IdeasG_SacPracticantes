"use client";

import axios from "axios";
import environment from "@/config/enviroment";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

const BASE_URL = environment.url_backend;

const api = axios.create({
  baseURL: BASE_URL,
});

export const getFile = async (url, data = {}) => {
  try {
    const response = await axios({
      url: BASE_URL + url,
      method: "POST",
      responseType: "blob", // Especifica que la respuesta será un objeto Blob
      data: data,
    });

    // Crear un enlace temporal y asignarle la respuesta del Blob
    const blob = new Blob([response.data], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });
    const urlExcel = window.URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = urlExcel;
    link.download = "archivo.xlsx"; // Nombre del archivo a descargar
    link.click();

    // Liberar los recursos creados para el enlace
    window.URL.revokeObjectURL(urlExcel);

    return response.data;
  } catch (error) {
    console.error("Error al descargar el archivo Excel:", error);
    throw error;
  }
};
export const getFileExcel = async (url, params = {}) => {
  try {
    const response = await axios({
      url: BASE_URL + url,
      method: "GET",
      responseType: "blob",
      params: params,
    });

    console.log(response);
    const blob = new Blob([response.data], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });
    const fileSizeInBytes = blob.size;
    const fileSizeInKB = (fileSizeInBytes / 1024).toFixed(2);

    if (fileSizeInKB > 0.1) {
      const urlExcel = window.URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = urlExcel;
      link.download = "archivo.xlsx";
      link.click();

      window.URL.revokeObjectURL(urlExcel);
    } else {
      window.alert("No se encontraron datos para exportar");
    }

    return response.data;
  } catch (error) {
    console.error("Error al descargar el archivo Excel:", error);
    throw error;
  }
};

export const getFileShape = async (url, data = {}) => {
  try {
    axios({
      url: BASE_URL + url,
      method: "POST",
      responseType: "blob", // Especifica que la respuesta será un objeto Blob
      data: data,
    })
      .then((response) => {
        // Crear un enlace temporal y asignarle la respuesta del Blob
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement("a");
        link.href = url;
        link.download = "archivo.zip"; // Nombre del archivo a descargar
        link.click();

        // Liberar los recursos creados para el enlace
        window.URL.revokeObjectURL(url);
      })
      .catch((error) => {
        console.error("Error al descargar el archivo:", error);
        // Manejar el error de descarga del archivo
      });

    const response = await api.post(url, data);
    return response.data;
  } catch (error) {
    console.error("Error making POST request:", error);
    throw error;
  }
};

export const getFileJson = async (url, data = {}) => {
  try {
    axios({
      url: BASE_URL + url,
      method: "POST",
      responseType: "blob", // Especifica que la respuesta será un objeto Blob
      data: data,
    })
      .then((response) => {
        // Crear un enlace temporal y asignarle la respuesta del Blob
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement("a");
        link.href = url;
        link.download = "data.json"; // Nombre del archivo a descargar
        link.click();

        // Liberar los recursos creados para el enlace
        window.URL.revokeObjectURL(url);
      })
      .catch((error) => {
        console.error("Error al descargar el archivo:", error);
        // Manejar el error de descarga del archivo
      });

    const response = await api.post(url, data);
    return response.data;
  } catch (error) {
    console.error("Error making POST request:", error);
    throw error;
  }
};

export const getFileGeoJSON = async (url, data = {}) => {
  try {
    axios({
      url: BASE_URL + url,
      method: "POST",
      responseType: "blob", // Especifica que la respuesta será un objeto Blob
      data: data,
    })
      .then((response) => {
        // Crear un enlace temporal y asignarle la respuesta del Blob
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement("a");
        link.href = url;
        link.download = "data.geojson"; // Nombre del archivo a descargar
        link.click();

        // Liberar los recursos creados para el enlace
        window.URL.revokeObjectURL(url);
      })
      .catch((error) => {
        console.error("Error al descargar el archivo:", error);
        // Manejar el error de descarga del archivo
      });

    const response = await api.post(url, data);
    return response.data;
  } catch (error) {
    console.error("Error making POST request:", error);
    throw error;
  }
};
