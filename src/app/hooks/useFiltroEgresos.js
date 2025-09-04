import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getListFiltroEgresos,
  getFiltroEgresos,
  postFiltroEgresos,
  putFiltroEgresos,
  deleteFiltroEgresos,
  getTiposEgreso,
  getCategoriasEgreso,
  getUnidadesEjecutoras,
  getCentrosCosto,
  getDepartamentos,
  getProvincias,
  getDistritos,
  aplicarFiltroEgresos,
  exportarFiltroEgresos,
  getEstadisticasEgresos,
} from "@/app/services/reportes/filtroEgresos";

// CRUD Operations Hooks
export const useListFiltroEgresos = () => {
  const { isLoading, isError, data, isFetching, refetch } = useQuery(
    ["list_filtro_egresos"],
    getListFiltroEgresos,
    {
      staleTime: 5 * 60 * 1000,
      cacheTime: 10 * 60 * 1000,
    }
  );
  return {
    isFetching,
    isLoading,
    isError,
    data,
    refetch,
  };
};

export const useGetFiltroEgresos = (id) => {
  const { data, error, isLoading, isError, refetch } = useQuery(
    ["filtro_egresos", id],
    () => getFiltroEgresos(id),
    {
      enabled: !!id,
      staleTime: 5 * 60 * 1000,
      cacheTime: 10 * 60 * 1000,
    }
  );
  return {
    refetch,
    data,
    error,
    isLoading,
    isError,
  };
};

export const useCreateFiltroEgresos = () => {
  const queryClient = useQueryClient();
  const { mutate, mutateAsync, isLoading, isError, data, error } = useMutation(
    postFiltroEgresos,
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["list_filtro_egresos"]);
      },
    }
  );
  
  const createFiltroEgresos = (requestData) => {
    mutate(requestData);
  };
  
  return {
    createFiltroEgresos,
    mutateAsync,
    isLoading,
    isError,
    data,
    error,
  };
};

export const useUpdateFiltroEgresos = () => {
  const queryClient = useQueryClient();
  const { mutate, mutateAsync, isLoading, isError, data, error } = useMutation(
    ({ requestData, id }) => putFiltroEgresos(requestData, id),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["list_filtro_egresos"]);
        queryClient.invalidateQueries(["filtro_egresos"]);
      },
    }
  );
  
  const updateFiltroEgresos = (requestData, id) => {
    mutate({ requestData, id });
  };
  
  return {
    updateFiltroEgresos,
    mutateAsync,
    isLoading,
    isError,
    data,
    error,
  };
};

export const useDeleteFiltroEgresos = () => {
  const queryClient = useQueryClient();
  const { mutate, mutateAsync, isLoading, isError, data, error } = useMutation(
    deleteFiltroEgresos,
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["list_filtro_egresos"]);
      },
    }
  );
  
  const eliminarFiltroEgresos = (id) => {
    mutate(id);
  };
  
  return {
    eliminarFiltroEgresos,
    mutateAsync,
    isLoading,
    isError,
    data,
    error,
  };
};

// Catalog Hooks
export const useTiposEgreso = () => {
  const { isLoading, isError, data, isFetching } = useQuery(
    ["tipos_egreso"],
    getTiposEgreso,
    {
      staleTime: 30 * 60 * 1000, // 30 minutes
      cacheTime: 60 * 60 * 1000, // 1 hour
    }
  );
  return {
    isFetching,
    isLoading,
    isError,
    data,
  };
};

export const useCategoriasEgreso = () => {
  const { isLoading, isError, data, isFetching } = useQuery(
    ["categorias_egreso"],
    getCategoriasEgreso,
    {
      staleTime: 30 * 60 * 1000,
      cacheTime: 60 * 60 * 1000,
    }
  );
  return {
    isFetching,
    isLoading,
    isError,
    data,
  };
};

export const useUnidadesEjecutoras = () => {
  const { isLoading, isError, data, isFetching } = useQuery(
    ["unidades_ejecutoras"],
    getUnidadesEjecutoras,
    {
      staleTime: 30 * 60 * 1000,
      cacheTime: 60 * 60 * 1000,
    }
  );
  return {
    isFetching,
    isLoading,
    isError,
    data,
  };
};

export const useCentrosCosto = () => {
  const { isLoading, isError, data, isFetching } = useQuery(
    ["centros_costo"],
    getCentrosCosto,
    {
      staleTime: 30 * 60 * 1000,
      cacheTime: 60 * 60 * 1000,
    }
  );
  return {
    isFetching,
    isLoading,
    isError,
    data,
  };
};

// Geographic Hooks
export const useDepartamentos = () => {
  const { isLoading, isError, data, isFetching } = useQuery(
    ["departamentos"],
    getDepartamentos,
    {
      staleTime: 60 * 60 * 1000, // 1 hour
      cacheTime: 2 * 60 * 60 * 1000, // 2 hours
    }
  );
  return {
    isFetching,
    isLoading,
    isError,
    data,
  };
};

export const useProvincias = (departamento) => {
  const { isLoading, isError, data, isFetching } = useQuery(
    ["provincias", departamento],
    () => getProvincias(departamento),
    {
      enabled: !!departamento,
      staleTime: 30 * 60 * 1000,
      cacheTime: 60 * 60 * 1000,
    }
  );
  return {
    isFetching,
    isLoading,
    isError,
    data,
  };
};

export const useDistritos = (provincia) => {
  const { isLoading, isError, data, isFetching } = useQuery(
    ["distritos", provincia],
    () => getDistritos(provincia),
    {
      enabled: !!provincia,
      staleTime: 30 * 60 * 1000,
      cacheTime: 60 * 60 * 1000,
    }
  );
  return {
    isFetching,
    isLoading,
    isError,
    data,
  };
};

// Filter Operations Hooks
export const useAplicarFiltroEgresos = () => {
  const { mutate, mutateAsync, isLoading, isError, data, error } = useMutation(
    aplicarFiltroEgresos
  );
  
  const aplicarFiltro = (requestData) => {
    mutate(requestData);
  };
  
  return {
    aplicarFiltro,
    mutateAsync,
    isLoading,
    isError,
    data,
    error,
  };
};

export const useExportarFiltroEgresos = () => {
  const { mutate, mutateAsync, isLoading, isError, data, error } = useMutation(
    ({ requestData, formato }) => exportarFiltroEgresos(requestData, formato)
  );
  
  const exportarFiltro = (requestData, formato) => {
    mutate({ requestData, formato });
  };
  
  return {
    exportarFiltro,
    mutateAsync,
    isLoading,
    isError,
    data,
    error,
  };
};

export const useEstadisticasEgresos = () => {
  const { mutate, mutateAsync, isLoading, isError, data, error } = useMutation(
    getEstadisticasEgresos
  );
  
  const obtenerEstadisticas = (requestData) => {
    mutate(requestData);
  };
  
  return {
    obtenerEstadisticas,
    mutateAsync,
    isLoading,
    isError,
    data,
    error,
  };
};