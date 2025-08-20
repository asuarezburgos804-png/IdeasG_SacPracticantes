//Obteniendo data Fue

//ObservacionesFueForm
import {
    postDatosCotitular,
    getFichaCotitular,
    putDatosCotitular,
    deleteDatosCotitular,
  } from "@/app/services/ficha/cotitular/cotitular";
import { getObservacionesFF } from "@/app/services/control_urbano/fuhu/observacionesServicecopy";
import { useQuery } from "@tanstack/react-query";
import { getFormFue } from "@/app/services/control_urbano/fuhu/observacionesServicecopy";
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

