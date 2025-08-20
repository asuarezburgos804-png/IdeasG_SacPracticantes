import { useQuery } from "@tanstack/react-query";
import {
  getListFichaByIdUnicat,
  getSector,
  getManzana,
  getLote,
  getUnicatDetail,
  getUnicatDetailRural,
  saveFicha,
  getListFichaHistoricoByIdUnicat,
} from "../services/ficha/unicat";

export const useUnicat = () => {
  const { isLoading, data, isError, isFetching, refetch } = useQuery({
    queryKey: ["unicatSector"],
    queryFn: () => getSector(),
  });
  return {
    isFetching,
    isLoading,
    isError,
    data,
    refetch,
  };
};
export const useManzana = (id_sector) => {
  const { isLoading, data, isError, isFetching, refetch } = useQuery({
    queryKey: ["unicatManzana"],
    queryFn: () => getManzana(id_sector),
  });
  return {
    isFetching,
    isLoading,
    isError,
    data,
    refetch,
  };
};
export const useLote = (id_manzana) => {
  const { isLoading, data, isError, isFetching, refetch } = useQuery({
    queryKey: ["unicatLote"],
    queryFn: () => getLote(id_manzana),
  });
  return {
    isFetching,
    isLoading,
    isError,
    data,
    refetch,
  };
};

export const useUnicatDetail = (id_unicat) => {
  const { isLoading, data, isError, isFetching, refetch } = useQuery({
    queryKey: ["unicatDetail"],
    queryFn: () => getUnicatDetail(id_unicat),
  });
  return {
    isFetching,
    isLoading,
    isError,
    data,
    refetch,
  };
};

export const useUnicatDetailRural = (id_unicat) => {
  const { isLoading, data, isError, isFetching, refetch } = useQuery({
    queryKey: ["unicatDetail"],
    queryFn: () => getUnicatDetailRural(id_unicat),
  });
  return {
    isFetching,
    isLoading,
    isError,
    data,
    refetch,
  };
};

export const useListFichaByIdUnicat = (id_unicat) => {
  const { isLoading, data, isError, isFetching, refetch } = useQuery({
    queryKey: ["listFichaByIdUnicat"],
    queryFn: () => getListFichaByIdUnicat(id_unicat),
  });
  return {
    isFetching,
    isLoading,
    isError,
    data,
    refetch,
  };
};

export const useListFichaHistoricoByIdUnicat = (id_unicat) => {
  const { isLoading, data, isError, isFetching, refetch } = useQuery({
    queryKey: ["listFichaHistoricoByIdUnicat"],
    queryFn: () => getListFichaHistoricoByIdUnicat(id_unicat),
  });
  return {
    isFetching,
    isLoading,
    isError,
    data,
    refetch,
  };
};

export const useSaveFicha = (dataFicha) => {
  const { isLoading, data, isError, isFetching, refetch } = useQuery({
    queryKey: ["saveFicha"],
    queryFn: () => saveFicha(dataFicha),
  });
  return {
    isFetching,
    isLoading,
    isError,
    data,
    refetch,
  };
};
