import { useQuery } from "@tanstack/react-query";

import { makePutRequest, makePostRequest } from "@/utils/api/api";
import { fetchPersona } from "../services/ficha/fichaEco";
import { getFichaEconomica } from "../services/ficha/economica/economica";

export const usePersona = () => {
  const { isLoading, data, isError, isFetching } = useQuery({
    queryKey: ["persona"],
    queryFn: () => fetchPersona(),
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

export const useFullByFichaEco = (id_ficha) => {
  const { data, error, isLoading, isError, refetch } = useQuery(
    ["fichaEconomico", id_ficha],
    () => getFichaEconomica(id_ficha)
  );
  return {
    refetch,
    data,
    error,
    isLoading,
    isError,
  };
};
