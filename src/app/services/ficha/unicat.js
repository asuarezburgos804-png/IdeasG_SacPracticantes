import { makeGetRequest, makePostRequest } from "@/utils/api/api";

export async function getSector() {
  try {
    const data = await makeGetRequest("/espaciales/sml/sector");
    return data;
  } catch (e) {
    throw e;
  }
}

export async function getManzana(id_sector) {
  try {
    const data = await makeGetRequest("/espaciales/sml/manzana/" + id_sector);
    console.log(data);
    
    return data;
  } catch (e) {
    throw e;
  }
}

export async function getLote(id_manzana) {
  try {
    const data = await makeGetRequest("/espaciales/sml/lote/" + id_manzana);
    return data;
  } catch (e) {
    throw e;
  }
}

export async function postSaveUnicat(requestData) {
  try {
    const data = await makePostRequest("/catastro/unicat", requestData);
    return data;
  } catch (e) {
    throw e;
  }
}

export async function postSaveUnicatRural(requestData) {
  try {
    const data = await makePostRequest("/catastro/unicat/registrar", requestData);
    return data;
  } catch (e) {
    throw e;
  }
}
export async function getUnicatBySearch(requestData) {
  try {
    const data = await makeGetRequest("/catastro/unicat/" + requestData);
    return data;
  } catch (e) {
    throw e;
  }
}

export async function getUnicatDetail(requestData) {
  try {
    const data = await makeGetRequest("/catastro/unicat/" + requestData);
    return data;
  } catch (e) {
    throw e;
  }
}

export async function getUnicatDetailRural(requestData) {
  try {
    const data = await makeGetRequest("/catastro/unicat/rural/" + requestData);
    return data;
  } catch (e) {
    throw e;
  }
}

//FICHAS DE CATASTRO
export async function saveFicha(requestData) {
  console.log(requestData);
  try {
    const data = await makePostRequest("/catastro/ficha", requestData);
    return data;
  } catch (e) {
    throw e;
  }
}
export async function getListFichaByIdUnicat(idUnicat) {
  try {
    console.log(idUnicat);
    
    const data = await makeGetRequest("/catastro/ficha/listar/" + idUnicat);
    return data.data;
  } catch (e) {
    throw e;
  }
}

export async function getListFichaHistoricoByIdUnicat(idUnicat) {
  try {
    const data = await makeGetRequest("/catastro/ficha/listar/historico/" + idUnicat);
    return data.data;
  } catch (e) {
    throw e;
  }
}

export async function restaurarHistorico(body) {
  try {
    const data = await makePostRequest("/catastro/ficha/restaurar/historico", body);
    return data;
  } catch (e) {
    throw e;
  }
}

export async function actualizarHistorico(body) {
  try {
    const data = await makePostRequest("/catastro/ficha/actualizar/historico", body);
    return data;
  } catch (e) {
    throw e;
  }
}


