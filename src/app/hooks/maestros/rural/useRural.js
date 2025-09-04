import { useQuery } from "@tanstack/react-query";

import {
  makePostRequest,
  makePatchRequest,
  makeDeleteRequest,
  makeGetRequest,
} from "@/utils/api/api";
import {

  fetchCodUsoPredio,
  fetchClasifUso,
  fetchInscripRegPublicos,
  fetchFormaAdquiPredio,
  fetchConstruccionInst,
  fetchRiego,
  fetchMaterialPredominante,
  fetchEstConservacion,
  fetchEstConstruccion,
  fetchFormaPresentacion
} from "@/app/services/master/master";

export const useCodUsoPredio = () => {
  const { isLoading, isError, data, isFetching } = useQuery(
    ["codUsoPredio"],
    fetchCodUsoPredio
  );
  return {
    isFetching,
    isLoading,
    isError,
    data,
  };
};


export const useClasifUso = () => {
  const { isLoading, isError, data, isFetching } = useQuery(
    ["clasificacionUso"],
    fetchClasifUso
  );
  return {
    isFetching,
    isLoading,
    isError,
    data,
  };
};

export const useInscripRegPublicos = () => {
  const { isLoading, isError, data, isFetching } = useQuery(
    ["inscripcionRegistro"],
    fetchInscripRegPublicos
  );
  return {
    isFetching,
    isLoading,
    isError,
    data,
  };
};


export const useFormaAdqui = () => {
  const { isLoading, isError, data, isFetching } = useQuery(
    ["formaAdquisicion"],
    fetchFormaAdquiPredio
  );
  return {
    isFetching,
    isLoading,
    isError,
    data,
  };
};


export const useConstruccionInst = () => {
  const { isLoading, isError, data, isFetching } = useQuery(
    ["construccionInst"],
    fetchConstruccionInst
  );
  return {
    isFetching,
    isLoading,
    isError,
    data,
  };
};


export const useRiego = () => {
  const { isLoading, isError, data, isFetching } = useQuery(
    ["riegoPredio"],
    fetchRiego
  );
  return {
    isFetching,
    isLoading,
    isError,
    data,
  };
};
export const useMaterialPredominante = () => {
  const { isLoading, isError, data, isFetching } = useQuery(
    ["mepRural"],
    fetchMaterialPredominante
  );
  return {
    isFetching,
    isLoading,
    isError,
    data,
  };
};

export const useEstConservacion = () => {
  const { isLoading, isError, data, isFetching } = useQuery(
    ["ecsRural"],
    fetchEstConservacion
  );
  return {
    isFetching,
    isLoading,
    isError,
    data,
  };
};

export const useEstConstruccion= () => {
  const { isLoading, isError, data, isFetching } = useQuery(
    ["eccRural"],
    fetchEstConstruccion
  );
  return {
    isFetching,
    isLoading,
    isError,
    data,
  };
};

export const useFormaPresentacion= () => {
  const { isLoading, isError, data, isFetching } = useQuery(
    ["eccRural"],
    fetchFormaPresentacion
  );
  return {
    isFetching,
    isLoading,
    isError,
    data,
  };
};