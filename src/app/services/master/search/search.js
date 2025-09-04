import {
  makeDeleteRequest,
  makeGetRequest,
  makePostRequest,
  makePutRequest,
} from "@/utils/api/api";

export async function getSearchViaData(via) {
  try {
    const data = await makeGetRequest("/maestros/buscar/vias/" + via);

    return data;
  } catch (e) {
    throw e;
  }
}

export async function getSearchInstalacionesAnt(cod) {
  try {
    const data = await makeGetRequest("/maestros/buscar/instalacionesant/" + cod);

    return data;
  } catch (e) {
    throw e;
  }
}

export async function getSearchHabilitacionUrbana(habUrbana) {
  try {
    const data = await makeGetRequest(
      "/maestros/buscar/haburbana/" + habUrbana
    );

    return data;
  } catch (e) {
    throw e;
  }
}

export async function getSearchCodUso(codUso) {
  console.log("codUso", codUso);
  try {
    const data = await makeGetRequest(
      "/maestros/codigoUso/fi/buscar/codigouso/" + codUso
    );

    return data;
  } catch (e) {
    throw e;
  }
}

export async function getSearchEstructuracion(codEstr) {
  try {
    const data = await makeGetRequest(
      "/maestros/buscar/obtener_estructuracion/" + codEstr
    );

    return data;
  } catch (e) {
    throw e;
  }
}

export async function getSearchZona(codZona) {
  try {
    const data = await makeGetRequest(
      "/maestros/buscar/obtener_zonificacion/" + codZona
    );

    return data;
  } catch (e) {
    throw e;
  }
}

export async function getSearchNotaria(cod_notaria) {
  try {
    const data = await makeGetRequest(
      "/maestros/buscar/notaria/" + cod_notaria
    );

    return data;
  } catch (e) {
    throw e;
  }
}

export async function getSearchPersona(c_num_doc) {
  try {
    const data = await makeGetRequest(
      "/maestros/buscar/persona/buscar/" + c_num_doc
    );

    return data;
  } catch (e) {
    throw e;
  }
}