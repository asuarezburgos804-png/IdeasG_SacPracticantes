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

/**descripcion bien cultural*/

export async function postDescripcionBienCultural(requestData) {
  try {
    const data = await makePostRequest("/catastro/fcubcu/mapdescripcion/registrar", requestData);
    return data;
  } catch (e) {
    throw e;
  }
}
export async function putDescripcionBienCultural(requestData, id_des_bcul) {
  try {
    const data = await makePutRequest(
      "/catastro/fcubcu/mapdescripcion/actualizar/" + id_des_bcul,
      requestData
    );
    return data;
  } catch (e) {
    throw e;
  }
}
export async function deleteDescripcionBienCultural(id_des_bcul) {
  try {
    const data = await makeDeleteRequest("/catastro/fcubcu/mapdescripcion/eliminar/" + id_des_bcul);
    return data;
  } catch (e) {
    throw e;
  }
}
/**condiciones fisicas del momumento arqueológico*/

export async function postCondFiscMonumentoArqueo(requestData) {
  try {
    const data = await makePostRequest("/catastro/fcubcu/mapcondicion/registrar", requestData);
    return data;
  } catch (e) {
    throw e;
  }
}
export async function putCondFiscMonumentoArqueo(requestData, id_cond_fisica) {
  try {
    const data = await makePutRequest(
      "/catastro/fcubcu/mapcondicion/actualizar/" + id_cond_fisica,
      requestData
    );
    return data;
  } catch (e) {
    throw e;
  }
}
export async function deleteCondFiscMonumentoArqueo(id_cond_fisica) {
  try {
    const data = await makeDeleteRequest("/catastro/fcubcu/mapcondicion/eliminar/" + id_cond_fisica);
    return data;
  } catch (e) {
    throw e;
  }
}
/**condiciones estado de conservaciuon*/

export async function postEstConservacion(requestData) {
  try {
    const data = await makePostRequest("/catastro/fcubcu/mapestado/registrar", requestData);
    // console.log("🚀 ~ postEstConservacion ~ data:", data)
    return data;
  } catch (e) {
    // console.log("🚀 ~ postEstConservacion ~ e:", e.message)
    throw e;
  }
    
}
export async function putEstConservacion(requestData, id_est_conservacion) {
  try {
    const data = await makePutRequest(
      "/catastro/fcubcu/mapestado/actualizar/" + id_est_conservacion,
      requestData
    );
    return data;
  } catch (e) {
    throw e;
  }
}
export async function deleteEstConservacion(id_est_conservacion) {
  try {
    const data = await makeDeleteRequest("/catastro/fcubcu/mapestado/eliminar/" + id_est_conservacion);
    return data;
  } catch (e) {
    throw e;
  }
}


/**condiciones estado de conservaciuon*/

export async function postInscripcionPredioMAP(requestData) {
  try {
    const data = await makePostRequest("/catastro/tibc/inscripcion_predio", requestData);
    return data;
  } catch (e) {
    throw e;
  }
}
export async function putInscripcionPredioMAP(requestData, id_reg_predio) {
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
export async function deleteInscripcionPredioMAP(id_reg_predio) {
  try {
    const data = await makeDeleteRequest("/catastro/tibc/inscripcion_predio/" + id_reg_predio);
    return data;
  } catch (e) {
    throw e;
  }
}


/*normal legal*/
export async function postNormaLegalMAP(requestData) {
  try {
    const data = await makePostRequest("/catastro/fcubcu/mapnorma/registrar", requestData);
    return data;
  } catch (e) {
    throw e;
  }
}
export async function putNormaLegalMAP(requestData, id_norma) {
  try {
    const data = await makePutRequest(
      "/catastro/fcubcu/mapnorma/actualizar/" + id_norma,
      requestData
    );
    return data;
  } catch (e) {
    throw e;
  }
}
export async function deleteNormaLegalMAP(id_norma) {
  try {
    const data = await makeDeleteRequest("/catastro/fcubcu/mapnorma/eliminar/" + id_norma);
    return data;
  } catch (e) {
    throw e;
  }
}

/**monumento històrico colonial /republicano*/

//información básica
export async function postInmuebleDPCNL(requestData) {
  try {
    const data = await makePostRequest("/catastro/fcubcu/mhcinfobasica/registrar", requestData);
    return data;
  } catch (e) {
    throw e;
  }
}
export async function putInmuebleDPCNL(requestData, id_mhc_info) {
  try {
    const data = await makePutRequest(
      "/catastro/fcubcu/mhcinfobasica/actualizar/" + id_mhc_info,
      requestData
    );
    return data;
  } catch (e) {
    throw e;
  }
}
export async function deleteInmuebleDPCNL(id_mhc_info) {
  try {
    const data = await makeDeleteRequest("/catastro/fcubcu/mhcinfobasica/eliminar/" + id_mhc_info);
    return data;
  } catch (e) {
    throw e;
  }
}


//TITULAR TMHC
export async function postTitularTMHC(requestData) {
  try {
    const data = await makePostRequest("/catastro/fcubcu/titular/registrar", requestData);
    return data;
  } catch (e) {
    throw e;
  }
}
export async function putTitularTMHC(requestData, id_titular) {
  try {
    const data = await makePutRequest(
      "/catastro/fcubcu/titular/actualizar/" + id_titular,
      requestData
    );
    return data;
  } catch (e) {
    throw e;
  }
}
export async function deleteTitularTMHC(id_titular) {
  try {
    const data = await makeDeleteRequest("/catastro/fcubcu/titular/eliminar/" + id_titular);
    return data;
  } catch (e) {
    throw e;
  }
}


//servicio para DESCRIPCIÓN DEL MONUMENTO
export async function postMHCdescripcionMIPCN(requestData) {
  try {
    const data = await makePostRequest("/catastro/fcubcu/mhcdescripcionmipcn/registrar", requestData);
    return data;
  } catch (e) {
    throw e;
  }
}
export async function putMHCdescripcionMIPCN(requestData, id_descripcion_mipcn) {
  try {
    const data = await makePutRequest(
      "/catastro/fcubcu/mhcdescripcionmipcn/actualizar/" + id_descripcion_mipcn,
      requestData
    );
    return data;
  } catch (e) {
    throw e;
  }
}
export async function deleteMHCdescripcionMIPCN(id_descripcion_mipcn) {
  try {
    const data = await makeDeleteRequest("/catastro/fcubcu/mhcdescripcionmipcn/eliminar/" + id_descripcion_mipcn);
    return data;
  } catch (e) {
    throw e;
  }
}


//Descripción Fachada
export async function postDescFachada(requestData) {
  try {
    const data = await makePostRequest("/catastro/fcubcu/imhcdescripcionfachada/registrar", requestData);
    return data;
  } catch (e) {
    throw e;
  }
}
export async function putDescFachada(requestData, id_des_fachada) {
  try {
    const data = await makePutRequest(
      "/catastro/fcubcu/imhcdescripcionfachada/actualizar/" + id_des_fachada,
      requestData
    );
    return data;
  } catch (e) {
    throw e;
  }
}
export async function deleteDescFachada(id_des_fachada) {
  try {
    const data = await makeDeleteRequest("/catastro/fcubcu/imhcdescripcionfachada/eliminar/" + id_des_fachada);
    return data;
  } catch (e) {
    throw e;
  }
}
//Descripción INTERIOR
export async function postDescInterior(requestData) {
  try {
    const data = await makePostRequest("/catastro/fcubcu/imhcdescripcioninterior/registrar", requestData);
    return data;
  } catch (e) {
    throw e;
  }
}
export async function putDescInterior(requestData, id_des_interior) {
  try {
    const data = await makePutRequest(
      "/catastro/fcubcu/imhcdescripcioninterior/actualizar/" + id_des_interior,
      requestData
    );
    return data;
  } catch (e) {
    throw e;
  }
}
export async function deleteDescInterior(id_des_interior) {
  try {
    const data = await makeDeleteRequest("/catastro/fcubcu/imhcdescripcioninterior/eliminar/" + id_des_interior);
    return data;
  } catch (e) {
    throw e;
  }
}

//Descripción RESEÑA
export async function postResenaHistorica(requestData) {
  try {
    const data = await makePostRequest("/catastro/fcubcu/imhcresenahistorica/registrar", requestData);
    return data;
  } catch (e) {
    throw e;
  }
}
export async function putResenaHistorica(requestData, id_res_historica) {
  try {
    const data = await makePutRequest(
      "/catastro/fcubcu/imhcresenahistorica/actualizar/" + id_res_historica,
      requestData
    );
    return data;
  } catch (e) {
    throw e;
  }
}
export async function deleteResenaHistorica(id_res_historica) {
  try {
    const data = await makeDeleteRequest("/catastro/fcubcu/imhcresenahistorica/eliminar/" + id_res_historica);
    return data;
  } catch (e) {
    throw e;
  }
}


//inscripcion registro predio TMHC
export async function postInscripcionPredioTMHC(requestData) {
  try {
    const data = await makePostRequest("/catastro/fcubcu/mhcinscripcionpc/registrar", requestData);
    return data;
  } catch (e) {
    throw e;
  }
}
export async function putInscripcionPredioTMHC(requestData, id_reg_predio_mhc) {
  try {
    const data = await makePutRequest(
      "/catastro/fcubcu/mhcinscripcionpc/actualizar/" + id_reg_predio_mhc,
      requestData
    );
    return data;
  } catch (e) {
    throw e;
  }
}
export async function deleteInscripcionPredioTMHC(id_reg_predio_mhc) {
  try {
    const data = await makeDeleteRequest("/catastro/fcubcu/mhcinscripcionpc/eliminar/" + id_reg_predio_mhc);
    return data;
  } catch (e) {
    throw e;
  }
}


//Normal legal MHC
export async function postNormaLegalMHC(requestData) {
  try {
    const data = await makePostRequest("/catastro/fcubcu/mhcnorma/registrar", requestData);
    return data;
  } catch (e) {
    throw e;
  }
}
export async function putNormaLegalMHC(requestData, id_norma_mhc) {
  try {
    const data = await makePutRequest(
      "/catastro/fcubcu/mhcnorma/actualizar/" + id_norma_mhc,
      requestData
    );
    return data;
  } catch (e) {
    throw e;
  }
}
export async function deleteNormaLegalMHC(id_norma_mhc) {
  try {
    const data = await makeDeleteRequest("/catastro/fcubcu/mhcnorma/eliminar/" + id_norma_mhc);
    return data;
  } catch (e) {
    throw e;
  }
}
// Observaciones

export async function postObservacionesMHC(requestData) {
  try {
    const data = await makePostRequest("/catastro/fcubcu/mhcobservaciones/registrar", requestData);
    return data;
  } catch (e) {
    throw e;
  }
}
export async function putObservacionesMHC(requestData, id_observaciones_mhc) {
  try {
    const data = await makePutRequest(
      "/catastro/fcubcu/mhcobservaciones/actualizar/" + id_observaciones_mhc,
      requestData
    );
    return data;
  } catch (e) {
    throw e;
  }
}
export async function deletObservacionesMHC(id_observaciones_mhc) {
  try {
    const data = await makeDeleteRequest("/catastro/fcubcu/mhcobservaciones/eliminar/" + id_observaciones_mhc);
    return data;
  } catch (e) {
    throw e;
  }
}

// FIRMANTES CULTURAL MHC

export async function postFirmantesMHC(requestData) {
  try {
    const data = await makePostRequest("/catastro/fcubcu/mhcfirmantes/registrar", requestData);
    return data;
  } catch (e) {
    throw e;
  }
}
export async function putFirmantesMHC(requestData, id_firmante_mhc) {
  try {
    const data = await makePutRequest(
      "/catastro/fcubcu/mhcfirmantes/actualizar/" + id_firmante_mhc,
      requestData
    );
    return data;
  } catch (e) {
    throw e;
  }
}
export async function deletFirmantesMHC(id_firmante_mhc) {
  try {
    const data = await makeDeleteRequest("/catastro/fcubcu/mhcfirmantes/eliminar/" + id_firmante_mhc);
    return data;
  } catch (e) {
    throw e;
  }
}

// /**observacionesMAP*/
// export async function postObservacionesMAP(requestData) {
//   try {
//     const data = await makePostRequest("/catastro/fcubcu/mhcobservaciones/registrar", requestData);
//     return data;
//   } catch (e) {
//     throw e;
//   }
// }
// export async function putObservacionesMAP(requestData, id_des_bcul) {
//   try {
//     const data = await makePutRequest(
//       "/catastro/fcubcu/mhcobservaciones/actualizar/" + id_des_bcul,
//       requestData
//     );
//     return data;
//   } catch (e) {
//     throw e;
//   }
// }
// export async function deleteObservacionesMAP(id_des_bcul) {
//   try {
//     const data = await makeDeleteRequest("/catastro/fcubcu/mhcobservaciones/eliminar/" + id_des_bcul);
//     return data;
//   } catch (e) {
//     throw e;
//   }
// }
/**=========================================================================== */
export async function fechDescripBienCul(requestData, action) {
  try {
    let data;
    if (action == 1) {
      data = await makePostRequest(
        "/fubcul/mapdescripcion/registrar",
        requestData
      );
    } else if (action == 2) {
      data = await makePutRequest(
        "/fubcul/mapdescripcion/actualizar",
        requestData
      );
    }
    return data;
  } catch (e) {
    throw e;
  }
}
export async function fechCondFiscaMA(requestData, action) {
  try {
    let data;
    if (action == 1) {
      data = await makePostRequest(
        "/fubcul/mapcondicion/registrar",
        requestData
      );
    } else if (action == 2) {
      data = await makePutRequest(
        "/fubcul/mapcondicion/actualizar",
        requestData
      );
    }
    return data;
  } catch (e) {
    throw e;
  }
}
export async function fechEstadoConser(requestData, action) {
  try {
    let data;
    if (action == 1) {
      data = await makePostRequest("/fubcul/mapestado/registrar", requestData);
    } else if (action == 2) {
      data = await makePutRequest("/fubcul/mapestado/actualizar", requestData);
    }
    return data;
  } catch (e) {
    throw e;
  }
}
export async function fechInscripPredCat(requestData, action) {
  try {
    let data;
    if (action == 1) {
      data = await makePostRequest(
        "/fubcul/mapinscripcionpc/registrar",
        requestData
      );
    } else if (action == 2) {
      data = await makePutRequest(
        "/fubcul/mapinscripcionpc/actualizar",
        requestData
      );
    }
    return data;
  } catch (e) {
    throw e;
  }
}
export async function fechNormaLegalMA(requestData, action) {
  try {
    let data;
    if (action == 1) {
      data = await makePostRequest("/fubcul/mapnorma/registrar", requestData);
    } else if (action == 2) {
      data = await makePutRequest("/fubcul/mapnorma/actualizar", requestData);
    }
    return data;
  } catch (e) {
    throw e;
  }
}
export async function fechObservacionesMA(requestData, action) {
  try {
    let data;
    if (action == 1) {
      data = await makePostRequest(
        "/fcui/observaciones/registrar",
        requestData
      );
    } else if (action == 2) {
      data = await makePutRequest(
        "/fcui/observaciones/actualizar",
        requestData
      );
    }
    return data;
  } catch (e) {
    throw e;
  }
}
export async function fechInforBasic(requestData, action) {
  try {
    let data;
    if (action == 1) {
      data = await makePostRequest(
        "/fubcul/mhcinfobasica/registrar",
        requestData
      );
    } else if (action == 2) {
      data = await makePutRequest(
        "/fubcul/mhcinfobasica/actualizar",
        requestData
      );
    }
    return data;
  } catch (e) {
    throw e;
  }
}
export async function fechIdentTitularBienCult(requestData, action) {
  try {
    let data;
    if (action == 1) {
      data = await makePostRequest("/fubcul/titular/registrar", requestData);
    } else if (action == 2) {
      data = await makePutRequest("/fubcul/titular/actualizar", requestData);
    }
    return data;
  } catch (e) {
    throw e;
  }
}
export async function fechDescripMonuInteg(requestData, action) {
  try {
    let data;
    if (action == 1) {
      data = await makePostRequest(
        "/fubcul/mhcdescripcionmipcn/registrar",
        requestData
      );
    } else if (action == 2) {
      data = await makePutRequest(
        "/fubcul/mhcdescripcionmipcn/actualizar",
        requestData
      );
    }
    return data;
  } catch (e) {
    throw e;
  }
}
export async function fechDescripMonuIntegFach(requestData, action) {
  try {
    let data;
    if (action == 1) {
      data = await makePostRequest(
        "/fubcul/imhcdescripcionfachada/registrar",
        requestData
      );
    } else if (action == 2) {
      data = await makePutRequest(
        "/fubcul/imhcdescripcionfachada/actualizar",
        requestData
      );
    }
    return data;
  } catch (e) {
    throw e;
  }
}
export async function fechDescripMonuIntegInte(requestData, action) {
  try {
    let data;
    if (action == 1) {
      data = await makePostRequest(
        "/fubcul/imhcdescripcioninterior/registrar",
        requestData
      );
    } else if (action == 2) {
      data = await makePutRequest(
        "/fubcul/imhcdescripcioninterior/actualizar",
        requestData
      );
    }
    return data;
  } catch (e) {
    throw e;
  }
}
export async function fechDescripMonuIntegRese(requestData, action) {
  try {
    let data;
    if (action == 1) {
      data = await makePostRequest(
        "/fubcul/imhcresenahistorica/registrar",
        requestData
      );
    } else if (action == 2) {
      data = await makePutRequest(
        "/fubcul/imhcresenahistorica/actualizar",
        requestData
      );
    }
    return data;
  } catch (e) {
    throw e;
  }
}
export async function fechInscripcionPredioCatastral(requestData, action) {
  try {
    let data;
    if (action == 1) {
      data = await makePostRequest(
        "/fubcul/mhcinscripcionpc/registrar",
        requestData
      );
    } else if (action == 2) {
      data = await makePutRequest(
        "/fubcul/mhcinscripcionpc/actualizar",
        requestData
      );
    }
    return data;
  } catch (e) {
    throw e;
  }
}
export async function fechInformacionComplementaria(requestData, action) {
  try {
    let data;
    if (action == 1) {
      data = await makePostRequest(
        "/fcui/info_complementaria/registrar",
        requestData
      );
    } else if (action == 2) {
      data = await makePutRequest(
        "/fcui/info_complementaria/actualizar",
        requestData
      );
    }
    return data;
  } catch (e) {
    throw e;
  }
}
export async function fechNormaLegalMH(requestData, action) {
  try {
    let data;
    if (action == 1) {
      data = await makePostRequest("/fubcul/mhcnorma/registrar", requestData);
    } else if (action == 2) {
      data = await makePutRequest("/fubcul/mhcnorma/actualizar", requestData);
    }
    return data;
  } catch (e) {
    throw e;
  }
}
export async function fechObservacionesMH(requestData, action) {
  try {
    let data;
    if (action == 1) {
      data = await makePostRequest(
        "/fubcul/mhcobservaciones/registrar",
        requestData
      );
    } else if (action == 2) {
      data = await makePutRequest(
        "/fubcul/mhcobservaciones/actualizar",
        requestData
      );
    }
    return data;
  } catch (e) {
    throw e;
  }
}
export async function fechFirmantes(requestData, action) {
  try {
    let data;
    if (action == 1) {
      data = await makePostRequest("/fcui/firmantes/registrar", requestData);
    } else if (action == 2) {
      data = await makePutRequest("/fcui/firmantes/actualizar", requestData);
    }
    return data;
  } catch (e) {
    throw e;
  }
}

/**=========================================================================== */
export async function fetchCatInmueble() {
  try {
    let data;
    data = await makeGetRequest("/maestros/catinmueble");
    return data;
  } catch (e) {
    throw e;
  }
}
export async function fetchFilCronologica() {
  try {
    let data;
    data = await makeGetRequest("/maestros/filcronologica");
    return data;
  } catch (e) {
    throw e;
  }
}
export async function fetchPreArquitectura() {
  try {
    let data;
    data = await makeGetRequest("/maestros/prearquitectura");
    return data;
  } catch (e) {
    throw e;
  }
}
export async function fetchArquitecturaMAP() {
  try {
    let data;
    data = await makeGetRequest("/maestros/arquitecturamap");
    return data;
  } catch (e) {
    throw e;
  }
}
export async function fetchMaterialConst() {
  try {
    let data;
    data = await makeGetRequest("/maestros/materialconst");
    return data;
  } catch (e) {
    throw e;
  }
}
export async function fetchAfecNatural() {
  try {
    let data;
    data = await makeGetRequest("/maestros/afecnatural");
    return data;
  } catch (e) {
    throw e;
  }
}
export async function fetchAfecAntropica() {
  try {
    let data;
    data = await makeGetRequest("/maestros/afecantropica");
    return data;
  } catch (e) {
    throw e;
  }
}
export async function fetchInterConserv() {
  try {
    let data;
    data = await makeGetRequest("/maestros/interconserv");
    return data;
  } catch (e) {
    throw e;
  }
}
export async function fetchPartRegistral() {
  try {
    let data;
    data = await makeGetRequest("/maestros/tipoparregistral");
    return data;
  } catch (e) {
    throw e;
  }
}
export async function fetchTipPartRegistral() {
  try {
    let data;
    data = await makeGetRequest("/maestros/tipoparregistral");
    return data;
  } catch (e) {
    throw e;
  }
}


// 

export async function fetchCatArquitecturaMHC() {
  try {
    let data;
    data = await makeGetRequest("/maestros/arquitecturamhc");
    return data;
  } catch (e) {
    throw e;
  }
}
export async function fetchCatFechaConst() {
  try {
    let data;
    data = await makeGetRequest("/maestros/fechaconst");
    return data;
  } catch (e) {
    throw e;
  }
}
export async function fetchCatElemArquitectonico() {
  try {
    let data;
    data = await makeGetRequest("/maestros/elemarquitectonico");
    return data;
  } catch (e) {
    throw e;
  }
}
export async function fetchFilEstilistica() {
  try {
    let data;
    data = await makeGetRequest("/maestros/filestilistica");
    return data;
  } catch (e) {
    throw e;
  }
}
export async function fetchInterInmueble() {
  try {
    let data;
    data = await makeGetRequest("/maestros/interinmueble");
    return data;
  } catch (e) {
    throw e;
  }
}
export async function fetchCondDeclarante() {
  try {
    let data;
    data = await makeGetRequest("/maestros/conddeclarante");
    return data;
  } catch (e) {
    throw e;
  }
}
export async function fetchLlenado() {
  try {
    let data;
    data = await makeGetRequest("/maestros/estllenado");
    return data;
  } catch (e) {
    throw e;
  }
}
