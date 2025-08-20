import { useQuery } from "@tanstack/react-query";

import {
  makePostRequest,
  makePatchRequest,
  makeDeleteRequest,
  makeGetRequest,
  makePutRequest,
} from "@/utils/api/api";
import {
  fetchClasifPredio,
  fetchCondDeclarante,
  fetchCondEspPredio,
  fetchCondEspTitular,
  fetchCondNumeracion,
  fetchCondTitular,
  fetchDeclaFabrica,
  fetchEcc,
  fetchEcs,
  fetchEstCivil,
  fetchFcTipoDoc,
  fetchFormaAdqui,
  fetchLlenado,
  fetchMantenimiento,
  fetchMep,
  fetchPredioCatEn,
  fetchTipoDoc,
  fetchTipoEdificacion,
  fetchTipoInterior,
  fetchTipoParRegistral,
  fetchTipoPerJuridica,
  fetchTipoPuerta,
  fetchTipoTitular,
  fetchTipoVias,
  fetchUca,
} from "@/app/services/master/master";
import {
  fetchManzana,
  fetchNotaria,
  fetchSector,
} from "@/app/services/master/espacial";

//Video por cuadra
export async function fetchFilterViasByTipo(dat) {
  try {
    const data = await makeGetRequest("/maestros/buscar/vias/mapa/" + dat);
    return data.data;
  } catch (e) {
    throw e;
  }
}

export async function fetchFilterCuadraByVia(dat) {
  try {
    const data = await makeGetRequest("/maestros/buscar/cuadras/mapa/" + dat);
    return data.data;
  } catch (e) {
    throw e;
  }
}

//Tipo Vias
export const useTipoVias = () => {
  const { isLoading, isError, data, isFetching } = useQuery(
    ["useTipoVias"],
    fetchTipoVias
  );

  return {
    isFetching,
    isLoading,
    isError,
    data,
  };
};

//Notaria
export const useNotaria = () => {
  const { isLoading, isError, data, isFetching } = useQuery(
    ["cod_notaria"],
    fetchNotaria
  );

  return {
    isFetching,
    isLoading,
    isError,
    data,
  };
};

export async function crudNotaria(requestData, action) {
  try {
    let data;
    if (action == 0) {
      data = await makePostRequest(
        "/maestros/notaria/fi/registrar/notaria",
        requestData
      );
    } else if (action == 2) {
      data = await makePutRequest(
        "/maestros/notaria/fi/actualizar/notaria/",
        requestData
      );
    } else if (action == 3) {
      data = await makePostRequest("/maestros/notaria/fi/eliminar/notaria", {
        cod_notaria: requestData.cod_notaria,
      });
    }
    return data;
  } catch (e) {
    throw e;
  }
}

export async function fetchFilterNotaria(dat) {
  try {
    const data = await makeGetRequest(
      "/maestros/notaria/fi/buscar/notaria/" + dat
    );
    return data.data;
  } catch (e) {
    throw e;
  }
}

//Sector
export const useSector = () => {
  const { isLoading, isError, data, isFetching } = useQuery(
    ["c_cod_sector"],
    fetchSector
  );

  return {
    isFetching,
    isLoading,
    isError,
    data,
  };
};

export async function crudSector(requestData, action) {
  try {
    let data;
    if (action == 0) {
      data = await makePostRequest(
        "/maestros/sector/fi/registrar/sector",
        requestData
      );
    } else if (action == 2) {
      data = await makePutRequest(
        "/maestros/sector/fi/actualizar/sector",
        requestData
      );
    } else if (action == 3) {
      data = await makePostRequest("/maestros/sector/fi/eliminar/sector", {
        id_sector: requestData.id_sector,
      });
    }
    return data;
  } catch (e) {
    throw e;
  }
}

export async function fetchFilterSector(dat) {
  try {
    const data = await makeGetRequest(
      "/maestros/sector/fi/buscar/sector/" + dat
    );
    return data.data;
  } catch (e) {
    throw e;
  }
}
//Manzana
export async function fetchSearchManzana(dat) {
  try {
    const data = await makeGetRequest(
      "/maestros/manzana/listar/manzana/" + dat
    );
    return data.data;
  } catch (e) {
    throw e;
  }
}

export async function fetchFilterManzana(dat) {
  try {
    const data = await makeGetRequest(
      "/maestros/manzana/fi/listar/id_manzana/" + dat
    );
    return data.data;
  } catch (e) {
    throw e;
  }
}

export const useManzana = () => {
  const { isLoading, isError, data, isFetching } = useQuery(
    ["c_cod_mzna"],
    fetchManzana
  );

  return {
    isFetching,
    isLoading,
    isError,
    data,
  };
};

export async function crudManzana(requestData, action) {
  try {
    let data;
    if (action == 0) {
      data = await makePostRequest(
        "/maestros/manzana/fi/registrar/manzana",
        requestData
      );
    } else if (action == 2) {
      data = await makePutRequest(
        "/maestros/manzana/fi/actualizar/manzana",
        requestData
      );
    } else if (action == 3) {
      data = await makePostRequest("/maestros/manzana/fi/eliminar/manzana", {
        id_manzana: requestData.id_manzana,
      });
    }
    return data;
  } catch (e) {
    throw e;
  }
}

// Lote
export async function fetchSearchLote(dat) {
  try {
    const data = await makeGetRequest("/maestros/lote/listar/lote/" + dat);
    return data.data;
  } catch (e) {
    throw e;
  }
}
export async function fetchFilterLote(dat) {
  try {
    const data = await makeGetRequest(
      "/maestros/lote/fi/listar/id_lote/" + dat
    );
    return data.data;
  } catch (e) {
    throw e;
  }
}

export async function crudLote(requestData, action) {
  try {
    let data;
    if (action == 0) {
      data = await makePostRequest(
        "/maestros/lote/fi/registrar/lote",
        requestData
      );
    } else if (action == 2) {
      data = await makePutRequest(
        "/maestros/lote/fi/actualizar/lote",
        requestData
      );
    } else if (action == 3) {
      data = await makePostRequest("/maestros/lote/fi/eliminar/lote", {
        id_lote: requestData.id_lote,
      });
    }
    return data;
  } catch (e) {
    throw e;
  }
}

//Tipo de Edificacion
export const useTipoEdificacion = () => {
  const { isLoading, isError, data, isFetching } = useQuery(
    ["tipo_edificacion"],
    fetchTipoEdificacion
  );

  return {
    isFetching,
    isLoading,
    isError,
    data,
  };
};

export async function crudTipoEdificacion(requestData, action) {
  try {
    let data;
    if (action == 0) {
      data = await makePostRequest("/maestros/tipo_edificacion", requestData);
    } else if (action == 2) {
      data = await makePatchRequest(
        "/maestros/tipo_edificacion/" + requestData.cod_tipo_edificacion,
        requestData
      );
    } else if (action == 3) {
      data = await makeDeleteRequest(
        "/maestros/tipo_edificacion/" + requestData.cod_tipo_edificacion
      );
    }
    return data;
  } catch (e) {
    throw e;
  }
}
//Tipo de Interior
export const useTipoInterior = () => {
  const { isLoading, isError, data, isFetching } = useQuery(
    ["tipo_interior"],
    fetchTipoInterior
  );

  return {
    isFetching,
    isLoading,
    isError,
    data,
  };
};

export async function crudTipoInterior(requestData, action) {
  try {
    let data;
    if (action == 0) {
      data = await makePostRequest("/maestros/tipo_interior", requestData);
    } else if (action == 2) {
      data = await makePatchRequest(
        "/maestros/tipo_interior/" + requestData.cod_tipo_interior,
        requestData
      );
    } else if (action == 3) {
      data = await makeDeleteRequest(
        "/maestros/tipo_interior/" + requestData.cod_tipo_interior
      );
    }
    return data;
  } catch (e) {
    throw e;
  }
}
//Tipo de Titular
export const useTipotitular = () => {
  const { isLoading, isError, data, isFetching } = useQuery(
    ["tipoTitular"],
    fetchTipoTitular
  );
  return {
    isFetching,
    isLoading,
    isError,
    data,
  };
};

export async function crudTipoTitular(requestData, action) {
  try {
    let data;
    if (action == 0) {
      data = await makePostRequest("/maestros/tipoTitular", requestData);
    } else if (action == 2) {
      data = await makePatchRequest(
        "/maestros/tipoTitular/" + requestData.cod_tipo_titular,
        requestData
      );
    } else if (action == 3) {
      data = await makeDeleteRequest(
        "/maestros/tipoTitular/" + requestData.cod_tipo_titular
      );
    }
    return data;
  } catch (e) {
    throw e;
  }
}
//Tipo de Documento
export const useTipoDoc = () => {
  const { isLoading, isError, data, isFetching } = useQuery(
    ["tipoDoc"],
    fetchTipoDoc
  );
  return {
    isFetching,
    isLoading,
    isError,
    data,
  };
};

export async function crudTipoDoc(requestData, action) {
  try {
    let data;
    if (action == 0) {
      data = await makePostRequest("/maestros/tipoDoc", requestData);
    } else if (action == 2) {
      data = await makePatchRequest(
        "/maestros/tipoDoc/" + requestData.cod_tipo_doc,
        requestData
      );
    } else if (action == 3) {
      data = await makeDeleteRequest(
        "/maestros/tipoDoc/" + requestData.cod_tipo_doc
      );
    }
    return data;
  } catch (e) {
    throw e;
  }
}

//Condicion del Titular
export const useCondTitular = () => {
  const { isLoading, isError, data, isFetching } = useQuery(
    ["condTitular"],
    fetchCondTitular
  );
  return {
    isFetching,
    isLoading,
    isError,
    data,
  };
};

export async function crudCondTitular(requestData, action) {
  try {
    let data;
    if (action == 0) {
      data = await makePostRequest("/maestros/condTitular", requestData);
    } else if (action == 2) {
      data = await makePatchRequest(
        "/maestros/condTitular/" + requestData.cod_cond,
        requestData
      );
    } else if (action == 3) {
      data = await makeDeleteRequest(
        "/maestros/condTitular/" + requestData.cod_cond
      );
    }
    return data;
  } catch (e) {
    throw e;
  }
}

//Condicion del declarante
export const useCondDeclarante = () => {
  const { isLoading, isError, data, isFetching } = useQuery(
    ["condDeclarante"],
    fetchCondDeclarante
  );
  return {
    isFetching,
    isLoading,
    isError,
    data,
  };
};

export async function crudCondDeclarante(requestData, action) {
  try {
    let data;
    if (action == 0) {
      data = await makePostRequest("/maestros/condDeclarante", requestData);
    } else if (action == 2) {
      data = await makePatchRequest(
        "/maestros/condDeclarante/" + requestData.cod_cond_decla,
        requestData
      );
    } else if (action == 3) {
      data = await makeDeleteRequest(
        "/maestros/condDeclarante/" + requestData.cod_cond_decla
      );
    }
    return data;
  } catch (e) {
    throw e;
  }
}

//Estado de Llenado
export const useEstLlenado = () => {
  const { isLoading, isError, data, isFetching } = useQuery(
    ["estllenado"],
    fetchLlenado
  );
  return {
    isFetching,
    isLoading,
    isError,
    data,
  };
};

export async function crudEstLlenado(requestData, action) {
  try {
    let data;
    if (action == 0) {
      data = await makePostRequest("/maestros/estllenado", requestData);
    } else if (action == 2) {
      data = await makePatchRequest(
        "/maestros/estllenado/" + requestData.cod_est_llenado,
        requestData
      );
    } else if (action == 3) {
      data = await makeDeleteRequest(
        "/maestros/estllenado/" + requestData.cod_est_llenado
      );
    }
    return data;
  } catch (e) {
    throw e;
  }
}

//Mantenimiento
export const useMantenimiento = () => {
  const { isLoading, isError, data, isFetching } = useQuery(
    ["mantenimiento"],
    fetchMantenimiento
  );
  return {
    isFetching,
    isLoading,
    isError,
    data,
  };
};

export async function crudMantenimiento(requestData, action) {
  try {
    let data;
    if (action == 0) {
      data = await makePostRequest("/maestros/mantenimiento", requestData);
    } else if (action == 2) {
      data = await makePatchRequest(
        "/maestros/mantenimiento/" + requestData.cod_mantenimiento,
        requestData
      );
    } else if (action == 3) {
      data = await makeDeleteRequest(
        "/maestros/mantenimiento/" + requestData.cod_mantenimiento
      );
    }
    return data;
  } catch (e) {
    throw e;
  }
}

//Estado de Civil
export const useEstCivil = () => {
  const { isLoading, isError, data, isFetching } = useQuery(
    ["estCivil"],
    fetchEstCivil
  );
  return {
    isFetching,
    isLoading,
    isError,
    data,
  };
};

export async function crudEstCivil(requestData, action) {
  try {
    let data;
    if (action == 0) {
      data = await makePostRequest("/maestros/estCivil", requestData);
    } else if (action == 2) {
      data = await makePatchRequest(
        "/maestros/estCivil/" + requestData.cod_est_civil,
        requestData
      );
    } else if (action == 3) {
      data = await makeDeleteRequest(
        "/maestros/estCivil/" + requestData.cod_est_civil
      );
    }
    return data;
  } catch (e) {
    throw e;
  }
}

//Tipo de Persona Juridica
export const useTipoPerjuridica = () => {
  const { isLoading, isError, data, isFetching } = useQuery(
    ["tipoPerJuridica"],
    fetchTipoPerJuridica
  );
  return {
    isFetching,
    isLoading,
    isError,
    data,
  };
};

export async function crudTipoPerJuridica(requestData, action) {
  try {
    let data;
    if (action == 0) {
      data = await makePostRequest("/maestros/tipoPerJuridica", requestData);
    } else if (action == 2) {
      data = await makePatchRequest(
        "/maestros/tipoPerJuridica/" + requestData.cod_tipo_perjuridica,
        requestData
      );
    } else if (action == 3) {
      data = await makeDeleteRequest(
        "/maestros/tipoPerJuridica/" + requestData.cod_tipo_perjuridica
      );
    }
    return data;
  } catch (e) {
    throw e;
  }
}

//Condicion Especial del Titular
export const useCondEspTitular = () => {
  const { isLoading, isError, data, isFetching } = useQuery(
    ["condEspTitular"],
    fetchCondEspTitular
  );
  return {
    isFetching,
    isLoading,
    isError,
    data,
  };
};

export async function crudCondEspTitular(requestData, action) {
  try {
    let data;
    if (action == 0) {
      data = await makePostRequest("/maestros/condEspTitular", requestData);
    } else if (action == 2) {
      data = await makePatchRequest(
        "/maestros/condEspTitular/" + requestData.cod_cond_esp_tit,
        requestData
      );
    } else if (action == 3) {
      data = await makeDeleteRequest(
        "/maestros/condEspTitular/" + requestData.cod_cond_esp_tit
      );
    }
    return data;
  } catch (e) {
    throw e;
  }
}

//Forma de Adquisicion
export const useFormaAdqui = () => {
  const { isLoading, isError, data, isFetching } = useQuery(
    ["formaAdqui"],
    fetchFormaAdqui
  );
  return {
    isFetching,
    isLoading,
    isError,
    data,
  };
};

export async function crudFormaAdqui(requestData, action) {
  try {
    let data;
    if (action == 0) {
      data = await makePostRequest("/maestros/formaAdqui", requestData);
    } else if (action == 2) {
      data = await makePatchRequest(
        "/maestros/formaAdqui/" + requestData.cod_forma_adqui,
        requestData
      );
    } else if (action == 3) {
      data = await makeDeleteRequest(
        "/maestros/formaAdqui/" + requestData.cod_forma_adqui
      );
    }
    return data;
  } catch (e) {
    throw e;
  }
}

//Condicion Especial del Predio
export const useCondEspPredio = () => {
  const { isLoading, isError, data, isFetching } = useQuery(
    ["condEspPredio"],
    fetchCondEspPredio
  );
  return {
    isFetching,
    isLoading,
    isError,
    data,
  };
};

export async function crudCondEspPredio(requestData, action) {
  try {
    let data;
    if (action == 0) {
      data = await makePostRequest("/maestros/condEspPredio", requestData);
    } else if (action == 2) {
      data = await makePatchRequest(
        "/maestros/condEspPredio/" + requestData.cod_cond_esp_predio,
        requestData
      );
    } else if (action == 3) {
      data = await makeDeleteRequest(
        "/maestros/condEspPredio/" + requestData.cod_cond_esp_predio
      );
    }
    return data;
  } catch (e) {
    throw e;
  }
}

//Clasificacion del Predio
export const useClasifPredio = () => {
  const { isLoading, isError, data, isFetching } = useQuery(
    ["clasifPredio"],
    fetchClasifPredio
  );
  return {
    isFetching,
    isLoading,
    isError,
    data,
  };
};

export async function crudClasifPredio(requestData, action) {
  try {
    let data;
    if (action == 0) {
      data = await makePostRequest("/maestros/clasifPredio", requestData);
    } else if (action == 2) {
      data = await makePatchRequest(
        "/maestros/clasifPredio/" + requestData.cod_clasif_predio,
        requestData
      );
    } else if (action == 3) {
      data = await makeDeleteRequest(
        "/maestros/clasifPredio/" + requestData.cod_clasif_predio
      );
    }
    return data;
  } catch (e) {
    throw e;
  }
}

//Predio Catastral En
export const usePredioCatEn = () => {
  const { isLoading, isError, data, isFetching } = useQuery(
    ["predioCatEn"],
    fetchPredioCatEn
  );
  return {
    isFetching,
    isLoading,
    isError,
    data,
  };
};

export async function crudPredioCatEn(requestData, action) {
  try {
    let data;
    if (action == 0) {
      data = await makePostRequest("/maestros/predioCatEn", requestData);
    } else if (action == 2) {
      data = await makePatchRequest(
        "/maestros/predioCatEn/" + requestData.cod_predio_cat_en,
        requestData
      );
    } else if (action == 3) {
      data = await makeDeleteRequest(
        "/maestros/predioCatEn/" + requestData.cod_predio_cat_en
      );
    }
    return data;
  } catch (e) {
    throw e;
  }
}

//Met
export const useMep = () => {
  const { isLoading, isError, data, isFetching } = useQuery(["mep"], fetchMep);
  return {
    isFetching,
    isLoading,
    isError,
    data,
  };
};

export async function crudMep(requestData, action) {
  try {
    let data;
    if (action == 0) {
      data = await makePostRequest("/maestros/mep", requestData);
    } else if (action == 2) {
      data = await makePatchRequest(
        "/maestros/mep/" + requestData.cod_mep,
        requestData
      );
    } else if (action == 3) {
      data = await makeDeleteRequest("/maestros/mep/" + requestData.cod_mep);
    }
    return data;
  } catch (e) {
    throw e;
  }
}

//ECS
export const useEcs = () => {
  const { isLoading, isError, data, isFetching } = useQuery(["ecs"], fetchEcs);
  return {
    isFetching,
    isLoading,
    isError,
    data,
  };
};

export async function crudEcs(requestData, action) {
  try {
    let data;
    if (action == 0) {
      data = await makePostRequest("/maestros/ecs", requestData);
    } else if (action == 2) {
      data = await makePatchRequest(
        "/maestros/ecs/" + requestData.cod_ecs,
        requestData
      );
    } else if (action == 3) {
      data = await makeDeleteRequest("/maestros/ecs/" + requestData.cod_ecs);
    }
    return data;
  } catch (e) {
    throw e;
  }
}
//ECC
export const useEcc = () => {
  const { isLoading, isError, data, isFetching } = useQuery(["ecc"], fetchEcc);
  return {
    isFetching,
    isLoading,
    isError,
    data,
  };
};

export async function crudEcc(requestData, action) {
  try {
    let data;
    if (action == 0) {
      data = await makePostRequest("/maestros/ecc", requestData);
    } else if (action == 2) {
      data = await makePatchRequest(
        "/maestros/ecc/" + requestData.cod_ecc,
        requestData
      );
    } else if (action == 3) {
      data = await makeDeleteRequest("/maestros/ecc/" + requestData.cod_ecc);
    }
    return data;
  } catch (e) {
    throw e;
  }
}

//UCA
export const useUca = () => {
  const { isLoading, isError, data, isFetching } = useQuery(["uca"], fetchUca);
  return {
    isFetching,
    isLoading,
    isError,
    data,
  };
};

export async function crudUca(requestData, action) {
  try {
    let data;
    if (action == 0) {
      data = await makePostRequest("/maestros/uca", requestData);
    } else if (action == 2) {
      data = await makePatchRequest(
        "/maestros/uca/" + requestData.cod_uca,
        requestData
      );
    } else if (action == 3) {
      data = await makeDeleteRequest("/maestros/uca/" + requestData.cod_uca);
    }
    return data;
  } catch (e) {
    throw e;
  }
}

//FC Tipo de Documento
export const useFcTipoDoc = () => {
  const { isLoading, isError, data, isFetching } = useQuery(
    ["fcTipoDoc"],
    fetchFcTipoDoc
  );
  return {
    isFetching,
    isLoading,
    isError,
    data,
  };
};

export async function crudFcTipoDoc(requestData, action) {
  try {
    let data;
    if (action == 0) {
      data = await makePostRequest("/maestros/fcTipoDoc", requestData);
    } else if (action == 2) {
      data = await makePatchRequest(
        "/maestros/fcTipoDoc/" + requestData.cod_fc_tipo_doc,
        requestData
      );
    } else if (action == 3) {
      data = await makeDeleteRequest(
        "/maestros/fcTipoDoc/" + requestData.cod_fc_tipo_doc
      );
    }
    return data;
  } catch (e) {
    throw e;
  }
}

//Tipo de Partida Registral
export const useTipoParRegistral = () => {
  const { isLoading, isError, data, isFetching } = useQuery(
    ["tipoParRegistral"],
    fetchTipoParRegistral
  );
  return {
    isFetching,
    isLoading,
    isError,
    data,
  };
};

export async function crudTipoParRegistral(requestData, action) {
  try {
    let data;
    if (action == 0) {
      data = await makePostRequest("/maestros/tipoParRegistral", requestData);
    } else if (action == 2) {
      data = await makePatchRequest(
        "/maestros/tipoParRegistral/" + requestData.cod_tipo_parregistral,
        requestData
      );
    } else if (action == 3) {
      data = await makeDeleteRequest(
        "/maestros/tipoParRegistral/" + requestData.cod_tipo_parregistral
      );
    }
    return data;
  } catch (e) {
    throw e;
  }
}

//Declaracion de Fabrica
export const useDeclaFabrica = () => {
  const { isLoading, isError, data, isFetching } = useQuery(
    ["declaFabrica"],
    fetchDeclaFabrica
  );
  return {
    isFetching,
    isLoading,
    isError,
    data,
  };
};

export async function crudDeclaFabrica(requestData, action) {
  try {
    let data;
    if (action == 0) {
      data = await makePostRequest("/maestros/declaFabrica", requestData);
    } else if (action == 2) {
      data = await makePatchRequest(
        "/maestros/declaFabrica/" + requestData.cod_decla_fabrica,
        requestData
      );
    } else if (action == 3) {
      data = await makeDeleteRequest(
        "/maestros/declaFabrica/" + requestData.cod_decla_fabrica
      );
    }
    return data;
  } catch (e) {
    throw e;
  }
}
