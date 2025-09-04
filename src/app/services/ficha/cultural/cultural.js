import {
  makeGetRequest,
  makePostRequest,
  makeDeleteRequest,
  makePutRequest,
} from "@/utils/api/api";

export async function getFichaCultural(requestData) {
  try {
    const data = await makeGetRequest(
      "/catastro/fcubcu/obtener_ficha_bcul/" + requestData
    );
    
    return data;
  } catch (e) {
    throw e;
  }
}



