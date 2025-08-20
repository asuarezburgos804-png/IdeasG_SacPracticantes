import { makeGetRequest } from "@/utils/api/apiMaster";

// get Departamentos, provincias, distritos
export async function getDepartamentos() {
  try {
    const data = await makeGetRequest("/maestros/buscar/departamento");
    return data.data;
  } catch (e) {
    throw e;
  }
}

export async function getProvincias(departamentoId) {
  try {
    const data = await makeGetRequest(`/maestros/buscar/provincia/${departamentoId}`);
    return data.data;
  } catch (e) {
    throw e;
  }
}

export async function getDistritos(provinciaId) {
  try {
    const data = await makeGetRequest(`/maestros/buscar/distrito/${provinciaId}`);
    return data.data;
  } catch (e) {
    throw e;
  }
}   