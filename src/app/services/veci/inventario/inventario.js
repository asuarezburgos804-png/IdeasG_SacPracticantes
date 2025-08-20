import { makeGetRequest } from "@/utils/api/api";

export async function fetchArticulo() {
    try {
        let data;
        data = await makeGetRequest("/veci/inventario/articulo/listar");
        return data;
    } catch (e) {
        throw e;
    }
}

export async function fetchStock() {
    try {
        let data;
        data = await makeGetRequest("/veci/inventario/articulo/listar/stock");
        return data;
    } catch (e) {
        throw e;
    }
}

export async function fetchTransaccionesInsumos() {
    try {
        let data;
        data = await makeGetRequest("/veci/inventario/transaccion/listar/insumos");
        return data;
    } catch (e) {
        throw e;
    }
}

export async function fetchTransaccionesMateriales() {
    try {
        let data;
        data = await makeGetRequest("/veci/inventario/transaccion/listar/materiales");
        return data;
    } catch (e) {
        throw e;
    }
}