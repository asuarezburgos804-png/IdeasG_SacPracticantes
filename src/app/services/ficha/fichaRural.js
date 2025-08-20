import {
  makeGetRequest,
  makePostRequest,
  makeDeleteRequest,
  makePutRequest,
} from "@/utils/api/api";

// const token =
//   "?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6ImxvYml0b21hc3Rlci5yZW56b0BnbWFpbC5jb20ifQ.zURYc7A16l5jGNWboYaHGNXrr3s2CVbKcBHjxGYazXo";

/**FICHA BIEN CULTURAL */
//MAP
/**=========================================================================== */

/*UBICACIÓN GEOGRÁFICA*/

export async function postUbicacionGeo(requestData) {
  try {
    const data = await makePostRequest("/catastro/fcrur/ubicacion_geo/registrar", requestData);
    return data;
  } catch (e) {
    throw e;
  }
}
export async function putUbicacionGeo(requestData, id_ubicacion_geo) {
  try {
    const data = await makePutRequest(
      "/catastro/fcrur/ubicacion_geo/actualizar/" + id_ubicacion_geo,
      requestData
    );
    return data;
  } catch (e) {
    throw e;
  }
}
export async function deleteUbicacionGeo(id_ubicacion_geo) {
  try {
    const data = await makeDeleteRequest("/catastro/fcrur/ubicacion_geo/eliminar/" + id_ubicacion_geo);
    return data;
  } catch (e) {
    throw e;
  }
}


/*identificacion del titular poseedor*/


/*CONDICIÓN ESPECIAL DEL TITULAR*/
export async function postCondEspecial(requestData) {
  try {
    const data = await makePostRequest("/catastro/fcrur/condicion_especial/registrar", requestData);
    return data;
  } catch (e) {
    throw e;
  }
}
export async function putCondEspecial(requestData, id_condicion_esp) {
  try {
    const data = await makePutRequest(
      "/catastro/fcrur/condicion_especial/actualizar/" + id_condicion_esp,
      requestData
    );
    return data;
  } catch (e) {
    throw e;
  }
}
export async function deleteCondEspecial(id_condicion_esp) {
  try {
    const data = await makeDeleteRequest("/catastro/fcrur/condicion_especial/eliminar/" + id_condicion_esp);
    return data;
  } catch (e) {
    throw e;
  }
}

/*DESCRIPCIÓN DEL PREDIO*/
export async function postDescUsoPredio(requestData) {
  try {
    const data = await makePostRequest("/catastro/fcrur/descripcion/registrar", requestData);
    return data;
  } catch (e) {
    throw e;
  }
}
export async function putDescUsoPredio(requestData, id_desc_predio_ru) {
  try {
    const data = await makePutRequest(
      "/catastro/fcrur/descripcion/actualizar/" + id_desc_predio_ru,
      requestData
    );
    return data;
  } catch (e) {
    throw e;
  }
}
export async function deleteDescUsoPredio(id_desc_predio_ru) {
  try {
    const data = await makeDeleteRequest("/catastro/fcrur/descripcion/eliminar/" + id_desc_predio_ru);
    return data;
  } catch (e) {
    throw e;
  }
}

/*CONDICIÓN DEL PREDIO*/
export async function postCondicionPredio(requestData) {
  try {
    const data = await makePostRequest("/catastro/fcrur/condicion/registrar", requestData);
    return data;
  } catch (e) {
    throw e;
  }
}
export async function putCondicionPredio(requestData, id_condicion_predio) {
  try {
    const data = await makePutRequest(
      "/catastro/fcrur/condicion/actualizar/" + id_condicion_predio,
      requestData
    );
    return data;
  } catch (e) {
    throw e;
  }
}
export async function deleteCondicionPredio(id_condicion_predio) {
  try {
    const data = await makeDeleteRequest("/catastro/fcrur/condicion/eliminar/" + id_condicion_predio);
    return data;
  } catch (e) {
    throw e;
  }
}

/*CARÁCTERISTICAS TÉCNICAS DEL PREDIO*/

export async function postCaractTecnic(requestData) {
  try {
    const data = await makePostRequest("/catastro/fcrur/caracteristicas/registrar", requestData);
    return data;
  } catch (e) {
    throw e;
  }
}
export async function putCaractTecnic(requestData, id_caract_tec) {
  try {
    const data = await makePutRequest(
      "/catastro/fcrur/caracteristicas/actualizar/" + id_caract_tec,
      requestData
    );
    return data;
  } catch (e) {
    throw e;
  }
}
export async function deleteCaractTecnic(id_caract_tec) {
  try {
    const data = await makeDeleteRequest("/catastro/fcrur/caracteristicas/eliminar/" + id_caract_tec);
    return data;
  } catch (e) {
    throw e;
  }
}

/*DOMICILIO TITULAR*/

export async function postDomicilioTitular(requestData) {
  try {
    const data = await makePostRequest("/catastro/tg/domicilio", requestData);
    return data;
  } catch (e) {
    throw e;
  }
}
export async function putDomicilioTitular(requestData, id_domicilio) {
  try {
    const data = await makePutRequest(
      "/catastro/tg/domicilio/" + id_domicilio,
      requestData
    );
    return data;
  } catch (e) {
    throw e;
  }
}
export async function deleteDomicilioTitular(id_domicilio) {
  try {
    const data = await makeDeleteRequest("/catastro/tg/domicilio/" + id_domicilio);
    return data;
  } catch (e) {
    throw e;
  }
}

/*EXPLORACION PREDIO*/

export async function postExploPredio(requestData) {
  try {
    const data = await makePostRequest("/catastro/fcrur/explotacion_predio/registrar", requestData);
    return data;
  } catch (e) {
    throw e;
  }
}
export async function putExploPredio(requestData, id_explot_predio) {
  try {
    const data = await makePutRequest(
      "/catastro/fcrur/explotacion_predio/actualizar/" + id_explot_predio,
      requestData
    );
    return data;
  } catch (e) {
    throw e;
  }
}
export async function deleteExploPredio(id_explot_predio) {
  try {
    const data = await makeDeleteRequest("/catastro/fcrur/explotacion_predio/eliminar/" + id_explot_predio);
    return data;
  } catch (e) {
    throw e;
  }
}


/*DOCUMENTOS DE POSECIÓN*/

export async function postDocsPoseProp(requestData) {
  try {
    const data = await makePostRequest("/catastro/fcrur//documentos/registrar", requestData);
    return data;
  } catch (e) {
    throw e;
  }
}
export async function putDocsPoseProp(requestData, id_documento) {
  try {
    const data = await makePutRequest(
      "/catastro/fcrur/documentos/actualizar/" + id_documento,
      requestData
    );
    return data;
  } catch (e) {
    throw e;
  }
}
export async function deleteDocsPoseProp(id_documento) {
  try {
    const data = await makeDeleteRequest("/catastro/fcrur/documentos/eliminar/" + id_documento);
    return data;
  } catch (e) {
    throw e;
  }
}



/*IDENTIFICACIÓN COTITULAR*/

export async function postIdentCotitular(requestData) {
  try {
    const data = await makePostRequest("/catastro/fcrur/cotitulares/registrar", requestData);
    return data;
  } catch (e) {
    throw e;
  }
}
export async function putIdentCotitular(requestData, id_cotitular) {
  try {
    const data = await makePutRequest(
      "/catastro/fcrur/cotitulares/actualizar/" + id_cotitular,
      requestData
    );
    return data;
  } catch (e) {
    throw e;
  }
}
export async function deleteIdentCotitular(id_cotitular) {
  try {
    const data = await makeDeleteRequest("/catastro/fcrur/cotitulares/eliminar/" + id_cotitular);
    return data;
  } catch (e) {
    throw e;
  }
}


/*CARACTERISTICAS DE LA CONSTRUCCION*/

export async function postCaractConstruccion(requestData) {
  try {
    const data = await makePostRequest("/catastro/fcrur/construccion/registrar", requestData);
    return data;
  } catch (e) {
    throw e;
  }
}
export async function putCaractConstruccion(requestData, id_construccion) {
  try {
    const data = await makePutRequest(
      "/catastro/fcrur/construccion/actualizar/" + id_construccion,
      requestData
    );
    return data;
  } catch (e) {
    throw e;
  }
}
export async function deleteCaractConstruccion(id_construccion) {
  try {
    const data = await makeDeleteRequest("/catastro/fcrur/construccion/eliminar/" + id_construccion);
    return data;
  } catch (e) {
    throw e;
  }
}

//FIRMANTES Rural

export async function postFirmantesRural(requestData) {
  try {
    const data = await makePostRequest("/catastro/fcrur/rufirmantes/registrar", requestData);
    return data;
  } catch (e) {
    throw e;
  }
}

export async function putFirmantesRural(requestData, id_firmante) {
  try {
    const data = await makePutRequest(
      "/catastro/fcrur/rufirmantes/actualizar/" + id_firmante,
      requestData
    );
    return data;
  } catch (e) {
    throw e;
  }
}

export async function deleteFirmantesRural(id_firmante) {
  try {
    const data = await makeDeleteRequest("/catastro/fcrur/rufirmantes/eliminar/" + id_firmante);
    return data;
  } catch (e) {
    throw e;
  }
}