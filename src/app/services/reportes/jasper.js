import {
    makeGetRequestJasper,
    makePostRequestJasper,
  } from "@/utils/api/apiReportesJasper";
  
  // Servicios de Sistemas
  export async function getReportePrueba(id_sistema) {
    try {
      const data = await makeGetRequestJasper("/reportes/jasper" + id_sistema);
      return data;
    } catch (e) {
      throw e;
    }
  }

  export async function postReporteJasper(body) {
    try {
      const data = await makePostRequestJasper("/reportes/jasper", body);
      return data;
    } catch (e) {
      throw e;
    }
  }
