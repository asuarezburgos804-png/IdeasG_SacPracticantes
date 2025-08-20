import { getUbiPredio } from "@/app/services/individual/individual";
import { useQuery } from "@tanstack/react-query";

export const useUbicacionPredioByFicha = (id_ficha) => {
  const { isLoading, data, isError, isFetching, refetch } = useQuery({
    queryKey: ["ubiPredio"],
    queryFn: () => getUbiPredio({ id_ficha: id_ficha }),
  });
  return {
    isFetching,
    isLoading,
    isError,
    data,
    refetch,
  };
};
