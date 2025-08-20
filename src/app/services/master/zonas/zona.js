// src/services/zona.js

import Zona from "@/app/interfaces/Zona";
import {
  makeDeleteRequest,
  makeGetRequest,
  makePostRequest,
  makePutRequest,
} from "@/utils/api/api";

const BASE_URL_ZONA = "/bizgis/servicios/zonas";

export async function fetchZonas() {
  const data = await makeGetRequest(BASE_URL_ZONA);
  console.log(data.message);
  return (data.data || []).map(Zona.fromJson);
}

export async function fetchZonaById(id) {
  const data = await makeGetRequest(`${BASE_URL_ZONA}/${id}`);
  console.log(data.message);
  return data.data ? new Zona(data.data) : null;
}

export async function createZona(zona) {
  const data = await makePostRequest(BASE_URL_ZONA, zona.toPayload());
  console.log(data.message);
  return data.data ? new Zona(data.data) : null;
}

export async function updateZona(zona) {
  const data = await makePutRequest(
    `${BASE_URL_ZONA}/${zona.id}`,
    zona.toPayload()
  );
  console.log(data.message);
  return data.data ? new Zona(data.data) : null;
}

export async function deleteZona(id) {
  const data = await makeDeleteRequest(`${BASE_URL_ZONA}/${id}`);
  console.log(data.message);
  return data.rows ?? 0;
}
