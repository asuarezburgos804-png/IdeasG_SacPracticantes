import {
  getFirmante,
  getIdentConductor,
} from "@/app/services/ficha/economica/economica";
import { getUbiPredio } from "@/app/services/individual/individual";
import { useQuery } from "@tanstack/react-query";

export const useFirmanteByFicha = (id_ficha) => {
  const { isLoading, data, isError, isFetching, refetch } = useQuery({
    queryKey: ["firmante"],
    queryFn: () => getFirmante({ id_ficha: id_ficha }),
  });
  return {
    isFetching,
    isLoading,
    isError,
    data,
    refetch,
  };
};
