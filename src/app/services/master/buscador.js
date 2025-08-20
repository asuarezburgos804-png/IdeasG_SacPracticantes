import { makeGetRequest } from "@/utils/api/api";

export async function fetchPersona() {
  try {
    const data = await makeGetRequest("/maestros/persona/fi/persona");
    return data.data;
  } catch (e) {
    throw e;
  }
}
