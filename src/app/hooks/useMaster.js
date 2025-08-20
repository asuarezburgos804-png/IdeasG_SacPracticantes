import { useQuery } from "@tanstack/react-query";
import {
  fetchMasters,
  fetchVias,
  fetchTipoTitular,
  fetchHabUrb,
  fetchUbicacionPredioMaestros,
  fetchViasAll,
} from "../services/master/master";

import { makePutRequest, makePostRequest } from "@/utils/api/api";

export const useMaster = () => {
  const { isLoading, isError, data, isFetching } = useQuery(
    ["master"],
    fetchMasters
  );
  return {
    isFetching,
    isLoading,
    isError,
    data,
  };
};

export const useUbicacionPredio = () => {
  const { isLoading, data, isError, isFetching } = useQuery({
    queryKey: ["haburbana"],
    queryFn: () => fetchUbicacionPredioMaestros(),
    keepPreviousData: true,
    staleTime: 5000,
  });
  return {
    isFetching,
    isLoading,
    isError,
    data,
  };
};

// export const useHabUrb = () => {
//   const { isLoading, data, isError, isFetching } = useQuery({
//     queryKey: ["haburbana"],
//     queryFn: () => fetchHabUrb(),
//     keepPreviousData: true,
//     staleTime: 5000,
//   });
//   return {
//     isFetching,
//     isLoading,
//     isError,
//     data,
//   };
// };

export const useVias = (page, rowsPerPage) => {
  const { isLoading, data, isError, isFetching, isPreviousData } = useQuery({
    queryKey: ["vias", page, rowsPerPage],
    queryFn: () => fetchVias(page, rowsPerPage),
    keepPreviousData: true,
    staleTime: 5000,
  });
  return {
    isFetching,
    isLoading,
    isError,
    data,
    isPreviousData,
  };
};

//* use - ficha economica maestro //
export const useTipotitular = () => {
  const { isLoading, isError, data, isFetching } = useQuery(
    ["tipoTitular"],
    fetchTipoTitular
  );
  return {
    isFetching,
    isLoading,
    isError,
    data,
  };
};
export async function editVias(requestData, action) {
  try {
    let data;
    if (action == 0) {
      data = await makePostRequest("/fi/registrar/tipovia", requestData);
    } else if (action == 2) {
      data = await makePutRequest("/fi/actualizar/tipovia", requestData);
    } else if (action == 3) {
      data = await makePostRequest("/fi/eliminar/tipovia", requestData);
    }
    return data;
  } catch (e) {
    throw e;
  }
}
//************************************************************************** */
