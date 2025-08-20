import { makeGetRequest } from "@/utils/api/apiMaster";

export async function getSistemasModuloByClienteId(id) {
  try {
    const data = await makeGetRequest("/suite/mmh/clientes/modulo/herramientas/asignado/"+id);
    return data;
  } catch (e) {
    throw e;
  }
}

export async function getSistemasModuloByClienteSession(id) {
  try {
    const data = await makeGetRequest("/suite/mmh/clientes/modulo/herramientas/asignado");
    return data;
  } catch (e) {
    throw e;
  }
}