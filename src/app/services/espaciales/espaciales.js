"use client"
import {
  makeGetRequest,
  makePostRequest,
  makePutRequest,
  makeDeleteRequest,
  makeGetRequestGeoservicios,
  makeGetRequestOpenlayer,
  makeGetRequestOpenlayerExterno,
  makeGetRequestOpenlayerWithCredentials,
} from "@/utils/api/api";
import {
  getFile,
  getFileShape,
  getFileJson,
  getFileGeoJSON,
} from "@/utils/api/apiFiles";

export async function getDataUrl(url,camposAlias,propiedadesTabla,utilizaAlias,tipo) {
  try {
    const data = await makeGetRequestOpenlayer(url);
    return {data,camposAlias,propiedadesTabla,utilizaAlias,tipo};
  } catch (e) {
    throw e;
  }
}

export async function getDataUrlExterno(url,servicio,propiedadesTabla,utilizaAlias,tipo) {
  try {
    const data = await makeGetRequestOpenlayerExterno(url);
    return {data,servicio,propiedadesTabla,utilizaAlias,tipo};
  } catch (e) {
    throw e;
  }
}

export async function getFiltroCapas(url, filtroCQL = "", layer) {
  try {
    const params = {
      service: "WFS",
      version: "1.0.0",
      request: "GetFeature",
      typeName: layer,  // Reemplaza con tu workspace:capa
      outputFormat: "application/json",
      CQL_FILTER: filtroCQL,  // Aplica el filtro CQL
      propertyName: "idaq,id_coordenadas,d_creacion,rol_id,id_encuesta",
    };

    const data = await makeGetRequestOpenlayer(url, params);
    return data;
  } catch (e) {
    console.error("Error fetching data:", e);
    throw e;
  }
}

export async function getDataGjsonWFSFullParams(url, paramsEnvio = {}) {
  try {
    const params = {
      service: "WFS",
      version: "1.0.0",
      request: "GetFeature",
      ...paramsEnvio
    };
    const data = await makeGetRequestOpenlayer(url, params);
    return data;
  } catch (e) {
    throw e;
  }
}

// export async function getDataGjsonFull(url) {
//   try {
//     // console.log(url);
//     // console.log('obteniendo datos espaciales');
//     const data = await makeGetRequestOpenlayer(url);
//     // console.log(data);
//     return data;
//   } catch (e) {
//     throw e;
//   }
// }

export async function busquedaAvanzada(bodyPost) {
  const data = await makePostRequest(
    "/espaciales/capas/busquedaavanzada",
    bodyPost
  );
  console.log(data);
  if (data.status == "success") {
    // window.alert("Vista registrada de forma correcta.");
    return data.data;
  } else {
    window.alert("No se pudo obtener los datos");
  }
}

export async function informacionCruzada(bodyPost) {
  const data = await makePostRequest(
    "/espaciales/capas/cruceinformacion",
    bodyPost
  );
  console.log(data);
  if (data.status == "success") {
    // window.alert("Vista registrada de forma correcta.");
    return data.data;
  } else {
    window.alert("No se pudo obtener los datos");
  }
}

export async function crearReporteExcel(body) {
  try {
    await getFile("/espaciales/capas/excel", body);
  } catch (e) {
    throw e;
  }
}

export async function crearExcelFiltroArea(body) {
  try {
    await getFile("/espaciales/capas/excel/filtros/area", body);
  } catch (e) {
    throw e;
  }
}

export async function filtrosServiciosSaludIIEE(bodyPost) {
  const data = await makePostRequest(
    "/espaciales/capas/filtro/servicios",
    bodyPost
  );
  if (data.status == "success") {
    return data.data;
  } else {
    window.alert("No se pudo obtener los datos");
  }
}

export async function filtrosServiciosSaludIIEEArea(bodyPost) {
  const data = await makePostRequest(
    "/espaciales/capas/filtro/servicios/area",
    bodyPost
  );
  if (data.status == "success") {
    return data.data;
  } else {
    window.alert("No se pudo obtener los datos");
  }
}

export async function filtrosServiciosSaludIIEEAreaNoCob(bodyPost) {
  const data = await makePostRequest(
    "/espaciales/capas/filtro/servicios/area/nocob",
    bodyPost
  );
  if (data.status == "success") {
    return data.data;
  } else {
    window.alert("No se pudo obtener los datos");
  }
}

export async function conseguirAfiliados(idccpp) {
  const data = await makeGetRequest(
    "/espaciales/capas/filtro/afiliados/" + idccpp
  );
  if (data.status == "success") {
    return data.data;
  } else {
    window.alert("No se pudo obtener los datos");
  }
}

export async function conseguirAfiliadosArea(idccpp) {
  const data = await makePostRequest(
    "/espaciales/capas/filtro/afiliados/area",
    idccpp
  );
  if (data.status == "success") {
    return data.data;
  } else {
    window.alert("No se pudo obtener los datos");
  }
}

export async function consultarDatosGenerales(bodyPost) {
  const data = await makePostRequest(
    "/espaciales/capas/filtro/servicios/generales",
    bodyPost
  );
  if (data.status == "success") {
    return data.data;
  } else {
    window.alert("No se pudo obtener los datos");
  }
}

export async function consultarDatosGeneralesArea(bodyPost) {
  const data = await makePostRequest(
    "/espaciales/capas/filtro/servicios/area/generales",
    bodyPost
  );
  if (data.status == "success") {
    return data.data;
  } else {
    window.alert("No se pudo obtener los datos");
  }
}

export async function crearTablaExcel(body) {
  try {
    await getFile("/espaciales/capas/excel/simple", body);
  } catch (e) {
    throw e;
  }
}

export async function crearTablaExcelIC(body) {
  try {
    await getFile("/espaciales/capas/excel/cruzada", body);
  } catch (e) {
    throw e;
  }
}

export async function crearTablaExcelCapas(body) {
  try {
    await getFile("/espaciales/capas/excel/solocapas", body);
  } catch (e) {
    throw e;
  }
}

export async function crearArchivoJson(body) {
  try {
    await getFileJson("/espaciales/capas/archivojson", body);
  } catch (e) {
    throw e;
  }
}

export async function crearArchivoGeoJSON(body) {
  try {
    await getFileGeoJSON("/espaciales/capas/archivogeojson", body);
  } catch (e) {
    throw e;
  }
}

export async function crearArchivoShape(body) {
  try {
    await getFileShape("/espaciales/capas/archivoshape", body);
  } catch (e) {
    throw e;
  }
}

export async function validacionData() {
  try {
    const data = await makeGetRequest("/espaciales/capas/validaciondata");
    if (data.status == "success") {
      return data.data;
    } else {
      window.alert("No se pudo obtener los datos");
    }
  } catch (e) {
    throw e;
  }
}

export async function jsonValidacion(id) {
  try {
    const data = await makeGetRequest("/espaciales/capas/json/fallido/" + id);
    if (data.status == "success") {
      return data.data;
    } else {
      window.alert("No se pudo obtener los datos");
    }
  } catch (e) {
    throw e;
  }
}

export async function capasBusqueda() {
  try {
    const data = await makeGetRequest("/espaciales/capas/interno");
    if (data.status == "success") {
      return data.data;
    } else {
      window.alert("No se pudo obtener los datos");
    }
  } catch (e) {
    throw e;
  }
}

export async function getVistas() {
  try {
    const data = await makeGetRequest("/espaciales/capas/vistas");
    if (data.status == "success") {
      return data.data;
    } else {
      window.alert("No se pudo obtener los datos");
    }
  } catch (e) {
    throw e;
  }
}

export async function postVistas(bodyPost) {
  const data = await makePostRequest("/espaciales/capas/vistas", bodyPost);
  console.log(data);
  if (data.status == "success") {
    window.alert("Vista registrada de forma correcta.");
    return data.data;
  } else {
    window.alert("No se pudo obtener los datos");
  }
}

export async function postImagenesReporte(bodyPost) {
  const data = await makePostRequest("/mapfish/mapa/subir", bodyPost);
  // console.log(data);
  if (data.status == "success") {
    // window.alert("Vista registrada de forma correcta.");
    return data;
  } else {
    window.alert("No se pudo obtener los datos");
  }
}

export async function postImagenesReporteDelete(bodyPost) {
  const data = await makePostRequest("/mapfish/mapa/eliminar", bodyPost);
  console.log(data);
  if (data.status == "success") {
    // window.alert("Vista registrada de forma correcta.");
    return data;
  } else {
    window.alert("No se pudo obtener los datos");
  }
}

export async function deleteVistas(id_vistas) {
  const data = await makeDeleteRequest("/espaciales/capas/vistas/" + id_vistas);
  console.log(data);
  if (data.status == "success") {
    window.alert("Vista eliminada de forma correcta.");
    return data.data;
  } else {
    window.alert("No se pudo obtener los datos");
  }
}

export async function columnasCapas(tabla) {
  try {
    const data = await makeGetRequest("/espaciales/capas/atributos/" + tabla);
    if (data.status == "success") {
      return data.data;
    } else {
      window.alert("No se pudo obtener los datos");
    }
  } catch (e) {
    throw e;
  }
}

export async function zoomByBox(map,bodyPost) {
  const data = await makePostRequest("/espaciales/extent/all", bodyPost);
  if (data.status == "success") {
    map.getView().fit(data.data);
  } else {
    window.alert("No se pudo obtener los datos");
  }
}

export async function zoomByBoxTable(map,bodyPost) {
  const data = await makePostRequest("/espaciales/extent/table", bodyPost);
  if (data.status == "success") {
    map.getView().fit(data.data);
  } else {
    window.alert("No se pudo obtener los datos");
  }
}

export async function getListBaseMap() {
  const data = await makeGetRequest("/espaciales/mapa_base");
  if (data.status == "success") {
    return data.data;
  } else {
    window.alert("No se pudo obtener los datos");
  }
}

export async function postListBaseMap(body) {
  const data = await makePostRequest("/espaciales/mapa_base", body);
  if (data.status == "success") {
    window.alert("registro correcto!");
    return data.data;
  } else {
    window.alert("No se pudo obtener los datos");
  }
}

export async function deleteListBaseMap(id_capa) {
  const data = await makeDeleteRequest("/espaciales/mapa_base/" + id_capa);
  if (data.status == "success") {
    window.alert("Mapa base eliminado!");
    return data.data;
  } else {
    window.alert("No se pudo obtener los datos");
  }
}

export async function updateListBaseMap(body) {
  const data = await makePutRequest("/espaciales/mapa_base/", body);
  if (data.status == "success") {
    window.alert("Mapa base actualizado!");
    return data.data;
  } else {
    window.alert("No se pudo obtener los datos");
  }
}

export async function getTablasEsquema() {
  const data = await makeGetRequest("/espaciales/capas/tablas/esquema");
  if (data.status == "success") {
    return data.data;
  } else {
    window.alert("No se pudo obtener tablas del esquema espacial");
  }
}

export async function getSuperGrupos() {
  const data = await makeGetRequest("/espaciales/capas/supergrupos");
  if (data.status == "success") {
    return data.data;
  } else {
    window.alert("No se pudo obtener super grupos");
  }
}

export async function getWorkspaces(url) {
  const data = await makeGetRequestOpenlayer(url);
  console.log(data.workspaces.workspace);
  console.log(data.workspaces.workspace.length);
  if (data.workspaces.workspace.length > 0 ) {
    return data.workspaces.workspace;
  } else {
    window.alert("No se pudo obtener workspaces");
  }
}

export async function updateLayers(body) {
  const data = await makePutRequest("/espaciales/capas", body);
  if (data.status == "success") {
    return data.data;
  } else {
    window.alert("No se pudo actualizar");
  }
}

export async function postLayers(body) {
  const data = await makePostRequest("/espaciales/capas", body);
  if (data.status == "success") {
    window.alert("registro correcto!");
    return data.data;
  } else {
    window.alert("No se pudo actualizar");
  }
}

export async function deleteLayers(id_capa) {
  const data = await makeDeleteRequest("/espaciales/capas/" + id_capa);
  if (data.status == "success") {
    return data.data;
  } else {
    window.alert("No se pudo eliminar");
  }
}

export async function getGrupos() {
  const data = await makeGetRequest("/espaciales/capas/grupos");
  if (data.status == "success") {
    return data.data;
  } else {
    window.alert("No se pudo obtener grupos");
  }
}

export async function getListLayersInvitado(id) {
  const data = await makeGetRequest("/espaciales/capas/estructura/" + id);
  return data.data;
}

export async function getListLayers() {
  const data = await makeGetRequest("/espaciales/capas/estructura");
  return data.data;
}

export async function getListLayersTable(page, rowsPerPage) {
  const data = await makeGetRequest("/espaciales/capas/table", {
    page: page,
    pageSize: rowsPerPage,
  });
  return data.data;
}

export async function getListLayersTableExterno(page, rowsPerPage) {
  const data = await makeGetRequest("/espaciales/capas/table/externo", {
    page: page,
    pageSize: rowsPerPage,
  });
  return data.data;
}

export async function obteniendoCapasOrdenadas() {
  const data = await makeGetRequest("/suite/capas/rol/orden");
  return data.data;
}

export async function obteniendoCapasOrdenadasInvitado(id_cliente) {
  const data = await makeGetRequest(
    "/suite/capas/rol/orden/invitado/" + id_cliente
  );
  return data.data;
}

export async function obteniendoCamposCapas(id_capa, id_rol) {
  const data = await makeGetRequest(
    "/espaciales/capas/visible/" + id_capa + "/" + id_rol
  );
  return data.data;
}

export async function obteniendoFotosLotes(id_lote) {
  const data = await makeGetRequest(
    "/espaciales/sml/lote/foto/" + id_lote
  );
  return data.data;
}

export async function obteniendoFotosLotesSJL(fid) {
  const data = await makeGetRequest(
    "/espaciales/sml/lote/foto/sjl/" + fid
  );
  return data.data;
}


export async function obteniendoUnicatByIdLote(id_lote) {
  const data = await makeGetRequest(
    "/espaciales/sml/lote/ficha/unicat/" + id_lote
  );
  return data.data;
}

export async function obteniendoFotosPreguntaEncuesta(idaq) {
  const data = await makeGetRequest(
    "/movil/fotos/pregunta/capa/" + idaq
  );
  return data.data;
}

export async function obteniendoFilePreguntaEncuesta(idaq) {
  const data = await makeGetRequest(
    "/movil/files/pregunta/capa/" + idaq
  );
  return data.data;
}

export async function getRespuestasEncuestaIdaq(idaq) {
  
  const data = await makeGetRequest(
      "/movil/obtener/respuestas/encuesta/" + idaq
  );
  return data;
}


export async function crearReporteExcelEncuesta(body) {
  try {
    await getFile("/movil/excel/encuesta", body);
  } catch (e) {
    throw e;
  }
}

export async function obteniendoCoordenadasPreguntaEncuesta(idaq) {
  const data = await makeGetRequest(
    "/movil/coordenadas/pregunta/capa/" + idaq
  );
  return data.data;
}

export async function obteniendoCamposCapasInvitado(id_capa, id_rol) {
  const data = await makeGetRequest(
    "/espaciales/capas/visible/invitado/" + id_capa + "/" + id_rol
  );
  return data.data;
}

export async function actualizarCamposCapas(body) {
  const data = await makePutRequest(
    "/espaciales/capas/actualizar/visible",
    body
  );
  return data.data;
}

export async function getDataGjson(url) {
  try {
    const data = await makeGetRequestOpenlayer(url);
    return data.features;
  } catch (e) {
    throw e;
  }
}

export async function getDataGjsonFull(url) {
  try {
    // console.log(url);
    // console.log('obteniendo datos espaciales');
    const data = await makeGetRequestOpenlayer(url);
    // console.log(data);
    return data;
  } catch (e) {
    throw e;
  }
}

// ✅ Función específica para obtener features con featureID
export async function getDataGjsonFullWithFeatureID(url, credentials) {
  try {
    const data = await makeGetRequestOpenlayerWithCredentials(url, credentials);
    return data;
  } catch (e) {
    console.error("❌ Error obteniendo feature específico:", e);
    return {
      success: false,
      error: e.message,
      features: []
    };
  }
}

//Geoservicios
export async function getGeoservicios() {
  const data = await makeGetRequest("/espaciales/capas/publicados/geoportal");
  return data.data;
}
//Geoservicios

export async function importToPostgres(request) {
  try {
    console.log("Tamaño del cuerpo a enviar:", JSON.stringify(request).length, "bytes"); // Para verificar el tamaño
    const data = await makePostRequest("/import/external", request);
    return data;
  } catch (e) {
    throw e;
  }
}

export async function checkTableAvailable({ schema, table }) {
  try {
    const res = await makePostRequest(`/import/validate-table`, {
      schema,
      table,
    });
    return res; // true si está disponible, false si ya existe
  } catch (e) {
    throw e;
  }
}

export async function validateGeoserverLayerName(nombreCapaGeoserver) {
  const body = {
    layerName: nombreCapaGeoserver,
  };
  try {
    const data = await makePostRequest(
      `/import/validate-geoserver-layer`, body
    );
    return data; // true si está disponible, false si ya existe
  } catch (e) {
    throw e;
  }
} 

export async function updateCapaPostgres(id, request) {
  try {
    const data = await makePutRequest(`/import/capa/update/${id}`, request);
    return data;
  } catch (e) {
    throw e;
  }
}

export async function deleteCapaPostgres(id) {
  try {
    const data = await makeDeleteRequest(`/import/capa/delete/${id}`);
    return data;
  } catch (e) {
    throw e;
  }
} 

export async function updateToPostgres(request) {
  try {
    console.log("Tamaño del cuerpo a enviar:", JSON.stringify(request).length, "bytes"); // Para verificar el tamaño
    const data = await makePostRequest("/import/update/external", request);
    return data;
  } catch (e) {
    throw e;
  }
}