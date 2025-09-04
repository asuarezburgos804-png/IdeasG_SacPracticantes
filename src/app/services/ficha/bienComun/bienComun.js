import {
    makeGetRequest,
    makePostRequest,
    makeDeleteRequest,
    makePutRequest,
  } from "@/utils/api/api";

  //OBTENER DATA BIEN COMUN

  export async function getDataBienComun(id_ficha) {

    try {
      const data = await makeGetRequest(
        "/catastro/fcubco/obtener_ficha_bc/" + id_ficha
      );
      return data;
    } catch (e) {
      throw e;
    }
  }

//RECAPITULACION DE EDIFICIOS

  export async function postRecapitulacionEdificios(requestData) {
    try {
      const data = await makePostRequest(
        "/catastro/fcubco/recap_edificios/registrar",
        requestData
      );
      console.log("registro recp ed",data);
      return data;
    } catch (e) {
      throw e;
    }
  }
  export async function putRecapitulacionEdificios(
    requestData,
    id_recap_ed
  ) {
    try {
      const data = await makePutRequest(
        "/catastro/fcubco/recap_edificios/actualizar/" + id_recap_ed,
        requestData
      );
      return data;
    } catch (e) {
      throw e;
    }
  }
  
  export async function deleteRecapitulacionEdificios(id_recap_ed) {
    try {
      const data = await makeDeleteRequest(
        "/catastro/fcubco/recap_edificios/eliminar/" + id_recap_ed
      );
      return data;
    } catch (e) {
      throw e;
    }
  }


  //RECAPITULACION DE BIENES COMUNES

  export async function postRecapitulacionBienesComunes(requestData) {
    try {
      const data = await makePostRequest(
        "/catastro/fcubco/recap_bc_descripcion/registrar",
        requestData
      );
      
      console.log("🚀 ~ postRecapitulacionBienesComunes ~ data:", data)
      return data;
    } catch (e) {
      throw e;
    }
      
      
  }
  export async function putRecapitulacionBienesComunes(
    requestData,
    id_recap_bc
  ) {
    try {
      const data = await makePutRequest(
        "/catastro/fcubco/recap_bc_descripcion/actualizar/" + id_recap_bc,
        requestData
      );
      return data;
    } catch (e) {
      throw e;
    }
  }
  
  export async function deleteRecapitulacionBienesComunes(id_recap_bc) {
    try {
      const data = await makeDeleteRequest(
        "/catastro/fcubco/recap_bc_descripcion/eliminar/" + id_recap_bc
      );
      return data;
    } catch (e) {
      throw e;
    }
  }
  
//FETCH MANTENIMIENTO

  export async function fetchMantenimientoBC() {
    try {
      let data;
      data = await makeGetRequest("/maestros/mantenimiento_bc");
      return data;
    } catch (e) {
      throw e;
    }
  }