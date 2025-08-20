import { makePostRequest } from "@/utils/api/api";

export async function testConnection(request) {
  try {
    let data;
    data = await makePostRequest("/connection/test", request);
    return data;
  } catch (e) {
    throw e;
  }
}
