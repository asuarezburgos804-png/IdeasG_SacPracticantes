import {
  makeDeleteRequest,
  makeGetRequest,
  makePostRequest,
  makePutRequest,
} from "@/utils/api/api";

// Servicios de Sistemas
export async function getDatosSistemabyId(id_sistema) {
  try {
    const data = await makeGetRequest("/suite/manager/sistemas/datos/" + id_sistema);
    return data;
  } catch (e) {
    throw e;
  }
}

export async function saveModuloSistema(request) {
  try {
    const data = await makePostRequest("/suite/mmh/sistemas/modulo", request);
    return data;
  } catch (e) {
    throw e;
  }
}

export async function putModuloSistema(request) {
  try {
    const data = await makePutRequest("/suite/mmh/sistemas/modulo", request);
    return data;
  } catch (e) {
    throw e;
  }
}

export async function saveMenuSistema(request) {
  try {
    const data = await makePostRequest("/suite/mmh/sistemas/menu", request);
    return data;
  } catch (e) {
    throw e;
  }
}

export async function putMenuSistema(request) {
  try {
    const data = await makePutRequest("/suite/mmh/sistemas/menu", request);
    return data;
  } catch (e) {
    throw e;
  }
}


export async function saveHerramientaSistema(request) {
  try {
    const data = await makePostRequest("/suite/mmh/sistemas/herramienta", request);
    return data;
  } catch (e) {
    throw e;
  }
}

export async function putHerramientaSistema(request) {
  try {
    const data = await makePutRequest("/suite/mmh/sistemas/herramienta", request);
    return data;
  } catch (e) {
    throw e;
  }
}

export async function deleteModuloSistema(request) {
  try {
    const data = await makeDeleteRequest("/suite/mmh/sistemas/modulo/" + request);
    return data;
  } catch (e) {
    throw e;
  }
}

export async function deleteMenuSistema(request) {
  try {
    const data = await makeDeleteRequest("/suite/mmh/sistemas/menu/" + request);
    return data;
  } catch (e) {
    throw e;
  }
}

export async function deleteHerramientaSistema(id) {
  try {
    const data = await makeDeleteRequest("/suite/mmh/sistemas/herramienta/" + id);
    return data;
  } catch (e) {
    throw e;
  }
}

export async function deleteHerramientaDev(id) {
  try {
    const data = await makeDeleteRequest("/suite/mmh/sistemas/herramienta/dev/" + id);
    return data;
  } catch (e) {
    throw e;
  }
}

export async function saveAsignarHerramientaSistema(request) {
  try {
    const data = await makePostRequest("/suite/mmh/sistemas/asignar/herramienta", request);
    return data;
  } catch (e) {
    throw e;
  }
}

export async function saveAsignarGrupoHerramientaSistema(request) {
  try {
    const data = await makePostRequest("/suite/mmh/sistemas/asignar/grupo/herramienta", request);
    return data;
  } catch (e) {
    throw e;
  }
}

export async function saveDesasignarHerramientaSistema(request) {
  try {
    const data = await makePostRequest("/suite/mmh/sistemas/desasignar/herramienta", request);
    return data;
  } catch (e) {
    throw e;
  }
}

export async function saveDesasignarGrupoHerramientaSistema(request) {
  try {
    const data = await makePostRequest("/suite/mmh/sistemas/desasignar/grupo/herramienta", request);
    return data;
  } catch (e) {
    throw e;
  }
}

export async function getSistemas() {
  try {
    const data = await makeGetRequest("/suite/manager/sistemas");
    return data;
  } catch (e) {
    throw e;
  }
}

export async function getSistemasById(id) {
  try {
    const data = await makeGetRequest("/suite/manager/sistemas/"+id);
    return data;
  } catch (e) {
    throw e;
  }
}

export async function getSistemabyIdCliente(id_cliente) {
  try {
    const data = await makeGetRequest("/suite/manager/sistemas/" + id_cliente);
    return data;
  } catch (e) {
    throw e;
  }
}

export async function saveSistemas(request) {
  try {
    const data = await makePostRequest("/suite/manager/sistemas", request);
    return data;
  } catch (e) {
    throw e;
  }
}

export async function putSistemas(request) {
  try {
    const data = await makePutRequest("/suite/manager/sistemas", request);
    return data;
  } catch (e) {
    throw e;
  }
}

export async function deleteSistemas(id_sistema) {
  try {
    const data = await makeDeleteRequest("/suite/manager/sistemas/" + id_sistema);
    return data;
  } catch (e) {
    throw e;
  }
}

// Servicios de Actividades
export async function getActividades() {
  try {
    const data = await makeGetRequest("/suite/manager/actividades");
    return data;
  } catch (e) {
    throw e;
  }
}

export async function getActividadesFotos() {
  try {
    const data = await makeGetRequest("/suite/manager/actividades/fotos");
    return data;
  } catch (e) {
    throw e;
  }
}

export async function saveActividades(request) {
  try {
    const data = await makePostRequest("/suite/manager/actividades", request);
    return data;
  } catch (e) {
    throw e;
  }
}

export async function postActividadesFotos(request) {
  try {
    const data = await makePostRequest("/suite/manager/actividades/fotos", request);
    return data;
  } catch (e) {
    throw e;
  }
}

export async function updateActividades(id_actividad, request) {
  try {
    const data = await makePutRequest("/suite/manager/actividades/" + id_actividad, request);
    return data;
  } catch (e) {
    throw e;
  }
}

export async function deleteActividades(id_actividad) {
  try {
    const data = await makeDeleteRequest("/suite/manager/actividades/" + id_actividad);
    return data;
  } catch (e) {
    throw e;
  }
}

export async function deleteActividadesFotos(id_foto) {
  try {
    const data = await makeDeleteRequest("/suite/manager/actividades/fotos/" + id_foto);
    return data;
  } catch (e) {
    throw e;
  }
}

// Servicios de Clientes
export async function getClientes() {
  try {
    const data = await makeGetRequest("/suite/manager/clientes");
    return data;
  } catch (e) {
    throw e;
  }
}

export async function saveHerramientaDev(request) {
  try {
    const data = await makePostRequest("/suite/mmh/sistemas/herramienta/dev", request);
    return data;
  } catch (e) {
    throw e;
  }
}

export async function putHerramientaDev(request) {
  try {
    const data = await makePutRequest("/suite/mmh/sistemas/herramienta/dev", request);
    return data;
  } catch (e) {
    throw e;
  }
}

export async function saveSuperGrupoByCliente(request) {
  try {
    const data = await makePostRequest("/suite/sgc/supergrupo", request);
    return data;
  } catch (e) {
    throw e;
  }
}

export async function putSuperGrupoByCliente(request) {
  try {
    const data = await makePutRequest("/suite/sgc/supergrupo", request);
    return data;
  } catch (e) {
    throw e;
  }
}

export async function deleteSuperGrupoByCliente(id_sg) {
  try {
    const data = await makeDeleteRequest("/suite/sgc/supergrupo/"+id_sg);
    return data;
  } catch (e) {
    throw e;
  }
}

export async function saveGrupoByIdSG(request) {
  try {
    const data = await makePostRequest("/suite/sgc/grupo", request);
    return data;
  } catch (e) {
    throw e;
  }
}

export async function putGrupoByIdSG(request) {
  try {
    const data = await makePutRequest("/suite/sgc/grupo", request);
    return data;
  } catch (e) {
    throw e;
  }
}

export async function deleteGrupoByCliente(id_grupo) {
  try {
    const data = await makeDeleteRequest("/suite/sgc/grupo/"+id_grupo);
    return data;
  } catch (e) {
    throw e;
  }
}

export async function saveCapaByIdGrupo(request) {
  try {
    const data = await makePostRequest("/suite/sgc/capa", request);
    return data;
  } catch (e) {
    throw e;
  }
}

export async function saveCapaByIdSG(request) {
  try {
    const data = await makePostRequest("/suite/sgc/capa/sg", request);
    return data;
  } catch (e) {
    throw e;
  }
}

export async function putCapaByIdGrupo(request) {
  try {
    const data = await makePutRequest("/suite/sgc/capa", request);
    return data;
  } catch (e) {
    throw e;
  }
}

export async function putCapaByIdSG(request) {
  try {
    const data = await makePutRequest("/suite/sgc/capa/sg", request);
    return data;
  } catch (e) {
    throw e;
  }
}

export async function deleteCapaByIdGrupo(id) {
  try {
    const data = await makeDeleteRequest("/suite/sgc/capa/"+id);
    return data;
  } catch (e) {
    throw e;
  }
}

export async function deleteCapaByIdSG(id) {
  try {
    const data = await makeDeleteRequest("/suite/sgc/capa/sg/"+id);
    return data;
  } catch (e) {
    throw e;
  }
}

export async function getHerramientasDev() {
  try {
    const data = await makeGetRequest("/suite/mmh/sistemas/herramienta/dev");
    return data;
  } catch (e) {
    throw e;
  }
}

export async function getIdsSistema(url_titulo) {
  try {
    const data = await makeGetRequest("/suite/manager/sistemas/ids/" + url_titulo);
    return data;
  } catch (e) {
    throw e;
  }
}

export async function getPerfilUsuario(url_titulo) {
  try {
    const data = await makeGetRequest("/suite/mmh/usuario/profile/" + url_titulo);
    return data;
  } catch (e) {
    throw e;
  }
}

export async function getPerfilInvitado(url_titulo) {
  try {
    const data = await makeGetRequest("/suite/mmh/usuario/profile/invitado/" + url_titulo);
    return data;
  } catch (e) {
    throw e;
  }
}

export async function getClientesById(id) {
  try {
    const data = await makeGetRequest("/suite/manager/clientes/" + id);
    return data;
  } catch (e) {
    throw e;
  }
}

export async function getSistemasByClientes(id) {
  try {
    const data = await makeGetRequest("/suite/manager/clientes/sistemas/" + id);
    return data;
  } catch (e) {
    throw e;
  }
}

export async function saveCliente(request) {
  try {
    const data = await makePostRequest("/suite/manager/clientes", request);
    return data;
  } catch (e) {
    throw e;
  }
}

export async function saveSistemasByCliente(request) {
  try {
    const data = await makePostRequest("/suite/manager/clientes/sistemas", request);
    return data;
  } catch (e) {
    throw e;
  }
}

export async function updateCliente(id, request) {
  try {
    const data = await makePutRequest("/suite/manager/clientes/" + id, request);
    return data;
  } catch (e) {
    throw e;
  }
}

export async function deleteSistemasByCliente(id_cliente, id) {
  try {
    const data = await makeDeleteRequest("/suite/manager/clientes/sistemas/" + id_cliente + "/" + id);
    return data;
  } catch (e) {
    throw e;
  }
}

export async function deleteCliente(id) {
  try {
    const data = await makeDeleteRequest("/suite/manager/clientes/" + id);
    return data;
  } catch (e) {
    throw e;
  }
}

// Servicios de Clientes - Sistemas
export async function getSistemasByIdCliente(id) {
  try {
    const data = await makeGetRequest("/suite/manager/sistemas/cliente/" + id);
    return data;
  } catch (e) {
    throw e;
  }
}

export async function getSistemasByIdClienteLoggin() {
  try {
    const data = await makeGetRequest("/suite/manager/sistemas/cliente/loggin");
    return data.data;
  } catch (e) {
    throw e;
  }
}

export async function postGeoportalesByIdCliente(request) {
  try {
    const data = await makePostRequest("/suite/manager/geoportales/cliente", request);
    return data;
  } catch (e) {
    throw e;
  }
}

export async function deleteGeoportalesByIdCliente(id_geoportal, id_cliente) {
  try {
    const data = await makeDeleteRequest("/suite/manager/geoportales/" + id_geoportal + "/cliente/" + id_cliente);
    return data;
  } catch (e) {
    throw e;
  }
}

// Solicitudes de Acceso
export async function saveSolicitud(request) {
  try {
    const data = await makePostRequest("/suite/manager/register/geoportal", request);
    return data;
  } catch (e) {
    throw e;
  }
}

export async function sendMessage(request) {
  try {
    const data = await makePostRequest("/suite/manager/reset/password", request);
    return data;
  } catch (e) {
    throw e;
  }
}

export async function adminNewUser(request) {
  try {
    const data = await makePostRequest("/suite/manager/admin/newuser", request);
    return data;
  } catch (e) {
    throw e;
  }
}

// Servicios de la API `suite/mmh`
export async function getSupergrupos() {
  try {
    const data = await makeGetRequest("/suite/mmh/supergrupos");
    return data;
  } catch (e) {
    throw e;
  }
}

export async function getGrupos() {
  try {
    const data = await makeGetRequest("/suite/mmh/grupos");
    return data;
  } catch (e) {
    throw e;
  }
}

export async function getDatos() {
  try {
    const data = await makeGetRequest("/suite/mmh/datos");
    return data;
  } catch (e) {
    throw e;
  }
}

export async function saveSupergrupo(request) {
  try {
    const data = await makePostRequest("/suite/mmh/supergrupos", request);
    return data;
  } catch (e) {
    throw e;
  }
}

export async function saveGrupo(request) {
  try {
    const data = await makePostRequest("/suite/mmh/grupos", request);
    return data;
  } catch (e) {
    throw e;
  }
}

export async function saveDato(request) {
  try {
    const data = await makePostRequest("/suite/mmh/datos", request);
    return data;
  } catch (e) {
    throw e;
  }
}

export async function updateSupergrupo(id, request) {
  try {
    const data = await makePutRequest("/suite/mmh/supergrupos/" + id, request);
    return data;
  } catch (e) {
    throw e;
  }
}

export async function updateGrupo(id, request) {
  try {
    const data = await makePutRequest("/suite/mmh/grupos/" + id, request);
    return data;
  } catch (e) {
    throw e;
  }
}

export async function updateDato(id, request) {
  try {
    const data = await makePutRequest("/suite/mmh/datos/" + id, request);
    return data;
  } catch (e) {
    throw e;
  }
}

export async function deleteSupergrupo(id) {
  try {
    const data = await makeDeleteRequest("/suite/mmh/supergrupos/" + id);
    return data;
  } catch (e) {
    throw e;
  }
}

export async function deleteGrupo(id) {
  try {
    const data = await makeDeleteRequest("/suite/mmh/grupos/" + id);
    return data;
  } catch (e) {
    throw e;
  }
}

export async function getSistemasModuloById(id) {
  try {
    const data = await makeGetRequest("/suite/mmh/sistemas/modulo/" + id);
    return data;
  } catch (e) {
    throw e;
  }
}

export async function getSistemasModuloByRolId(id) {
  try {
    const data = await makeGetRequest("/suite/mmh/rol/modulo/" + id);
    return data;
  } catch (e) {
    throw e;
  }
}

export async function getCapasByClienteId(id_sistema) {
  try {
    const data = await makeGetRequest("/suite/sgc/capas/cliente/"+id_sistema);
    return data;
  } catch (e) {
    throw e;
  }
}

export async function getCapasByIdSistemaIdRol(id_sistema,id_rol) {
  try {
    const data = await makeGetRequest("/suite/sgc/capas/cliente/sistema/"+id_sistema+"/rol/"+id_rol);
    return data;
  } catch (e) {
    throw e;
  }
}

export async function getCapasCamposByIdRolIdCapaPertenece(id_rol,capas_id,pertenece) {
  try {
    const data = await makeGetRequest("/suite/sgc/capas/campos/rol/"+id_rol+"/capas/"+capas_id+"/pertenece/"+pertenece);
    return data;
  } catch (e) {
    throw e;
  }
}

export async function saveAsignarHerramientaByRol(request) {
  try {
    const data = await makePostRequest("/suite/mmh/rol/asignar/herramienta", request);
    return data;
  } catch (e) {
    throw e;
  }
}

export async function saveCapaCamposByIdRol(request) {
  try {
    const data = await makePostRequest("/suite/sgc/capa/campos/rol", request);
    return data;
  } catch (e) {
    throw e;
  }
}

export async function saveAsignarCapaByIdSistema(request) {
  try {
    const data = await makePostRequest("/suite/sgc/asignar/capa", request);
    return data;
  } catch (e) {
    throw e;
  }
}

export async function saveAsignarCapaByIdSistemaIdRol(request) {
  try {
    const data = await makePostRequest("/suite/sgc/asignar/capa/rol", request);
    return data;
  } catch (e) {
    throw e;
  }
}

export async function updateVisibleLayer(request) {
  try {
    const data = await makePutRequest("/suite/sgc/visible/capa/rol", request);
    return data;
  } catch (e) {
    throw e;
  }
}

export async function saveDesasignarCapaByIdSistema(request) {
  try {
    const data = await makePostRequest("/suite/sgc/desasignar/capa", request);
    return data;
  } catch (e) {
    throw e;
  }
}

export async function saveDesasignarCapaByIdSistemaIdRol(request) {
  try {
    const data = await makePostRequest("/suite/sgc/desasignar/capa/rol", request);
    return data;
  } catch (e) {
    throw e;
  }
}

export async function saveAsignarGrupoHerramientaByRol(request) {
  try {
    const data = await makePostRequest("/suite/mmh/rol/asignar/grupo/herramienta", request);
    return data;
  } catch (e) {
    throw e;
  }
}

export async function saveAsignarGrupoCapasByIdGrupo(request) {
  try {
    const data = await makePostRequest("/suite/sgc/asignar/grupo/capa", request);
    return data;
  } catch (e) {
    throw e;
  }
}

export async function saveAsignarGrupoCapasByIdGrupoIdRol(request) {
  try {
    const data = await makePostRequest("/suite/sgc/asignar/grupo/capa/rol", request);
    return data;
  } catch (e) {
    throw e;
  }
}

export async function  saveAsignarSuperGrupoCapasByIdSG(request) {
  try {
    const data = await makePostRequest("/suite/sgc/asignar/supergrupo/capa", request);
    return data;
  } catch (e) {
    throw e;
  }
}

export async function  saveAsignarSuperGrupoCapasByIdSGIdRol(request) {
  try {
    const data = await makePostRequest("/suite/sgc/asignar/supergrupo/capa/rol", request);
    return data;
  } catch (e) {
    throw e;
  }
}

export async function  saveDesasignarSuperGrupoCapasByIdSG(request) {
  try {
    const data = await makePostRequest("/suite/sgc/desasignar/supergrupo/capa", request);
    return data;
  } catch (e) {
    throw e;
  }
}

export async function  saveDesasignarSuperGrupoCapasByIdSGIdRol(request) {
  try {
    const data = await makePostRequest("/suite/sgc/desasignar/supergrupo/capa/rol", request);
    return data;
  } catch (e) {
    throw e;
  }
}

export async function saveDesasignarGrupoCapasByIdGrupo(request) {
  try {
    const data = await makePostRequest("/suite/sgc/desasignar/grupo/capa", request);
    return data;
  } catch (e) {
    throw e;
  }
}

export async function saveDesasignarGrupoCapasByIdGrupoIdRol(request) {
  try {
    const data = await makePostRequest("/suite/sgc/desasignar/grupo/capa/rol", request);
    return data;
  } catch (e) {
    throw e;
  }
}



export async function saveDesasignarHerramientaByRol(request) {
  try {
    const data = await makePostRequest("/suite/mmh/rol/desasignar/herramienta", request);
    return data;
  } catch (e) {
    throw e;
  }
}

export async function saveDesasignarGrupoHerramientaByRol(request) {
  try {
    const data = await makePostRequest("/suite/mmh/rol/desasignar/grupo/herramienta", request);
    return data;
  } catch (e) {
    throw e;
  }
}

export async function deleteDato(id) {
  try {
    const data = await makeDeleteRequest("/suite/mmh/datos/" + id);
    return data;
  } catch (e) {
    throw e;
  }
}

// Otros servicios (sin cambios)
export async function getGeoportales() {
  try {
    const data = await makeGetRequest("/suite/geoportales");
    return data;
  } catch (e) {
    throw e;
  }
}

export async function saveGeoportal(request) {
  try {
    const data = await makePostRequest("/suite/geoportales", request);
    return data;
  } catch (e) {
    throw e;
  }
}

export async function deleteGeoportal(id) {
  try {
    const data = await makeDeleteRequest("/suite/geoportales/" + id);
    return data;
  } catch (e) {
    throw e;
  }
}
