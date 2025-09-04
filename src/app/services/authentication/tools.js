import { makeGetRequest } from "@/utils/api/api";

export async function getTools() {
  try {
    const data = await makeGetRequest("/security/tools");
    return data;
  } catch (e) {
    throw e;
  }
}
