"use server";

import axios from "axios";
import environment from "@/config/enviroment";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

const BASE_URL = environment.url_backend_master;

export const makeGetRequest = async (url, params = {}) => {
  const session = await getServerSession(authOptions);
  const headers = {};

  if (session?.user?.backendTokens?.accessToken) {
    headers["Authorization"] = `Bearer ${session.user.backendTokens.accessToken}`;
  }

  // Construir URL con parámetros
  const urlWithParams = new URL(`${BASE_URL}${url}`);
  Object.keys(params).forEach(key => 
    urlWithParams.searchParams.append(key, params[key])
  );

  const response = await fetch(urlWithParams.toString(), {
    method: "GET",
    headers,
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.mensaje || errorData.error || "Error desconocido");
  }

  return response.json();
};

export const makePostRequest = async (url, data = {}) => {
  const session = await getServerSession(authOptions);

  const headers = {};

  if (session?.user?.backendTokens?.accessToken) {
    headers["Authorization"] = `Bearer ${session.user.backendTokens.accessToken}`;
  }

  const fetchOptions = {
    method: "POST",
    headers,
    body: undefined,
  };

  if (data instanceof FormData) {
    fetchOptions.body = data;
    // No seteamos Content-Type, el navegador lo hace
  } else {
    headers["Content-Type"] = "application/json";
    fetchOptions.body = JSON.stringify(data);
  }

  const response = await fetch(`${BASE_URL}${url}`, fetchOptions);
  // console.log("Response status:", response.status, "for URL:", url);
  if (!response.ok) {
    const errorData = await response.json();
    // console.log("Error response data:", errorData);
    throw new Error(errorData.mensaje || errorData.error || "Error desconocido");
  }

  return response.json();
};

export const makePutRequest = async (url, data = {}) => {
  const session = await getServerSession(authOptions);
  const headers = {};

  if (session?.user?.backendTokens?.accessToken) {
    headers["Authorization"] = `Bearer ${session.user.backendTokens.accessToken}`;
  }

  const fetchOptions = {
    method: "PUT",
    headers,
    body: undefined,
  };

  if (data instanceof FormData) {
    fetchOptions.body = data;
    // No seteamos Content-Type, el navegador lo hace
  } else {
    headers["Content-Type"] = "application/json";
    fetchOptions.body = JSON.stringify(data);
  }

  const response = await fetch(`${BASE_URL}${url}`, fetchOptions);

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.mensaje || errorData.error || "Error desconocido");
  }

  return response.json();
};


export const makeDeleteRequest = async (url) => {
  const session = await getServerSession(authOptions);
  const headers = {};

  if (session?.user?.backendTokens?.accessToken) {
    headers["Authorization"] = `Bearer ${session.user.backendTokens.accessToken}`;
  }

  const response = await fetch(`${BASE_URL}${url}`, {
    method: "DELETE",
    headers,
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.mensaje || errorData.error || "Error desconocido");
  }

  return response.json();
};