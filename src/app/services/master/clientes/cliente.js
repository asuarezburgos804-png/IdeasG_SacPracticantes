// src/services/cliente.js

import Cliente from "@/app/interfaces/Cliente";
import {
  makeDeleteRequest,
  makeGetRequest,
  makePostRequest,
  makePutRequest,
} from "@/utils/api/api";

const BASE_URL_Cliente = "/bizgis/servicios/cliente";

export async function fetchClientes() {
  const data = await makeGetRequest(BASE_URL_Cliente);
  console.log(data.message);
  return (data.data || []).map(Cliente.fromJson);
}

export async function fetchClienteById(id) {
  const data = await makeGetRequest(`${BASE_URL_Cliente}/${id}`);
  console.log(data.message);
  return data.data ? new Cliente(data.data) : null;
}

export async function createCliente(cliente) {
  const data = await makePostRequest(BASE_URL_Cliente, cliente.toPayload());
  console.log(data.message);
  return data.data ? new Cliente(data.data) : null;
}

export async function updateCliente(cliente) {
  const data = await makePutRequest(
    `${BASE_URL_Cliente}/${cliente.id}`,
    cliente.toPayload()
  );
  console.log(data.message);
  return data.data ? new Cliente(data.data) : null;
}

export async function deleteCliente(id) {
  const data = await makeDeleteRequest(`${BASE_URL_Cliente}/${id}`);
  console.log(data.message);
  return data.rows ?? 0;
}
