import { makeDeleteRequest, makeGetRequest, makePostRequest, makePutRequest } from "@/utils/api/api";

export async function saveRepository(request) {
  try {
    const data = await makePostRequest("/import/repository/save", request);
    return data;
  } catch (e) {
    throw e;
  }
}

export async function updateRepository(id, request) {
  try {
    const data = await makePutRequest(`/import/repository/update/${id}`, request);
    return data;
  } catch (e) {
    throw e;
  }
}

export async function deleteRepository(id) {
  try {
    const data = await makeDeleteRequest(`/import/repository/delete/${id}`);
    return data;
  } catch (e) {
    throw e;
  }
}

export async function getRepository() {
  try {
    const data = await makeGetRequest("/import/repository");
    return data;
  } catch (e) {
    throw e;
  }
}

export async function getRepositoryList() {
  try {
    const data = await makeGetRequest("/import/repository/list");
    return data;
  } catch (e) {
    throw e;
  }
}

export async function getRepositoryListByUser() {
  try {
    const data = await makeGetRequest("/import/repository/list/byuser");
    return data;
  } catch (e) {
    throw e;
  }
}

export async function getRepositoryTable(request) {
  try {
  const data = await makePostRequest("/import/repository/table/byid", request);
    return data;
  } catch (e) {
    throw e;
  }
}