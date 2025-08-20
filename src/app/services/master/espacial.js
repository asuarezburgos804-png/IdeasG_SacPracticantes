import {
  makeGetRequest,
  makePostRequest,
  makePostRequestFormData,
  makePutRequestFormData,
} from "@/utils/api/api";

export async function fetchNotaria() {
  try {
    const data = await makeGetRequest("/maestros/notaria/fi/notaria");
    return data.data;
  } catch (e) {
    throw e;
  }
}

export async function fetchSector() {
  try {
    const data = await makeGetRequest("/maestros/sector/fi/sector");
    return data.data;
  } catch (e) {
    throw e;
  }
}

export async function fetchManzana() {
  try {
    const data = await makeGetRequest("/maestros/manzana/fi/manzana");
    return data.data;
  } catch (e) {
    throw e;
  }
}

export async function fetchHaburbana() {
  try {
    const data = await makeGetRequest("/maestros/hahurbana/fi/haburbana");
    return data.data;
  } catch (e) {
    throw e;
  }
}

//** VIDEO/FOTO - CUADRA  */
export async function fetchVideoCuadra(dat) {
  try {
    const data = await makeGetRequest(
      "/maestros/videosCuadra/getVideoCuadra/" + dat
    );

    return data;
  } catch (e) {
    throw e;
  }
}
export async function fetchPhotoCuadra(dat) {
  try {
    const data = await makeGetRequest(
      "/maestros/fotosCuadra/obtener/fotos/" + dat
    );

    return data;
  } catch (e) {
    throw e;
  }
}
export async function fetchPostVideoCuadra(requestData) {
  try {
    const data = await makePostRequestFormData(
      "/maestros/videosCuadra/insertVideoCuadra",
      requestData
    );

    return data;
  } catch (e) {
    throw e;
  }
}

export async function fetchPutVideoCuadra(requestData) {
  try {
    const data = await makePutRequestFormData(
      "/maestros/videosCuadra/updateVideoCuadra/" + requestData.get("id_video"),
      requestData
    );

    return data;
  } catch (e) {
    throw e;
  }
}

export async function fetchPostFotoCuadra(requestData) {
  try {
    const data = await makePostRequestFormData(
      "/maestros/fotosCuadra/registrar",
      requestData
    );
    return data;
  } catch (e) {
    throw e;
  }
}

export async function fetchPutFotoCuadra(requestData) {
  try {
    const data = await makePutRequestFormData(
      "/maestros/fotosCuadra/actualizar/id_foto/" + requestData.get("id_foto"),
      requestData
    );
    return data;
  } catch (e) {
    throw e;
  }
}
