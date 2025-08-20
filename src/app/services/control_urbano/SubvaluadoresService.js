import { makeGetRequest } from "@/utils/api/api";
import { makeDeleteRequest } from "@/utils/api/api";
import { makePostRequest } from "@/utils/api/api";
import { makePutRequest } from "@/utils/api/api";

export async function getSubvaluadores() {
    try {
      const data = await makeGetRequest("/fiscalizacion/subvaluador/obtener/todos");
      return data;
    } catch (e) {
      throw e;
    }
  }
  export async function getSubvaluadorById(id_subvaluador) {
      try {
        const data = await makeGetRequest(`/fiscalizacion/subvaluador/obtener/id/${id_subvaluador}`);
        return data;
      } catch (e) {
        throw e;
      }
    }
  
  export async function postRegistrarSubvaluador(requestData) {
      try {
        const data = await makePostRequest(
          "/fiscalizacion/subvaluador/registrar",
          requestData
        );
        console.log(data);
        return data;
      } catch (e) {
        throw e;
      }
  }
  
  
  export async function putActualizarSubvaluador(requestData, id_subvaluador) {
    try {
      const data = await makePutRequest(
        `/fiscalizacion/subvaluador/actualizar/${id_subvaluador}`,
        requestData
      );
      return data;
    } catch (e) {
      throw e;
    }
  }
  
  export async function deleteSubvaluador(id_subvaluador) {
      try {
        const data = await makeDeleteRequest(`/fiscalizacion/subvaluador/eliminar/${id_subvaluador}`);
        return data;
      } catch (e) {
        throw e;
      }
    }