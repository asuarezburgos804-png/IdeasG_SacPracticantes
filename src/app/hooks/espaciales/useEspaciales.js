import {
  getCapas,
  getCapasInvitado
} from "@/app/services/espaciales/capas.js";
import { getRepositoryList, getRepositoryListByUser } from "@/modules/import/services/repositories";
import { useQuery } from "@tanstack/react-query";

export const useCapas = (isUserLoggedIn, titulo) => {
  const queryKey = isUserLoggedIn ? ["getCapasByIdRol"] : ["getCapasByInvitado", titulo];
  const queryFn = isUserLoggedIn ? () => getCapas(titulo) : () => getCapasInvitado(titulo);
  
  const { isLoading, data, isError, isFetching, refetch } = useQuery({
    queryKey,
    queryFn,
  });

  return {
    isFetching,
    isLoading,
    isError,
    data,
    refetch,
  };
};

export const useRepositories = () => {
  const queryKey = ["getRepositories"];
  const queryFn = () => getRepositoryList();
  
  const { isLoading, data, isError, isFetching, refetch } = useQuery({
    queryKey,
    queryFn,
  });

  return {
    isFetching,
    isLoading,
    isError,
    data,
    refetch,
  };
};

export const useRepositoriesByUsuario = () => {
  const queryKey = ["getRepositoriesByUsuario"];
  const queryFn = () => getRepositoryListByUser();
  
  const { isLoading, data, isError, isFetching, refetch } = useQuery({
    queryKey,
    queryFn,
  });

  return {
    isFetching,
    isLoading,
    isError,
    data,
    refetch,
  };
};