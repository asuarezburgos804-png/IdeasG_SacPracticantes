import { useQuery } from "@tanstack/react-query";
import { getTools } from "@/app/services/authentication/tools";

export const useTools = () => {
  const { isLoading, data, isError, isFetching, refetch } = useQuery({
    queryKey: ["toolsUser"],
    queryFn: () => getTools(),
  });
  return {
    isFetching,
    isLoading,
    isError,
    data,
    refetch,
  };
};
