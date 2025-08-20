"use server";

import axios from "axios";
import environment from "@/config/enviroment";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { cookies } from "next/headers";

const BASE_URL = environment.url_backend;
const username = environment.user_geoserver;
const password = environment.pass_geoserver;

const api = axios.create({
  baseURL: BASE_URL,
  maxContentLength: 50 * 1024 * 1024, // 10MB
  maxBodyLength: 50 * 1024 * 1024, // 10MB
});

export const makeGetRequest = async (url, params = {}) => {
  const session = await getServerSession(authOptions);  
  const id_cliente = cookies().get("id_cliente")?.value;
  try {
    const response = await api.get(url, {
      params,
      headers: {
        Authorization: `Bearer ${session?.user?.backendTokens?.accessToken}`,
        "x-id-cliente": id_cliente,
      },
    });
    return response.data;
  } catch (error) {
    console.log("url : ", url);
    console.error("Error making GET request:", error?.response?.data?.message);
    throw error?.response?.data?.message;
  }
};

export const makeGetRequestOpenlayer = async (url, params = {}) => {
  try {
    const response = await api.get(url, {
      params,
      headers: {
        Authorization: `Basic ${btoa(`${username}:${password}`)}`, // Codifica las credenciales en base64
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error making GET request:", error);
    throw error;
  }
};

export const makeGetRequestOpenlayerWithCredentials = async (url, customCredentials = null) => {
  try {
    // Usar credenciales personalizadas si se proporcionan, sino usar las globales
    const credentials = customCredentials || { username, password };
    
    const response = await api.get(url, {
      headers: {
        Authorization: `Basic ${btoa(`${credentials.username}:${credentials.password}`)}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error making GET request with custom credentials:", error);
    throw error;
  }
};

export const makeGetRequestOpenlayerExterno = async (url, params = {}) => {
  try {
    const response = await api.get(url, {
      params,
      headers: {
        // Authorization: `Basic ${btoa(`${username}:${password}`)}`, // Codifica las credenciales en base64
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error making GET request:", error);
    throw error;
  }
};

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

export const makePostRequestFormData = async (url, formData) => {
  const session = await getServerSession(authOptions);
  try {
    const response = await api.post(url, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${session?.user?.backendTokens?.accessToken}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error haciendo la solicitud POST:", error);
    throw error;
  }
};
export const makePutRequestFormData = async (url, formData) => {
  const session = await getServerSession(authOptions);
  try {
    const response = await api.put(url, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${session?.user?.backendTokens?.accessToken}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error haciendo la solicitud PUT:", error);
    throw error;
  }
};

export const makePostRequest = async (url, data = {}) => {
  const session = await getServerSession(authOptions);
  const id_cliente = cookies().get("id_cliente")?.value;
  try {
    const response = await api.post(url, data, {
      headers: {
        Authorization: `Bearer ${session?.user?.backendTokens?.accessToken}`,
        "x-id-cliente": id_cliente,
      },
    }); 
    return response.data;
  } catch (error) {
    console.error("Error making POST request:" + url, error);
    throw error;
  }
};

export const makePutRequest = async (url, data = {}) => {
  const session = await getServerSession(authOptions);  
  const id_cliente = cookies().get("id_cliente")?.value;
  try {
    const response = await api.put(url, data, {
      headers: {
        Authorization: `Bearer ${session?.user?.backendTokens?.accessToken}`,
        "x-id-cliente": id_cliente,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error making PUT request:", error);
    throw error;
  }
};

export const makePatchRequest = async (url, data = {}) => {
  const session = await getServerSession(authOptions);
  try {
    const response = await api.patch(url, data, {
      headers: {
        Authorization: `Bearer ${session?.user?.backendTokens?.accessToken}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error making PATCH request:", error);
    throw error;
  }
};

export const makeDeleteRequest = async (url) => {
  const session = await getServerSession(authOptions);
  const id_cliente = cookies().get("id_cliente")?.value;
  try {
    const response = await api.delete(url, {
      headers: {
        Authorization: `Bearer ${session?.user?.backendTokens?.accessToken}`,
        "x-id-cliente": id_cliente,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error making DELETE request:", error);
    throw error;
  }
};


export const makeDeleteRequestData = async (url, data = {}) => {
    const session = await getServerSession(authOptions);
    try {
        const response = await api.delete(url, {
            data, // Incluye el cuerpo de la solicitud
            headers: {
                Authorization: `Bearer ${session?.user.backendTokens.accessToken}`,
                'Content-Type': 'application/json', // Especifica el tipo de contenido
                'Accept': 'application/json' // Especifica el tipo de respuesta esperada
            }
        });
        return response.data;
    } catch (error) {
        console.error("Error making DELETE request:", error.response?.data || error.message);
        throw error;
    }
};