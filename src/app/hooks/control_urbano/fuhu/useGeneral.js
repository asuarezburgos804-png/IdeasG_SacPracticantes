//Obteniendo data 
import { getObtenerFuhu } from "@/app/services/control_urbano/fuhu/proyectistaService";
import { useQuery } from "@tanstack/react-query";
import { getFormFuhu } from "@/app/services/control_urbano/fuhu/proyectistaService";;
import { getAnexos,getModAprob, getTipoHab, getTipoTramite} from "@/app/services/control_urbano/fuhu/solicitudService";
import { getDepartamentos,getDistrito,getProvincia } from "@/app/services/control_urbano/fuhu/administradoService";
import { getDepartamentos2,getProvincias2,getDistritos2 } from "@/app/services/control_urbano/fuhu/terrenoService";

  export const useGetObtenerFuhu= () => {
    const { isLoading, isError, data, isFetching } = useQuery(
      ["ProyectoFuhu"],
      getObtenerFuhu
    );
    return {
      isFetching,
      isLoading,
      isError,
      data,
    
  };
  };export const useGetTipoTramite = () => {
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