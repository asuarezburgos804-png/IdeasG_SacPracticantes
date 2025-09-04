import {
  makeGetRequest,
  makePostRequest,
  makeDeleteRequest,
  makePutRequest,
} from "@/utils/api/api";

export async function getFichaCotitular(id_ficha) {
  try {
    const data = await makeGetRequest(
      "/catastro/fcuco/obtener_ficha_co/" + id_ficha
    );

    return data;
  } catch (e) {
    throw e;
  }
}

export async function postDatosCotitular(requestData) {
  try {
    const data = await makePostRequest(
      "/catastro/fcuco/cotitular/registrar",
      requestData
    );
    return data;
  } catch (e) {
    throw e;
  }
}

export async function putDatosCotitular(requestData) {
  try {
    const data = await makePutRequest(
      "/catastro/fcuco/cotitular/actualizar/",
      requestData
    );

    return data;
  } catch (e) {
    throw e;
  }
}

export async function deleteDatosCotitular(id_cotitular) {
  try {
    const data = await makeDeleteRequest(
      "/catastro/fcuco/cotitular/eliminar/" + id_cotitular
    );
    return data;
  } catch (e) {
    throw e;
  }
}
