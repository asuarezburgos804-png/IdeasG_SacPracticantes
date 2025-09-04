import {
    makeGetRequest
  } from "@/utils/api/api";
  
  export async function realizarMigracionSNCP() {
    try {
      const data = await makeGetRequest(
        "/glgis/sncp/migracion"
      );
      return data;
    } catch (e) {
      throw e;
    }
  }