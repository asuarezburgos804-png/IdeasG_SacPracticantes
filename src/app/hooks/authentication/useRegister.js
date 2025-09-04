import { useQuery } from "@tanstack/react-query";
import { getVerifyEmailState } from "@/app/services/security/register";

export const useVerifyEmailState = (email) => {
  const { isLoading, data, isError, isFetching, refetch } = useQuery({
    queryKey: ["verifyEmailState", email],
    queryFn: () => getVerifyEmailState(email),
    enabled: !!email, // evita ejecutar la consulta si email está vacío o indefinido
  });

  return {
    isLoading,
    isError,
    isFetching,
    data,
    refetch,
  };
};
