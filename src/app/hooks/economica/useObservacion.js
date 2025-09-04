import { getInfoComplementaria } from "@/app/services/ficha/economica/economica";

import { useQuery } from "@tanstack/react-query";

export const useObservacionByFicha = (id_ficha) => {
  const { isLoading, data, isError, isFetching, refetch } = useQuery({
    queryKey: ["observacion"],
    queryFn: () => getInfoComplementaria({ id_ficha: id_ficha }),
  });
  return {
    isFetching,
    isLoading,
    isError,
    data,
    refetch,
  };
};
