import {
  makeGetRequest,
  makePostRequest,
  makeDeleteRequest,
  makePutRequest,
} from "@/utils/api/api";
//OBTENER DATA FICHA INDIVIDUAL
export async function getFichaIndividual(id_ficha) {
  try {
    const data = await makeGetRequest(
      "/catastro/fcuin/obtener_ficha/" + id_ficha
    );
    return data;
  } catch (e) {
    throw e;
  }
}

//CARACTERISTICAS DE LA TITULARIDAD
export async function postCaracteristicasTitularidad(requestData) {
  try {
    const data = await makePostRequest(
      "/catastro/fcuin/caracteristicas",
      requestData
    );
    console.log(data);
    return data;
  } catch (e) {
    throw e;
  }
}
export async function putCaracteristicasTitularidad(
  requestData,
  id_caracteristica
) {
  try {
    const data = await makePutRequest(
      "/catastro/fcuin/caracteristicas/" + id_caracteristica,
      requestData
    );
    return data;
  } catch (e) {
    throw e;
  }
}

export async function deleteCaracteristicasTitularidad(id_caracteristica) {
  try {
    const data = await makeDeleteRequest(
      "/catastro/fcuin/caracteristicas/" + id_caracteristica
    );
    return data;
  } catch (e) {
    throw e;
  }
}

// UBICACION VIAS
export async function postUbicacionVias(requestData) {
  try {
    const data = await makePostRequest(
      "/catastro/fcuin/ubicacion_via",
      requestData
    );
    console.log("vias ubicacion", data);

    return data;
  } catch (e) {
    throw e;
  }
}

export async function putUbicacionVias(requestData, id_ubicacion) {
  try {
    const data = await makePutRequest(
      "/catastro/fcuin/ubicacion_via/" + id_ubicacion,
      requestData
    );
    return data;
  } catch (e) {
    throw e;
  }
}

export async function deleteUbicacionVias(id_ubicacion) {
  try {
    const data = await makeDeleteRequest(
      "/catastro/fcuin/ubicacion_via/" + id_ubicacion
    );
    return data;
  } catch (e) {
    throw e;
  }
}

//UBCIACION PREDIO
export async function postUbicacionPredio(requestData) {
  try {
    const data = await makePostRequest(
      "/catastro/fcuin/ubicacion_predio",
      requestData
    );
    return data;
  } catch (e) {
    throw e;
  }
}

export async function putUbicacionPredio(requestData, id_ubicacion) {
  try {
    const data = await makePutRequest(
      "/catastro/fcuin/ubicacion_predio/" + id_ubicacion,
      requestData
    );
    return data;
  } catch (e) {
    throw e;
  }
}

export async function deleteUbicacionPredio(id_ubicacion) {
  try {
    const data = await makeDeleteRequest(
      "/catastro/fcuin/ubicacion_predio/" + id_ubicacion
    );
    return data;
  } catch (e) {
    throw e;
  }
}

//DOCUMENTOS
export async function postDocumentos(requestData) {
  try {
    const data = await makePostRequest(
      "/catastro/fcuin/documentos",
      requestData
    );
    return data;
  } catch (e) {
    throw e;
  }
}

export async function putDocumentos(requestData, id_documento) {
  try {
    const data = await makePutRequest(
      "/catastro/fcuin/documentos/" + id_documento,
      requestData
    );
    return data;
  } catch (e) {
    throw e;
  }
}

export async function deleteDocumentos(id_documento) {
  try {
    const data = await makeDeleteRequest(
      "/catastro/fcuin/documentos/" + id_documento
    );
    return data;
  } catch (e) {
    throw e;
  }
}

//NOTARIA
export async function postDocumentosNotaria(requestData) {
  try {
    const data = await makePostRequest(
      "/catastro/fcuin/documentos_notarial",
      requestData
    );
    return data;
  } catch (e) {
    throw e;
  }
}

export async function putDocumentosNotaria(requestData, id_documento_notaria) {
  try {
    const data = await makePutRequest(
      "/catastro/fcuin/documentos_notarial/" + id_documento_notaria,
      requestData
    );
    return data;
  } catch (e) {
    throw e;
  }
}

export async function deleteDocumentosNotaria(id_documento_notaria) {
  try {
    const data = await makeDeleteRequest(
      "/catastro/fcuin/documentos_notarial/" + id_documento_notaria
    );
    return data;
  } catch (e) {
    throw e;
  }
}
