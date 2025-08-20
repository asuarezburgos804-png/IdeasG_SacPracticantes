import { makePostRequest, makeGetRequest } from "@/utils/api/api";

export async function getRoles() {
  try {
    const data = await makeGetRequest("/security/rol");
    return data;
  } catch (e) {
    throw e;
  }
}
