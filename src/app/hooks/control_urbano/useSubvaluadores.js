import { useQuery } from "@tanstack/react-query";
import { getSubvaluadoresData } from "@/app/services/subvaluadoresService";
import { getSubvaluadores } from "@/app/services/control_urbano/SubvaluadoresService";

export const useGetSubvaluadores = () => {
    const { data, error, isLoading, isError, refetch, isFetching } = useQuery(
        ["subvaluadores_data"],
        getSubvaluadoresData
    );

    return {
        data,
        error,
        isLoading,
        isError,
        refetch,
        isFetching,
    };
};