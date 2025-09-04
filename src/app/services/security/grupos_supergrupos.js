import { makePostRequest, makeGetRequest } from "@/utils/api/api";

export async function getSuperGrupos(body) {
    try {
    // const value = {
    //     c_usuario: body.user,
    //     c_contrasena: body.password,
    // };
    const data = await makeGetRequest("/maestros/capas_supergrupo");
    return data;
    } catch (e) {
    throw e;
    }
}

export async function getGrupos(body) {
    try {
    // const value = {
    //     c_usuario: body.user,
    //     c_contrasena: body.password,
    // };
    const data = await makeGetRequest("/maestros/capas_grupo");
    return data;
    } catch (e) {
    throw e;
    }
}
