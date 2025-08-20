import {
    makeGetRequest,
    makePostRequest,
    makeDeleteRequest,
    makePutRequest,
} from "@/utils/api/api";
import { getFileExcel } from "@/utils/api/apiFiles";

//OBTENER DATA DE FORMULARIO DE RESIDENTE
export async function getDataFormResidente(requestData) {
    try {
        const data = await makePostRequest(
            "/veci/condominio/formularioResidente/obtener",
            requestData // { id_vivienda, id_residente }
        );
        return data;
    } catch (e) {
        throw e;
    }
}

export async function getEstadoResidente() {
    try {
        const data = await makePostRequest(
            "/veci/maestros/estadoResidente"
        );
        return data;
    } catch (e) {
        throw e;
    }
}

//OBTENER ECONTENO DE RESIDENTES
export async function getConteoResidentes() {
    try {
        const data = await makeGetRequest(
            "/veci/condominio/residente/conteoResidentes"
        );
        return data;
    } catch (e) {
        throw e;
    }
}

export async function getListadoResidentes() {
    try {
        const data = await makeGetRequest(
            "/veci/condominio/residente/listar/tipo"
        );
        return data;
    } catch (e) {
        throw e;
    }
}

export async function getListadoPorTipo() {
    try {
        const data = await makeGetRequest(
            "/veci/condominio/residente/listar/tipo"
        );
        return data;
    } catch (e) {
        throw e;
    }
}

//RESIDENTE
export async function postResidente(requestData) {
    try {
        const data = await makePostRequest(
            "/veci/condominio/residente/registrar",
            requestData
        );
        console.log(data);
        return data;
    } catch (e) {
        throw e;
    }
}
export async function putResidente(
    requestData,
    id_residente
) {
    try {
        const data = await makePutRequest(
            "/veci/condominio/residente/actualizar/" + id_residente,
            requestData
        );
        return data;
    } catch (e) {
        throw e;
    }
}

export async function deleteResidente(id_residente) {
    try {
        const data = await makeDeleteRequest(
            "/veci/condominio/residente/eliminar/" + id_residente
        );
        return data;
    } catch (e) {
        throw e;
    }
}

//OBTENER DATA DE FORMULARIO DE RESIDENTE
export async function getResidente(id_residente) {
    try {
        const data = await makeGetRequest(
            "/veci/condominio/residente/obtener/" + id_residente
        );
        return data;
    } catch (e) {
        throw e;
    }
}

//Dar baja residente
export async function putBajaResidente(id_residente) {
    try {
        const data = await makePutRequest(
            "/veci/condominio/residente/darBaja/" + id_residente
        );
        console.log("Service actualizar:", data);
        return data;
    } catch (e) {
        throw e;
    }
}

//VIVIENDA
export async function postVivienda(requestData) {
    try {
        const data = await makePostRequest(
            "/veci/condominio/vivienda/registrar",
            requestData
        );
        console.log(data);
        return data;
    } catch (e) {
        throw e;
    }
}

export async function putVivienda(
    requestData,
    id_vivienda
) {
    try {
        const data = await makePutRequest(
            "/veci/condominio/vivienda/actualizar/" + id_vivienda,
            requestData
        );
        return data;
    } catch (e) {
        throw e;
    }
}

export async function deleteVivienda(id_vivienda) {
    try {
        const data = await makeDeleteRequest(
            "/veci/condominio/vivienda/eliminar/" + id_vivienda
        );
        return data;
    } catch (e) {
        throw e;
    }
}

//ROL VIVIENDA
export async function postRolVivienda(requestData) {
    try {
        const data = await makePostRequest(
            "/veci/condominio/rolesVivienda/registrar",
            requestData
        );
        console.log(data);
        return data;
    } catch (e) {
        throw e;
    }
}
export async function putRolVivienda(
    requestData,
    id_rol
) {
    try {
        const data = await makePutRequest(
            "/veci/condominio/rolesVivienda/actualizar/" + id_rol,
            requestData
        );
        return data;
    } catch (e) {
        throw e;
    }
}

export async function deleteRolVivienda(id_rol) {
    try {
        const data = await makeDeleteRequest(
            "/veci/condominio/rolesVivienda/eliminar/" + id_rol
        );
        return data;
    } catch (e) {
        throw e;
    }
}

//PROPIETARIO
export async function postPropietario(requestData) {
    try {
        const data = await makePostRequest(
            "/veci/condominio/propietario/registrar",
            requestData
        );
        console.log("Service registrar:", data);
        return data;
    } catch (e) {
        throw e;
    }
}

export async function putPropietario(requestData) {
    try {
        const data = await makePutRequest(
            "/veci/condominio/propietario/actualizar",
            requestData
        );
        console.log("Service actualizar:", data);
        return data;
    } catch (e) {
        throw e;
    }
}

export async function putBajaPropietario(id_residente) {
    try {
        const data = await makePutRequest(
            "/veci/condominio/propietario/darBaja/" + id_residente
        );
        return data;
    } catch (e) {
        throw e;
    }
}

export async function deletePropietario(id_residente) {
    try {
        const data = await makeDeleteRequest(
            "/veci/condominio/propietario/eliminar/" + id_residente
        );
        return data;
    } catch (e) {
        throw e;
    }
}

//ARRENDATARIO
export async function postArrendatario(requestData) {
    try {
        const data = await makePostRequest(
            "/veci/condominio/arrendatario/registrar",
            requestData
        );
        console.log("Service registrar:", data);
        return data;
    } catch (e) {
        throw e;
    }
}

export async function putArrendatario(requestData, id_residente) {
    try {
        console.log("Service putArrendatario, id residente:", id_residente);
        const data = await makePutRequest(
            "/veci/condominio/arrendatario/actualizar/" + id_residente,
            requestData
        );

        console.log("Service actualizar:", data);
        return data;
    } catch (e) {
        throw e;
    }
}

export async function deleteArrendatario(id_residente) {
    try {
        const data = await makeDeleteRequest(
            "/veci/condominio/arrendatario/eliminar/" + id_residente
        );
        return data;
    } catch (e) {
        throw e;
    }
}

//FAMILIAR
export async function postFamiliar(requestData) {
    try {
        const data = await makePostRequest(
            "/veci/condominio/familiar/registrar",
            requestData
        );
        console.log("Service registrar:", data);
        return data;
    } catch (e) {
        throw e;
    }
}
// export async function putFamiliar(
//     requestData,
//     id_familiar
// ) {
//     try {
//         const data = await makePutRequest(
//             "/veci/condominio/familiar/actualizar/" + id_familiar,
//             requestData
//         );
//         console.log("Service actualizar:", data);
//         return data;
//     } catch (e) {
//         throw e;
//     }
// }

export async function putFamiliar(requestData, id_familiar) {
    try {
        console.log("Service putFamiliar, id familiar:", id_familiar);
        const data = await makePutRequest(
            "/veci/condominio/familiar/actualizar/" + id_familiar,
            requestData
        );

        console.log("Service actualizar:", data);
        return data;
    } catch (e) {
        throw e;
    }
}

export async function deleteFamiliar(id_familiar) {
    try {
        const data = await makeDeleteRequest(
            "/veci/condominio/familiar/eliminar/" + id_familiar
        );
        return data;
    } catch (e) {
        throw e;
    }
}

//VEHÍCULO
export async function postVehiculo(requestData) {
    try {
        const data = await makePostRequest(
            "/veci/condominio/vehiculo/registrar",
            requestData
        );
        console.log("Service registrar:", data);
        return data;
    } catch (e) {
        throw e;
    }
}
export async function putVehiculo(
    requestData,
    id_vehiculo
) {
    try {
        const data = await makePutRequest(
            "/veci/condominio/vehiculo/actualizar/" + id_vehiculo,
            requestData
        );
        console.log("Service actualizar:", data);
        return data;
    } catch (e) {
        throw e;
    }
}

export async function deleteVehiculo(id_vehiculo) {
    try {
        const data = await makeDeleteRequest(
            "/veci/condominio/vehiculo/eliminar/" + id_vehiculo
        );
        return data;
    } catch (e) {
        throw e;
    }
}

//MASCOTA
export async function postMascota(requestData) {
    try {
        const data = await makePostRequest(
            "/veci/condominio/mascota/registrar",
            requestData
        );
        console.log("Service registrar:", requestData);
        return data;
    } catch (e) {
        throw e;
    }
}
export async function putMascota(
    requestData,
    id_mascota
) {
    try {
        const data = await makePutRequest(
            "/veci/condominio/mascota/actualizar/" + id_mascota,
            requestData
        );
        console.log("Service actualizar:", data);
        return data;
    } catch (e) {
        throw e;
    }
}

export async function deleteMascota(id_mascota) {
    try {
        const data = await makeDeleteRequest(
            "/veci/condominio/mascota/eliminar/" + id_mascota
        );
        return data;
    } catch (e) {
        throw e;
    }
}

export async function postValidarCruceHorario(requestData) {
    try {
        const data = await makePostRequest(
            "/veci/areasComunes/horario/verificar-cruce",
            requestData
        );
        console.log("Service cruce horario:", data);
        return data;
    } catch (e) {
        throw e;
    }
}

export async function exportarIngresos(formato) {
  try {
    const data = await getFileExcel(
      "/veci/tesoreria/ingreso/exportar?formato=" + formato
    );
    console.log("Excel:" , data);
  } catch (e) {
    throw e;
  }
}

export async function exportarEgresos(formato) {
  try {
    const data = await getFileExcel(
      "/veci/tesoreria/ingreso/exportar?formato=" + formato
    );
    // return data;
  } catch (e) {
    throw e;
  }
}