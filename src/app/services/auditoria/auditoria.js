import {
  makeGetRequest,
  makePostRequest,
  makeDeleteRequest,
} from "@/utils/api/api";

export async function getAudit(params) {
  try {
    let data;
    data = await makeGetRequest(
      "/auditoria/registros/obtenerAuditoria",
      params
    );
    return data;
  } catch (e) {
    throw e;
  }
}

export async function postSaveIdNumber(params) {
  try {
    let data;
    data = await makePostRequest("/suite/manager/ingreso/sistema", params);
    return data;
  } catch (e) {
    throw e;
  }
}

export async function getCountVisists() {
  try {
    let data;
    data = await makeGetRequest("/suite/manager/cantidad/ingresos");
    return data;
  } catch (e) {
    throw e;
  }
}
