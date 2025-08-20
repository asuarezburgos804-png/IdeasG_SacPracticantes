import { makeGetRequest, makePostRequest } from "@/utils/api/api";

export default async function zoomByBox(mapa,bodyPost) {
    const data = await makePostRequest('/espaciales/extent/all',bodyPost)
    console.log(data);
    if (data.status == 'success') {
        mapa.getView().fit(data.data);
    } else {
        window.alert('No se pudo obtener los datos');
    }
}