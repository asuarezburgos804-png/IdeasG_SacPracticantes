import { getObservacionPredio } from "@/app/services/individual/individual";
import { useQuery } from "@tanstack/react-query";

export const useObservacionPredioByFicha = (id_ficha) => {
  const { isLoading, data, isError, isFetching, refetch } = useQuery({
    queryKey: ["observacionPredio"],
    queryFn: () => getObservacionPredio({ id_ficha: id_ficha }),
  });
  return {
    isFetching,
    isLoading,
    isError,
    data,
    refetch,
  };
};
