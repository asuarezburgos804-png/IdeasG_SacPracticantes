import { makeGetRequest, makePostRequest } from "@/utils/api/api";

export async function getEsquemasDb(request) {
  try {
    const data = await makeGetRequest("/importacion/esquemas");
    return data;
  } catch (e) {
    throw e;
  }
}

export async function getTablasByEsquemasDb(esquema) {
  try {
    const data = await makeGetRequest("/importacion/tablas/"+esquema);
    return data;
  } catch (e) {
    throw e;
  }
}

export async function getColumnsByTablaDb(tabla) {
  try {
    const data = await makeGetRequest("/importacion/columns/"+tabla);
    return data;
  } catch (e) {
    throw e;
  }
}