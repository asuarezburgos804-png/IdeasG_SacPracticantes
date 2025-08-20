import {makePostRequest} from "@/utils/api/apiNetcore";

export async function juntosHogares(bodyPost) {
    const data = await makePostRequest("/juntos/hogajunt", bodyPost);
    console.log(data);
    if (data.status == 200) {
    //   mapa.getView().fit(data.data);
        window.alert("Datos registrados de forma correcta!");
    } else {
    //   window.alert("No se pudo obtener los datos");
        window.alert("No se pudo registrar los datos!");
    }
}

export async function juntosSedes(bodyPost) {
    const data = await makePostRequest("/juntos/seuniter", bodyPost);
    console.log(data);
    if (data.status == 200) {
    //   mapa.getView().fit(data.data);
        window.alert("Datos registrados de forma correcta!");
    } else {
    //   window.alert("No se pudo obtener los datos");
        window.alert("No se pudo registrar los datos!");
    }
}

export async function juntosUnidades(bodyPost) {
    const data = await makePostRequest("/juntos/uniterju", bodyPost);
    console.log(data);
    if (data.status == 200) {
    //   mapa.getView().fit(data.data);
        window.alert("Datos registrados de forma correcta!");
    } else {
    //   window.alert("No se pudo obtener los datos");
        window.alert("No se pudo registrar los datos!");
    }
}