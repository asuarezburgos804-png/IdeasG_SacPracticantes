import {
  makeGetRequest,
  makePostRequest,
  makeDeleteRequest,
  makePutRequest,
} from "@/utils/api/api";

// CRUD Operations for Expense Filters
export async function getListFiltroEgresos() {
  try {
    const data = await makeGetRequest("/reportes/filtro-egresos/listar");
    return data;
  } catch (e) {
    throw e;
  }
}

export async function getFiltroEgresos(id) {
  try {
    const data = await makeGetRequest("/reportes/filtro-egresos/obtener/" + id);
    return data;
  } catch (e) {
    throw e;
  }
}

export async function postFiltroEgresos(requestData) {
  try {
    const data = await makePostRequest("/reportes/filtro-egresos/registrar", requestData);
    return data;
  } catch (e) {
    throw e;
  }
}

export async function putFiltroEgresos(requestData, id) {
  try {
    const data = await makePutRequest("/reportes/filtro-egresos/actualizar/" + id, requestData);
    return data;
  } catch (e) {
    throw e;
  }
}

export async function deleteFiltroEgresos(id) {
  try {
    const data = await makeDeleteRequest("/reportes/filtro-egresos/eliminar/" + id);
    return data;
  } catch (e) {
    throw e;
  }
}

// Catalog Services
export async function getTiposEgreso() {
  try {
    const data = await makeGetRequest("/reportes/catalogos/tipos-egreso");
    return data;
  } catch (e) {
    throw e;
  }
}

export async function getCategoriasEgreso() {
  try {
    const data = await makeGetRequest("/reportes/catalogos/categorias-egreso");
    return data;
  } catch (e) {
    throw e;
  }
}

export async function getUnidadesEjecutoras() {
  try {
    const data = await makeGetRequest("/reportes/catalogos/unidades-ejecutoras");
    return data;
  } catch (e) {
    throw e;
  }
}

export async function getCentrosCosto() {
  try {
    const data = await makeGetRequest("/reportes/catalogos/centros-costo");
    return data;
  } catch (e) {
    throw e;
  }
}

// Geographic Services
export async function getDepartamentos() {
  try {
    const data = await makeGetRequest("/reportes/catalogos/departamentos");
    return data;
  } catch (e) {
    throw e;
  }
}

export async function getProvincias(departamento) {
  try {
    const data = await makeGetRequest("/reportes/catalogos/provincias/" + departamento);
    return data;
  } catch (e) {
    throw e;
  }
}

export async function getDistritos(provincia) {
  try {
    const data = await makeGetRequest("/reportes/catalogos/distritos/" + provincia);
    return data;
  } catch (e) {
    throw e;
  }
}

// Filter Operations
export async function aplicarFiltroEgresos(requestData) {
  try {
    const data = await makePostRequest("/reportes/filtro-egresos/aplicar", requestData);
    return data;
  } catch (e) {
    throw e;
  }
}

export async function exportarFiltroEgresos(requestData, formato) {
  try {
    const data = await makePostRequest("/reportes/filtro-egresos/exportar/" + formato, requestData);
    return data;
  } catch (e) {
    throw e;
  }
}

export async function getEstadisticasEgresos(requestData) {
  try {
    const data = await makePostRequest("/reportes/filtro-egresos/estadisticas", requestData);
    return data;
  } catch (e) {
    throw e;
  }
}