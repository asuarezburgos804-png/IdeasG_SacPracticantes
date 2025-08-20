import { useQuery } from "@tanstack/react-query";
import { getOmisosData } from "@\app\services\control_urbano\OmisosService";
import { getOmisos } from "@/app/services/control_urbano/OmisosService";


export const useGetOmisos = () => {
  const { data, error, isLoading, isError, refetch, isFetching } = useQuery(
    ["omisos_data"],
    getOmisosData
  );

  return {
    data,
    error,
    isLoading,
    isError,
    refetch,
    isFetching,
  };
};

