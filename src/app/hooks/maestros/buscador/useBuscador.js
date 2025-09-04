import { useQuery } from "@tanstack/react-query";

import {
  makePostRequest,
  makePatchRequest,
  makeDeleteRequest,
  makeGetRequest,
  makePutRequest,
} from "@/utils/api/api";
import { fetchPersona } from "@/app/services/master/buscador";

//Notaria
export const usePersona = () => {
  const { isLoading, isError, data, isFetching } = useQuery(
    ["id_persona"],
    fetchPersona
  );

  return {
    isFetching,
    isLoading,
    isError,
    data,
  };
};

export async function crudPersona(requestData, action) {
  try {
    let data;
    if (action == 0) {
      data = await makePostRequest(
        "/maestros/persona/fi/registrar/persona",
        requestData
      );
    } else if (action == 2) {
      data = await makePutRequest(
        "/maestros/persona/fi/actualizar/persona",
        requestData
      );
    } else if (action == 3) {
      data = await makeDeleteRequest(
        "/maestros/persona/fi/eliminar/persona/" + requestData.id_persona
      );
    }
    return data;
  } catch (e) {
    throw e;
  }
}

export async function fetchFilterPersona(dat) {
  try {
    const data = await makeGetRequest(
      "/maestros/persona/fi/buscar/persona/" + dat
    );
    return data.data;
  } catch (e) {
    throw e;
  }
}
