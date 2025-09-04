import { useMutation, useQuery } from "@tanstack/react-query";
import {

    postRecapitulacionBienesComunes,
    putRecapitulacionBienesComunes,
    deleteRecapitulacionBienesComunes,
    fetchMantenimientoBC,
} from "@/app/services/ficha/bienComun/bienComun";
// UBICACION VIAS

export const useRegisterListBienComun = () => {
    const { mutate, isLoading, isError, data, error } =
      useMutation(postRecapitulacionBienesComunes);
    const registerListBienComun = (requestData) => {
      mutate(requestData);
    };
    return {
      registerListBienComun,
      isLoading,
      isError,
      data,
      error,
    };
  };
  
  export const useUpdateistBienComun = () => {
    const { mutate, isLoading, isError, data, error } = useMutation(
      ({ requestData, id_recap_bc }) =>
        putRecapitulacionBienesComunes(requestData, id_recap_bc)
    );
    const updateListBienComun = (requestData, id_recap_bc) => {
      mutate({ requestData, id_recap_bc });
    };
    return {
      updateListBienComun,
      isLoading,
      isError,
      data,
      error,
    };
  };
  
  export const useDeleteListBienComun = () => {
    const { mutate, isLoading, isError, data, error } =
      useMutation(deleteRecapitulacionBienesComunes);
    const eliminarListBienComun = (id_recap_bc) => {
      mutate(id_recap_bc);
    };
    return {
      eliminarListBienComun,
      isLoading,
      isError,
      data,
      error,
    };
  };


  // GET DATA FICHA CULTURAL

export const useMantenimientoBienComun = () => {
  const { isLoading, isError, data, isFetching } = useQuery(
    ["mantenimiento"],
    fetchMantenimientoBC
  );
  return {
    isFetching,
    isLoading,
    isError,
    data,
  };
};


