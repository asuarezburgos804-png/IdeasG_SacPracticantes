import { useQuery } from "@tanstack/react-query";
import { 
  getFormFue, 
  getListFue, 
  getDepartamentos, 
  getProvincias, 
  getDistritos, 
  getTipoVia, 
  getAnexos, 
  getModAprob, 
  getTipoHab, 
  getTipoTramite, 
  getTipoObraSol,
  getObservacionesFF,
  getFormFueObs,
  getIdFue,
  getEstadoCivil
} from "@/app/services/control_urbano/fue/fue";

export const useListFue = () => {
  const { isLoading, isError, data, isFetching } = useQuery(
    ["list_fue"],
    getListFue
  );
  return {
    isFetching,
    isLoading,
    isError,
    data,
  };
};

  export const useGetExpedienteFUE= (id_expediente) => {
    const { data, error, isLoading, isError, refetch } = useQuery(
      ["obtener_fue", id_expediente],
      () => getFormFue(id_expediente)
  );
    return {
      refetch,
      data,
      error,
      isLoading,
      isError,
    };
};

export const useGetIdFue = () => {
  const { isLoading, isError, data, isFetching } = useQuery(
    ["idExpedienteFue"],
    getIdFue
  );
  return {
    isFetching,
    isLoading,
    isError,
    data,
  };
};

//ObservacionesFueForm

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
  export const useGetExpedienteObs = (id_expediente) => {
    const { data, error, isLoading, isError, refetch } = useQuery(
      ["fichaIndividual", id_expediente],
      () => getFormFueObs(id_expediente)
    );

    return {
      refetch,
      data,
      error,
      isLoading,
      isError,
    };
  };

  import { getSearchNumColegiado } from "@/app/services/control_urbano/fue/fue";

export const useSearchProyectista = (n_colegiado) => {
  const { isLoading, isError, data, isFetching, refetch } = useQuery(
    ["Proyectista", n_colegiado],
    () => getSearchNumColegiado(n_colegiado),
    {
      enabled: !!n_colegiado,
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

export const useGetEstadoCivil =()=>{
  const {isLoading,isError,data,isFetching}=useQuery(
    ["SolicitudEstadoCivil"],
    getEstadoCivil
  );
  return{
    isFetching,
    data,
    isError,
    isLoading,
  };
};

export const useGetTipoObra = () => {
  const { isLoading, isError, data, isFetching } = useQuery(
    ["SolicitudTipoObra"], // Clave de consulta única
    getTipoObraSol
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

export const useGetTipoVia = () => {
  const { isLoading, isError, data, isFetching } = useQuery(
    ["TerrenoTipoVia"], // Clave de consulta única
    getTipoVia
  );
  return {
    isFetching,
    isLoading,
    isError,
    data,
  };
};

export const useGetTipoDepartamento = () => {
  const { isLoading, isError, data, isFetching } = useQuery(
    ["TerrenoTipoDepartamento"], // Clave de consulta única
    getDepartamentos
  );
  return {
    isFetching,
    isLoading,
    isError,
    data,
  };
};

export const useGetTipoProvincia = (idDepartamento) => {
  const { isLoading, isError, data, isFetching } = useQuery(
    ["TerrenoTipoProvincia", idDepartamento], // Clave única que incluye el idDepartamento
    () => getProvincias(idDepartamento),     // Pasa el parámetro correctamente
    {
      enabled: !!idDepartamento,            // Solo ejecuta la consulta si hay un departamento seleccionado
    }
  );
  return {
    isFetching,
    isLoading,
    isError,
    data,
  };
};

export const useGetTipoDistrito = (idProvincia) => {
  const { isLoading, isError, data, isFetching } = useQuery(
    ["TerrenoTipoDistrito", idProvincia], // Clave de consulta única
    () => getDistritos(idProvincia),
    {
      enabled: !!idProvincia,            // Solo ejecuta la consulta si hay un departamento seleccionado
    }
  );
  return {
    isFetching,
    isLoading,
    isError,
    data,
  };
};



import { getTipoObraVal } from "@/app/services/control_urbano/fue/fue";
  
  // GET DATA FICHA COTITULAR
  export const useValorObra = () => {
    const { isLoading, isError, data, isFetching } = useQuery(
      ["tipo_valor_obra"],
      getTipoObraVal
    );
  
    return {
      isFetching,
      isLoading,
      isError,
      data,
    };
};
