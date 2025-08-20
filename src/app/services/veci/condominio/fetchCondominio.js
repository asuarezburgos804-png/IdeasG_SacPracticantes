import {
    makeGetRequest,
    makePostRequest,
    makeDeleteRequest,
    makePutRequest,
} from "@/utils/api/api";
import { getFileExcel } from "@/utils/api/apiFiles";

//RESIDENTE

//VIVIENDA
export async function fetchVivienda() {
    try {
        let data;
        data = await makeGetRequest("/veci/condominio/vivienda/listar");
        console.log("FetchVivienda data:", data);
        return data;
    } catch (e) {
        throw e;
    }
}