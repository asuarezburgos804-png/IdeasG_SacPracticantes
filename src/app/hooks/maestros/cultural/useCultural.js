import { useQuery } from "@tanstack/react-query";

import {
  makePostRequest,
  makePatchRequest,
  makeDeleteRequest,
  makeGetRequest,
} from "@/utils/api/api";
import {
  fetchAfecAntropicas,
  fetchAfecNaturales,
  fetchCatInmueble,
  fetchElemArquitectonico,
  fetchEstElemEstructuraAcabado,
  fetchFilCronologica,
  fetchFilEstilistica,
  fetchInterConservacion,
  fetchInterInmueble,
  fetchTipoArquitecturaMap,
  fetchTipoArquitecturaMhc,
  fetchTipoMaterialConst,
  fetchCatInmuebleDPCN,
} from "@/app/services/master/master";

//Declaracion de Fabrica
export const useCatInmueble = () => {
  const { isLoading, isError, data, isFetching } = useQuery(
    ["catInmueble"],
    fetchCatInmueble
  );
  return {
    isFetching,
    isLoading,
    isError,
    data,
  };
};

export async function crudCatInmueble(requestData, action) {
  try {
    let data;
    if (action == 0) {
      data = await makePostRequest("/maestros/catInmueble", requestData);
    } else if (action == 2) {
      data = await makePatchRequest(
        "/maestros/catInmueble/" + requestData.cod_cat_inmueble,
        requestData
      );
    } else if (action == 3) {
      data = await makeDeleteRequest(
        "/maestros/catInmueble/" + requestData.cod_cat_inmueble
      );
    }
    return data;
  } catch (e) {
    throw e;
  }
}

//Filiacion Cronologica
export const useFilCronologica = () => {
  const { isLoading, isError, data, isFetching } = useQuery(
    ["filCronologica"],
    fetchFilCronologica
  );
  return {
    isFetching,
    isLoading,
    isError,
    data,
  };
};

export async function crudFilCronologica(requestData, action) {
  try {
    let data;
    if (action == 0) {
      data = await makePostRequest("/maestros/filCronologica", requestData);
    } else if (action == 2) {
      data = await makePatchRequest(
        "/maestros/filCronologica/" + requestData.cod_fil_cronolog,
        requestData
      );
    } else if (action == 3) {
      data = await makeDeleteRequest(
        "/maestros/filCronologica/" + requestData.cod_fil_cronolog
      );
    }
    return data;
  } catch (e) {
    throw e;
  }
}

//Tipo de Arquitectura Map
export const useTipoArquitecturaMap = () => {
  const { isLoading, isError, data, isFetching } = useQuery(
    ["tipoArquitecturaMap"],
    fetchTipoArquitecturaMap
  );
  return {
    isFetching,
    isLoading,
    isError,
    data,
  };
};

export async function crudTipoArquitecturaMap(requestData, action) {
  try {
    let data;
    if (action == 0) {
      data = await makePostRequest(
        "/maestros/tipoArquitecturaMap",
        requestData
      );
    } else if (action == 2) {
      data = await makePatchRequest(
        "/maestros/tipoArquitecturaMap/" + requestData.cod_tipo_arq_map,
        requestData
      );
    } else if (action == 3) {
      data = await makeDeleteRequest(
        "/maestros/tipoArquitecturaMap/" + requestData.cod_tipo_arq_map
      );
    }
    return data;
  } catch (e) {
    throw e;
  }
}
//Tipo de Arquitectura Mhc
export const useTipoArquitecturaMhc = () => {
  const { isLoading, isError, data, isFetching } = useQuery(
    ["tipoArquitecturaMhc"],
    fetchTipoArquitecturaMhc
  );
  return {
    isFetching,
    isLoading,
    isError,
    data,
  };
};

export async function crudTipoArquitecturaMhc(requestData, action) {
  try {
    let data;
    if (action == 0) {
      data = await makePostRequest(
        "/maestros/tipoArquitecturaMhc",
        requestData
      );
    } else if (action == 2) {
      data = await makePatchRequest(
        "/maestros/tipoArquitecturaMhc/" + requestData.cod_tipo_arq_mhc,
        requestData
      );
    } else if (action == 3) {
      data = await makeDeleteRequest(
        "/maestros/tipoArquitecturaMhc/" + requestData.cod_tipo_arq_mhc
      );
    }
    return data;
  } catch (e) {
    throw e;
  }
}
//Tipo de Material de Construccion
export const useTipoMaterialConst = () => {
  const { isLoading, isError, data, isFetching } = useQuery(
    ["tipoMaterialConst"],
    fetchTipoMaterialConst
  );
  return {
    isFetching,
    isLoading,
    isError,
    data,
  };
};

export async function crudTipoMaterialConst(requestData, action) {
  try {
    let data;
    if (action == 0) {
      data = await makePostRequest("/maestros/tipoMaterialConst", requestData);
    } else if (action == 2) {
      data = await makePatchRequest(
        "/maestros/tipoMaterialConst/" + requestData.cod_mat_const,
        requestData
      );
    } else if (action == 3) {
      data = await makeDeleteRequest(
        "/maestros/tipoMaterialConst/" + requestData.cod_mat_const
      );
    }
    return data;
  } catch (e) {
    throw e;
  }
}
//Afectaciones Naturales
export const useAfecNaturales = () => {
  const { isLoading, isError, data, isFetching } = useQuery(
    ["afecNaturales"],
    fetchAfecNaturales
  );
  return {
    isFetching,
    isLoading,
    isError,
    data,
  };
};

export async function crudAfecNaturales(requestData, action) {
  try {
    let data;
    if (action == 0) {
      data = await makePostRequest("/maestros/afecNaturales", requestData);
    } else if (action == 2) {
      data = await makePatchRequest(
        "/maestros/afecNaturales/" + requestData.cod_afec_natural,
        requestData
      );
    } else if (action == 3) {
      data = await makeDeleteRequest(
        "/maestros/afecNaturales/" + requestData.cod_afec_natural
      );
    }
    return data;
  } catch (e) {
    throw e;
  }
}

//Afectaciones Antropicas
export const useAfecAntropicas = () => {
  const { isLoading, isError, data, isFetching } = useQuery(
    ["afecAntropicas"],
    fetchAfecAntropicas
  );
  return {
    isFetching,
    isLoading,
    isError,
    data,
  };
};

export async function crudAfecAntropicas(requestData, action) {
  try {
    let data;
    if (action == 0) {
      data = await makePostRequest("/maestros/afecAntropicas", requestData);
    } else if (action == 2) {
      data = await makePatchRequest(
        "/maestros/afecAntropicas/" + requestData.cod_afec_antrop,
        requestData
      );
    } else if (action == 3) {
      data = await makeDeleteRequest(
        "/maestros/afecAntropicas/" + requestData.cod_afec_antrop
      );
    }
    return data;
  } catch (e) {
    throw e;
  }
}

//Intervenciones de Conservacion
export const useInterConservacion = () => {
  const { isLoading, isError, data, isFetching } = useQuery(
    ["interConservacion"],
    fetchInterConservacion
  );
  return {
    isFetching,
    isLoading,
    isError,
    data,
  };
};

export async function crudInterConservacion(requestData, action) {
  try {
    let data;
    if (action == 0) {
      data = await makePostRequest("/maestros/interConservacion", requestData);
    } else if (action == 2) {
      data = await makePatchRequest(
        "/maestros/interConservacion/" + requestData.cod_interv_conserv,
        requestData
      );
    } else if (action == 3) {
      data = await makeDeleteRequest(
        "/maestros/interConservacion/" + requestData.cod_interv_conserv
      );
    }
    return data;
  } catch (e) {
    throw e;
  }
}
//Elementos Arquitectonicos
export const useElemArquitectonico = () => {
  const { isLoading, isError, data, isFetching } = useQuery(
    ["elemArquitectonico"],
    fetchElemArquitectonico
  );
  return {
    isFetching,
    isLoading,
    isError,
    data,
  };
};

export async function crudElemArquitectonico(requestData, action) {
  try {
    let data;
    if (action == 0) {
      data = await makePostRequest("/maestros/elemArquitectonico", requestData);
    } else if (action == 2) {
      data = await makePatchRequest(
        "/maestros/elemArquitectonico/" + requestData.cod_elem_arq,
        requestData
      );
    } else if (action == 3) {
      data = await makeDeleteRequest(
        "/maestros/elemArquitectonico/" + requestData.cod_elem_arq
      );
    }
    return data;
  } catch (e) {
    throw e;
  }
}

//Filiacion Estilistica
export const useFilEstilistica = () => {
  const { isLoading, isError, data, isFetching } = useQuery(
    ["filEstilistica"],
    fetchFilEstilistica
  );
  return {
    isFetching,
    isLoading,
    isError,
    data,
  };
};

export async function crudFilEstilistica(requestData, action) {
  try {
    let data;
    if (action == 0) {
      data = await makePostRequest("/maestros/filEstilistica", requestData);
    } else if (action == 2) {
      data = await makePatchRequest(
        "/maestros/filEstilistica/" + requestData.cod_fil_estilistica,
        requestData
      );
    } else if (action == 3) {
      data = await makeDeleteRequest(
        "/maestros/filEstilistica/" + requestData.cod_fil_estilistica
      );
    }
    return data;
  } catch (e) {
    throw e;
  }
}

//Estado de Elementos Estructurales de Acabado
export const useEstElemEstructuraAcabado = () => {
  const { isLoading, isError, data, isFetching } = useQuery(
    ["estElemEstructuraAcabado"],
    fetchEstElemEstructuraAcabado
  );
  return {
    isFetching,
    isLoading,
    isError,
    data,
  };
};

export async function crudEstElemEstructuraAcabado(requestData, action) {
  try {
    let data;
    if (action == 0) {
      data = await makePostRequest(
        "/maestros/estElemEstructuraAcabado",
        requestData
      );
    } else if (action == 2) {
      data = await makePatchRequest(
        "/maestros/estElemEstructuraAcabado/" +
          requestData.cod_elem_estruc_acab,
        requestData
      );
    } else if (action == 3) {
      data = await makeDeleteRequest(
        "/maestros/estElemEstructuraAcabado/" + requestData.cod_elem_estruc_acab
      );
    }
    return data;
  } catch (e) {
    throw e;
  }
}

//Intervencion de Inmueble
export const useInterInmueble = () => {
  const { isLoading, isError, data, isFetching } = useQuery(
    ["interInmueble"],
    fetchInterInmueble
  );
  return {
    isFetching,
    isLoading,
    isError,
    data,
  };
};

export async function crudInterInmueble(requestData, action) {
  try {
    let data;
    if (action == 0) {
      data = await makePostRequest("/maestros/interInmueble", requestData);
    } else if (action == 2) {
      data = await makePatchRequest(
        "/maestros/interInmueble/" + requestData.cod_inter_inmueble,
        requestData
      );
    } else if (action == 3) {
      data = await makeDeleteRequest(
        "/maestros/interInmueble/" + requestData.cod_inter_inmueble
      );
    }
    return data;
  } catch (e) {
    throw e;
  }
}

//Inmueble declarado patrimonio
export const useCatInmuebleDPCN = () => {
  const { isLoading, isError, data, isFetching } = useQuery(
    ["inmuebleDPCN"],
    fetchCatInmuebleDPCN
  );
  return {
    isFetching,
    isLoading,
    isError,
    data,
  };
};

export async function crudinmuebleDPCN(requestData, action) {
  try {
    let data;
    if (action == 0) {
      data = await makePostRequest("/maestros/inmuebleDPCN", requestData);
    } else if (action == 2) {
      data = await makePatchRequest(
        "/maestros/inmuebleDPCN/" + requestData.cod_inter_inmueble,
        requestData
      );
    } else if (action == 3) {
      data = await makeDeleteRequest(
        "/maestros/inmuebleDPCN/" + requestData.cod_inter_inmueble
      );
    }
    return data;
  } catch (e) {
    throw e;
  }
}