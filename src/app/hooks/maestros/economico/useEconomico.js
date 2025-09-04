import { useMutation, useQuery } from "@tanstack/react-query";

import {
  makePostRequest,
  makePatchRequest,
  makeDeleteRequest,
  makeGetRequest,
} from "@/utils/api/api";
import { fetchCondTitular, fetchDocumento } from "@/app/services/master/master";
import {
  deleteIndentConductor,
  fechIndentConductor,
  postIndentConductor,
  putIndentConductor,
} from "@/app/services/ficha/fichaEco";

/**FICHA ECONOMICA CONDUCTOR*/
export const useRegisterConductor = () => {
  const { mutate, isLoading, isError, data, error } =
    useMutation(postIndentConductor);

  const registerConductor = (requestData) => {
    mutate(requestData);
  };

  return {
    registerConductor,
    isLoading,
    isError,
    data,
    error,
  };
};
export const useUpdateConductor = () => {
  const { mutate, isLoading, isError, data, error } = useMutation(
    ({ requestData, id }) => putIndentConductor(requestData, id)
  );

  const updateConductor = (requestData, id) => {
    mutate({ requestData, id });
  };

  return {
    updateConductor,
    isLoading,
    isError,
    data,
    error,
  };
};

export const useDeleteConductor = () => {
  const { mutate, isLoading, isError, data, error } = useMutation(
    deleteIndentConductor
  );

  const eliminarConductor = (id) => {
    mutate(id);
  };

  return {
    eliminarConductor,
    isLoading,
    isError,
    data,
    error,
  };
};

//Documento Presentado
export const useDocPresentado = () => {
  const { isLoading, isError, data, isFetching } = useQuery(
    ["docpresentado"],
    fetchDocumento
  );
  return {
    isFetching,
    isLoading,
    isError,
    data,
  };
};

export async function crudDocPresentado(requestData, action) {
  try {
    let data;
    if (action == 0) {
      data = await makePostRequest("/maestros/docPresentado", requestData);
    } else if (action == 2) {
      data = await makePatchRequest(
        "/maestros/docPresentado/" + requestData.cod_doc_presentado,
        requestData
      );
    } else if (action == 3) {
      data = await makeDeleteRequest(
        "/maestros/docPresentado/" + requestData.cod_doc_presentado
      );
    }
    return data;
  } catch (e) {
    throw e;
  }
}

export const useCondConductor = () => {
  const { isLoading, isError, data, isFetching } = useQuery(
    ["condEspTitular"],
    fetchCondTitular
  );
  return {
    isFetching,
    isLoading,
    isError,
    data,
  };
};
