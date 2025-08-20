import {
  makeGetRequest,
  makePostRequest,
  makeDeleteRequest,
  makePutRequest,
  makePostRequestFormData,
} from "@/utils/api/api";

export async function postSaveVia(requestData) {
  try {
    const data = await makePostRequest(
      "/fcuin/ubicacion_predio/add_vias",
      requestData
    );
    return data;
  } catch (e) {
    throw e;
  }
}

export async function putUpdateUbiPredio(requestData) {
  try {
    const data = await makePutRequest(
      "/fcuin/ubicacion_predio/" + requestData.id_ubicacion,
      requestData
    );
    return data;
  } catch (e) {
    throw e;
  }
}

export async function postSaveUbiPredio(requestData) {
  try {
    const data = await makePostRequest("/fcuin/ubicacion_predio", requestData);
    return data;
  } catch (e) {
    throw e;
  }
}

export async function deleteVia(requestData) {
  try {
    const data = await makeDeleteRequest(
      "/fcuin/ubicacion_predio/" + requestData
    );
    return data;
  } catch (e) {
    throw e;
  }
}

export async function getUbiPredio(requestData) {
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

//SERVICIOS BÁSICOS DEL PREDIO

export async function getServiciosPredio(requestData) {
  try {
    const data = await makeGetRequest("/tibc/servicio_predio", requestData);
    return data;
  } catch (e) {
    throw e;
  }
}

export async function putServicioPredio(requestData) {
  try {
    const data = await makePutRequest(
      "/tibc/servicio_predio/" + requestData.id_servicio,
      requestData
    );
    return data;
  } catch (e) {
    throw e;
  }
}

export async function postServicioPredio(requestData) {
  try {
    const data = await makePostRequest("/tibc/servicio_predio", requestData);
    return data;
  } catch (e) {
    throw e;
  }
}

//EVALUACION DEL PREDIO

export async function postEvaluacion(requestData) {
  try {
    const data = await makePostRequest(
      "/catastro/fcuin/evaluacion",
      requestData
    );
    return data;
  } catch (e) {
    throw e;
  }
}

export async function putEvaluacion(requestData, id_evaluacion) {
  try {
    const data = await makePutRequest(
      "/catastro/fcuin/evaluacion/" + id_evaluacion,
      requestData
    );
    return data;
  } catch (e) {
    throw e;
  }
}

export async function deleteEvaluacion(id_evaluacion) {
  try {
    const data = await makeDeleteRequest(
      "/catastro/fcuin/evaluacion/" + id_evaluacion
    );
    return data;
  } catch (e) {
    throw e;
  }
}

// FOTO FICHA
export async function fetchPostFotoFicha(formData) {
  try {
    const data = await makePostRequestFormData(
      "/catastro/fcuin/foto/registrar",
      formData
    );
    return data;
  } catch (e) {
    throw e;
  }
}

export async function fetchGetFotoFicha(idFicha) {
  try {
    const data = await makeGetRequest(
      "/catastro/fcuin/foto/obtener/" + idFicha
    );

    return data;
  } catch (e) {
    throw e;
  }
}

export async function fetchDeleteFotoFicha(idFoto) {
  try {
    const data = await makeDeleteRequest(
      "/catastro/fcuin/foto/eliminar/" + idFoto
    );
    return data;
  } catch (e) {
    throw e;
  }
}

export async function putUpdateIsPrincipal(body) {
  try {
    const data = await makePutRequest(
      "/catastro/fcuin/foto/set_principal",
      body
    );
    return data;
  } catch (e) {
    throw e;
  }
}

// ADD FICHA

export async function postAddFicha(formData) {
  try {
    const data = await makePostRequestFormData(
      "/catastro/fcuin/ficha_scan/registrar",
      formData
    );
    return data;
  } catch (e) {
    throw e;
  }
}

export async function getFichaScan(idFicha) {
  try {
    const data = await makeGetRequest(
      "/catastro/fcuin/ficha_scan/obtener/" + idFicha
    );
    return data;
  } catch (e) {
    throw e;
  }
}

// PLANOS
export async function postSavePlano(formData) {
  try {
    const data = await makePostRequestFormData(
      "/catastro/fcuin/plano/registrar",
      formData
    );
    return data;
  } catch (e) {
    throw e;
  }
}

export async function getPlano(idFicha) {
  try {
    const data = await makeGetRequest(
      "/catastro/fcuin/plano/obtener/" + idFicha
    );
    return data;
  } catch (e) {
    throw e;
  }
}
