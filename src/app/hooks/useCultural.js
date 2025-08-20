import { useQuery } from "@tanstack/react-query";

import { makePutRequest, makePostRequest } from "@/utils/api/api";
import { getFull } from "../services/ficha/cultural/cultural";

export const useFullByFicha = (id_ficha) => {
  const { isLoading, data, isError, isFetching, refetch } = useQuery({
    queryKey: ["cultural"],
    queryFn: () => getFull(id_ficha),
  });
  return {
    isFetching,
    isLoading,
    isError,
    data,
    refetch,
  };
};
