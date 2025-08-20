import { useQuery } from "@tanstack/react-query";
import { getUsersBySistema } from "../services/security/security";

export const useUsersBySistema = (id) => {
  const { isLoading, data, isError, isFetching, refetch } = useQuery({
    queryKey: ["getUserGlgisBySistema"],
    queryFn: () => getUsersBySistema(id),
  });
  return {
    isFetching,
    isLoading,
    isError,
    data,
    refetch,
  };
};