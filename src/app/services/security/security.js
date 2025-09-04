import {
  makeDeleteRequest,
  makeGetRequest,
  makePostRequest,
  makePutRequest,
} from "@/utils/api/api";

export async function getUsersBySistema(id) {
  try {
    const data = await makeGetRequest("/security/usuario/sistema/"+id);
    return data;
  } catch (e) {
    throw e;
  }
}

export async function saveUserBySistema(request) {
  try {
    const data = await makePostRequest("/security/usuario/sistema", request);
    return data;
  } catch (e) {
    throw e;
  }
}

export async function updateUserBySistema(id_usuario, request) {
  try {
    const data = await makePutRequest("/security/usuario/sistema/"+id_usuario, request);
    return data;
  } catch (e) {
    throw e;
  }
}

export async function deleteUserBySistema(id_usuario) {
  try {
    const data = await makeDeleteRequest("/security/usuario/sistema/"+id_usuario);
    return data;
  } catch (e) {
    throw e;
  }
}

export async function getName() {
  try {
    const data = await makeGetRequest("/security/nombre/rol");
    return data;
  } catch (e) {
    throw e;
  }
}

export async function saveUser(request) {
  try {
    const data = await makePostRequest("/security/geoportal/internos", request);
    return data;
  } catch (e) {
    throw e;
  }
}

export async function saveAtenderSolicitud(request) {
  try {
    const data = await makePostRequest(
      "/security/geoportal/solicitud",
      request
    );
    return data;
  } catch (e) {
    throw e;
  }
}

export async function updateUser(id, request) {
  try {
    const data = await makePutRequest(
      "/security/geoportal/internos/" + id,
      request
    );
    return data;
  } catch (e) {
    throw e;
  }
}

export async function deleteUser(id, request) {
  try {
    const data = await makeDeleteRequest(
      "/security/geoportal/internos/" + id,
      request
    );
    return data;
  } catch (e) {
    throw e;
  }
}

export async function saveComponentesByRol(request) {
  try {
    const data = await makePostRequest("/security/geoportal/rol", request);
    return data;
  } catch (e) {
    throw e;
  }
}

export async function validateUser(c_usuario) {
  try {
    const data = await makeGetRequest("/security/validar/usuario/" + c_usuario);
    return data;
  } catch (e) {
    throw e;
  }
}
