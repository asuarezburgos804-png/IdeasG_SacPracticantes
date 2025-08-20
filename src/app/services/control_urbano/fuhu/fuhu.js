import {
    makeGetRequest,
    makePostRequest,
    makeDeleteRequest,
    makePutRequest,
  } from "@/utils/api/api";

  //lista FUHU
  export async function getListFuhu() {
    try {
      const data = await makeGetRequest("/urbano/fuhu/listar");
      return data;
    } catch (e) {
      throw e;
    }
  }
// obtener fuhu
export async function getObtenerFuhu(id_expediente) {
  try {
    const data = await makeGetRequest(
      "/urbano/fuhu/obtener_fuhu/" + id_expediente
    );
    return data;
  } catch (e) {
    throw e;
  }
}

export async function getIdFuhu() {
  try {
    const data = await makeGetRequest("/urbano/general/expediente/obtener/NuevoIdExpedienteFUHU");
    return data;
  } catch (e) {
    throw e;
  }
}

  export async function postAdministrado(requestData) {
    try {
      const data = await makePostRequest("/urbano/general/administrado/registrar",
        requestData
      );
      console.log(data);
      return data;
    } catch (e) {
      throw e;
    }
  }

  export async function postDomicilio(requestData) {
    try {
      const data = await makePostRequest("/urbano/general/domicilio/actualizar",
        requestData
      );
      console.log(data);
      return data;
    } catch (e) {
      throw e;
    }
  }
  
  export async function putAdministrado(requestData, id_observación) {
    try {
      const data = await makePutRequest(
        "urbano/general/observacion/actualizar/" + id_observación, requestData
      );
      console.log(data);
      return data;
    } catch (e) {
      throw e;
    }
  }
  
  
  
  export async function deleteAdministrado(id_administrado) {
    try {
      const data = await makeDeleteRequest(
        "/urbano/general/observacion/eliminar/" + id_administrado,id_observación
      );
      console.log(data);
      return data;
    } catch (e) {
      throw e;
    }
  }
 
  
// Obtener la lista de departamentos
export async function getDepartamentos() {
  try {
    const data = await makeGetRequest("/maestros/buscar/departamento");
    return data; 
  } catch (e) {
    throw e;
  }
}

export async function getProvincias(idDepartamento) {
  try {
    if (!idDepartamento) {
      console.log("idDepartamento vacío"); 
      return [];
    }
    console.log("Obteniendo provincias para el departamento:", idDepartamento);
    const data = await makeGetRequest(`/maestros/buscar/provincia/${idDepartamento}`);
    console.log("Provincias recibidas:", data); 
    return data;
  } catch (e) {
    console.error("Error en getTipoProv:", e); 
    throw e;
  }
}


// Obtener la lista de distritos por provincia
export async function getDistritos(idProvincia) {
  try {
    if (!idProvincia) {
      console.log("idProvincias vacío"); 
      return []; 
    }
    console.log("Obteniendo distritos para la provincia:", idProvincia);
    const data = await makeGetRequest(`/maestros/buscar/distrito/${idProvincia}`);
    console.log("Distritos recibidos:", data); 
    return data;
  } catch (e) {
    console.error("Error en getTipoDis:", e); 
    throw e;
  }
}

//OBSERVACIONES SERVICE 2
export async function getObservacionesFF() {
  try {
    const data = await makeGetRequest("/urbano/general/observacion/obtener");
    return data;
  } catch (e) {
    throw e;
  }
}


//OBSERVACIONES 

export async function postObservacionesFF(requestData) {
  try {
    const data = await makePostRequest(
      "/urbano/general/observacion/registrar",
      requestData
    );
    console.log(data);
    return data;
  } catch (e) {
    throw e;
  }
}

export async function putObservacionesFF(requestData, id_observacion) {
  try {
    const data = await makePutRequest(
      "/urbano/general/observacion/actualizar/" + id_observacion,
      requestData
    );

    return data;
  } catch (e) {
    throw e;
  }
}

export async function deleteObservacionFF(id_observacion) {
  try {
    const data = await makeDeleteRequest(
      "/urbano/general/observacion/eliminar/" + id_observacion
    );
    return data;
  } catch (e) {
    throw e;
  }
}
//   async function eliminarObservaciones() {
//     const id_observaciones = recordedData?.id_observacion;
//     await deleteObservaciones(id_observacion);
//     toast.error("Eliminado!");
//     resetForm();
//   }

//PROYECTISTA SERVICE

export async function postProyectista(requestData) {
  try {
    const data = await makePostRequest("/urbano/fuhu/proyectista/registrar",
      requestData
    );
    console.log(data);
    return data;
  } catch (e) {
    throw e;
  }
}

export async function putProyectista(requestData, id_proyectista) {
  try {
    const data = await makePutRequest(
      "/urbano/fuhu/proyectista/actualizar/" + id_proyectista, requestData
    );

    return data;
  } catch (e) {
    throw e;
  }
}

export async function deleteProyectistas(id_proyectista) {
  try {
    const data = await makeDeleteRequest(
      "/urbano/fuhu/proyectista/eliminar/" + id_proyectista
    );
    return data;
  } catch (e) {
    throw e;
  }
}
//cuadro area

export async function postCuadroArea(requestData) {
  try {
    const data = await makePostRequest("/urbano/fuhu/cuadro_area/registrar",
      requestData
    );
    console.log(data);
    return data;
  } catch (e) {
    throw e;
  }
}


export async function putCuadroArea(requestData, id_cuadro_area) {
  try {
    const data = await makePutRequest(
      "/urbano/fuhu/cuadro_area/actualizar/" + id_cuadro_area, requestData
    );

    return data;
  } catch (e) {
    throw e;
  }
}



export async function deleteCuadroArea(id_cuadro_area) {
  try {
    const data = await makeDeleteRequest(
      "/urbano/fuhu/cuadro_area/eliminar/" + id_cuadro_area
    );
    return data;
  } catch (e) {
    throw e;
  }
}


// Servicio para obtener 
export async function getNumeroCAP(n_colegiado) {
  try {
    const data = await makeGetRequest("/urbano/servicio/buscar/numeroCAP/"+n_colegiado);
    return data;
  } catch (e) {
    throw e;
  }
}

//REQUISITO SERVICE


export async function postRequisito(requestData) {
  try {
    const data = await makePostRequest("/urbano/fuhu/requisito/registrar",
      requestData
    );
    return data;
  } catch (e) {
    throw e;
  }
}


export async function putRequisito(requestData,id_requisito) {
  try {
    const data = await makePutRequest("/urbano/fuhu/requisito/actualizar/" + id_requisito ,requestData
    );
    console.log(data);
    return data;
  } catch (e) {
    throw e;
  }
}



export async function deleteRequisito(id_requisito) {
  try {
    const data = await makeDeleteRequest(
      "/urbano/fuhu/requisito/eliminar/" + id_requisito
    );
    console.log(data);
    return data;
  } catch (e) {
    throw e;
  }
}

//SOLICITUD SERVICE

//Tipo tramite

export async function postSolicitud(requestData) {
  try {
    const data = await makePostRequest("/urbano/fuhu/solicitud/registrar",
      requestData
    );
    console.log(data);
    return data;
  } catch (e) {
    throw e;
  }
}


export async function putSolicitud(requestData, id_solicitud) {
  try {
    const data = await makePutRequest(
      "/urbano/fuhu/solicitud/actualizar/" + id_solicitud, requestData
    );
    console.log(data);
    return data;
  } catch (e) {
    throw e;
  }
}



export async function deleteSolicitud(id_solicitud) {
  try {
    const data = await makeDeleteRequest(
      "/urbano/fuhu/solicitud/eliminar/" +id_solicitud
    );
    console.log(data);
    return data;
  } catch (e) {
    throw e;
  }
}


// Servicio para obtener 
export async function getTipoTramite() {
  try {
    const data = await makeGetRequest("/urbano/servicio/listar/tipo_tramite");
    console.log("Respuesta getTipo Tramite:", data); // Agregar este log
    return data;
  } catch (e) {
    throw e;
  }
}

export async function getTipoHab(){
  try{
    const data = await makeGetRequest("/urbano/servicio/listar/tipo_haburbana");
    console.log("Respuesta getTipoHab:", data); // Agregar este log
    return data;
  } catch (e) {
    console.error("Error en getTipoHab:", e); // Agregar log de error
    throw e;
  }
}
export async function getModAprob() {
  try {
    const data = await makeGetRequest("/urbano/servicio/listar/modalidad_aprobacion");
    console.log("Respuesta getModAprob:", data); // Agregar este log
    return data;
  } catch (e) {
    console.error("Error en getModAprob:", e); // Agregar log de error
    throw e;
  }
}
export async function getAnexos(){
  try{
    const data = await makeGetRequest("/urbano/servicio/listar/anexos");
    console.log("Respuesta getAnexos:", data); // Agregar este log
    return data;
  } catch (e) {
    console.error("Error en getAnexos:", e); // Agregar log de error
    throw e;
  }
}

//TERRENO SERVICE

export async function postTerreno(requestData) {
try {
  const data = await makePostRequest("/urbano/fuhu/terreno/registrar", requestData);
  console.log(data);
  return data;
} catch (e) {
  throw e;
}
}


export async function putTerreno(requestData, id_te_terreno) {
try {
  const data = await makePutRequest("/urbano/fuhu/terreno/actualizar/"+id_te_terreno, requestData);
  return data;
} catch (e) {
  throw e;
}
}


export async function deleteTerreno(id_te_terreno) {
try {
  const data = await makeDeleteRequest("/urbano/fuhu/terreno/eliminar/"+id_te_terreno);
  return data;
} catch (e) {
  throw e;
}
}

// Obtener la lista de departamentos
export async function getDepartamentos2() {
try {
  const data = await makeGetRequest("/maestros/buscar/departamento");
  return data; 
} catch (e) {
  throw e;
}
}

export async function getProvincias2(idDepartamento) {
try {
  if (!idDepartamento) {
    console.log("idDepartamento vacío"); 
    return [];
  }
  console.log("Obteniendo provincias para el departamento:", idDepartamento);
  const data = await makeGetRequest(`/maestros/buscar/provincia/${idDepartamento}`);
  console.log("Provincias recibidas:", data); 
  return data;
} catch (e) {
  console.error("Error en getTipoProv:", e); 
  throw e;
}
}


// Obtener la lista de distritos por provincia
export async function getDistritos2(idProvincia) {
try {
  if (!idProvincia) {
    console.log("idProvincias vacío"); 
    return []; 
  }
  console.log("Obteniendo distritos para la provincia:", idProvincia);
  const data = await makeGetRequest(`/maestros/buscar/distrito/${idProvincia}`);
  console.log("Distritos recibidos:", data); 
  return data;
} catch (e) {
  console.error("Error en getTipoDis:", e); 
  throw e;
}
}

//search
export async function getSearchPersonaN(personaN) {
  try {
    const data = await makeGetRequest(
      "/maestros/persona/buscarApi/" + personaN
    );

    return data;
  } catch (e) {
    throw e;
  }
}
export async function getSearchPersonaJ(personaJ) {
  console.log("personaJ",personaJ);
  try {
    const data = await makeGetRequest(
      "/maestros/persona/buscarApi/" + personaJ
    );
 
    return data;
  } catch (e) {
    throw e;
  }
}
