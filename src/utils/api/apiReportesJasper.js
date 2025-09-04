"use server";

import axios from "axios";
import environment from "@/config/enviroment";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

const BASE_URL = environment.url_backend_reportes;
const username = environment.user_geoserver;
const password = environment.pass_geoserver;

const api = axios.create({
  baseURL: BASE_URL,
  maxContentLength: 50 * 1024 * 1024, // 10MB
  maxBodyLength: 50 * 1024 * 1024, // 10MB
});

export const makeGetRequestJasper = async (url, params = {}) => {
  const session = await getServerSession(authOptions);
  try {
    const response = await api.get(url, {
      params,
      headers: {
        Authorization: `Bearer ${session?.user?.backendTokens?.accessToken}`,
      },
    });
    return response;
  } catch (error) {
    console.error("Error making GET request:", error);
    throw error;
  }
};

export const makePostRequestJasper = async (url, data = {}) => {
  const session = await getServerSession(authOptions);
  try {
    const response = await api.post(url, data, {
      headers: {
        Authorization: `Bearer ${session?.user?.backendTokens?.accessToken}`,
      },
    }); 
    return response.data;
  } catch (error) {
    console.error("Error making POST request:" + url, error);
    throw error;
  }
};

export const makePutRequestJasper = async (url, data = {}) => {
  const session = await getServerSession(authOptions);
  try {
    const response = await api.put(url, data, {
      headers: {
        Authorization: `Bearer ${session?.user?.backendTokens?.accessToken}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error making PUT request:", error);
    throw error;
  }
};

export const makeDeleteRequestJasper = async (url) => {
  const session = await getServerSession(authOptions);
  try {
    const response = await api.delete(url, {
      headers: {
        Authorization: `Bearer ${session?.user?.backendTokens?.accessToken}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error making DELETE request:", error);
    throw error;
  }
};
