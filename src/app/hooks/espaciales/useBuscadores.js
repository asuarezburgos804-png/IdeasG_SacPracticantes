
import { getBuscadorSectores } from "@/app/services/espaciales/buscadores";
import { useQuery } from "@tanstack/react-query";

export const useBuscadorSectores = () => {
    const queryKey = ["getSectores"];
    const queryFn = getBuscadorSectores; // Pasa la referencia de la función, no la ejecución de la misma

    const { isLoading, data, isError, isFetching, refetch } = useQuery(
        queryKey,
        queryFn
    );
    return {
        isFetching,
        isLoading,
        isError,
        data,
        refetch,
    };
};

export const useBuscadorTipoVia = () => {
  const queryKey = ["getTipoVia"];
  const queryFn = getBuscadorSectores; // Pasa la referencia de la función, no la ejecución de la misma

  const { isLoading, data, isError, isFetching, refetch } = useQuery(
      queryKey,
      queryFn
  );
  return {
      isFetching,
      isLoading,
      isError,
      data,
      refetch,
  };
};

  