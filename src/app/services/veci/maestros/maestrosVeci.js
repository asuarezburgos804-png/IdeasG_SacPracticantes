import { makeGetRequest } from "@/utils/api/api";

export async function fetchEstadoResidente() {
    try {
        let data;
        data = await makeGetRequest("/veci/maestros/estadoResidente");
        return data;
    } catch (e) {
        throw e;
    }
}

export async function fetchJuntaVecinal() {
    try {
        let data;
        data = await makeGetRequest("/veci/maestros/juntaVecinal");
        console.log("💠Listado de juntaVecinal:", data);
        return data;
    } catch (e) {
        throw e;
    }
}

export async function fetchParentesco() {
    try {
        let data;
        data = await makeGetRequest("/veci/maestros/parentesco");
        // console.log("💠Listado de parentesco:", data);
        return data;
    } catch (e) {
        throw e;
    }
}

export async function fetchTipoMascota() {
    try {
        let data;
        data = await makeGetRequest("/veci/maestros/tipoMascota");
        return data;
    } catch (e) {
        throw e;
    }
}

export async function fetchTipoResidente() {
    try {
        let data;
        data = await makeGetRequest("/veci/maestros/tipoResidente");
        return data;
    } catch (e) {
        throw e;
    }
}

export async function fetchTipoVehiculo() {
    try {
        let data;
        data = await makeGetRequest("/veci/maestros/tipoVehiculo");
        return data;
    } catch (e) {
        throw e;
    }
}

export async function fetchEstadoArea() {
    try {
        let data;
        data = await makeGetRequest("/veci/maestros/estadoArea");
        console.log("💠Estado Area:", data);
        return data;
    } catch (e) {
        throw e;
    }
}

export async function fetchTipoArea() {
    try {
        let data;
        data = await makeGetRequest("/veci/maestros/tipoArea");
        console.log("💠Tipo Area:", data);
        return data;
    } catch (e) {
        throw e;
    }
}

export async function fetchModoUso() {
    try {
        let data;
        data = await makeGetRequest("/veci/maestros/modoUso");
        console.log("💠Modo Uso:", data);
        return data;
    } catch (e) {
        throw e;
    }
}

export async function fetchRequisitoAcceso() {
    try {
        let data;
        data = await makeGetRequest("/veci/maestros/requisitoAcceso");
        console.log("💠Requisito Acceso:", data);
        return data;
    } catch (e) {
        throw e;
    }
}

export async function fetchAreaComun() {
    try {
        let data;
        data = await makeGetRequest("/veci/areasComunes/areaComun/listar");
        console.log("💠Listado de areas comunes:", data);
        return data;
    } catch (e) {
        throw e;
    }
}

export async function fetchAreaEstadisticas() {
    try {
        let data;
        data = await makeGetRequest("/veci/areasComunes/areaComun/estadisticas");
        return data;
    } catch (e) {
        throw e;
    }
}

export async function fetchDiaSemana() {
    try {
        let data;
        data = await makeGetRequest("/veci/maestros/diaSemana");
        return data;
    } catch (e) {
        throw e;
    }
}

export async function fetchHorario() {
    try {
        let data;
        data = await makeGetRequest("/veci/areasComunes/horario/listar");
        return data;
    } catch (e) {
        throw e;
    }
}

//CONTABILIDAD
export async function fetchTipoPartida() {
    try {
        let data;
        console.log("💠Tipo partida:", data);
        data = await makeGetRequest("/veci/maestros/tipoPartida");
        return data;
    } catch (e) {
        throw e;
    }
}

export async function fetchPartida() {
    try {
        let data;
        data = await makeGetRequest("/veci/maestros/partida");
        console.log("💠Partida:", data);
        return data;
    } catch (e) {
        throw e;
    }
}

export async function fetchPartidaDadoTipo(id_tipo_partida) { //1: ingreso, 2: egreso
    try {
        let data;
        data = await makeGetRequest("/veci/maestros/partida/" + id_tipo_partida);
        console.log("💠Partida dado tipo:", data);
        return data;
    } catch (e) {
        throw e;
    }
}

export async function fetchMes() {
    try {
        let data;
        console.log("💠Mes:", data);
        data = await makeGetRequest("/veci/maestros/mes");
        return data;
    } catch (e) {
        throw e;
    }
}

export async function fetchMetodoPago() {
    try {
        let data;
        console.log("💠Metodo Pago:", data);
        data = await makeGetRequest("/veci/maestros/metodoPago");
        return data;
    } catch (e) {
        throw e;
    }
}

export async function fetchAnio() {
    try {
        let data;
        console.log("💠Años:", data);
        data = await makeGetRequest("/veci/maestros/anio");
        return data;
    } catch (e) {
        throw e;
    }
}
export async function fetchProveedor() {
    try {
        let data;
        console.log("💠Proveedores:", data);
        data = await makeGetRequest("/veci/maestros/proveedor");
        return data;
    } catch (e) {
        throw e;
    }
}

export async function fetchUnidadMedida() {
    try {
        let data;
        console.log("UnidadMedida:", data);
        data = await makeGetRequest("/veci/maestros/unidadMedida");
        return data;
    } catch (e) {
        throw e;
    }
}

