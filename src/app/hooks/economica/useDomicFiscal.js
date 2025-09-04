import {
  getDomicFiscal,
  getIdentConductor,
} from "@/app/services/ficha/economica/economica";
import { getUbiPredio } from "@/app/services/individual/individual";
import { useQuery } from "@tanstack/react-query";

export const useDomicFiscalByFicha = (id_ficha) => {
  const { isLoading, data, isError, isFetching, refetch } = useQuery({
    queryKey: ["domicFiscal"],
    queryFn: () => getDomicFiscal({ id_ficha: id_ficha }),
  });
  return {
    isFetching,
    isLoading,
    isError,
    data,
    refetch,
  };
};
