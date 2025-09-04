import {
  makeGetRequest,
  makePostRequest,
  makeDeleteRequest,
  makePutRequest,
  makePostRequestFormData,
} from "@/utils/api/apiMaster";

export async function obtenerPlanes() {
  try {
    const data = await makeGetRequest("/suite/ph/planes/listar");
    return data;
  } catch (e) {
    throw e;
  }
}
