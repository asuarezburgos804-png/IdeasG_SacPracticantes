import {
  makeGetRequest,
  makePostRequest,
  makeDeleteRequest,
  makePutRequest,
} from "@/utils/api/api";

//IDENTIFICACION DEL TITULAR  CATASTRAL

export async function postIdentificacionTitular(requestData) {
  try {
    const data = await makePostRequest("/catastro/tg/titular", requestData);
    return data;
  } catch (e) {
    throw e;
  }
}
export async function putIdentificacionTitular(requestData, id_titular) {
  try {
    const data = await makePutRequest(
      "/catastro/tg/titular/" + id_titular,
      requestData
    );
    return data;
  } catch (e) {
    throw e;
  }
}
export async function deleteIdentificacionTitular(id_titular) {
  try {
    const data = await makeDeleteRequest("/catastro/tg/titular/" + id_titular);
    return data;
  } catch (e) {
    throw e;
  }
}

//DOMICILIO FISCAL DEL TITULAR CATASTRAL

export async function postDomicilioFiscal(requestData) {
  try {
    const data = await makePostRequest("/catastro/tg/domicilio", requestData);
    return data;
  } catch (e) {
    throw e;
  }
}
export async function putDomicilioFiscal(requestData, id_domicilio) {
  console.log("Data received in putDomicilioFiscal:", requestData);
  try {
    const data = await makePutRequest(
      "/catastro/tg/domicilio/" + id_domicilio,
      requestData
    );
    console.log("Data received in putDomicilioFiscal:", data);
    return data;
  } catch (e) {
    throw e;
  }
}

export async function deleteDomicilioFiscal(id_domicilio) {
  try {
    const data = await makeDeleteRequest(
      "/catastro/tg/domicilio/" + id_domicilio
    );
    return data;
  } catch (e) {
    throw e;
  }
}

//DESCRIPCION DEL PREDIO
export async function postDescripcionPredio(requestData) {
  try {
    const data = await makePostRequest("/catastro/tibc/descripcion/", requestData);
    return data;
  } catch (e) {
    throw e;
  }
}

export async function putDescripcionPredio(requestData, id_desc_predio) {
  try {
    const data = await makePutRequest(
      "/catastro/tibc/descripcion/" + id_desc_predio,
      requestData
    );
    return data;
  } catch (e) {
    throw e;
  }
}

export async function deleteDescripcionPredio(id_desc_predio) {
  try {
    const data = await makeDeleteRequest(
      "/catastro/tibc/descripcion/" + id_desc_predio
    );
    return data;
  } catch (e) {
    throw e;
  }
}




//SERVICIOS BÁSICOS PREDIO
export async function postServiciosBasicosPredio(requestData) {
  try {
    const data = await makePostRequest("/catastro/tibc/servicio_predio/", requestData);
    return data;
  } catch (e) {
    throw e;
  }
}

export async function putServiciosBasicosPredio(requestData, id_servicio) {
  try {
    const data = await makePutRequest(
      "/catastro/tibc/servicio_predio/" + id_servicio,
      requestData
    );
    return data;
  } catch (e) {
    throw e;
  }
}

export async function deleteServiciosBasicosPredio(id_servicio) {
  try {
    const data = await makeDeleteRequest(
      "/catastro/tibc/servicio_predio/" + id_servicio
    );
    return data;
  } catch (e) {
    throw e;
  }
}

//CONSTRUCCIONES
export async function postConstrucciones(requestData) {
  try {
    const data = await makePostRequest("/catastro/tibc/construcciones/", requestData);
    return data;
  } catch (e) {
    throw e;
  }
}

export async function putConstrucciones(requestData, id_construccion) {
  try {
    const data = await makePutRequest(
      "/catastro/tibc/construcciones/" + id_construccion,
      requestData
    );
    return data;
  } catch (e) {
    throw e;
  }
}

export async function deleteConstrucciones(id_construccion) {
  try {
    const data = await makeDeleteRequest(
      "/catastro/tibc/construcciones/" + id_construccion
    );
    return data;
  } catch (e) {
    throw e;
  }
}

//CONSTRUCCIONES PORCENTAJES
export async function postConstruccionesPorcentaje(requestData) {
  try {
    const data = await makePostRequest("/catastro/tibc/construcciones_porcentajes/", requestData);
    return data;
  } catch (e) {
    throw e;
  }
}

export async function putConstruccionesPorcentaje(requestData, id_construcciones_porcentaje) {
  try {
    const data = await makePutRequest(
      "/catastro/tibc/construcciones_porcentajes/" + id_construcciones_porcentaje,
      requestData
    );
    return data;
  } catch (e) {
    throw e;
  }
}

export async function deleteConstruccionesPorcentaje(id_construcciones_porcentaje) {
  try {
    const data = await makeDeleteRequest(
      "/catastro/tibc/construcciones_porcentajes/" + id_construcciones_porcentaje
    );
    return data;
  } catch (e) {
    throw e;
  }
}

//OBRAS COMPLEMENTARIAS
export async function postObrasComplementarias(requestData) {
  try {
    const data = await makePostRequest("/catastro/tibc/obras_instalaciones/", requestData);
    return data;
  } catch (e) {
    throw e;
  }
}

export async function putObrasComplementarias(requestData, id_otras_instal) {
  try {
    const data = await makePutRequest(
      "/catastro/tibc/obras_instalaciones/" + id_otras_instal,
      requestData
    );
    return data;
  } catch (e) {
    throw e;
  }
}

export async function deleteObrasComplementarias(id_otras_instal) {
  try {
    const data = await makeDeleteRequest(
      "/catastro/tibc/obras_instalaciones/" + id_otras_instal
    );
    return data;
  } catch (e) {
    throw e;
  }
}

//OBRAS COMPLEMENTARIAS
export async function postInscripcionPredio(requestData) {
  try {
    const data = await makePostRequest("/catastro/tibc/inscripcion_predio", requestData);
    return data;
  } catch (e) {
    throw e;
  }
}

export async function putInscripcionPredio(requestData, id_reg_predio) {
  try {
    const data = await makePutRequest(
      "/catastro/tibc/inscripcion_predio/" + id_reg_predio,
      requestData
    );
    return data;
  } catch (e) {
    throw e;
  }
}

export async function deleteInscripcionPredio(id_reg_predio) {
  try {
    const data = await makeDeleteRequest(
      "/catastro/tibc/inscripcion_predio/" + id_reg_predio
    );
    return data;
  } catch (e) {
    throw e;
  }
}

//INFO COMPLEMENTARIA
export async function postInfoComplementaria(requestData) {
  try {
    const data = await makePostRequest("/catastro/tg/info_complementaria", requestData);
    return data;
  } catch (e) {
    throw e;
  }
}

export async function putInfoComplementaria(requestData, id_info_compl) {
  try {
    const data = await makePutRequest(
      "/catastro/tg/info_complementaria/" + id_info_compl,
      requestData
    );
    return data;
  } catch (e) {
    throw e;
  }
}

export async function deleteInfoComplementaria(id_info_compl) {
  try {
    const data = await makeDeleteRequest(
      "/catastro/tg/info_complementaria/" + id_info_compl
    );
    return data;
  } catch (e) {
    throw e;
  }
}

//LITIGANTES
export async function postLitigantes(requestData) {
  try {
    const data = await makePostRequest("/catastro/tg/litigantes", requestData);
    return data;
  } catch (e) {
    throw e;
  }
}

export async function putLitigantes(requestData, id_info_compl) {
  try {
    const data = await makePutRequest(
      "/catastro/tg/litigantes/" + id_info_compl,
      requestData
    );
    return data;
  } catch (e) {
    throw e;
  }
}

export async function deleteLitigantes(id_info_compl) {
  try {
    const data = await makeDeleteRequest(
      "/catastro/tg/litigantes/" + id_info_compl
    );
    return data;
  } catch (e) {
    throw e;
  }
}

//OBSERVACIONES

export async function getObservacionPredio(requestData) {
  try {
    const data = await makeGetRequest("/tg/observacion_predio", requestData);
    return data;
  } catch (e) {
    throw e;
  }
}

export async function postObservaciones(requestData) {
  try {
    const data = await makePostRequest("/catastro/tg/observacion_predio/", requestData);
    return data;
  } catch (e) {
    throw e;
  }
}

export async function putObservaciones(requestData, id_observaciones) {
  try {
    const data = await makePutRequest(
      "/catastro/tg/observacion_predio/" + id_observaciones,
      requestData
    );
    return data;
  } catch (e) {
    throw e;
  }
}

export async function deleteObservaciones(id_observaciones) {
  try {
    const data = await makeDeleteRequest("/catastro/tg/observacion_predio/" + id_observaciones);
    return data;
  } catch (e) {
    throw e;
  }
}

//FIRMANTES

export async function postFirmantes(requestData) {
  try {
    const data = await makePostRequest("/catastro/tg/firmantes", requestData);
    return data;
  } catch (e) {
    throw e;
  }
}

export async function putFirmantes(requestData, id_firmante) {
  try {
    const data = await makePutRequest(
      "/catastro/tg/firmantes/" + id_firmante,
      requestData
    );
    return data;
  } catch (e) {
    throw e;
  }
}

export async function deleteFirmantes(id_firmante) {
  try {
    const data = await makeDeleteRequest("/catastro/tg/firmantes/" + id_firmante);
    return data;
  } catch (e) {
    throw e;
  }
}