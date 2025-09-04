import { useQuery } from "@tanstack/react-query";

import {
  makePutRequest,
  makePostRequest,
  makeGetRequest,
  makeGetReniec,
  makeDeleteRequest,
} from "@/utils/api/api";

const token =
  "?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6ImxvYml0b21hc3Rlci5yZW56b0BnbWFpbC5jb20ifQ.zURYc7A16l5jGNWboYaHGNXrr3s2CVbKcBHjxGYazXo";

/**FICHA ECONOMICA  - IDENTIFICACION DEL CONDUCTOR*/
export async function postIndentConductor(requestData) {
  try {
    const data = await makePostRequest(
      "/catastro/fcuec/conductor/registrar",
      requestData
    );
    return data;
  } catch (e) {
    throw e;
  }
}
export async function putIndentConductor(requestData, id) {
  try {
    const data = await makePutRequest(
      "/catastro/fcuec/conductor/actualizar",
      requestData
    );
    return data;
  } catch (e) {
    throw e;
  }
}
export async function deleteIndentConductor(id) {
  try {
    const data = await makeDeleteRequest(
      "/catastro/fcuec/conductor/eliminar/" + id
    );
    return data;
  } catch (e) {
    throw e;
  }
}
// export async function fechIndentConductor(requestData, action) {
//   try {
//     let data;
//     if (action == 1) {
//       data = await makePostRequest(
//         "/catastro/fcuec/conductor/registrar",
//         requestData
//       );
//     } else if (action == 2) {
//       data = await makePutRequest(
//         "/catastro/fcuec/conductor/actualizar",
//         requestData
//       );
//     }
//     return data;
//   } catch (e) {
//     throw e;
//   }
// }

/**FICHA ECONOMICA - AUTORIZACION DE FUNCIONAMIENTO */

//DESCRIPCION DEL PREDIO
export async function postAutoFuncionamiento(requestData) {
  try {
    const data = await makePostRequest(
      "/catastro/fcuec/autorizacion_municipal/registrar",
      requestData
    );
    return data;
  } catch (e) {
    throw e;
  }
}

export async function putAutoFuncionamiento(requestData) {
  try {
    const data = await makePutRequest(
      "/catastro/fcuec/autorizacion_municipal/actualizar",
      requestData
    );
    return data;
  } catch (e) {
    throw e;
  }
}

export async function deleteAutoFuncionamiento(id) {
  try {
    const data = await makeDeleteRequest(
      "/catastro/fcuec/autorizacion_municipal/eliminar/" + id
    );
    return data;
  } catch (e) {
    throw e;
  }
}

// export async function fetchAutoFuncionamiento(requestData, action) {
//   try {
//     let data;
//     if (action == 1) {
//       data = await makePostRequest(
//         "/catastro/fcuec/autorizacion_municipal/registrar",
//         requestData
//       );
//     } else if (action == 2) {
//       data = await makePutRequest(
//         "/catastro/fcuec/autorizacion_municipal/actualizar",
//         requestData
//       );
//     }
//     return data;
//   } catch (e) {
//     throw e;
//   }
// }

/**FICHA ECONOMICA - AUTORIZACION DE ANUNCIOS */

export async function postAutorizacionAnuncio(requestData) {
  try {
    const data = await makePostRequest(
      "/catastro/fcuec/autorizacion_anuncio/registrar",
      requestData
    );
    return data;
  } catch (e) {
    throw e;
  }
}

export async function putAutorizacionAnuncio(requestData) {
  try {
    const data = await makePutRequest(
      "/catastro/fcuec/autorizacion_anuncio/actualizar",
      requestData
    );
    return data;
  } catch (e) {
    throw e;
  }
}

export async function deleteAutorizacionAnuncio(id) {
  try {
    const data = await makeDeleteRequest(
      "/catastro/fcuec/autorizacion_anuncio/eliminar/" + id
    );
    return data;
  } catch (e) {
    throw e;
  }
}

export async function fetchAutoAnuncio(requestData, action) {
  try {
    let data;
    if (action == 1) {
      data = await makePostRequest(
        "/catastro/fcuec/autorizacion_anuncio/registrar",
        requestData
      );
    } else if (action == 2) {
      data = await makePutRequest(
        "/catastro/fcuec/autorizacion_anuncio/actualizar",
        requestData
      );

    } else if (action == 3) {
      data = await makeDeleteRequest(
        "/catastro/fcuec/conductor/eliminar/" + requestData.id_conductor
      );
    }


    return data;
  } catch (e) {
    console.error('Error en el servicio:', e);
    throw e;
  }
}





export async function fechDomicFiscal(requestData, action) {
  try {
    let data;
    if (action == 1) {
      data = await makePostRequest("/catastro/tg/domicilio", requestData);
    } else if (action == 2) {
      data = await makePutRequest(
        "/catastro/tg/domicilio/" + requestData.id_domicilio,
        requestData
      );
    } else if (action == 3) {
      data = await makeDeleteRequest(
        "/catastro/tg/domicilio/" + requestData.id_conductor
      );
    }
    return data;
  } catch (e) {
    throw e;
  }
}

export async function fetchInfoComplementaria(requestData, action) {
  try {
    let data;
    if (action == 1) {
      data = await makePostRequest(
        "/catastro/tg/info_complementaria",
        requestData
      );
    } else if (action == 2) {
      data = await makePutRequest(
        "/catastro/tg/info_complementaria/" + requestData.id_info_compl,
        requestData
      );
    }
    return data;
  } catch (e) {
    throw e;
  }
}

export async function fetchFirmantes(requestData, action, dat) {
  try {
    let data;
    if (action == 1) {
      data = await makePostRequest("/fcui/firmantes/registrar", requestData);
    } else if (action == 2) {
      data = await makePutRequest(
        "/fcui/firmantes/actualizar/ " + dat,
        requestData
      );
    }
    return data;
  } catch (e) {
    throw e;
  }
}
/**=========================================================================== */
export async function fetchActividadPost(requestData) {
  try {
    let data;
    data = await makePostRequest(
      "/catastro/fcuec/autorizacion_municipal_descripcion/registrar",
      requestData
    );

    return data;
  } catch (e) {
    throw e;
  }
}
export async function fetchActividadDelete(requestData) {
  try {
    let data;
    data = await makeDeleteRequest(
      "/catastro/fcuec/autorizacion_municipal_descripcion/eliminar/" +
        requestData
    );

    return data;
  } catch (e) {
    throw e;
  }
}
export async function fetchAnuncio(dat) {
  try {
    /*** FI MISMA RUTA */
    const data = await makeGetRequest(
      "/maestros/anuncio/fi/buscar/anuncios/" + dat
    );
    return data.data;
  } catch (e) {
    throw e;
  }
}
export async function fetchAnuncioDelete(requestData) {
  try {
    let data;
    data = await makeDeleteRequest(
      "/catastro/fcuec/autorizacion_anuncio/eliminar/" + requestData
    );

    return data;
  } catch (e) {
    throw e;
  }
}

export async function fetchVias(dat) {
  try {
    const data = await makeGetRequest("/bus/vias/" + dat);
    return data.data;
  } catch (e) {
    throw e;
  }
}

export async function fetchActividad(dat) {
  try {
    const data = await makeGetRequest(
      "/maestros/actividad/fi/buscar/actividades/" + dat
    );
    return data.data;
  } catch (e) {
    throw e;
  }
}

export async function fetchReniec(dat) {
  try {
    const data = await makeGetReniec(dat + token);
    return data;
  } catch (e) {
    throw e;
  }
}

export async function fetchPersona(dat) {
  try {
    const data = await makeGetRequest("/persona/buscar/" + dat);
    return data.data;
  } catch (e) {
    throw e;
  }
}
export async function fetchSupervisor(dat) {
  try {
    const data = await makeGetRequest(
      "/maestros/buscar/personal/supervisor/" + dat
    );
    return data.data;
  } catch (e) {
    throw e;
  }
}

export async function fetchTecnico(dat) {
  try {
    const data = await makeGetRequest(
      "/maestros/buscar/personal/tecnico/" + dat
    );
    return data.data;
  } catch (e) {
    throw e;
  }
}

export async function fetchVerificador(dat) {
  try {
    const data = await makeGetRequest(
      "/maestros/buscar/personal/verificador/" + dat
    );
    return data.data;
  } catch (e) {
    throw e;
  }
}

// export async function fetchCondConduc() {
//   try {
//     let data;

//     data = await makeGetRequest("/maestros/condconductor");

//     return data;
//   } catch (e) {
//     throw e;
//   }
// }

export async function fetchDepartamento() {
  try {
    const data = await makeGetRequest("/listar/departamento/");
    return data.data;
  } catch (e) {
    throw e;
  }
}

export async function fetchProvincia(dat) {
  try {
    const data = await makeGetRequest("/listar/provincia/" + dat);
    return data.data;
  } catch (e) {
    throw e;
  }
}

export async function fetchDistrito(dat) {
  try {
    const data = await makeGetRequest("/listar/distrito/" + dat);
    return data.data;
  } catch (e) {
    throw e;
  }
}

//****************************************ESTADISTICAS********************************************************/

export async function fetchSectorEs() {
  try {
    const data = await makeGetRequest("/maestros/sector");
    return data.data;
  } catch (e) {
    throw e;
  }
}

export async function fetchManzana(dat) {
  try {
    const data = await makeGetRequest("/listar/manzana/" + dat);
    return data.data;
  } catch (e) {
    throw e;
  }
}

export async function fetchReferencia(url) {
  try {
    const data = await makePostRequest(url);
    return data.data;
  } catch (e) {
    throw e;
  }
}

export async function fetchSectorChart(requestData) {
  try {
    let data;
    data = await makePostRequest(
      "/conteo_edificaciones/obtener/manzana",
      requestData
    );

    return data;
  } catch (e) {
    throw e;
  }
}

export async function fetchManzanaChart(requestData) {
  try {
    let data;

    data = await makePostRequest(
      "/conteo_edificaciones/obtener/lote",
      requestData
    );

    return data;
  } catch (e) {
    throw e;
  }
}
