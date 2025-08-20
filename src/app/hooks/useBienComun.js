import { useQuery } from "@tanstack/react-query";

import { makePutRequest, makePostRequest } from "@/utils/api/api";
import { fetchPersona } from "../services/ficha/fichaEco";
import { getDataBienComun } from "../services/ficha/bienComun/bienComun";


export const useGetBienComun = (id_ficha) => {
    const { isLoading, data, isError, refetch } = useQuery({
      queryKey: ["fichaBienComun", id_ficha],
      queryFn: () => getDataBienComun(id_ficha),
    });
    return {
      isLoading,
      isError,
      data,
      refetch,
    };
  };