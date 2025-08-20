import {
  makeDeleteRequest,
  makeGetRequest,
  makePostRequest,
  makePutRequest,
} from "@/utils/api/api";

//**ACTIVIDADES */
export async function fetchGetActividades() {
  try {
    const data = await makeGetRequest("/suite/actividades");
    return data;
  } catch (e) {
    throw e;
  }
}

export async function fetchPostActividades(requestData) {
  try {
    const data = await makePostRequest("/suite/actividades", requestData);
    return data;
  } catch (e) {
    throw e;
  }
}

export async function fetchActividades(requestData, action) {
  try {
    let data;
    if (action == 3) {
      data = await makeDeleteRequest(
        "/suite/actividades/" + requestData.id_actividad
      );
    } else if (action == 2) {
      data = await makePutRequest(
        "/suite/actividades/" + requestData.id_actividad,
        requestData
      );
    }
    return data;
  } catch (e) {
    throw e;
  }
}

//**Fotos */

export async function fetchGetFotos(requestData) {
  try {
    const data = await makeGetRequest(
      "/suite/actividades/fotos?id_actividad=" + requestData
    );
    return data;
  } catch (e) {
    throw e;
  }
}

export async function fetchPostFotos(requestData) {
  try {
    const data = await makePostRequest("/suite/actividades/fotos", requestData);
    return data;
  } catch (e) {
    throw e;
  }
}
