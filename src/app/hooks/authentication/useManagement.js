import {
  getRolesBySistemas,
  getRolesBySistemasWithoutId,
  getToolsByRol,
} from "@/app/services/authentication/management";
import { useQuery } from "@tanstack/react-query";

export const useSistemasbyRol = (id) => {
  const { isLoading, data, isError, isFetching, refetch } = useQuery({
    queryKey: ["sistemasbyRol"],
    queryFn: () => getToolsByRol(id),
  });
  return {
    isFetching,
    isLoading,
    isError,
    data,
    refetch,
  };
};

export const useRol = (id) => {
  const { isLoading, data, isError, isFetching, refetch } = useQuery({
    queryKey: ["rolesBySistemas"],
    queryFn: () => getRolesBySistemas(id),
  });
  return {
    isFetching,
    isLoading,
    isError,
    data,
    refetch,
  };
};

export const useRolWihtout = () => {
  const { isLoading, data, isError, isFetching, refetch } = useQuery({
    queryKey: ["rolesBySistemasSinId"],
    queryFn: () => getRolesBySistemasWithoutId(),
  });
  return {
    isFetching,
    isLoading,
    isError,
    data,
    refetch,
  };
};
