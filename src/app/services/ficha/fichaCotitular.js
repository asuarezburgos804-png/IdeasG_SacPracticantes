import {
  makePutRequest,
  makePostRequest,
  makeGetRequest,
} from "@/utils/api/api";

export async function fechCotitularCatastral(requestData, action) {
  try {
    let data;
    if (action == 1) {
      data = await makePostRequest("/fuco/cotitular/registrar", requestData);
    } else if (action == 2) {
      data = await makePutRequest("/fuco/cotitular/actualizar", requestData);
    }
    return data;
  } catch (e) {
    throw e;
  }
}

export async function fechDomicFiscal(requestData, action) {
  try {
    let data;
    if (action == 1) {
      data = await makePostRequest(
        "/fuco/domicilio_cotitular/registrar",
        requestData
      );
    } else if (action == 2) {
      data = await makePutRequest("/fcui/domicilio/actualizar", requestData);
    }
    return data;
  } catch (e) {
    throw e;
  }
}
export async function fetchTipoTitular() {
  try {
    let data;
    data = await makeGetRequest("/maestros/tipotitular");
    return data;
  } catch (e) {
    throw e;
  }
}
export async function fetchFormaAdqui() {
  try {
    let data;
    data = await makeGetRequest("/maestros/formaadqui");
    return data;
  } catch (e) {
    throw e;
  }
}
export async function fetchCondEspTitular() {
  try {
    let data;

    data = await makeGetRequest("/maestros/condesptitular");
    return data;
  } catch (e) {
    throw e;
  }
}

export async function fetchDepartamento() {
  try {
    const data = await makeGetRequest("/listar/departamento/");
    return data.data;
  } catch (e) {
    throw e;
  }
}

export async function fetchProvincia(dat) {
  try {
    const data = await makeGetRequest("/listar/provincia/" + dat);
    return data.data;
  } catch (e) {
    throw e;
  }
}

export async function fetchDistrito(dat) {
  try {
    const data = await makeGetRequest("/listar/distrito/" + dat);
    return data.data;
  } catch (e) {
    throw e;
  }
}

export async function fetchTipoDoc() {
  try {
    let data;
    data = await makeGetRequest("/maestros/tipodoc");
    return data;
  } catch (e) {
    throw e;
  }
}
//COMPLEMENTARIA
export async function fetchInfoComplementaria(requestData, action) {
  try {
    let data;
    if (action == 1) {
      data = await makePostRequest(
        "/fuco/info_complementaria/registrar",
        requestData
      );
    } else if (action == 2) {
      data = await makePutRequest(
        "/fuco/info_complementaria/actualizar",
        requestData
      );
    }
    return data;
  } catch (e) {
    throw e;
  }
}
export async function fetchCondDeclarante() {
  try {
    let data;
    data = await makeGetRequest("/maestros/conddeclarante");
    return data;
  } catch (e) {
    throw e;
  }
}

export async function fetchLlenado() {
  try {
    let data;
    data = await makeGetRequest("/maestros/estllenado");
    return data;
  } catch (e) {
    throw e;
  }
}
//COMPLEMENTARIA
//OBSERVACION
export async function fetchObservacion(requestData, action) {
  try {
    let data;
    if (action == 1) {
      data = await makePostRequest(
        "/fcui/observaciones/registrar",
        requestData
      );
    } else if (action == 2) {
      data = await makePutRequest(
        "/fcui/observaciones/actualizar",
        requestData
      );
    }
    return data;
  } catch (e) {
    throw e;
  }
}
//OBSERVACION
