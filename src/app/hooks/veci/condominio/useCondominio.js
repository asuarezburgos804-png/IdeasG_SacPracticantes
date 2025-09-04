import { useQuery } from "@tanstack/react-query";

import {
    makePostRequest,
    makePatchRequest,
    makeDeleteRequest,
    makeDeleteRequestData,
    makeGetRequest,
    makePutRequest,
} from "@/utils/api/api";

import {
    fetchVivienda
} from "@/app/services/veci/condominio/fetchCondominio";

//RESIDENTE
export async function crudResidente(requestData, action) {
    try {
        let data;
        if (action === 1) {
            // Crear residente
            data = await makePostRequest("/veci/condominio/residente/registrar", requestData);
        } else if (action === 2) {
            // Actualizar residente
            data = await makePutRequest(
                "/veci/condominio/residente/actualizar/" + requestData.id_residente,
                requestData
            );
        } else if (action === 3) {
            // Eliminar residente
            data = await makeDeleteRequest(
                "/veci/condominio/residente/eliminar/" + requestData.id_residente
            );
        }
        return data;
    } catch (e) {
        throw e;
    }
}

//VIVIENDA
// CRUD VIVIENDA
export async function crudVivienda(requestData, action) {
    try {
        let data;
        if (action === 1) {
            // Registrar vivienda
            data = await makePostRequest("/veci/condominio/vivienda/registrar", requestData);
        } else if (action === 2) {
            // Actualizar vivienda
            data = await makePutRequest(
                "/veci/condominio/vivienda/actualizar/" + requestData.id_vivienda,
                requestData
            );
        } else if (action === 3) {
            // Eliminar vivienda
            data = await makeDeleteRequest(
                "/veci/condominio/vivienda/eliminar/" + requestData.id_vivienda
            );
        }
        return data;
    } catch (e) {
        throw e;
    }
}
export const useVivienda = (enabled = true) => {
    const { isLoading, isError, data, isFetching, refetch } = useQuery({
        queryKey: ["vivienda"],
        queryFn: fetchVivienda,
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


// CRUD ROLES DE VIVIENDA
export async function crudRolVivienda(requestData, action) {
    try {
        let data;
        if (action === 1) {
            // Registrar rol vivienda
            data = await makePostRequest("/veci/condominio/rolesVivienda/registrar", requestData);
        } else if (action === 2) {
            // Actualizar rol vivienda
            data = await makePutRequest(
                `/veci/condominio/rolesVivienda/actualizar/${requestData.id_rol}`,
                requestData
            );
        } else if (action === 3) {
            // Eliminar rol vivienda
            data = await makeDeleteRequest(
                `/veci/condominio/rolesVivienda/eliminar/${requestData.id_rol}`
            );
        }
        console.log("Rol vivienda response:", data);
        return data;
    } catch (e) {
        throw e;
    }
}