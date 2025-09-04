import { makeGetRequest } from "@/utils/api/api";

export async function fetchMasters() {
  try {
    const data = await makeGetRequest("/motivo");
    return data.data;
  } catch (e) {
    throw e;
  }
}

export async function fetchTipoVias() {
  try {
    const data = await makeGetRequest("/maestros/tipo_via");
    return data.items;
  } catch (e) {
    throw e;
  }
}

export async function fetchVias(dat) {
  try {
    const data = await makeGetRequest("/bus/vias/" + dat);
    return data.data;
  } catch (e) {
    throw e;
  }
}

export async function fetchTipoPuerta() {
  try {
    const data = await makeGetRequest("/maestros/tipo_puerta");
    return data.tipoPuerta;
  } catch (e) {
    throw e;
  }
}
export async function fetchCondNumeracion() {
  try {
    const data = await makeGetRequest("/maestros/cond_numeracion");
    return data.condNumeracion;
  } catch (e) {
    throw e;
  }
}
export async function fetchTipoEdificacion() {
  try {
    const data = await makeGetRequest("/maestros/tipo_edificacion");
    return data.tipoEdificacion;
  } catch (e) {
    throw e;
  }
}
export async function fetchTipoInterior() {
  try {
    const data = await makeGetRequest("/maestros/tipo_interior");
    return data.tipoInterior;
  } catch (e) {
    throw e;
  }
}

//?????

export async function fetchUbicacionPredioMaestros() {
  try {
    const data = await makeGetRequest("/fcuin/ubicacion_predio");
    return data.data;
  } catch (e) {
    throw e;
  }
}

export async function fetchHabUrb() {
  try {
    const data = await makeGetRequest("/maestros/haburbana");
    return data.data;
  } catch (e) {
    throw e;
  }
}

// Maestros Generales

export async function fetchTipoEvalPredio() {
  try {
    const data = await makeGetRequest("/maestros/tipoEvalPredio");
    return data;
  } catch (e) {
    throw e;
  }
}

export async function fetchTipoTitular() {
  try {
    const data = await makeGetRequest("/maestros/tipoTitular");
    return data;
  } catch (e) {
    throw e;
  }
}

export async function fetchTipoFuncion() {
  try {
    const data = await makeGetRequest("/maestros/funcion/fi/tipofuncion");
    return data.data;
  } catch (e) {
    throw e;
  }
}

export async function fetchTipoDoc() {
  try {
    let data;
    data = await makeGetRequest("/maestros/tipodoc");
    return data;
  } catch (e) {
    throw e;
  }
}

export async function fetchCondTitular() {
  try {
    let data;
    data = await makeGetRequest("/maestros/condTitular");
    return data;
  } catch (e) {
    throw e;
  }
}

export async function fetchCondDeclarante() {
  try {
    let data;
    data = await makeGetRequest("/maestros/condDeclarante");
    return data;
  } catch (e) {
    throw e;
  }
}

export async function fetchDocumento() {
  try {
    let data;
    data = await makeGetRequest("/maestros/docpresentado");
    return data;
  } catch (e) {
    throw e;
  }
}

export async function fetchLlenado() {
  try {
    let data;
    data = await makeGetRequest("/maestros/estllenado");
    return data;
  } catch (e) {
    throw e;
  }
}

export async function fetchMantenimiento() {
  try {
    let data;
    data = await makeGetRequest("/maestros/mantenimiento");
    return data;
  } catch (e) {
    throw e;
  }
}

export async function fetchEstCivil() {
  try {
    let data;
    data = await makeGetRequest("/maestros/estCivil");
    return data;
  } catch (e) {
    throw e;
  }
}

export async function fetchTipoPerJuridica() {
  try {
    let data;
    data = await makeGetRequest("/maestros/tipoPerJuridica");
    return data;
  } catch (e) {
    throw e;
  }
}

export async function fetchCondEspTitular() {
  try {
    let data;
    data = await makeGetRequest("/maestros/condEspTitular");
    return data;
  } catch (e) {
    throw e;
  }
}
export async function fetchFormaAdqui() {
  try {
    let data;
    data = await makeGetRequest("/maestros/formaAdqui");
    return data;
  } catch (e) {
    throw e;
  }
}
export async function fetchCondEspPredio() {
  try {
    let data;
    data = await makeGetRequest("/maestros/condEspPredio");
    return data;
  } catch (e) {
    throw e;
  }
}
export async function fetchClasifPredio() {
  try {
    let data;
    data = await makeGetRequest("/maestros/clasifPredio");
    return data;
  } catch (e) {
    throw e;
  }
}
export async function fetchPredioCatEn() {
  try {
    let data;
    data = await makeGetRequest("/maestros/predioCatEn");
    return data;
  } catch (e) {
    throw e;
  }
}

export async function fetchMep() {
  try {
    let data;
    data = await makeGetRequest("/maestros/mep");
    return data;
  } catch (e) {
    throw e;
  }
}
export async function fetchEcs() {
  try {
    let data;
    data = await makeGetRequest("/maestros/ecs");
    return data;
  } catch (e) {
    throw e;
  }
}

export async function fetchEcc() {
  try {
    let data;
    data = await makeGetRequest("/maestros/ecc");
    return data;
  } catch (e) {
    throw e;
  }
}

export async function fetchUca() {
  try {
    let data;
    data = await makeGetRequest("/maestros/uca");
    return data;
  } catch (e) {
    throw e;
  }
}

export async function fetchFcTipoDoc() {
  try {
    let data;
    data = await makeGetRequest("/maestros/fcTipoDoc");
    return data;
  } catch (e) {
    throw e;
  }
}

export async function fetchTipoParRegistral() {
  try {
    let data;
    data = await makeGetRequest("/maestros/tipoParRegistral");
    return data;
  } catch (e) {
    throw e;
  }
}

export async function fetchDeclaFabrica() {
  try {
    let data;
    data = await makeGetRequest("/maestros/declaFabrica");
    return data;
  } catch (e) {
    throw e;
  }
}

//***************************Cultural*********************************//
export async function fetchCatInmueble() {
  try {
    let data;
    data = await makeGetRequest("/maestros/catInmueble");
    return data;
  } catch (e) {
    throw e;
  }
    
}
export async function fetchFilCronologica() {
  try {
    let data;
    data = await makeGetRequest("/maestros/filCronologica");
    return data;
  } catch (e) {
    throw e;
  }
}

export async function fetchTipoArquitecturaMap() {
  try {
    let data;
    data = await makeGetRequest("/maestros/tipoArquitecturaMap");
    return data;
  } catch (e) {
    throw e;
  }
}
export async function fetchPreArquitecturaMap() {
  try {
    let data;
    data = await makeGetRequest("/maestros/preArquitectura");
    return data;
  } catch (e) {
    throw e;
  }
}

export async function fetchTipoArquitecturaMhc() {
  try {
    let data;
    data = await makeGetRequest("/maestros/tipoArquitecturaMhc");
    return data;
  } catch (e) {
    throw e;
  }
}
export async function fetchTipoMaterialConst() {
  try {
    let data;
    data = await makeGetRequest("/maestros/tipoMaterialConst");
    return data;
  } catch (e) {
    throw e;
  }
}
export async function fetchAfecNaturales() {
  try {
    let data;
    data = await makeGetRequest("/maestros/afecNaturales");
    return data;
  } catch (e) {
    throw e;
  }
}
export async function fetchAfecAntropicas() {
  try {
    let data;
    data = await makeGetRequest("/maestros/afecAntropicas");
    return data;
  } catch (e) {
    throw e;
  }
}

export async function fetchInterConservacion() {
  try {
    let data;
    data = await makeGetRequest("/maestros/interConservacion");
    return data;
  } catch (e) {
    throw e;
  }
}

export async function fetchElemArquitectonico() {
  try {
    let data;
    data = await makeGetRequest("/maestros/elemArquitectonico");
    return data;
  } catch (e) {
    throw e;
  }
}
export async function fetchPartRegistral() {
  try {
    let data;
    data = await makeGetRequest("/maestros/tipoParRegistral");
    return data;
  } catch (e) {
    throw e;
  }
}





export async function fetchFilEstilistica() {
  try {
    let data;
    data = await makeGetRequest("/maestros/filEstilistica");
    return data;
  } catch (e) {
    throw e;
  }
}
export async function fetchEstElemEstructuraAcabado() {
  try {
    let data;
    data = await makeGetRequest("/maestros/estElemEstructuraAcabado");
    return data;
  } catch (e) {
    throw e;
  }
}
export async function fetchInterInmueble() {
  try {
    let data;
    data = await makeGetRequest("/maestros/interInmueble");
    return data;
  } catch (e) {
    throw e;
  }
}

export async function fetchCatInmuebleDPCN() {
  try {
    let data;
    data = await makeGetRequest("/maestros/inmuebleDPCN");
    return data;
  } catch (e) {
    throw e;
  }
}

// get Departamentos, provincias, distritos
export async function getDepartamentos() {
  try {
    const data = await makeGetRequest("/maestros/buscar/departamento");
    return data.data;
  } catch (e) {
    throw e;
  }
}

export async function getProvincias(idDepartamento) {
  try {
    const data = await makeGetRequest(
      "/maestros/buscar/provincia/" + idDepartamento
    );
    return data.data;
  } catch (e) {
    throw e;
  }
}
export async function getDistritos(idProvincia) {
  try {
    const data = await makeGetRequest(
      "/maestros/buscar/distrito/" + idProvincia
    );
    return data.data;
  } catch (e) {
    throw e;
  }
}

// rural
export async function fetchCodUsoPredio() {
  try {
    let data;
    data = await makeGetRequest("/maestros/codUsoPredio/");
    return data;
  } catch (e) {
    throw e;
  }
}


export async function fetchClasifUso() {
  try {
    let data;
    data = await makeGetRequest("/maestros/clasificacionUso/");
    return data;

  } catch (e) {
    throw e;
  }
}

export async function fetchInscripRegPublicos() {
  try {
    let data;
    data = await makeGetRequest("/maestros/inscripcionRegistro/");
    return data;
  } catch (e) {
    throw e;
  }
}



export async function fetchFormaAdquiPredio() {
  try {
    let data;
    data = await makeGetRequest("/maestros/formaAdquisicion");
    return data;
  } catch (e) {
    throw e;
  }
}

export async function fetchConstruccionInst() {
  try {
    let data;
    data = await makeGetRequest("/maestros/construccionInst/");
    return data;
  } catch (e) {
    throw e;
  }
}

export async function fetchRiego() {
  try {
    let data;
    data = await makeGetRequest("/maestros/riegoPredio/");
    return data;
  } catch (e) {
    throw e;
  }
}

export async function fetchMaterialPredominante() {
  try {
    let data;
    data = await makeGetRequest("/maestros/mepRural/");
    return data;
  } catch (e) {
    throw e;
  }
} 

export async function fetchEstConservacion() {
  try {
    let data;
    data = await makeGetRequest("/maestros/ecsRural/");
    return data;
  } catch (e) {
    throw e;
  }
}
export async function fetchEstConstruccion() {
  try {
    let data;
    data = await makeGetRequest("/maestros/eccRural/");
    return data;
  } catch (e) {
    throw e;
  }
}


export async function fetchFormaPresentacion() {
  try {
    let data;
    data = await makeGetRequest("/maestros/formaPresentacion/");
    return data;
  } catch (e) {
    throw e;
  }
}