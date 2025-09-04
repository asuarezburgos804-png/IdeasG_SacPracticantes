import {
    makeGetRequest,
    makePostRequest,
    makePutRequest,
    makeDeleteRequest,
    makeGetRequestGeoservicios,
    makeGetRequestOpenlayer,
} from "@/utils/api/api";

export async function getRespuestasEncuesta(listIdaq) {
    const body = {
        listIdaq
    }
    
    const data = await makePostRequest(
        "/movil/obtener/respuestas/encuesta",body
    );
    return data;
}

export async function getCapas(titulo) {
    const data = await makeGetRequest(
        "/suite/sgc/capas/user/"+titulo
    );
    return data;
}

export async function getCapasInvitado(titulo) {
    const data = await makeGetRequest(
        "/suite/sgc/capas/"+titulo
    );
    return data;
}

export async function getCapasCamposByIdRol() {
    const data = await makeGetRequest(
        "/suite/sgc/capa/campos/rol"
    );
    return data;
}

export async function getCapasCamposByIdRolIdCapa(id_capa) {
    const data = await makeGetRequest(
        "/suite/sgc/capa/campos/rol/"+id_capa
    );
    return data;
}

export async function getCapasCamposByInvitado(titulo) {
    const data = await makeGetRequest(
        "/suite/sgc/capas/campos/"+titulo
    );
    return data;
}

export async function getCapasCamposByInvitadoIdCapa(titulo,id_capa) {
    const data = await makeGetRequest(
        "/suite/sgc/capas/campos/"+titulo+"/"+id_capa
    );
    return data;
}



