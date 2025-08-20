import {
  makeGetRequest,
  makePostRequest,
  makeDeleteRequest,
  makePutRequest,
} from "@/utils/api/api";

export async function getRolesBySistemas(id) {
  try {
    const data = await makeGetRequest("/security/rol/sistema/" + id);
    return data;
  } catch (e) {
    throw e;
  }
}

/***Obtener roles sin id */
export async function getRolesBySistemasWithoutId() {
  try {
    const data = await makeGetRequest("/security/rol/sistema");
    return data;
  } catch (e) {
    throw e;
  }
}

export async function getToolsByRol(id) {
  try {
    const data = await makeGetRequest("/security/rol/tools/" + id);
    return data;
  } catch (e) {
    throw e;
  }
}

export async function saveRol(request) {
  try {
    const data = await makePostRequest("/security/rol", request);
    return data;
  } catch (e) {
    throw e;
  }
}

export async function putRol(request) {
  try {
    const data = await makePutRequest("/security/rol", request);
    return data;
  } catch (e) {
    throw e;
  }
}

export async function deleteRol(id) {
  try {
    const data = await makeDeleteRequest("/security/rol/" + id);
    return data;
  } catch (e) {
    throw e;
  }
}

export async function saveRolTools(request) {
  try {
    const data = await makePostRequest("/security/rol/tools", request);
    return data;
  } catch (e) {
    throw e;
  }
}

export async function deleteRolTools(request) {
  try {
    const data = await makeDeleteRequest(
      "/security/rol/tools/" +
        request.fk_rol +
        "/" +
        request.fk_modulo +
        "/" +
        request.fk_grupo +
        "/" +
        request.fk_menu
    );
    return data;
  } catch (e) {
    throw e;
  }
}

export async function saveSolicitud(request) {
  try {
    const data = await makePostRequest("/suite/register/geoportal", request);
    return data;
  } catch (e) {
    throw e;
  }
}

export async function solicitudNewUser(request) {
  try {
    const data = await makePostRequest("/suite/admin/newuser", request);
    return data;
  } catch (e) {
    throw e;
  }
}

export async function sendEmail(request) {
  try {
    const data = await makePostRequest("/suite/reset/password", request);
    return data;
  } catch (e) {
    throw e;
  }
}
