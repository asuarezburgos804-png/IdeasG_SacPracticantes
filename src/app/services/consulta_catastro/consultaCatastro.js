import {
  makeGetRequest,
  makePostRequest,
  makeDeleteRequest,
  makePutRequest,
} from "@/utils/api/api";
import { getFileExcel } from "@/utils/api/apiFiles";

//POR FICHAS  CATASTRALES  INGRESADAS
export async function postCantidadFichasCatastrales(params) {
  try {
    const data = await makePostRequest(
      "/catastro/consulta/cantidadone",
      params
    );
    return data;
  } catch (e) {
    throw e;
  }
}

export async function postAreaGraficaVsTerrenoVerificado(params) {
  try {
    const data = await makePostRequest(
      "/catastro/consulta/obtener_consulta_one",
      params
    );
    return data;
  } catch (e) {
    throw e;
  }
}

export async function postAnexoTwo(params) {
  try {
    const data = await makePostRequest(
      "/catastro/consulta/anexotwo",
      params
    );
    return data;
  } catch (e) {
    throw e;
  }
}

export async function postCucLote(params) {
  try {
    const data = await makePostRequest(
      "/catastro/consulta/cucporlote",
      params
    );
    return data;
  } catch (e) {
    throw e;
  }
}

export async function postAreaConstructivasVsAreaVerificada(params) {
  try {
    const data = await makePostRequest(
      "/catastro/consulta/obtener_consulta_two",
      params
    );
    return data;
  } catch (e) {
    throw e;
  }
}

export async function postComercialEspacialVsActividadEconomica(params) {
  try {
    const data = await makePostRequest(
      "/catastro/consulta/obtener_consulta_tree",
      params
    );
    return data;
  } catch (e) {
    throw e;
  }
}
export async function postLinderoEspcialVsLinderoFicha(params) {
  try {
    const data = await makePostRequest(
      "/catastro/consulta/obtener_consulta_four",
      params
    );
    return data;
  } catch (e) {
    throw e;
  }
}

//REPORTE DE CANTIDAD DE FICHAS

export async function getAllDataFile(isExcel) {
  try {
    const data = await getFileExcel(
      "/catastro/consulta/fichas/total?exportar=" + isExcel
    );
    return data;
  } catch (e) {
    throw e;
  }
}
export async function getAllUsersDataFile(isExcel) {
  try {
    const data = await getFileExcel(
      "/catastro/consulta/fichas/usuario?exportar=" + isExcel
    );
    return data;
  } catch (e) {
    throw e;
  }
}

export async function getAllUsersByDateDataFile(isExcel, date_i, date_f) {
  try {
    const data = await getFileExcel(
      `/catastro/consulta/fichas/usuario/fechas?exportar=${isExcel}&date_i=${date_i}&date_f=${date_f}`
    );
    return data;
  } catch (e) {
    throw e;
  }
}

export async function getUserDataFile(isExcel, codUser) {
  try {
    const data = await getFileExcel(
      `/catastro/consulta/fichas/usuario/nombre?exportar=${isExcel}&c_usuario=${codUser}
`
    );
    return data;
  } catch (e) {
    throw e;
  }
}
export async function getUserbyDateDataFile(isExcel, codUser, date_i, date_f) {
  const data = `/catastro/consulta/fichas/usuario/fechas?exportar=${isExcel}&c_usuario=${codUser}&date_i=${date_i}&date_f=${date_f}`;
  try {
    return data;
  } catch (e) {
    throw e;
  }
}

export async function getListUsers() {
  try {
    const data = await makeGetRequest("/catastro/consulta/usuarios");
    return data;
  } catch (e) {
    throw e;
  }
}
