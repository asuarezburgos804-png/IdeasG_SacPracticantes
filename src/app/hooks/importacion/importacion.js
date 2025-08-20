import { getEsquemasDb } from "@/app/services/importacion/importacion";
import { useQuery } from "@tanstack/react-query";

// export const useEsquemasDb = () => {
//     const { isLoading, data, isError, isFetching, refetch } = useQuery({
//         queryKey: ["useEsquemasDb"],
//         queryFn: getEsquemasDb,
//         staleTime: 10000, // El tiempo que los datos se consideran "frescos"
//         retry: 2, // Reintentar en caso de error
//     });
//     return {
//         isFetching,
//         isLoading,
//         isError,
//         data,
//         refetch,
//     };
// };
