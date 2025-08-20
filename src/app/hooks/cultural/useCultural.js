import { getObservacionPredio } from "@/app/services/individual/individual";

import { useMutation, useQuery } from "@tanstack/react-query";
import {
  postDatosCultural,
  getFichaCultural,
  putDatosCultural,
  deleteDatosCultural,
} from "@/app/services/ficha/cultural/cultural";

import {
  postTitularTMHC,
  putTitularTMHC,
  deleteTitularTMHC,
} from "@/app/services/ficha/fichaBienCultural";

// GET DATA FICHA CULTURAL
export const useGetFichaCultural = (id_ficha) => {
  const { data, error, isLoading, isError, refetch } = useQuery(
    ["fichaCultural", id_ficha],
    () => getFichaCultural(id_ficha)
  );

  return {
    refetch,
    data,
    error,
    isLoading,
    isError,
  };
};

//TITULAR MHC
export const useRegisterDatosTitularMHC = () => {
  const { mutate, isLoading, isError, data, error } =
    useMutation(postTitularTMHC);

  const registerDatosTitularMHC = (requestData) => {
    mutate(requestData);
  };

  return {
    registerDatosTitularMHC,
    isLoading,
    isError,
    data,
    error,
  };
};

export const useUpdateDatosTitularMHC = () => {
  const { mutate, isLoading, isError, data, error } = useMutation(
    (requestData) => putTitularTMHC(requestData)
  );

  const updateDatosTitularMHC = (requestData) => {
    mutate(requestData);
  };

  return {
    updateDatosTitularMHC,
    isLoading,
    isError,
    data,
    error,
  };
};

export const useDeleteDatosTitularMHC = () => {
  const { mutate, isLoading, isError, data, error } =
    useMutation(deleteTitularTMHC);

  const eliminarDatosTitularMHC = (id_titular) => {
    mutate(id_titular);
  };

  return {
    eliminarDatosTitularMHC,
    isLoading,
    isError,
    data,
    error,
  };
};