import { getEvaluacionPredio } from "@/app/services/individual/individual";
import { useQuery } from "@tanstack/react-query";

export const useEvaluacionPredioByFicha = (id_ficha) => {
  const { isLoading, data, isError, isFetching, refetch } = useQuery({
    queryKey: ["evaluacionPredio"],
    queryFn: () => getEvaluacionPredio({ id_ficha: id_ficha }),
  });
  return {
    isFetching,
    isLoading,
    isError,
    data,
    refetch,
  };
};
