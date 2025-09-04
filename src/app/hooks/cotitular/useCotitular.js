import { useMutation, useQuery } from "@tanstack/react-query";

import {
  postDatosCotitular,
  getFichaCotitular,
  putDatosCotitular,
  deleteDatosCotitular,
} from "@/app/services/ficha/cotitular/cotitular";

// GET DATA FICHA COTITULAR
export const useGetFichaCotitular = (id_ficha) => {
  const { data, error, isLoading, isError, refetch } = useQuery(
    ["fichaCotitular", id_ficha],
    () => getFichaCotitular(id_ficha)
  );

  return {
    refetch,
    data,
    error,
    isLoading,
    isError,
  };
};

export const useRegisterDatosCotitular = () => {
  const { mutate, isLoading, isError, data, error } =
    useMutation(postDatosCotitular);

  const registerDatosCotitular = (requestData) => {
    mutate(requestData);
  };

  return {
    registerDatosCotitular,
    isLoading,
    isError,
    data,
    error,
  };
};

export const useUpdateDatosCotitular = () => {
  const { mutate, isLoading, isError, data, error } = useMutation(
    (requestData) => putDatosCotitular(requestData)
  );

  const updateDatosCotitular = (requestData) => {
    mutate(requestData);
  };

  return {
    updateDatosCotitular,
    isLoading,
    isError,
    data,
    error,
  };
};

export const useDeleteDatosCotitular = () => {
  const { mutate, isLoading, isError, data, error } =
    useMutation(deleteDatosCotitular);

  const eliminarDatosCotitular = (id_cotitular) => {
    mutate(id_cotitular);
  };

  return {
    eliminarDatosCotitular,
    isLoading,
    isError,
    data,
    error,
  };
};
