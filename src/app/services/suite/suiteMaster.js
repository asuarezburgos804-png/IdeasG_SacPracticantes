import { makeGetRequest } from "@/utils/api/apiMaster";

export async function getIdClienteByNombre(usuario) {
  try {
    const data = await makeGetRequest("/suite/manager/clientes/findid/byusuario/" + usuario);
    return data;
  } catch (e) {
    throw e;
  }
}

export async function getIdClienteBySubdominio(subdominio) {
  try {
    const data = await makeGetRequest("/suite/manager/clientes/subdominio/" + subdominio);
    return data;
  } catch (e) {
    throw e;
  }
}
