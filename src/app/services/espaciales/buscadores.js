import {
    makeGetRequest,
    makePostRequest,
    makePutRequest,
    makeDeleteRequest,
    makeGetRequestGeoservicios,
    makeGetRequestOpenlayer,
} from "@/utils/api/api";

export async function getBuscadorViasByTipoVia(tipovia) {
    const data = await makeGetRequest(
        "/maestros/buscar/vias/mapa/" + tipovia
    );
    return data.data;
}

export async function getBuscadorCuadrasByIdVia(id_via) {
    const data = await makeGetRequest(
        "/maestros/buscar/cuadras/mapa/" + id_via
    );
    return data.data;
}

export async function getBuscadorTipoVia2(tipovia) {
    const data = await makeGetRequest(
        "/maestros/buscar/vias/mapa/" + tipovia
    );
    return data.data;
}

export async function getBuscadorSectores() {
    const data = await makeGetRequest(
        "/maestros/buscar/sector"
    );
    return data.data;
}

export async function getBuscadorManzana(id_sector) {
    const data = await makeGetRequest(
        "/maestros/buscar/manzana/"+id_sector
    );
    return data.data;
}

export async function getBuscadorLote(id_manzana) {
    const data = await makeGetRequest(
        "/maestros/buscar/lote/"+id_manzana
    );
    return data.data;
}

export async function postRegistrarNuevosLotes(body) {
    const data = await makePostRequest(
        "/maestros/buscar/crear-nuevos-lotes", body
    );
    return data.data;
}

export async function postRegistrarUnionDeLotes(body) {
    const data = await makePostRequest(
        "/maestros/buscar/unir-lotes", body
    );
    return data.data;
}
