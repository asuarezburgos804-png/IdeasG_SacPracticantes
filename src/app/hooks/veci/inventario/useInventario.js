import { useQuery } from "@tanstack/react-query";

import {
    makePostRequest,
    makePatchRequest,
    makeDeleteRequest,
    makeDeleteRequestData, //Permite mandar un json con ids para eliminar masivamente
    makeGetRequest,
    makePutRequest,
} from "@/utils/api/api";

import { 
  fetchArticulo,
  fetchStock,
  fetchTransaccionesInsumos,
  fetchTransaccionesMateriales
} from "@/app/services/veci/inventario/inventario";

export const useArticulo = (enabled = true) => {
  const { isLoading, isError, data, isFetching, refetch } = useQuery({
    queryKey: ["articulo"],
    queryFn: fetchArticulo,
    enabled,
  });
  return {
    isLoading,
    isError,
    data,
    isFetching,
    refetch,
  };
};

export const useStock = (enabled = true) => {
  const { isLoading, isError, data, isFetching, refetch } = useQuery({
    queryKey: ["stock"],
    queryFn: fetchStock,
    enabled,
  });
  return {
    isLoading,
    isError,
    data,
    isFetching,
    refetch,
  };
};

export const useTransaccionesInsumos = (enabled = true) => {
  const { isLoading, isError, data, isFetching, refetch } = useQuery({
    queryKey: ["transacciones_insumos"],
    queryFn: fetchTransaccionesInsumos,
    enabled,
  });
  return {
    isLoading,
    isError,
    data,
    isFetching,
    refetch,
  };
};

export const useTransaccionesMateriales = (enabled = true) => {
  const { isLoading, isError, data, isFetching, refetch } = useQuery({
    queryKey: ["transacciones_materiales"],
    queryFn: fetchTransaccionesMateriales,
    enabled,
  });
  return {
    isLoading,
    isError,
    data,
    isFetching,
    refetch,
  };
};

export async function crudArticulo(requestData, action) {
  try {
    let data;
    if (action === 0) {
      data = await makePostRequest(
        "/veci/inventario/articulo/registrar", requestData
      );
    } else if (action === 1) {
      data = await makePutRequest(
        "/veci/inventario/articulo/actualizar/" + requestData.id_articulo,
        requestData
      );
    } else if (action === 2) {
      data = await makeDeleteRequest(
        "/veci/inventario/articulo/eliminar/" + requestData.id_articulo
      );
    }
    console.log("RequestData articulo: ", requestData);
    return data;
  } catch (e) {
    throw e;
  }
}

export async function crudTransaccion(requestData, action) {
  try {
    let data;
    if (action === 0) {
      data = await makePostRequest(
        "/veci/inventario/transaccion/registrar", requestData
      );
    } else if (action === 1) {
      data = await makePutRequest(
        "/veci/inventario/transaccion/actualizar/" + requestData.id_transaccion,
        requestData
      );
    } else if (action === 2) {
      data = await makeDeleteRequest(
        "/veci/inventario/transaccion/eliminar/" + requestData.id_transaccion
      );
    }
    console.log("RequestData transaccion: ", requestData);
    return data;
  } catch (e) {
    throw e;
  }
}