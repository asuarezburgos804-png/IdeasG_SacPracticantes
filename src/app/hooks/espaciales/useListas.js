import { getDepartamentos, getDistritos, getProvincias } from "@/app/services/espaciales/listas";
import { useQuery } from "@tanstack/react-query";
// get Departamentos, provincias, distritos
export const useDepartamentos = () => {
  const { isLoading, isError, data, isFetching } = useQuery(
    ["departamentos"],
    getDepartamentos
  );

  return {
    isFetching,
    isLoading,
    isError,
    data,
  };
};

export const useProvincias = (idDepartamento) => {
  const { isLoading, isError, data, isFetching } = useQuery(
    ["provincias", idDepartamento],
    () => getProvincias(idDepartamento),
    {
      enabled: !!idDepartamento, // La consulta solo se activa si idDepartamento no es null o undefined
      staleTime: 300000, // Datos considerados frescos por 5 minutos
      cacheTime: 300000, // Cache durante 5 minutos
      refetchOnWindowFocus: false, // No refetch al enfocar la ventana
      onError: (error) => {
        console.error("Error fetching provincias:", error);
      },
    }
  );

  return {
    isFetching,
    isLoading,
    isError,
    data,
  };
};

export const useDistritos = (idProvincia) => {
  const { isLoading, isError, data, isFetching } = useQuery(
    ["distritos", idProvincia],
    () => getDistritos(idProvincia),
    {
      enabled: !!idProvincia,
      staleTime: 300000,
      cacheTime: 300000,
      refetchOnWindowFocus: false,
      onError: (error) => {
        console.error("Error fetching distritos:", error);
      },
    }
  );

  return {
    isFetching,
    isLoading,
    isError,
    data,
  };
};