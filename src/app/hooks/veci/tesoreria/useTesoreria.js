import { useQuery } from "@tanstack/react-query";

import {
    makePostRequest,
    makePatchRequest,
    makeDeleteRequest,
    makeDeleteRequestData, //Permite mandar un json con ids para eliminar masivamente
    makeGetRequest,
    makePutRequest,
} from "@/utils/api/api";

import {
    fetchIngreso,
    fetchEgreso,
    fetchEgresoDadoPartida,
    fetchPersonaAsociada,
    fetchCajaChica
} from "@/app/services/veci/tesoreria/fetchTesoreria";

export const useIngreso = (enabled = true) => {
    const { isLoading, isError, data, isFetching, refetch } = useQuery({
        queryKey: ["ingreso"],
        queryFn: fetchIngreso,
        enabled,
    });
    return {
        isLoading,
        isError,
        data,
        isFetching,
        refetch,
    };
};

export const useEgreso = (enabled = true) => {
    const { isLoading, isError, data, isFetching, refetch } = useQuery({
        queryKey: ["egreso"],
        queryFn: fetchEgreso,
        enabled,
    });
    return {
        isLoading,
        isError,
        data,
        isFetching,
        refetch,
    };
};

export const useEgresoDadoPartida = (id_partida, enabled = true) => {
    const { isLoading, isError, data, isFetching, refetch } = useQuery({
        queryKey: ["egresoDadoPartida", id_partida],
        queryFn: () => fetchEgresoDadoPartida(id_partida),
        enabled,
    });
    return {
        isLoading,
        isError,
        data,
        isFetching,
        refetch,
    };
};

export async function crudEgreso(requestData, action) {
  try {
    let data;
    if (action === 0) {
      data = await makePostRequest(
        "/veci/tesoreria/egreso/registrar", requestData
      );
    } else if (action === 1) {
      data = await makePutRequest(
        "/veci/tesoreria/egreso/actualizar", requestData
      );
    } else if (action === 2) {
      data = await makePostRequest(
        "/veci/tesoreria/egreso/eliminar", requestData
      );
    }
    console.log("RequestData egreso: ", requestData);
    return data;
  } catch (e) {
    throw e;
  }
}

export const usePersonaAsociada = (enabled = true) => {
    const { isLoading, isError, data, isFetching, refetch } = useQuery({
        queryKey: ["personaAsociada"],
        queryFn: fetchPersonaAsociada,
        enabled,
    });
    return {
        isLoading,
        isError,
        data,
        isFetching,
        refetch,
    };
};

//CAJA CHICA

export const useCajaChica = (enabled = true) => {
    const { isLoading, isError, data, isFetching, refetch } = useQuery({
        queryKey: ["cajaChica"],
        queryFn: fetchCajaChica,
        enabled,
    });
    return {
        isLoading,
        isError,
        data,
        isFetching,
        refetch,
    };
};


export async function crudCajaChica(requestData, action) {
  try {
    let data;
    if (action === 0) {
      data = await makePostRequest(
        "/veci/tesoreria/cajaChica/registrar", requestData
      );
    } else if (action === 1) {
      data = await makePutRequest(
        "/veci/tesoreria/cajaChica/actualizar/" + requestData.id_caja_chica,
        requestData
      );
    } else if (action === 2) {
      data = await makeDeleteRequest(
        "/veci/tesoreria/cajaChica/eliminar/" + requestData.id_caja_chica
      );
    }
    console.log("RequestData cajaChica: ", requestData);
    console.log("Response cajaChica: ", data);
    return data;
  } catch (e) {
    throw e;
  }
}
