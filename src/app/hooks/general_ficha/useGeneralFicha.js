import { useMutation } from "@tanstack/react-query";
import {
  postIdentificacionTitular,
  postDomicilioFiscal,
  putDomicilioFiscal,
  putIdentificacionTitular,
  deleteIdentificacionTitular,
  deleteDomicilioFiscal,
} from "../../services/ficha/general_ficha/generalFicha";
//IDENTIFICACION DEL  TITULAR CATASTRAL
export const useRegisterTitular = () => {
  const { mutate, isLoading, isError, data, error } = useMutation(
    postIdentificacionTitular
  );

  const registerTitular = (requestData) => {
    mutate(requestData);
  };

  return {
    registerTitular,
    isLoading,
    isError,
    data,
    error,
  };
};
export const useUpdateIdentificacionTitular = () => {
  const { mutate, isLoading, isError, data, error } = useMutation(
    ({ requestData, id_titular }) =>
      putIdentificacionTitular(requestData, id_titular)
  );

  const updateIdentificacionTitular = (requestData, id_titular) => {
    mutate({ requestData, id_titular });
  };

  return {
    updateIdentificacionTitular,
    isLoading,
    isError,
    data,
    error,
  };
};

export const useDeleteIdentificacionTitular = () => {
  const { mutate, isLoading, isError, data, error } = useMutation(
    deleteIdentificacionTitular
  );

  const eliminarIdentificacionTitular = (id_titular) => {
    mutate(id_titular);
  };

  return {
    eliminarIdentificacionTitular,
    isLoading,
    isError,
    data,
    error,
  };
};
//DOMICILIO FISCAL DEL TITULAR CATASTRAL
export const useRegisterDomicilioFiscal = () => {
  const { mutate, isLoading, isError, data, error } =
    useMutation(postDomicilioFiscal);

  const registerDomicilioFiscal = (requestData) => {
    mutate(requestData);
  };

  return {
    registerDomicilioFiscal,
    isLoading,
    isError,
    data,
    error,
  };
};

export const useUpdateDomicilioFiscal = () => {
  const { mutate, isLoading, isError, data, error } = useMutation(
    ({ requestData, id_domicilio }) =>
      putDomicilioFiscal(requestData, id_domicilio)
  );

  const updateDomicilioFiscal = (requestData, id_domicilio) => {
    mutate({ requestData, id_domicilio });
  };

  return {
    updateDomicilioFiscal,
    isLoading,
    isError,
    data,
    error,
  };
};
export const useDeleteDomicilioFiscal = () => {
  const { mutate, isLoading, isError, data, error } = useMutation(
    deleteDomicilioFiscal
  );

  const eliminarDomicilioFiscal = (id_domicilio) => {
    mutate(id_domicilio);
  };

  return {
    eliminarDomicilioFiscal,
    isLoading,
    isError,
    data,
    error,
  };
};
