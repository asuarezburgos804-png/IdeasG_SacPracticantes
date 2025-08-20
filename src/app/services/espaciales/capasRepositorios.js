import { makeDeleteRequest, makeGetRequest, makePostRequest, makePutRequest } from "@/utils/api/api";

// Crear un nuevo estilo
export async function registrarEstiloCapa(request) {
  try {
    const data = await makePostRequest("/import/repo-estilos", request);
    return data;
  } catch (e) {
    throw e;
  }
}

// Crear un nuevo estilo
export async function registrarEstiloCapaGeoserver(request) {
  try {
    const data = await makePostRequest("/import/geoserver/publicar-estilo", request);
    return data;
  } catch (e) {
    throw e;
  }
}

// Obtener todos los estilos
export async function obtenerEstilosCapas() {
  try {
    const data = await makeGetRequest("/import/repo-estilos");
    return data;
  } catch (e) {
    throw e;
  }
}

// Obtener un estilo por ID
export async function obtenerEstiloCapaPorId(id) {
  try {
    const data = await makeGetRequest(`/import/repo-estilos/${id}`);
    return data.data;
  } catch (e) {
    throw e;
  }
}

// Actualizar un estilo por ID
export async function actualizarEstiloCapa(id, request) {
  try {
    const data = await makePutRequest(`/import/repo-estilos/${id}`, request);
    return data;
  } catch (e) {
    throw e;
  }
}

// Eliminar un estilo por ID
export async function eliminarEstiloCapa(id) {
  try {
    const data = await makeDeleteRequest(`/import/repo-estilos/${id}`);
    return data;
  } catch (e) {
    throw e;
  }
}