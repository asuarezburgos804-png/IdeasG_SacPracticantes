import { getProfile } from "@/app/services/glgismaster/profile";
import { useQuery } from "@tanstack/react-query";

export const useProfile = (idCliente) => {
  const { isLoading, data, isError, isFetching, refetch } = useQuery({
    queryKey: ["profileUserSession"],
    queryFn: () => getProfile(),
    enabled: !!idCliente
  });
  return {
    isFetching,
    isLoading,
    isError,
    data,
    refetch,
  };
};
