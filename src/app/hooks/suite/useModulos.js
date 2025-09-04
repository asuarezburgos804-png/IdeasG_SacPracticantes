import { getSistemasModuloByClienteId, getSistemasModuloByClienteSession } from "@/app/services/suite/modulos";
import { useQuery } from "@tanstack/react-query";


export const useSistemasModuloByClienteId = (id) => {
  const { isLoading, data, isError, isFetching, refetch } = useQuery({
    queryKey: ["suiteSistemasModuloByClienteId", id],  // <-- Aquí agregas el id
    queryFn: () => getSistemasModuloByClienteId(id),
    enabled: !!id,
  });
  return {
    isFetching,
    isLoading,
    isError,
    data,
    refetch,
  };
};

export const useSistemasModuloByClienteSession = () => {
  const { isLoading, data, isError, isFetching, refetch } = useQuery({
    queryKey: ["suiteSistemasModuloByClienteSession"],
    queryFn: () => getSistemasModuloByClienteSession(),
  });
  return {
    isFetching,
    isLoading,
    isError,
    data,
    refetch,
  };
};