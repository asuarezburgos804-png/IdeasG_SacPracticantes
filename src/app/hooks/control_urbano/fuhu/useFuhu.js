import { 
  useMutation, 
  useQuery 
} from "@tanstack/react-query";

import {
  deleteSolicitud, postSolicitud, putSolicitud,
  deleteAdministrado, postAdministrado, putAdministrado, postDomicilio,
  putRequisito, postRequisito, deleteRequisito,
  putTerreno, deleteTerreno, postTerreno,
  getListFuhu, getObtenerFuhu,
  getAnexos, getModAprob, getTipoHab, getTipoTramite,
  getDepartamentos, getDistrito, getProvincia,
  getDepartamentos2, getProvincias2, getDistritos2,
  getObservacionesFF,
  getIdFuhu
} from "@/app/services/control_urbano/fuhu/fuhu";

export const useGetIdFuhu = () => {
  const { isLoading, isError, data, isFetching } = useQuery(
    ["idExpedienteFuhu"],
    getIdFuhu
  );
  return {
    isFetching,
    isLoading,
    isError,
    data,
  };
};

//Lista FUHU
export const useListFuhu = () => {
  const { isLoading, isError, data, isFetching } = useQuery(
    ["lista_fuhu"],
    getListFuhu
  );

  return {
    isFetching,
    isLoading,
    isError,
    data,
  };
};

//Obtener FUHU
  export const useGetExpedienteFuhu= (id_expediente) => {
    const { data, error, isLoading, isError, refetch } = useQuery(
      ["obtener_fue", id_expediente],
      () => getObtenerFuhu(id_expediente)
  );
    return {
      refetch,
      data,
      error,
      isLoading,
      isError,
    };
};

// Hooks para Solicitud
export const useRegisterSolicitudFuhu = () => {
  const { mutate, isLoading, isError, data, error } = useMutation(postSolicitud);
  return {
    registerSolicitudFuhu: mutate,
    isLoading,
    isError,
    data,
    error,
  };
};

export const useUpdateSolicitudFuhu = () => {
  const { mutate, isLoading, isError, data, error } = useMutation(
    ({ requestData, id_solicitud }) => putSolicitud(requestData, id_solicitud)
  );
  return {
    updateSolicitudFuhu: mutate,
    isLoading,
    isError,
    data,
    error,
  };
};

export const useDeleteSolicitudFuhu = () => {
  const { mutate, isLoading, isError, data, error } = useMutation(deleteSolicitud);
  return {
    eliminarSolicitudFuhu: mutate,
    isLoading,
    isError,
    data,
    error,
  };
};

// Hooks para Administrado
export const useRegisterAdministradoFuhu = () => {
  const { mutate, isLoading, isError, data, error } = useMutation(postAdministrado);
  return {
    registerAdministradoFuhu: mutate,
    isLoading,
    isError,
    data,
    error,
  };
};

export const useUpdateAdministradoFuhu = () => {
  const { mutate, isLoading, isError, data, error } = useMutation(({ requestData, id_administrado, id_observacion }) => 
      putAdministrado(requestData, id_administrado, id_observacion)
  );
  return {
    updateAdministradoFuhu: mutate,
    isLoading,
    isError,
    data,
    error,
  };
};

export const useDeleteAdministradoFuhu = () => {
  const { mutate, isLoading, isError, data, error } = useMutation(deleteAdministrado);
  return {
    eliminarAdministradoFuhu: mutate,
    isLoading,
    isError,
    data,
    error,
  };
};

// Hooks para Requisito
export const useRegisterRequisitoFuhu = () => {
  const { mutate, isLoading, isError, data, error } = useMutation(postRequisito);
  return {
    registerRequisitoFuhu: mutate,
    isLoading,
    isError,
    data,
    error,
  };
};

export const useUpdateRequisitoFuhu = () => {
  const { mutate, isLoading, isError, data, error } = useMutation(
    ({ requestData, id_requisito }) => putRequisito(requestData, id_requisito)
  );
  return {
    updateRequisitoFuhu: mutate,
    isLoading,
    isError,
    data,
    error,
  };
};

export const useDeleteRequisitoFuhu = () => {
  const { mutate, isLoading, isError, data, error } = useMutation(deleteRequisito);
  return {
    eliminarRequisitoFuhu: mutate,
    isLoading,
    isError,
    data,
    error,
  };
};

//hooks para Terreno
export const useRegisterTerrenoFuhu = () => {
  const { mutate, isLoading, isError, data, error } = useMutation(postTerreno);
  return {
    registerTerrenoFuhu: mutate,
    isLoading,
    isError,
    data,
    error,
  };
};

export const useUpdateTerrenoFuhu = () => {
  const { mutate, isLoading, isError, data, error } = useMutation(
    ({ requestData, id_requisito }) => putTerreno(requestData, id_requisito)
  );
  return {
    updateTerrenoFuhu: mutate,
    isLoading,
    isError,
    data,
    error,
  };
};

export const useDeleteTerrenoFuhu = () => {
  const { mutate, isLoading, isError, data, error } = useMutation(deleteTerreno);
  return {
    eliminarTerrenoFuhu: mutate,
    isLoading,
    isError,
    data,
    error,
  };
};

//Obteniendo data   
    export const useGetTipoTramite = () => {
    const { isLoading, isError, data, isFetching } = useQuery(
      ["SolicitudTipoTramite"], // Clave de consulta única
      getTipoTramite
    );
    return {
      isFetching,
      isLoading,
      isError,
      data,
    };
};

export const useGetTipoHab = () => {
    const { isLoading, isError, data, isFetching } = useQuery(
      ["SolicitudTipoHab"], // Clave de consulta única
      getTipoHab
    );
    return {
      isFetching,
      isLoading,
      isError,
      data,
    };
};

export const useGetModAprobacion = () => {
    const { isLoading, isError, data, isFetching } = useQuery(
      ["SolicitudModAprob"], // Clave de consulta única
      getModAprob
    );
    return {
      isFetching,
      isLoading,
      isError,
      data,
    };
};
export const useGetAnexos = () => {
  const { isLoading, isError, data, isFetching } = useQuery(
    ["SolicitudAnexos"], // Clave de consulta única
    getAnexos
  );
  return {
    isFetching,
    isLoading,
    isError,
    data,
  };
};
  //administrado
 

export const useGetDepartamento = () => {
  const { isLoading, isError, data, isFetching } = useQuery(
    ["AdmiDepartamentos"], // Clave de consulta única
    getDepartamentos
  );
  return {
    isFetching,
    isLoading,
    isError,
    data,
  };
};
export const useGetProvincia = () => {
  const { isLoading, isError, data, isFetching } = useQuery(
    ["TeProvincia"], // Clave de consulta única
    getProvincia
  );
  return {
    isFetching,
    isLoading,
    isError,
    data,
  };
};
export const useGetDistrito = () => {
  const { isLoading, isError, data, isFetching } = useQuery(
    ["TeDistrito"], // Clave de consulta única
    getDistrito
  );
  return {
    isFetching,
    isLoading,
    isError,
    data,
  };
};
//terreno

export const useGetDepartamento2 = () => {
  const { isLoading, isError, data, isFetching } = useQuery(
    ["TeDepartamentos"], // Clave de consulta única
    getDepartamentos2
  );
  return {
    isFetching,
    isLoading,
    isError,
    data,
  };
};
export const useGetProvincia2 = () => {
  const { isLoading, isError, data, isFetching } = useQuery(
    ["TeProvincia"], // Clave de consulta única
    getProvincias2
  );
  return {
    isFetching,
    isLoading,
    isError,
    data,
  };
};
export const useGetDistrito2 = () => {
  const { isLoading, isError, data, isFetching } = useQuery(
    ["TeDistrito"], // Clave de consulta única
    getDistritos2
  );
  return {
    isFetching,
    isLoading,
    isError,
    data,
  };
};

  // GET DATA FICHA COTITULAR
  export const useGetObservaciones = () => {
    const { isLoading, isError, data, isFetching } = useQuery(
      ["observaciones_fuefuhu"],
      getObservacionesFF
    );
    return {
      isFetching,
      isLoading,
      isError,
      data,
    
  };

  };

//USE SEARCH ADMI
  import { getSearchPersonaJ,getSearchPersonaN } from "@/app/services/control_urbano/fuhu/fuhu";
  
  export const useSearchAdmiJ = (personaJ) => {
    console.log("personaJ",personaJ);
    const { isLoading, isError, data, isFetching, refetch } = useQuery(
      ["personaJ", personaJ],
      () => getSearchPersonaJ(personaJ),
      {
        enabled: !!personaJ,
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
  
  export const useSearchAdmiN = (personaN) => {
    console.log("personaN",personaN);
    const { isLoading, isError, data, isFetching, refetch } = useQuery(
      ["personaN", personaN],
      () => getSearchPersonaN(personaN),
      {
        enabled: !!personaN,
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

