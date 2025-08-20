import { useQuery } from "@tanstack/react-query";

import { getFichaRural } from "../services/ficha/rural/rural";

export const useFullByFichaRural = (id_ficha) => {
  const { data, error, isLoading, isError, refetch } = useQuery(
    ["fichaRural", id_ficha],
    () => getFichaRural(id_ficha)
  );
  return {
    refetch,
    data,
    error,
    isLoading,
    isError,
  };
};
