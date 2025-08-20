import { getServiciosPredio } from "@/app/services/individual/individual";
import { useQuery } from "@tanstack/react-query";

export const useServicioPredioByFicha = (id_ficha) => {
  const { isLoading, data, isError, isFetching, refetch } = useQuery({
    queryKey: ["servicioPredio"],
    queryFn: () => getServiciosPredio({ id_ficha: id_ficha }),
  });
  return {
    isFetching,
    isLoading,
    isError,
    data,
    refetch,
  };
};
