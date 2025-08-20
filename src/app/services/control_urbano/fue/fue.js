import {
  makeGetRequest,
  makePostRequest,
  makeDeleteRequest,
  makePutRequest,
} from "@/utils/api/api";
export async function getListFue() {
  try {
    const data = await makeGetRequest("/urbano/fue/listar");
    return data;
  } catch (e) {
    throw e;
  }
}

export async function getFormFue(id_expediente) {
  try {
    const data = await makeGetRequest("/urbano/fue/obtener_fue/"+id_expediente);
    return data;
  } catch (e) {
    throw e;
  }
  }
  
  export async function getIdFue() {
    try {
      const data = await makeGetRequest("/urbano/general/expediente/obtener/NuevoIdExpediente");
      return data;
    } catch (e) {
      throw e;
    }
  }

//administrado Service
export async function getAdministrado(id) {
  try {
    const data = await makeGetRequest("urbano/fue/administrado/obtener/"+id);
    return data;
  } catch (e) {
    throw e;
  }
}



export async function postAdministrado(requestData) {
  try {
    const data = await makePostRequest("/urbano/fue/administrado/registrar",requestData);
    console.log(data);
    return data;
  } catch (e) {
    throw e;
  }
}

export async function putAdministrado(requestData, id) {
  try {
    const data = await makePutRequest("/urbano/fue/administrado/actualizar/"+id, requestData);
    return data;
  } catch (e) {
    throw e;
  }
}

export async function deleteAdministrado(id) {
  try {
    const data = await makeDeleteRequest("/urbano/fue/administrado/eliminar/"+id);
    return data;
  } catch (e) {
    throw e;
  }
}

//td estado civil
export async function getEstadoCivil() {
  try {
    const data = await makeGetRequest("/urbano/servicio/listar/estado_civil");
    return data;
  } catch (e) {
    throw e;
  }
}

//terreno service
export async function getTerreno(id_te_terreno) {
  try {
    const data = await makeGetRequest("/urbano/fue/terreno/obtener/"+id_te_terreno);
    return data; 
  } catch (e) {
    throw e;
  }
}

export async function postTerreno(requestData) {
  try {
    const data = await makePostRequest("/urbano/fue/terreno/registrar", requestData);
    console.log(data);
    return data;
  } catch (e) {
    throw e;
  }
}


export async function putTerreno(requestData, id_te_terreno) {
  try {
    const data = await makePutRequest("/urbano/fue/terreno/actualizar/"+id_te_terreno, requestData);
    return data;
  } catch (e) {
    throw e;
  }
}


export async function deleteTerreno(id_te_terreno) {
  try {
    const data = await makeDeleteRequest("/urbano/fue/terreno/eliminar/"+id_te_terreno);
    return data;
  } catch (e) {
    throw e;
  }
}

// Obtener los tipos de vias
export async function getTipoVia() {
  try {
    const data = await makeGetRequest("/urbano/servicio/listar/tipo_via"); 
    console.log("Respuesta getTipoVia:", data); // Agregar este log
    return data;
  } catch (e) {
    throw e;
  }
}

// Obtener la lista de departamentos
export async function getDepartamentos() {
  try {
    const data = await makeGetRequest("/maestros/buscar/departamento");
    //console.log("Respuesta getTipoDep:", data); // Agregar este log
    return data; 
  } catch (e) {
    //console.error("Error en getTipDep:", e); // Agregar log de error
    throw e;
  }
}

export async function getProvincias(idDepartamento) {
  try {
    if (!idDepartamento) {
      console.log("idDepartamento vacío"); // Verificar si llega vacío
      return []; // Devuelve un arreglo vacío si no hay departamento seleccionado
    }
    console.log("Obteniendo provincias para el departamento:", idDepartamento);
    const data = await makeGetRequest(`/maestros/buscar/provincia/${idDepartamento}`);
    console.log("Provincias recibidas:", data); // Verifica la respuesta del servidor
    return data;
  } catch (e) {
    console.error("Error en getTipoProv:", e); // Log de error
    throw e;
  }
}


// Obtener la lista de distritos por provincia
export async function getDistritos(idProvincia) {
  try {
    if (!idProvincia) {
      console.log("idProvincias vacío"); // Verificar si llega vacío
      return []; // Devuelve un arreglo vacío si no hay departamento seleccionado
    }
    console.log("Obteniendo distritos para la provincia:", idProvincia);
    const data = await makeGetRequest(`/maestros/buscar/distrito/${idProvincia}`);
    console.log("Distritos recibidos:", data); // Verifica la respuesta del servidor
    return data;
  } catch (e) {
    console.error("Error en getTipoDis:", e); // Log de error
    throw e;
  }
}


//area libre Service
export async function postareaLibre(requestData) {
  try {
    const data = await makePostRequest(
      "/urbano/fue/detalle_cuadra/registrar",
      requestData
    );
    console.log(data);
    return data;
  } catch (e) {
    throw e;
  }
}

export async function putareaLibre(requestData, id_cuadra_area) {
  try {
    const data = await makePutRequest(
      "/urbano/fue/cuadro_area/actualizar/" + id_cuadra_area,
      requestData
    );

    return data;
  } catch (e) {
    throw e;
  }
}

export async function eliminarAreaLibre(id_detalle_cuadra) {
  try {
    const data = await makeDeleteRequest(
      "/urbano/fue/detalle_cuadra/eliminar/" + id_detalle_cuadra
    );
    return data;
  } catch (e) {
    throw e;
  }
}

export async function postPisos(requestData) {
  try {
    const data = await makePostRequest(
      "/urbano/fue/detalle_cuadra/registrar",
      requestData
    );
    console.log(data);
    return data;
  } catch (e) {
    throw e;
  }
}

export async function putPisos(requestData, id_detalle_cuadra) {
  try {
    const data = await makePutRequest(
      "/urbano/fue/detalle_cuadra/actualizar/" + id_detalle_cuadra,
      requestData
    );

    return data;
  } catch (e) {
    throw e;
  }
}

export async function eliminarPisos(id_detalle_cuadra) {
  try {
    const data = await makeDeleteRequest(
      "/urbano/fue/detalle_cuadra/eliminar/" + id_detalle_cuadra
    );
    return data;
  } catch (e) {
    throw e;
  }
}

//doc. adjuntos Service
export async function getDocAdjunto(id) {
  try {
    const data = await makeGetRequest("/urbano/fue/doc/obtener"+id);
    return data;
  } catch (e) {
    throw e;
  }
}

export async function postDocAdjunto(requestData) {
  try {
    const data = await makePostRequest("/urbano/fue/doc/registrar",requestData);
    console.log(data);
    return data;
  } catch (e) {
    throw e;
  }
}
export async function putDocAdjunto(id,requestData) {
  try {
    const data = await makePutRequest("/urbano/fue/doc/actualizar/"+id, requestData);
    return data;
  } catch (e) {
    throw e;
  }
}
export async function deleteDocAdjunto(id) {
  try {
    const data = await makeDeleteRequest("/urbano/fue/doc/eliminar/"+id);
    return data;
  } catch (e) {
    throw e;
  }
}

//edificacion service
export async function getEdificacion(id_te_edificacion) {
  try {
    const data = await makeGetRequest("/urbano/fue/edificacion/OBTENER"+id_te_edificacion);
    console.log(data);
    return data;
  } catch (e) {
    throw e;
  }
}

export async function postEdificacion(requestData) {
  try {
    const data = await makePostRequest("/urbano/fue/edificacion/registrar",requestData);
    console.log(data);
    return data;
  } catch (e) {
    throw e;
  }
}
export async function putEdificacion(requestData,id_te_edificacion) {
  try {
    const data = await makePutRequest("/urbano/fue/edificacion/actualizar/"+id_te_edificacion ,requestData);
    console.log(data);
    return data;
  } catch (e) {
    throw e;
  }
}
export async function deleteEdificacion(id_te_edificacion) {
  if (!id_te_edificacion) {
      throw new Error("id_te_edificacion no está definido");
  }
  return await makeDeleteRequest(`/urbano/fue/edificacion/eliminar/${id_te_edificacion}`);
}

//observaciones service
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

//proyectista Service

export async function getValorObraPro(id_valor_obra) {
  try {
    const data = await makeGetRequest(
      "/urbano/fue/valor_obra/obtener" + id_valor_obra
    );

    return data;
  } catch (e) {
    throw e;
  }
}


export async function postProyectistasF(requestData) {
  try {
    const data = await makePostRequest(
      "/urbano/fue/proyectista/registrar",
      requestData
    );
    console.log(data);
    return data;
  } catch (e) {
    throw e;
  }
}

export async function putProyectistasF(requestData, id_proyectista) {
  try {
    const data = await makePutRequest(
      "/urbano/fue/proyectista/actualizar" + id_proyectista,
      requestData
    );

    return data;
  } catch (e) {
    throw e;
  }
}

export async function deleteProyectistasF(id_proyectista) {
  try {
    const data = await makeDeleteRequest(
      "/urbano/fue/proyectistas/eliminar/" + id_proyectista
    );
    return data;
  } catch (e) {
    throw e;
  }
}
  
//Proyecto

  export async function postProyecto(requestData) {
    try {
      const data = await makePostRequest(
        "/urbano/fue/cuadro_area/registrar",
        requestData
      );
      console.log(data);
      return data;
    } catch (e) {
      throw e;
    }
  }
  
  export async function putProyecto(requestData, id_cuadra_area) {
    try {
      const data = await makePutRequest(
        "/urbano/fue/cuadro_area/actualizar/" + id_cuadra_area,
        requestData
      );
  
      return data;
    } catch (e) {
      throw e;
    }
  }

  export async function deleteProyecto(id_cuadra_area) {
    try {
      const data = await makeDeleteRequest(
        "/urbano/fue/cuadro_area/eliminar/" + id_cuadra_area
      );
      return data;
    } catch (e) {
      throw e;
    }
  }

//ProyectoDetalle

export async function postProyectoDetalle(requestData) {
    try {
      const data = await makePostRequest(
        "/urbano/fue/detalle_cuadra/registrar",
        requestData
      );
      console.log(data);
      return data;
    } catch (e) {
      throw e;
    }
  }
  
  export async function putProyectoDetalle(requestData, id_detalle_cuadra) {
    try {
      const data = await makePutRequest(
        "/urbano/fue/detalle_cuadra/actualizar/" + id_detalle_cuadra,
        requestData
      );
  
      return data;
    } catch (e) {
      throw e;
    }
  }

  export async function deleteProyectoDetalle(id_detalle_cuadra) {
    try {
      const data = await makeDeleteRequest(
        "/urbano/fue/detalle_cuadra/eliminar/" + id_detalle_cuadra
      );
      return data;
    } catch (e) {
      throw e;
    }
  }

  //solicitud_service
  export async function getSolicitud(id) {
    try {
      const data = await makeGetRequest("/urbano/fue/solicitud/obtener/"+id);
      return data; 
    } catch (e) {
      throw e;
    }
}

export async function postSolicitud(requestData) {
    try {
      const data = await makePostRequest(
        "/urbano/fue/solicitud/registrar",
         requestData
      );
      console.log(data);
      return data;
    } catch (e) {
      throw e;
    }
}

export async function putSolicitud(requestData,id) {
    try {
      const data = await makePutRequest("/urbano/fue/solicitud/actualizar/"+id, requestData);
      return data;
    } catch (e) {
      throw e;
    }
}

export async function deleteSolicitud(id) {
    try {
      const data = await makeDeleteRequest("/urbano/fue/solicitud/eliminar/"+id);
      return data;
    } catch (e) {
      throw e;
    }
}

// Servicio para obtener 
export async function getTipoTramite() {
    try {
      const data = await makeGetRequest("/urbano/servicio/listar/tipo_tramite");
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

export async function getTipoObraSol(){
  try{
    const data = await makeGetRequest("/urbano/servicio/listar/tipo_obra");
    console.log("Respuesta getTipoObra:", data); // Agregar este log
    return data;
  } catch (e) {
    console.error("Error en getTipoObra:", e); // Agregar log de error
    throw e;
  }
}

//valor de obra Service
export async function getValorObra(id_valor_obra) {
  try {
    const data = await makeGetRequest(
      "/urbano/fue/valor_obra/obtener" + id_valor_obra
    );

    return data;
  } catch (e) {
    throw e;
  }
}

export async function postValorObra(requestData) {
  try {
    const data = await makePostRequest(
      "/urbano/fue/valor_obra/registrar",
      requestData
    );
    console.log(data);
    return data;
  } catch (e) {
    throw e;
  }
}

export async function putValorObra(id_valor_obra, requestData) {
  try {
    const data = await makePutRequest(
      "/urbano/fue/valor_obra/actualizar/"+ id_valor_obra,
      requestData
    );

    return data;
  } catch (e) {
    throw e;
  }
}

export async function deleteValorObra(id_valor_obra) {
  try {
    const data = await makeDeleteRequest(
      "/urbano/fue/valor_obra/eliminar/" + id_valor_obra
    );
    return data;
  } catch (e) {
    throw e;
  }
}

export async function getTipoObraVal() {
  try {
    const data = await makeGetRequest("/urbano/servicio/listar/tipo_obra");
    return data;
  } catch (e) {
    throw e;
  }
}

// Servicio para obener cip cap
export async function getSearchNumColegiado(n_colegiado) {
  try {
    const data = await makeGetRequest("/urbano/servicio/buscar/numero_colegiado/"+n_colegiado);
    return data;
  } catch (e) {
    throw e;
  }
}