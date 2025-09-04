import { makeGetRequest } from "@/utils/api/api";
import { makeDeleteRequest } from "@/utils/api/api";
import { makePostRequest } from "@/utils/api/api";
import { makePutRequest } from "@/utils/api/api";

export async function getOmisos() {
  try {
    const data = await makeGetRequest("/fiscalizacion/omiso/obtener/todos");
    return data;
  } catch (e) {
    throw e;
  }
}
export async function getOmisoById(id_omiso) {
    try {
      const data = await makeGetRequest(`/fiscalizacion/omiso/obtener/id/${id_omiso}`);
      return data;
    } catch (e) {
      throw e;
    }
  }

export async function postRegistrarOmiso(requestData) {
    try {
      console.log("Datos que se envían:", requestData);
      const data = await makePostRequest(
        "/fiscalizacion/omiso/registrar",
        requestData);
      //console.log(data);
      return data;
    } catch (e) {
      console.error("Error al registrar los datos:", e);
      throw e;
    }
}


export async function putActualizarOmiso(requestData, id_omiso) {
  try {
    const data = await makePutRequest(
      `/fiscalizacion/omiso/actualizar/${id_omiso}`,
      requestData
    );
    return data;
  } catch (e) {
    throw e;
  }
}

export async function deleteOmiso(id_omiso) {
    try {
      const data = await makeDeleteRequest(`/fiscalizacion/omiso/eliminar/${id_omiso}`);
      return data;
    } catch (e) {
      throw e;
    }
  }