import { makeGetRequest } from "@/utils/api/api";

export async function getProfile() {
  try {
    const data = await makeGetRequest("/security/profile");
    return data;
  } catch (e) {
    throw e;
  }
}
