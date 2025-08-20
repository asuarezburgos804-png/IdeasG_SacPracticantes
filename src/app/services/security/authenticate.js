import {
  makeGetRequest,
  makePostRequest,
  makeDeleteRequest,
  makePutRequest,
  makePostRequestFormData,
} from "@/utils/api/api";

export async function postAuthenticate(body) {
  try {
    const value = {
      c_usuario: body.user,
      c_contrasena: body.password,
    };
    const data = await makePostRequest("/security/singin", value);
    return data;
  } catch (e) {
    throw e;
  }
}

export async function postRegisterUser(requestData) {
  try {
    const data = await makePostRequest(
      "/security/geoportal/registrar/usuario",
      requestData
    );
    return data;
  } catch (e) {
    throw e;
  }
}

export async function getComponentes(id) {
  try {
    const data = await makeGetRequest("/security/componentes/" + id);
    return data;
  } catch (e) {
    throw e;
  }
}

export async function getComponentesByGeoportal(id) {
  try {
    const data = await makeGetRequest("/security/geoportales/" + id);
    return data;
  } catch (e) {
    throw e;
  }
}

export async function getComponentesByGeoportalInvitado(id) {
  try {
    const data = await makeGetRequest("/security/geoportales/invitado/" + id);
    return data;
  } catch (e) {
    throw e;
  }
}

export async function getComponentesByGeoportalI(id) {
  try {
    const data = await makeGetRequest("/security/gestion/herramientas/" + id);
    return data;
  } catch (e) {
    throw e;
  }
}

export async function saveUsuarioByGeoportal(request) {
  try {
    const data = await makePostRequest("/security/geoportal/usuarios", request);
    return data;
  } catch (e) {
    throw e;
  }
}

export async function deleteUsuarioByGeoportal(id) {
  try {
    const data = await makeDeleteRequest("/security/geoportal/usuarios/" + id);
    return data;
  } catch (e) {
    throw e;
  }
}
