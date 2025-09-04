import { useMutation, useQuery } from "@tanstack/react-query";
import {
    getDataFormResidente,
    postResidente,
    putResidente,
    deleteResidente,
    postVivienda,
    putVivienda,
    deleteVivienda,
    postRolVivienda,
    putRolVivienda,
    deleteRolVivienda,
    postPropietario,
    putPropietario,
    deletePropietario,
    putBajaPropietario,
    postArrendatario,
    putArrendatario,
    deleteArrendatario,
    postFamiliar,
    putFamiliar,
    deleteFamiliar,
    postVehiculo,
    putVehiculo,
    deleteVehiculo,
    postMascota,
    putMascota,
    deleteMascota,
    postValidarCruceHorario
} from "@/app/services/veci/condominio/servicios";

// Obtener datos del formulario del Residente
export const useGetDataFormResidente = (requestData) => {
    const { data, error, isLoading, isError, refetch } = useQuery(
        ["formularioResidente", requestData?.id_vivienda, requestData?.id_residente],
        () => getDataFormResidente(requestData),
        {
            enabled: !!requestData?.id_vivienda && !!requestData?.id_residente,
        }
    );

    return {
        refetch,
        data,
        error,
        isLoading,
        isError,
    };
};

//SERVICIOS PARA PROPIETARIO
export const useRegisterPropietario = () => {
    const { mutateAsync, isLoading, isError, data, error } = useMutation(postPropietario);

    const registerPropietario = async (requestData) => {
        try {
            const response = await mutateAsync(requestData);
            return response; // Ahora sí devuelve el JSON de respuesta
        } catch (err) {
            throw err;
        }
    };

    return {
        registerPropietario,
        isLoading,
        isError,
        data,
        error,
    };
};

export const useUpdatePropietario = () => {
    const { mutateAsync, isLoading, isError, data, error } = useMutation(
        (requestData) => putPropietario(requestData)
    );

    const updatePropietario = async (requestData) => {
        return await mutateAsync(requestData);
    };

    return {
        updatePropietario,
        isLoading,
        isError,
        data,
        error,
    };
};

export const useDeletePropietario = () => {
    const { mutateAsync, isLoading, isError, data, error } = useMutation(deletePropietario);

    const eliminarPropietario = async (id_residente) => {
        return await mutateAsync(id_residente);
    };

    return {
        eliminarPropietario,
        isLoading,
        isError,
        data,
        error,
    };
};

export const useDarBajaPropietario = () => {
    const { mutate, isLoading, isError, data, error } = useMutation(
        (id_residente) => putBajaPropietario(id_residente) // Solo se pasa el id_residente
    );

    const darBajaPropietario = (id_residente) => {
        mutate(id_residente);
    };

    return {
        darBajaPropietario,
        isLoading,
        isError,
        data,
        error,
    };
};

// //SERVICIOS PARA ARRENDATARIO
// export const useRegisterArrendatario = () => {
//     const { mutateAsync, isLoading, isError, data, error } = useMutation(postArrendatario);

//     const registerArrendatario = async (requestData) => {
//         try {
//             const response = await mutateAsync(requestData);
//             return response;
//         } catch (err) {
//             throw err;
//         }
//     };

//     return {
//         registerArrendatario,
//         isLoading,
//         isError,
//         data,
//         error,
//     };
// };

// Servicio para registrar arrendatario
export const useRegisterArrendatario = () => {
    const mutation = useMutation(postArrendatario);

    const registerArrendatario = async (requestData) => {
        try {
            const response = await mutation.mutateAsync(requestData);
            return response;
        } catch (error) {
            throw error;
        }
    };

    return {
        registerArrendatario,
        isLoading: mutation.isLoading,
        isError: mutation.isError,
        data: mutation.data,
        error: mutation.error,
    };
};

export const useUpdateArrendatario = () => {
    const mutation = useMutation(
        ({ requestData, id_residente }) => putArrendatario(requestData, id_residente)
    );

    const updateArrendatario = async ({ requestData, id_residente }) => {
        try {
            const response = await mutation.mutateAsync({ requestData, id_residente });
            return response;
        } catch (error) {
            throw error;
        }
    };

    return {
        updateArrendatario,
        isLoading: mutation.isLoading,
        isError: mutation.isError,
        data: mutation.data,
        error: mutation.error,
    };
};

// export const useDeleteArrendatario = () => {
//     const { mutateAsync, isLoading, isError, data, error } = useMutation(deleteArrendatario);

//     const eliminarArrendatario = async (id_residente) => {
//         return await mutateAsync(id_residente);
//     };

//     return {
//         eliminarArrendatario,
//         isLoading,
//         isError,
//         data,
//         error,
//     };
// };

export const useDeleteArrendatario = () => {
    const mutation = useMutation(deleteArrendatario);

    const eliminarArrendatario = async (id_residente) => {
        try {
            const response = await mutation.mutateAsync(id_residente);
            return response;
        } catch (error) {
            throw error;
        }
    };

    return {
        eliminarArrendatario,
        isLoading: mutation.isLoading,
        isError: mutation.isError,
        data: mutation.data,
        error: mutation.error,
    };
};

//SERVICIOS PARA FAMILIAR
export const useRegisterFamiliar = () => {
    const mutation = useMutation(postFamiliar);

    const registerFamiliar = async (requestData) => {
        try {
            const response = await mutation.mutateAsync(requestData);
            return response;
        } catch (error) {
            throw error;
        }
    };

    return {
        registerFamiliar,
        isLoading: mutation.isLoading,
        isError: mutation.isError,
        data: mutation.data,
        error: mutation.error,
    };
};

export const useUpdateFamiliar = () => {
    const mutation = useMutation(
        ({ requestData, id_familiar }) => putFamiliar(requestData, id_familiar)
    );

    const updateFamiliar = async ({ requestData, id_familiar }) => {
        try {
            const response = await mutation.mutateAsync({ requestData, id_familiar });
            return response;
        } catch (error) {
            throw error;
        }
    };

    return {
        updateFamiliar,
        isLoading: mutation.isLoading,
        isError: mutation.isError,
        data: mutation.data,
        error: mutation.error,
    };
};

export const useDeleteFamiliar = () => {
    const mutation = useMutation(deleteFamiliar);

    const eliminarFamiliar = async (id_residente) => {
        try {
            const response = await mutation.mutateAsync(id_residente);
            return response;
        } catch (error) {
            throw error;
        }
    };

    return {
        eliminarFamiliar,
        isLoading: mutation.isLoading,
        isError: mutation.isError,
        data: mutation.data,
        error: mutation.error,
    };
};

//SERVICIOS PARA VEHICULO
export const useRegisterVehiculo = () => {
    const mutation = useMutation(postVehiculo);

    const registerVehiculo = async (requestData) => {
        try {
            const response = await mutation.mutateAsync(requestData);
            return response;
        } catch (error) {
            throw error;
        }
    };

    return {
        registerVehiculo,
        isLoading: mutation.isLoading,
        isError: mutation.isError,
        data: mutation.data,
        error: mutation.error,
    };
};

export const useUpdateVehiculo = () => {
    const mutation = useMutation(
        ({ requestData, id_vehiculo }) => putVehiculo(requestData, id_vehiculo)
    );

    const updateVehiculo = async ({ requestData, id_vehiculo }) => {
        try {
            const response = await mutation.mutateAsync({ requestData, id_vehiculo });
            return response;
        } catch (error) {
            throw error;
        }
    };

    return {
        updateVehiculo,
        isLoading: mutation.isLoading,
        isError: mutation.isError,
        data: mutation.data,
        error: mutation.error,
    };
};

export const useDeleteVehiculo = () => {
    const mutation = useMutation(deleteVehiculo);

    const eliminarVehiculo = async (id_vehiculo) => {
        try {
            const response = await mutation.mutateAsync(id_vehiculo);
            return response;
        } catch (error) {
            throw error;
        }
    };

    return {
        eliminarVehiculo,
        isLoading: mutation.isLoading,
        isError: mutation.isError,
        data: mutation.data,
        error: mutation.error,
    };
};


//SERVICIOS PARA MASCOTA
export const useRegisterMascota = () => {
    const mutation = useMutation(postMascota);

    const registerMascota = async (requestData) => {
        try {
            const response = await mutation.mutateAsync(requestData);
            return response;
        } catch (error) {
            throw error;
        }
    };

    return {
        registerMascota,
        isLoading: mutation.isLoading,
        isError: mutation.isError,
        data: mutation.data,
        error: mutation.error,
    };
};

export const useUpdateMascota = () => {
    const mutation = useMutation(
        ({ requestData, id_mascota }) => putMascota(requestData, id_mascota)
    );

    const updateMascota = async ({ requestData, id_mascota }) => {
        try {
            const response = await mutation.mutateAsync({ requestData, id_mascota });
            return response;
        } catch (error) {
            throw error;
        }
    };

    return {
        updateMascota,
        isLoading: mutation.isLoading,
        isError: mutation.isError,
        data: mutation.data,
        error: mutation.error,
    };
};

export const useDeleteMascota = () => {
    const mutation = useMutation(deleteMascota);

    const eliminarMascota = async (id_mascota) => {
        try {
            const response = await mutation.mutateAsync(id_mascota);
            return response;
        } catch (error) {
            throw error;
        }
    };

    return {
        eliminarMascota,
        isLoading: mutation.isLoading,
        isError: mutation.isError,
        data: mutation.data,
        error: mutation.error,
    };
};

export const useValidarCruceHorario = () => {
    const { mutateAsync, isLoading, isError, data, error } = useMutation(postValidarCruceHorario);

    const cruceHorario = async (requestData) => {
        try {
            const response = await mutateAsync(requestData);
            return response; // Ahora sí devuelve el JSON de respuesta
        } catch (err) {
            throw err;
        }
    };

    return {
        cruceHorario,
        isLoading,
        isError,
        data,
        error,
    };
};


// // RESIDENTE
// export const useRegisterResidente = () => {
//     const { mutate, isLoading, isError, data, error } = useMutation(postResidente);
//     const registerResidente = (requestData) => {
//         mutate(requestData);
//     };
//     return {
//         registerResidente,
//         isLoading,
//         isError,
//         data,
//         error,
//     };
// };

// export const useUpdateResidente = () => {
//     const { mutate, isLoading, isError, data, error } = useMutation(
//         ({ requestData, id_residente }) => putResidente(requestData, id_residente)
//     );
//     const updateResidente = (requestData, id_residente) => {
//         mutate({ requestData, id_residente });
//     };
//     return {
//         updateResidente,
//         isLoading,
//         isError,
//         data,
//         error,
//     };
// };

// export const useDeleteResidente = () => {
//     const { mutate, isLoading, isError, data, error } = useMutation(deleteResidente);
//     const eliminarResidente = (id_residente) => {
//         mutate(id_residente);
//     };
//     return {
//         eliminarResidente,
//         isLoading,
//         isError,
//         data,
//         error,
//     };
// };

// //VIVIENDA
// export const useRegisterVivienda = () => {
//     const { mutate, isLoading, isError, data, error } = useMutation(postVivienda);
//     const registerVivienda = (requestData) => {
//         mutate(requestData);
//     };
//     return {
//         registerVivienda,
//         isLoading,
//         isError,
//         data,
//         error,
//     };
// };

// export const useUpdateVivienda = () => {
//     const { mutate, isLoading, isError, data, error } = useMutation(
//         ({ requestData, id_vivienda }) => putVivienda(requestData, id_vivienda)
//     );
//     const updateVivienda = (requestData, id_vivienda) => {
//         mutate({ requestData, id_vivienda });
//     };
//     return {
//         updateVivienda,
//         isLoading,
//         isError,
//         data,
//         error,
//     };
// };

// export const useDeleteVivienda = () => {
//     const { mutate, isLoading, isError, data, error } = useMutation(deleteVivienda);
//     const eliminarVivienda = (id_vivienda) => {
//         mutate(id_vivienda);
//     };
//     return {
//         eliminarVivienda,
//         isLoading,
//         isError,
//         data,
//         error,
//     };
// };

// //ROL VIVIENDA
// export const useRegisterRolVivienda = () => {
//     const { mutate, isLoading, isError, data, error } = useMutation(postRolVivienda);
//     const registerRolVivienda = (requestData) => {
//         mutate(requestData);
//     };
//     return {
//         registerRolVivienda,
//         isLoading,
//         isError,
//         data,
//         error,
//     };
// };

// export const useUpdateRolVivienda = () => {
//     const { mutate, isLoading, isError, data, error } = useMutation(
//         ({ requestData, id_rol }) => putRolVivienda(requestData, id_rol)
//     );
//     const updateRolVivienda = (requestData, id_rol) => {
//         mutate({ requestData, id_rol });
//     };
//     return {
//         updateRolVivienda,
//         isLoading,
//         isError,
//         data,
//         error,
//     };
// };

// export const useDeleteRolVivienda = () => {
//     const { mutate, isLoading, isError, data, error } = useMutation(deleteRolVivienda);
//     const eliminarRolVivienda = (id_rol) => {
//         mutate(id_rol);
//     };
//     return {
//         eliminarRolVivienda,
//         isLoading,
//         isError,
//         data,
//         error,
//     };
// };
