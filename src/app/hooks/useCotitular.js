import { useQuery } from "@tanstack/react-query";

import { makePutRequest, makePostRequest } from "@/utils/api/api";
import { fetchPersona } from "../services/ficha/fichaEco";
import { getDataCotitular } from "../services/ficha/cotitular/cotitular";


export const useFullData = (id_ficha) => {
    const { isLoading, data, isError, isFetching, refetch } = useQuery({
      queryKey: ["cotitular"],
      queryFn: () => getDataCotitular(id_ficha),
    });
    return {
      isFetching,
      isLoading,
      isError,
      data,
      refetch,
    };
  };
  