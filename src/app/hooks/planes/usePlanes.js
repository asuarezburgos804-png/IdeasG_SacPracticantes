import { useQuery } from "@tanstack/react-query";
import { obtenerPlanes } from "@/app/services/planes/planes";

export const useObtenerPlanes = () => {
  const { isLoading, isError, data, isFetching } = useQuery(
    ["planes"],
    obtenerPlanes
  );
  return {
    isFetching,
    isLoading,
    isError,
    data,
  };
};
