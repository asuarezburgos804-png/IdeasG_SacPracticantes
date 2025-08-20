import {
  makeGetRequest,
  makePostRequest,
  makeDeleteRequest,
  makePutRequest,
  makePostRequestFormData,
} from "@/utils/api/apiMaster";

//MASTER CLIENT
export async function postRegisterClient(requestData) {
  try {
    const data = await makePostRequest(
      "/suite/manager/clientes/solicitud",
      requestData
    );
    return data;
  } catch (e) {
    throw e;
  }
}

export async function getVerifyEmailState(correo) {
  try {
    const data = await makeGetRequest(
      `/security/verificar/correo/estado?correo=${correo}`
    );
    return data;
  } catch (e) {
    throw e;
  }
}

export async function postVerifyEmailCode(requestData) {
  try {
    const data = await makePostRequest(
      "/security/verificar/correo/codigo",
      requestData
    );
    return data;
  } catch (e) {
    throw e;
  }
}

export async function postVerifyCorreoMaster(requestData) {
  try {
    const data = await makePostRequest(
      "/security/verificar/correo",
      requestData
    );
    return data;
  } catch (e) {
    throw e;
  }
}
export async function postVerifyUserMaster(requestData) {
  try {
    const data = await makePostRequest(
      "/security/verificar/usuario",
      requestData
    );
    return data;
  } catch (e) {
    throw e;
  }
}

export async function getConfirmEmailToken(token) {
  try {
    const data = await makeGetRequest(
      `/security/verificar/correo/confirmar?token=${encodeURIComponent(token)}`
    );
    return data;
  } catch (e) {
    throw e;
  }
}

// RECOVER PASSWONRD

export async function postSolicitarRecuperacionPassword(requestData) {
  try {
    const data = await makePostRequest(
      "/security/user/recuperacion/password/solicitar",
      requestData
    );
    return data;
  } catch (error) {
    throw error;
  }
}

export async function postCambiarPasswordConToken(requestData) {
  try {
    const data = await makePostRequest(
      "/security/user/recuperacion/password/cambiar-password",
      requestData
    );
    return data;
  } catch (error) {
    throw error;
  }
}
