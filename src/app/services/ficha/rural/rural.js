import {
  makeGetRequest,
  makePostRequest,
  makeDeleteRequest,
  makePutRequest,
} from "@/utils/api/api";

export async function getFichaRural(requestData) {
  try {
    const data = await makeGetRequest(
      "/catastro/fcrur/obtener_ficha_ru/" + requestData
    );
    return data;
  } catch (e) {
    throw e;
  }
}

export async function getIdentConductor(requestData) {
  try {
    const data = await makeGetRequest(
      "/fcuin/ubicacion_predio/detail",
      requestData
    );
    return data;
  } catch (e) {
    throw e;
  }
}

export async function getDomicFiscal(requestData) {
  try {
    const data = await makeGetRequest(
      "/fcuin/ubicacion_predio/detail",
      requestData
    );
    return data;
  } catch (e) {
    throw e;
  }
}

export async function getAutoFuncionamiento(requestData) {
  try {
    const data = await makeGetRequest(
      "/fcuin/ubicacion_predio/detail",
      requestData
    );
    return data;
  } catch (e) {
    throw e;
  }
}

export async function getAutoAnuncio(requestData) {
  try {
    const data = await makeGetRequest(
      "/fcuin/ubicacion_predio/detail",
      requestData
    );
    return data;
  } catch (e) {
    throw e;
  }
}

export async function getInfoComplementaria(requestData) {
  try {
    const data = await makeGetRequest(
      "/fcuin/ubicacion_predio/detail",
      requestData
    );
    return data;
  } catch (e) {
    throw e;
  }
}

export async function getObservacion(requestData) {
  try {
    const data = await makeGetRequest(
      "/fcuin/ubicacion_predio/detail",
      requestData
    );
    return data;
  } catch (e) {
    throw e;
  }
}

export async function getFirmante(requestData) {
  try {
    const data = await makeGetRequest(
      "/fcuin/ubicacion_predio/detail",
      requestData
    );
    return data;
  } catch (e) {
    throw e;
  }
}
