import {
  getClientes,
  getClientesById,
  getSistemas,
  getGeoportales,
  getSistemasModuloById,
  getSistemasByIdCliente,
  getSistemasModuloByRolId,
  getSistemasByIdClienteLoggin,
  getHerramientasDev,
  getPerfilUsuario,
  getPerfilInvitado,
  getCapasByClienteId,
  getCapasByIdSistemaIdRol,
  getCapasByIdRolIdCapaPertenece,
  getSistemasById
} from "@/app/services/suite/suite";
import { useQuery } from "@tanstack/react-query";

export const useSistemas = () => {
  const { isLoading, data, isError, isFetching, refetch } = useQuery({
    queryKey: ["suiteSistemas"],
    queryFn: () => getSistemas(),
  });
  return {
    isFetching,
    isLoading,
    isError,
    data,
    refetch,
  };
};

export const useSistemasById = (id) => {
  const { isLoading, data, isError, isFetching, refetch } = useQuery({
    queryKey: ["suiteSistemasById"],
    queryFn: () => getSistemasById(id),
  });
  return {
    isFetching,
    isLoading,
    isError,
    data,
    refetch,
  };
};

export const usePerfil = (isUserLoggedIn, titulo, idCliente) => {
  const queryKey = isUserLoggedIn ? ["suitePerfilUsuario", titulo] : ["suitePerfilInvitado", titulo];
  const queryFn = isUserLoggedIn ? () => getPerfilUsuario(titulo) : () => getPerfilInvitado(titulo);

  const { isLoading, data, isError, isFetching, refetch } = useQuery({
    queryKey,
    queryFn,
    enabled: !!idCliente,
  });

  return {
    isFetching,
    isLoading,
    isError,
    data,
    refetch,
  };
};

export const useClientes = () => {
  const { isLoading, data, isError, isFetching, refetch } = useQuery({
    queryKey: ["suiteClientes"],
    queryFn: () => getClientes(),
  });
  return {
    isFetching,
    isLoading,
    isError,
    data,
    refetch,
  };
};

export const useClientesById = (id) => {
  const { isLoading, data, isError, isFetching, refetch } = useQuery({
    queryKey: ["suiteClientesById"],
    queryFn: () => getClientesById(id),
  });
  return {
    isFetching,
    isLoading,
    isError,
    data,
    refetch,
  };
};

export const useGeoportales = () => {
  const { isLoading, data, isError, isFetching, refetch } = useQuery({
    queryKey: ["suiteGeoportales"],
    queryFn: () => getGeoportales(),
  });
  return {
    isFetching,
    isLoading,
    isError,
    data,
    refetch,
  };
};

export const useSistemasByIdCliente = (id) => {
  const { isLoading, data, isError, isFetching, refetch } = useQuery({
    queryKey: ["suiteSistemasByIdCliente"],
    queryFn: () => getSistemasByIdCliente(id),
  });
  return {
    isFetching,
    isLoading,
    isError,
    data,
    refetch,
  };
};

export const useSistemasByIdClienteLoggin = () => {
  const { isLoading, data, isError, isFetching, refetch } = useQuery({
    queryKey: ["suiteSistemasByIdClienteLoggin"],
    queryFn: () => getSistemasByIdClienteLoggin(),
  });
  return {
    isFetching,
    isLoading,
    isError,
    data,
    refetch,
  };
};


export const useClientesbyId = (id) => {
  const { isLoading, data, isError, isFetching, refetch } = useQuery({
    queryKey: ["suiteClientesById"],
    queryFn: () => getClientesById(id),
  });
  return {
    isFetching,
    isLoading,
    isError,
    data,
    refetch,
  };
};

export const useHerramientasDev = (id) => {
  const { isLoading, data, isError, isFetching, refetch } = useQuery({
    queryKey: ["suiteHerramientasDev"],
    queryFn: () => getHerramientasDev(id),
  });
  return {
    isFetching,
    isLoading,
    isError,
    data,
    refetch,
  };
};

export const useSistemasModuloById = (id) => {
  const { isLoading, data, isError, isFetching, refetch } = useQuery({
    queryKey: ["suiteSistemasModulo"],
    queryFn: () => getSistemasModuloById(id),
  });
  return {
    isFetching,
    isLoading,
    isError,
    data,
    refetch,
  };
};

export const useSistemasModuloByRolId = (id) => {
  const { isLoading, data, isError, isFetching, refetch } = useQuery({
    queryKey: ["suiteSistemasModuloByRolId"],
    queryFn: () => getSistemasModuloByRolId(id),
  });
  return {
    isFetching,
    isLoading,
    isError,
    data,
    refetch,
  };
};

export const useCapasByClienteId = (id_sistema) => {
  const { isLoading, data, isError, isFetching, refetch } = useQuery({
    queryKey: ["suiteCapasByClienteId"],
    queryFn: () => getCapasByClienteId(id_sistema),
  });
  return {
    isFetching,
    isLoading,
    isError,
    data,
    refetch,
  };
};

export const useCapasByIdSistemaIdRol = (id_sistema,id_rol) => {
  const { isLoading, data, isError, isFetching, refetch } = useQuery({
    queryKey: ["suiteCapasByIdSistemaIdRol"],
    queryFn: () => getCapasByIdSistemaIdRol(id_sistema,id_rol),
  });
  return {
    isFetching,
    isLoading,
    isError,
    data,
    refetch,
  };
};

export const useCapasByIdRolIdCapaPertenece = (id_rol,capas_id,pertenece) => {
  const { isLoading, data, isError, isFetching, refetch } = useQuery({
    queryKey: ["suiteCapasByIdRolIdCapaPertenece"],
    queryFn: () => getCapasCamposByIdRolIdCapaPertenec(id_rol,capas_id,pertenece),
  });
  return {
    isFetching,
    isLoading,
    isError,
    data,
    refetch,
  };
};
