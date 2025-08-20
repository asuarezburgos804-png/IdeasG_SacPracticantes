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
  fetchEstadoResidente,
  fetchParentesco,
  fetchJuntaVecinal,
  fetchTipoMascota,
  fetchTipoResidente,
  fetchTipoVehiculo,
  fetchEstadoArea,
  fetchTipoArea,
  fetchModoUso,
  fetchRequisitoAcceso,
  fetchAreaComun,
  fetchAreaEstadisticas,
  fetchDiaSemana,
  fetchHorario,
  fetchTipoPartida,
  fetchPartida,
  fetchPartidaDadoTipo,
  fetchMes,
  fetchMetodoPago,
  fetchAnio,
  fetchProveedor,
  fetchUnidadMedida
} from "@/app/services/veci/maestros/maestrosVeci";

import { getListadoResidentes, getListadoPorTipo } from "@/app/services/veci/condominio/servicios";

// Estado Residente
export const useEstadoResidente = () => {
  const { isLoading, isError, data, isFetching, refetch } = useQuery({
    queryKey: ["estadoResidente"],
    queryFn: fetchEstadoResidente,
  });
  return {
    isLoading,
    isError,
    data,
    isFetching,
    refetch,
  };
};

export async function crudEstadoResidente(requestData, action) {
  try {
    let data;
    if (action === 0) {
      data = await makePostRequest(
        "/veci/maestros/estadoResidente",
        requestData
      );
    } else if (action === 2) {
      data = await makePutRequest(
        "/veci/maestros/estadoResidente/" + requestData.id_estado_residente,
        requestData
      );
    } else if (action === 3) {
      data = await makeDeleteRequest(
        "/veci/maestros/estadoResidente/" + requestData.id_estado_residente
      );
    }
    return data;
  } catch (e) {
    throw e;
  }
}

// Junta Vecinal
export const useJuntaVecinal = (enabled = true) => {
  const { isLoading, isError, data, isFetching, refetch } = useQuery({
    queryKey: ["juntaVecinal"],
    queryFn: fetchJuntaVecinal,
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

export async function crudJuntaVecinal(requestData, action) {
  try {
    let data;
    if (action === 0) {
      data = await makePostRequest("/veci/maestros/juntaVecinal", requestData);
    } else if (action === 2) {
      data = await makePutRequest(
        "/veci/maestros/juntaVecinal/" + requestData.id_junta_vencinal,
        requestData
      );
    } else if (action === 3) {
      data = await makeDeleteRequest(
        "/veci/maestros/juntaVecinal/" + requestData.id_junta_vencinal
      );
    }
    return data;
  } catch (e) {
    throw e;
  }
}

// Parentesco
export const useParentesco = () => {
  const { isLoading, isError, data, isFetching, refetch } = useQuery({
    queryKey: ["tipoParentesco"],
    queryFn: fetchParentesco,
  });
  return {
    isLoading,
    isError,
    data,
    isFetching,
    refetch,
  };
};

export async function crudParentesco(requestData, action) {
  try {
    let data;
    if (action === 0) {
      data = await makePostRequest("/veci/maestros/parentesco", requestData);
    } else if (action === 2) {
      data = await makePutRequest(
        "/veci/maestros/parentesco/" + requestData.id_parentesco,
        requestData
      );
    } else if (action === 3) {
      data = await makeDeleteRequest(
        "/veci/maestros/parentesco/" + requestData.id_parentesco
      );
    }
    return data;
  } catch (e) {
    throw e;
  }
}

// Tipo de mascota
export const useTipoMascota = () => {
  const { isLoading, isError, data, isFetching, refetch } = useQuery({
    queryKey: ["tipoMascota"],
    queryFn: fetchTipoMascota,
  });
  return {
    isLoading,
    isError,
    data,
    isFetching,
    refetch,
  };
};

export async function crudTipoMascota(requestData, action) {
  try {
    let data;
    if (action === 0) {
      data = await makePostRequest("/veci/maestros/tipoMascota", requestData);
    } else if (action === 2) {
      data = await makePutRequest(
        "/veci/maestros/tipoMascota/" + requestData.id_tipo_mascota,
        requestData
      );
    } else if (action === 3) {
      data = await makeDeleteRequest(
        "/veci/maestros/tipoMascota/" + requestData.id_tipo_mascota
      );
    }
    return data;
  } catch (e) {
    throw e;
  }
}

// Tipo Residente
export const useTipoResidente = () => {
  const { isLoading, isError, data, isFetching, refetch } = useQuery({
    queryKey: ["tipoResidente"],
    queryFn: fetchTipoResidente,
  });
  return {
    isLoading,
    isError,
    data,
    isFetching,
    refetch,
  };
};

export async function crudTipoResidente(requestData, action) {
  try {
    let data;
    if (action === 0) {
      data = await makePostRequest("/veci/maestros/tipoResidente", requestData);
    } else if (action === 2) {
      data = await makePutRequest(
        "/veci/maestros/tipoResidente/" + requestData.id_tipo_residente,
        requestData
      );
    } else if (action === 3) {
      data = await makeDeleteRequest(
        "/veci/maestros/tipoResidente/" + requestData.id_tipo_residente
      );
    }
    return data;
  } catch (e) {
    throw e;
  }
}

// Tipo Vehículo
export const useTipoVehiculo = () => {
  const { isLoading, isError, data, isFetching, refetch } = useQuery({
    queryKey: ["tipoVehiculo"],
    queryFn: fetchTipoVehiculo,
  });
  return {
    isLoading,
    isError,
    data,
    isFetching,
    refetch,
  };
};

export async function crudTipoVehiculo(requestData, action) {
  try {
    let data;
    if (action === 0) {
      data = await makePostRequest("/veci/maestros/tipoVehiculo", requestData);
    } else if (action === 2) {
      data = await makePutRequest(
        "/veci/maestros/tipoVehiculo/" + requestData.id_tipo_vehiculo,
        requestData
      );
    } else if (action === 3) {
      data = await makeDeleteRequest(
        "/veci/maestros/tipoVehiculo/" + requestData.id_tipo_vehiculo
      );
    }
    return data;
  } catch (e) {
    throw e;
  }
}

// Estado Área
export const useEstadoArea = (enabled = true) => {
  const { isLoading, isError, data, isFetching, refetch } = useQuery({
    queryKey: ["estadoArea"],
    queryFn: fetchEstadoArea,
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

export async function crudEstadoArea(requestData, action) {
  try {
    let data;
    if (action === 0) {
      data = await makePostRequest("/veci/maestros/estadoArea", requestData);
    } else if (action === 2) {
      data = await makePutRequest(
        "/veci/maestros/estadoArea/" + requestData.id_estado,
        requestData
      );
    } else if (action === 3) {
      data = await makeDeleteRequest(
        "/veci/maestros/estadoArea/" + requestData.id_estado
      );
    }
    return data;
  } catch (e) {
    throw e;
  }
}

// Tipo Área
export const useTipoArea = (enabled = true) => {
  const { isLoading, isError, data, isFetching, refetch } = useQuery({
    queryKey: ["tipoArea"],
    queryFn: fetchTipoArea,
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

export async function crudTipoArea(requestData, action) {
  try {
    let data;
    if (action === 0) {
      data = await makePostRequest("/veci/maestros/tipoArea", requestData);
    } else if (action === 2) {
      data = await makePutRequest(
        "/veci/maestros/tipoArea/" + requestData.id_tipo_area,
        requestData
      );
    } else if (action === 3) {
      data = await makeDeleteRequest(
        "/veci/maestros/tipoArea/" + requestData.id_tipo_area
      );
    }
    return data;
  } catch (e) {
    throw e;
  }
}

// Modo Uso
export const useModoUso = (enabled = true) => {
  const { isLoading, isError, data, isFetching, refetch } = useQuery({
    queryKey: ["modoUso"],
    queryFn: fetchModoUso,
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

export async function crudModoUso(requestData, action) {
  try {
    let data;
    if (action === 0) {
      data = await makePostRequest("/veci/maestros/modoUso", requestData);
    } else if (action === 2) {
      data = await makePutRequest(
        "/veci/maestros/modoUso/" + requestData.id_modo_uso,
        requestData
      );
    } else if (action === 3) {
      data = await makeDeleteRequest(
        "/veci/maestros/modoUso/" + requestData.id_modo_uso
      );
    }
    return data;
  } catch (e) {
    throw e;
  }
}

// Requisito Acceso
export const useRequisitoAcceso = (enabled = true) => {
  const { isLoading, isError, data, isFetching, refetch } = useQuery({
    queryKey: ["requisitoAcceso"],
    queryFn: fetchRequisitoAcceso,
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

export async function crudRequisitoAcceso(requestData, action) {
  try {
    let data;
    if (action === 0) {
      data = await makePostRequest(
        "/veci/maestros/requisitoAcceso",
        requestData
      );
    } else if (action === 2) {
      data = await makePutRequest(
        "/veci/maestros/requisitoAcceso/" + requestData.id_requisito,
        requestData
      );
    } else if (action === 3) {
      data = await makeDeleteRequest(
        "/veci/maestros/requisitoAcceso/" + requestData.id_requisito
      );
    }
    return data;
  } catch (e) {
    throw e;
  }
}

// Área Común
export const useAreaComun = (enabled = true) => {
  const { isLoading, isError, data, isFetching, refetch } = useQuery({
    queryKey: ["areaComun"],
    queryFn: fetchAreaComun,
    enabled,
  });
  return {
    isFetching,
    isLoading,
    isError,
    data,
    refetch,
  };
};

export const useAreaComunEstadisticas = (enabled = true) => {
  const { isLoading, isError, data, isFetching, refetch } = useQuery({
    queryKey: ["areaComunEstadisticas"],
    queryFn: fetchAreaEstadisticas,
    enabled,
  });
  return {
    isFetching,
    isLoading,
    isError,
    data,
    refetch,
  };
};

export async function crudAreaComun(requestData, action) {
  try {
    let data;
    if (action === 0) {
      data = await makePostRequest(
        "/veci/areasComunes/areaComun/registrar",
        requestData
      );
    } else if (action === 1) {
      data = await makePutRequest(
        "/veci/areasComunes/areaComun/actualizar/" + requestData.id_area_comun,
        requestData
      );
    } else if (action === 2) {
      data = await makeDeleteRequest(
        "/veci/areasComunes/areaComun/eliminar/" + requestData.id_area_comun
      );
    }
    return data;
  } catch (e) {
    throw e;
  }
}

export const useDiaSemana = (enabled = true) => {
  const { isLoading, isError, data, isFetching, refetch } = useQuery({
    queryKey: ["diaSemana"],
    queryFn: fetchDiaSemana,
    enabled,
  });
  return {
    isFetching,
    isLoading,
    isError,
    data,
    refetch,
  };
};

export const useHorario = (enabled = true) => {
  const { isLoading, isError, data, isFetching, refetch } = useQuery({
    queryKey: ["horario"],
    queryFn: fetchHorario,
    enabled,
  });
  return {
    isFetching,
    isLoading,
    isError,
    data,
    refetch,
  };
};

export async function crudHorario(requestData, action) {
  try {
    let response;
    if (action === 0) {
      // Crear
      response = await makePostRequest(
        "/veci/areasComunes/horario/registrar",
        requestData
      );
    } else if (action === 1) {
      // Actualizar
      response = await makePutRequest(
        `/veci/areasComunes/horario/actualizar/${requestData.id_horario}`,
        requestData
      );
    } else if (action === 2) {
      // Eliminar
      response = await makeDeleteRequest(
        `/veci/areasComunes/horario/eliminar/${requestData.id_horario}`
      );
    } else {
      throw new Error("Invalid action provided");
    }

    // console.log("Respuesta de la API en crudHorario:", response); // Depuración
    if (response?.status === "error") {
      return { success: false, error: response }; // Manejo de error de cruce
    }
    return { success: true, data: response.data || response }; // Respuesta exitosa
  } catch (error) {
    console.error("Error en crudHorario:", error.message, error);
    return { success: false, error: error.response?.data || error.message };
  }
}

export const useTipoPartida = () => {
  const { isLoading, isError, data, isFetching, refetch } = useQuery({
    queryKey: ["tipoPartida"],
    queryFn: fetchTipoPartida,
  });
  return {
    isFetching,
    isLoading,
    isError,
    data,
    refetch,
  };
};

// Hook for fetchPartida
export const usePartida = () => {
  const { isLoading, isError, data, isFetching, refetch } = useQuery({
    queryKey: ["partida"],
    queryFn: fetchPartida,
  });
  return {
    isFetching,
    isLoading,
    isError,
    data,
    refetch,
  };
};

export const usePartidaDadoTipo = (id_tipo_partida, enabled = true) => {
  const { isLoading, isError, data, isFetching, refetch } = useQuery({
    queryKey: ["partidaDadoTipo", id_tipo_partida],
    queryFn: () => fetchPartidaDadoTipo(id_tipo_partida),
    enabled,
  });
  return {
    isFetching,
    isLoading,
    isError,
    data,
    refetch,
  };
};

export const useMes = () => {
  const { isLoading, isError, data, isFetching, refetch } = useQuery({
    queryKey: ["mes"],
    queryFn: fetchMes,
  });
  return {
    isFetching,
    isLoading,
    isError,
    data,
    refetch,
  };
};

export const useAnio = () => {
  const { isLoading, isError, data, isFetching, refetch } = useQuery({
    queryKey: ["anio"],
    queryFn: fetchAnio,
  });
  return {
    isFetching,
    isLoading,
    isError,
    data,
    refetch,
  };
};

export const useProveedor = () => {
  const { isLoading, isError, data, isFetching, refetch } = useQuery({
    queryKey: ["proveedor"],
    queryFn: fetchProveedor,
  });
  return {
    isFetching,
    isLoading,
    isError,
    data,
    refetch,
  };
};

export const useMetodoPago = () => {
  const { isLoading, isError, data, isFetching, refetch } = useQuery({
    queryKey: ["metodoPago"],
    queryFn: fetchMetodoPago,
  });
  return {
    isFetching,
    isLoading,
    isError,
    data,
    refetch,
  };
};

export const useUnidadMedida = () => {
  const { isLoading, isError, data, isFetching, refetch } = useQuery({
    queryKey: ["unidadMedida"],
    queryFn: fetchUnidadMedida,
  });
  return {
    isFetching,
    isLoading,
    isError,
    data,
    refetch,
  };
};


export async function crudTipoPartida(requestData, action) {
  try {
    let data;
    if (action === 0) {
      data = await makePostRequest("/veci/maestros/tipoPartida", requestData);
    } else if (action === 1) {
      data = await makePutRequest(
        "/veci/maestros/tipoPartida/" + requestData.id_tipoPartida,
        requestData
      );
    } else if (action === 2) {
      data = await makeDeleteRequest(
        "/veci/maestros/tipoPartida/" + requestData.id_tipoPartida
      );
    }
    return data;
  } catch (e) {
    throw e;
  }
}

export async function crudPartida(requestData, action) {
  try {
    let data;
    if (action === 0) {
      data = await makePostRequest("/veci/maestros/partida", requestData);
    } else if (action === 2) {
      data = await makePutRequest(
        "/veci/maestros/partida/" + requestData.id_partida,
        requestData
      );
    } else if (action === 3) {
      data = await makeDeleteRequest(
        "/veci/maestros/partida/" + requestData.id_partida
      );
    }
    return data;
  } catch (e) {
    throw e;
  }
}

export async function crudMes(requestData, action) {
  try {
    let data;
    if (action === 0) {
      data = await makePostRequest("/veci/maestros/mes", requestData);
    } else if (action === 1) {
      data = await makePutRequest(
        "/veci/maestros/mes/" + requestData.id_mes,
        requestData
      );
    } else if (action === 2) {
      data = await makeDeleteRequest(
        "/veci/maestros/mes/" + requestData.id_mes
      );
    }
    return data;
  } catch (e) {
    throw e;
  }
}

export async function crudMetodoPago(requestData, action) {
  try {
    let data;
    if (action === 0) {
      data = await makePostRequest("/veci/maestros/metodoPago", requestData);
    } else if (action === 2) {
      data = await makePutRequest(
        "/veci/maestros/metodoPago/" + requestData.id_metodoPago,
        requestData
      );
    } else if (action === 3) {
      data = await makeDeleteRequest(
        "/veci/maestros/metodoPago/" + requestData.id_metodoPago
      );
    }
    return data;
  } catch (e) {
    throw e;
  }
}

export async function crudAnio(requestData, action) {
  try {
    let data;
    if (action === 0) {
      data = await makePostRequest("/veci/maestros/anio", requestData);
    } else if (action === 2) {
      data = await makePutRequest(
        "/veci/maestros/anio/" + requestData.id_metodoPago,
        requestData
      );
    } else if (action === 3) {
      data = await makeDeleteRequest(
        "/veci/maestros/anio/" + requestData.id_metodoPago
      );
    }
    return data;
  } catch (e) {
    throw e;
  }
}

export async function crudProveedor(requestData, action) {
  try {
    let data;
    if (action === 0) {
      data = await makePostRequest("/veci/maestros/proveedor", requestData);
    } else if (action === 2) {
      data = await makePutRequest(
        "/veci/maestros/proveedor/" + requestData.id_metodoPago,
        requestData
      );
    } else if (action === 3) {
      data = await makeDeleteRequest(
        "/veci/maestros/proveedor/" + requestData.id_metodoPago
      );
    }
    return data;
  } catch (e) {
    throw e;
  }
}

export const useListadoResidentes = (enabled = true) => {
  const { isLoading, isError, data, isFetching, refetch } = useQuery({
    queryKey: ["residenteListado"],
    queryFn: getListadoResidentes,
    enabled,
  });
  return {
    isFetching,
    isLoading,
    isError,
    data,
    refetch,
  };
};

export const useListadoTipoResidentes = (enabled = true) => {
  const { isLoading, isError, data, isFetching, refetch } = useQuery({
    queryKey: ["residente"],
    queryFn: getListadoPorTipo,
    enabled,
  });
  return {
    isFetching,
    isLoading,
    isError,
    data,
    refetch,
  };
};

// export async function crudIngreso(requestData, action) {
//   try {
//     let data;
//     if (action === 0) {
//       data = await makePostRequest(
//         "/veci/tesoreria/ingreso/registrar",
//         requestData
//       );
//     } else if (action === 1) {
//       data = await makePutRequest(
//         "/veci/tesoreria/ingreso/actualizar",
//         requestData
//       );
//     } else if (action === 2) {
//       data = await makeDeleteRequestData(
//         "/veci/tesoreria/ingreso/eliminar",
//         requestData
//       );
//     } else if (action === 3) {
//       data = await makeGetRequest("/veci/tesoreria/ingreso/listar");
//     } else if (action === 4) {
//       data = await makeGetRequest("/veci/tesoreria/ingreso/exportar/excel");
//     }
//     console.log("Respuesta CRUD Ingreso:", data);
//     return {
//       success: data.status === "success",
//       data: data.data || null,
//       message: data.message || "Operación completada",
//       error: data.status === "error" ? data.error || data.message : null,
//     };
//   } catch (e) {
//     console.error("Error en CRUD Ingreso:", e);
//     return {
//       success: false,
//       data: null,
//       message: "Error en la operación",
//       error: e.response?.data?.message || e.message,
//     };
//   }
// }
export async function crudIngreso(requestData, action) {
  try {
    let data;
    if (action === 0) {
      data = await makePostRequest(
        "/veci/tesoreria/ingreso/registrar",
        requestData
      );
    } else if (action === 1) {
      data = await makePutRequest(
        "/veci/tesoreria/ingreso/actualizar",
        requestData
      );
    } else if (action === 2) {
      console.log(
        "[crudIngreso] Eliminando ingresos, requestData:",
        JSON.stringify(requestData)
      );
      data = await makePostRequest(
        "/veci/tesoreria/ingreso/eliminar",
        requestData
      );
    } else if (action === 3) {
      data = await makeGetRequest("/veci/tesoreria/ingreso/listar");
    } else if (action === 4) {
      data = await makeGetRequest("/veci/tesoreria/ingreso/exportar/excel");
    } else if (action === 5) {
      // New action for generating c_codigo_comprobante
      data = await makeGetRequest(
        "/veci/tesoreria/ingreso/generar/codigoComprobante"
      );
    } else if (action === 6) {
      // New action for generating nro_recibo
      data = await makeGetRequest("/veci/tesoreria/ingreso/generar/nroRecibo");
    }
    console.log("Respuesta CRUD Ingreso:", data);
    return {
      success: data.status === "success",
      data: data.data || null,
      message: data.message || "Operación completada",
      error: data.status === "error" ? data.error || data.message : null,
    };
  } catch (e) {
    console.error("Error en CRUD Ingreso:", e);
    return {
      success: false,
      data: null,
      message: "Error en la operación",
      error: e.response?.data?.message || e.message,
    };
  }
}

export async function useObtenerViviendaDadoId(id_vivienda) {
  try {
    let data;
    data = await makeGetRequest(
      "/veci/condominio/vivienda/listar" + id_vivienda
    );
    console.log("VIVIENDA OBTENIDA: ", data);
    return data;
  } catch (e) {
    throw e;
  }
}
