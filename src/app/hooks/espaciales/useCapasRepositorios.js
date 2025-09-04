import { obtenerEstiloCapaPorId } from "@/app/services/espaciales/capasRepositorios";
import { useQuery } from "@tanstack/react-query";

export const useCapasRepositoriosEstilos = (id_repo_capa) => {
  const queryKey = ["getCapasRepositoriosEstilos"];
  const queryFn = () => obtenerEstiloCapaPorId(id_repo_capa);
  
  const { isLoading, data, isError, isFetching, refetch } = useQuery({
    queryKey,
    queryFn,
    enabled: !!id_repo_capa
  });

  return {
    isFetching,
    isLoading,
    isError,
    data,
    refetch,
  };
};