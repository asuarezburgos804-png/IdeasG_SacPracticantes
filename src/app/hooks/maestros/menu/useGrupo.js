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

export async function crudSuper(requestData, action) {
  try {
    let data;
    if (action == 0) {
      data = await makePostRequest(
        "/maestros/capasSupergrupo/fi/registrar/capassupergrupo",
        {
          c_nombre_super_grupo: requestData.c_nombre_super_grupo,
          b_super_grupo: true,
        }
      );
    } else if (action == 2) {
      data = await makePutRequest(
        "/maestros/capasSupergrupo/fi/actualizar/capassupergrupo",
        requestData
      );
    } else if (action == 3) {
      data = await makeDeleteRequest(
        "/maestros/capasSupergrupo/fi/eliminar/capassupergrupo/" +
          requestData.id_super_grupo
      );
    }
    return data;
  } catch (e) {
    throw e;
  }
}
export async function crudGrupo(requestData, action) {
  try {
    let data;
    if (action == 0) {
      data = await makePostRequest(
        "/maestros/capasGrupo/fi/registrar/capasgrupo",
        {
          id_super_grupo: requestData.id_super_grupo,
          c_nombre_grupo: requestData.c_nombre_grupo,
          b_grupo: true,
        }
      );
    } else if (action == 2) {
      data = await makePutRequest(
        "/maestros/capasGrupo/fi/actualizar/capasgrupo",
        requestData
      );
    } else if (action == 3) {
      data = await makeDeleteRequest(
        "/maestros/capasGrupo/fi/eliminar/capasgrupo/" + requestData.id_grupo
      );
    }
    return data;
  } catch (e) {
    throw e;
  }
}

//SuperGrupos - Grupos
export async function fetchGetSuper(dat) {
  try {
    const data = await makeGetRequest(
      "/maestros/capasSupergrupo/fi/capassupergrupo"
    );
    return data.data;
  } catch (e) {
    throw e;
  }
}

export async function fetchGetGrupo(dat) {
  try {
    const data = await makeGetRequest("/maestros/capasGrupo/fi/capasgrupo");
    return data.data;
  } catch (e) {
    throw e;
  }
}
