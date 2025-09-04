import {
    makeDeleteRequest,
    makeGetRequest,
    makePostRequest,
    makePutRequest,
} from "@/utils/api/api";

export async function saveOrdenSgByRol(request) {
    try {
      const data = await makePostRequest("/suite/sgc/capa/sg/orden", request);
      return data;
    } catch (e) {
      throw e;
    }
}

export async function saveOrdenGByRol(request) {
    try {
      const data = await makePostRequest("/suite/sgc/capa/g/orden", request);
      return data;
    } catch (e) {
      throw e;
    }
}

export async function saveOrdenCByRol(request) {
    try {
      const data = await makePostRequest("/suite/sgc/capa/c/orden", request);
      return data;
    } catch (e) {
      throw e;
    }
}