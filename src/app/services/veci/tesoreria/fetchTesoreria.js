import { makeGetRequest } from "@/utils/api/api";

export async function fetchIngreso() {
    try {
        let data;
        data = await makeGetRequest("/veci/tesoreria/ingreso/listar");
        console.log("fetchIngreso data:", data);
        return data;
    } catch (e) {
        throw e;
    }
}

export async function fetchEgreso() {
    try {
        let data;
        data = await makeGetRequest("/veci/tesoreria/egreso/listar");
        return data;
    } catch (e) {
        throw e;
    }
}

export async function fetchEgresoDadoPartida(id_partida) {
    try {
        let data;
        data = await makeGetRequest("/veci/tesoreria/egreso/obtener/dadoPartida/" + id_partida);
        console.log("fetchEgresoDadoPartida data:", data);
        return data;
    } catch (e) {
        throw e;
    }
}

export async function fetchCajaChica() {
    try {
        let data;
        data = await makeGetRequest("/veci/tesoreria/cajaChica/listar");
        console.log("fetchCajaChica data:", data);
        return data;
    } catch (e) {
        throw e;
    }
}

export async function fetchPersonaAsociada() {
    try {
        let data;
        data = await makeGetRequest("/veci/maestros/personaAsociada");
        return data;
    } catch (e) {
        throw e;
    }
}