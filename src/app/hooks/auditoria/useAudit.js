import { useMutation, useQuery } from "@tanstack/react-query";

import { getCountVisists } from "@/app/services/auditoria/auditoria";

export const useGetCountVisists = () => {
  const { data, error, isLoading, isError, refetch } = useQuery(
    ["countVisists"],
    () => getCountVisists()
  );

  return {
    refetch,
    data,
    error,
    isLoading,
    isError,
  };
};
