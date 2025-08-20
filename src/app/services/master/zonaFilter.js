import { makeGetRequest } from "@/utils/api/api";

export async function fetchCanal() {
  try {
    // const data = await makeGetRequest("/maestros/canal/obtener");
    return {}; //data;
  } catch (e) {
    throw e;
  }
}

export async function fetchSupervisor(dat) {
  try {
    const data = await makeGetRequest("/bizgis/maestros/supervisor/obtener/" + dat);
    return data;
  } catch (e) {
    throw e;
  }
}

export async function fetchVendedor(dat) {
  try {
    const data = await makeGetRequest(
      "/bizgis/maestros/vendedor/obtener/?supervisor=" + dat
    );
    return data;
  } catch (e) {
    throw e;
  }
}
