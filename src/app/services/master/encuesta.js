import {
  makeDeleteRequest,
  makeGetRequest,
  makePostRequest,
  makePutRequest,
} from "@/utils/api/api";

export async function fetchGetAreas() {
  try {
    const data = await makeGetRequest("/movil/obtenerAreas");
    return data.data;
  } catch (e) {
    throw e;
  }
}

//** MOVIL DATA */
export async function fetchGetDataMovil(requestData) {
  try {
    const data = await makeGetRequest(
      "/movil/datosPorCoordenada/" + requestData
    );
    return data.data;
  } catch (e) {
    throw e;
  }
}

//**ENCUESTAS */
export async function fetchGetEncuesta(requestData) {
  try {
    const data = await makeGetRequest("/movil/obtenerEncuesta/" + requestData);
    return data.data;
  } catch (e) {
    throw e;
  }
}

export async function fetchPostEncuesta(requestData) {
  try {
    const data = await makePostRequest("/movil/insertarEncuesta", requestData);
    return data.data;
  } catch (e) {
    throw e;
  }
}

export async function fetchEncuesta(requestData, action) {
  try {
    let data;
    if (action == 3) {
      data = await makeDeleteRequest(
        "/movil/eliminarEncuesta/" + requestData.id_encuesta
      );
    } else if (action == 2) {
      data = await makePutRequest(
        "/movil/actualizarEncuesta/" + requestData.id_encuesta,
        requestData
      );
    }
    return data;
  } catch (e) {
    throw e;
  }
}

//**PREGUNTAS */
export async function fetchGetPreguntas(requestData) {
  try {
    const data = await makeGetRequest(
      "/movil/obtenerPreguntaEncuesta/" + requestData
    );
    return data.data;
  } catch (e) {
    throw e;
  }
}

export async function fetchPostPregunta(requestData) {
  try {
    const data = await makePostRequest(
      "/movil/insertarPreguntaEncuesta",
      requestData
    );
    return data.data;
  } catch (e) {
    throw e;
  }
}

export async function fetchPregunta(requestData, action) {
  try {
    let data;
    if (action == 3) {
      data = await makeDeleteRequest(
        "/movil/eliminarPreguntaEncuesta/" + requestData.id_pregunta_encuesta
      );
    } else if (action == 2) {
      data = await makePutRequest(
        "/movil/actualizarPreguntaEncuesta/" + requestData.id_pregunta_encuesta,
        requestData
      );
    }
    return data;
  } catch (e) {
    throw e;
  }
}
