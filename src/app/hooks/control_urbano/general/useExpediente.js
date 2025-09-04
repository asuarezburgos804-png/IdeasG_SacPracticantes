import { useQuery } from "@tanstack/react-query";
import { getListaExpedientes } from "@/app/services/control_urbano/fue/ObtenerExpedientes";

export const useGetListaExpedientes = () => {
  const { data, isLoading, isError, error, refetch } = useQuery(["listaExpedientes"], getListaExpedientes);

  return {
    data,
    isLoading,
    isError,
    error,
    refetch,
  };
};
