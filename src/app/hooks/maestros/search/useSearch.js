import { useQuery } from "@tanstack/react-query";
import {
  getSearchViaData,
  getSearchHabilitacionUrbana,
  getSearchCodUso,
  getSearchEstructuracion,
  getSearchZonificacion,
  getSearchInstalacionesAnt,
  getSearchNotaria,
  getSearchPersona,
  getSearchZona
} from "@/app/services/master/search/search";

export const useSearchInstalacionesAnt = (cod) => {
  const { isLoading, isError, data, isFetching, refetch } = useQuery(
    ["InstalacionesAnt", cod],
    () => getSearchInstalacionesAnt(cod),
    {
      enabled: !!cod,
      staleTime: 5 * 60 * 1000,
      cacheTime: 10 * 60 * 1000,
    }
  );

  return {
    isFetching,
    refetch,
    isLoading,
    isError,
    data,
  };
};

export const useSearchViaData = (via) => {
  const { isLoading, isError, data, isFetching, refetch } = useQuery(
    ["via", via],
    () => getSearchViaData(via),
    {
      enabled: !!via,
      staleTime: 5 * 60 * 1000,
      cacheTime: 10 * 60 * 1000,
    }
  );

  return {
    isFetching,
    refetch,
    isLoading,
    isError,
    data,
  };
};

export const useSearchHabilitacionUrbana = (habUrb) => {
  const { isLoading, isError, data, isFetching, refetch } = useQuery(
    ["haburb", habUrb],
    () => getSearchHabilitacionUrbana(habUrb),
    {
      enabled: !!habUrb,
      staleTime: 5 * 60 * 1000,
      cacheTime: 10 * 60 * 1000,
    }
  );

  return {
    isFetching,
    refetch,
    isLoading,
    isError,
    data,
  };
};

export const useSearchCodUso = (codUso) => {
  console.log("codUso", codUso);
  const { isLoading, isError, data, isFetching, refetch } = useQuery(
    ["coduso", codUso],
    () => getSearchCodUso(codUso),
    {
      enabled: !!codUso,
      staleTime: 5 * 60 * 1000,
      cacheTime: 10 * 60 * 1000,
    }
  );

  return {
    isFetching,
    refetch,
    isLoading,
    isError,
    data,
  };
};

export const useSearchEstructuracion = (codEstr) => {
  const { isLoading, isError, data, isFetching, refetch } = useQuery(
    ["codestr", codEstr],
    () => getSearchEstructuracion(codEstr),
    {
      enabled: !!codEstr,
      staleTime: 5 * 60 * 1000,
      cacheTime: 10 * 60 * 1000,
    }
  );

  return {
    isFetching,
    refetch,
    isLoading,
    isError,
    data,
  };
};

export const useSearchZona = (codZona) => {
  const { isLoading, isError, data, isFetching, refetch } = useQuery(
    ["codzona", codZona],
    () => getSearchZona(codZona),
    {
      enabled: !!codZona,
      staleTime: 5 * 60 * 1000,
      cacheTime: 10 * 60 * 1000,
    }
  );

  return {
    isFetching,
    refetch,
    isLoading,
    isError,
    data,
  };
};

export const useSearchNotaria = (cod_notaria) => {
  const { isLoading, isError, data, isFetching, refetch } = useQuery(
    ["cod_notaria", cod_notaria],
    () => getSearchNotaria(cod_notaria),
    {
      enabled: !!cod_notaria,
      staleTime: 5 * 60 * 1000,
      cacheTime: 10 * 60 * 1000,
    }
  );

  return {
    isFetching,
    refetch,
    isLoading,
    isError,
    data,
  };
};


export const useSearchPersona = (c_num_doc) => {
  const { isLoading, isError, data, isFetching, refetch } = useQuery(
    ["useSearchPersona",c_num_doc],
    () => getSearchPersona(c_num_doc),
    {
      enabled: !!c_num_doc,
      staleTime: 5 * 60 * 1000,
      cacheTime: 10 * 60 * 1000,
    }
  );

  return {
    isFetching,
    refetch,
    isLoading,
    isError,
    data,
  };
};
