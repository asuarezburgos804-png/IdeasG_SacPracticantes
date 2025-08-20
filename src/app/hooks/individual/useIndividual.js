import { useMutation, useQuery } from "@tanstack/react-query";
import {
  postCaracteristicasTitularidad,
  getFichaIndividual,
  putCaracteristicasTitularidad,
  deleteCaracteristicasTitularidad,
  postUbicacionVias,
  putUbicacionVias,
  deleteUbicacionVias,
  postUbicacionPredio,
  putUbicacionPredio,
  deleteUbicacionPredio,
  postDescripcionPredio,
} from "@/app/services/ficha/individual/individual";

// GET DATA FICHA INDIVIDUAL

export const useGetFichaIndividual = (id_ficha) => {
  const { data, error, isLoading, isError, refetch } = useQuery(
    ["fichaIndividual", id_ficha],
    () => getFichaIndividual(id_ficha)
  );

  return {
    refetch,
    data,
    error,
    isLoading,
    isError,
  };
};

//CARACTERISTICAS DE LA TITULARIDAD

export const useRegisterCaracteristicasTitularidad = () => {
  const { mutate, isLoading, isError, data, error } = useMutation(
    postCaracteristicasTitularidad
  );
  const registerCaracteristicasTitularidad = (requestData) => {
    mutate(requestData);
  };
  return {
    registerCaracteristicasTitularidad,
    isLoading,
    isError,
    data,
    error,
  };
};

export const useUpdateCaracteristicasTitularidad = () => {
  const { mutate, isLoading, isError, data, error } = useMutation(
    ({ requestData, id_caracteristica }) =>
      putCaracteristicasTitularidad(requestData, id_caracteristica)
  );
  const updateCaracteristicasTitularidad = (requestData, id_caracteristica) => {
    mutate({ requestData, id_caracteristica });
  };
  return {
    updateCaracteristicasTitularidad,
    isLoading,
    isError,
    data,
    error,
  };
};

export const useDeleteCaracteristicasTitularidad = () => {
  const { mutate, isLoading, isError, data, error } = useMutation(
    deleteCaracteristicasTitularidad
  );
  const eliminarCaracteristicasTitularidad = (id_caracteristica) => {
    mutate(id_caracteristica);
  };
  return {
    eliminarCaracteristicasTitularidad,
    isLoading,
    isError,
    data,
    error,
  };
};

// UBICACION VIAS

export const useRegisterUbicacionVias = () => {
  const { mutate, isLoading, isError, data, error } =
    useMutation(postUbicacionVias);
  const registerUbicacionVias = (requestData) => {
    mutate(requestData);
  };
  return {
    registerUbicacionVias,
    isLoading,
    isError,
    data,
    error,
  };
};

export const useUpdateUbicacionVias = () => {
  const { mutate, isLoading, isError, data, error } = useMutation(
    ({ requestData, id_ubicacion_via }) =>
      putUbicacionVias(requestData, id_ubicacion_via)
  );
  const updateUbicacionVias = (requestData, id_ubicacion_via) => {
    mutate({ requestData, id_ubicacion_via });
  };
  return {
    updateUbicacionVias,
    isLoading,
    isError,
    data,
    error,
  };
};

export const useDeleteUbicacionVias = () => {
  const { mutate, isLoading, isError, data, error } =
    useMutation(deleteUbicacionVias);
  const eliminarUbicacionVias = (id_ubicacion_via) => {
    mutate(id_ubicacion_via);
  };
  return {
    eliminarUbicacionVias,
    isLoading,
    isError,
    data,
    error,
  };
};

// UBICACION PREDIO
export const useRegisterUbicacionPredio = () => {
  const { mutate, isLoading, isError, data, error } =
    useMutation(postUbicacionPredio);
  const registerUbicacionPredio = (requestData) => {
    mutate(requestData);
  };
  return {
    registerUbicacionPredio,
    isLoading,
    isError,
    data,
    error,
  };
};

export const useUpdateUbicacionPredio = () => {
  const { mutate, isLoading, isError, data, error } = useMutation(
    ({ requestData, id_ubicacion }) =>
      putUbicacionPredio(requestData, id_ubicacion)
  );
  const updateUbicacionPredio = (requestData, id_ubicacion) => {
    mutate({ requestData, id_ubicacion });
  };
  return {
    updateUbicacionPredio,
    isLoading,
    isError,
    data,
    error,
  };
};

export const useDeleteUbicacionPredio = () => {
  const { mutate, isLoading, isError, data, error } = useMutation(
    deleteUbicacionPredio
  );
  const eliminarUbicacionPredio = (id_ubicacion) => {
    mutate(id_ubicacion);
  };
  return {
    eliminarUbicacionPredio,
    isLoading,
    isError,
    data,
    error,
  };
};
