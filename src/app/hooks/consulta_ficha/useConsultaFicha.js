import { useQuery } from "@tanstack/react-query";
import {
  postCantidadFichasCatastrales,
  postAreaGraficaVsTerrenoVerificado,
  postAreaConstructivasVsAreaVerificada,
  postComercialEspacialVsActividadEconomica,
  postLinderoEspcialVsLinderoFicha,
  getListUsers,
} from "@/app/services/consulta_catastro/consultaCatastro";

export const useCantidadFichasCatastrales = (params) => {
  const { data, isLoading, isError, error } = useQuery(
    ["postCantidadFichasCatastrales", params],
    () => postCantidadFichasCatastrales(params)
  );
  return { data, isLoading, isError, error };
};

export const useAreaGraficaVsTerrenoVerificado = (params) => {
  const { data, isLoading, isError, error } = useQuery(
    ["postAreaGraficaVsTerrenoVerificado", params],
    () => postAreaGraficaVsTerrenoVerificado(params)
  );
  return { data, isLoading, isError, error };
};

export const useAreaConstructivasVsAreaVerificada = (params) => {
  const { data, isLoading, isError, error } = useQuery(
    ["postAreaConstructivasVsAreaVerificada", params],
    () => postAreaConstructivasVsAreaVerificada(params)
  );
  return { data, isLoading, isError, error };
};

export const useComercialEspacialVsActividadEconomica = (params) => {
  const { data, isLoading, isError, error } = useQuery(
    ["postComercialEspacialVsActividadEconomica", params],
    () => postComercialEspacialVsActividadEconomica(params)
  );
  return { data, isLoading, isError, error };
};

export const useLinderoEspcialVsLinderoFicha = (params) => {
  const { data, isLoading, isError, error } = useQuery(
    ["postLinderoEspcialVsLinderoFicha", params],
    () => postLinderoEspcialVsLinderoFicha(params)
  );
  return { data, isLoading, isError, error };
};

export const useGetUsers = () => {
  const { data, isLoading, isError, error } = useQuery(["getUsers"], () =>
    getListUsers()
  );
  return { data, isLoading, isError, error };
};
