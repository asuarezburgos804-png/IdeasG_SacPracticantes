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

export async function createDynamicTable(request) {
  try {
    const data = await makePostRequest("/import/dynamic-table", request);
    return data;
  } catch (e) {
    throw e;
  }
}