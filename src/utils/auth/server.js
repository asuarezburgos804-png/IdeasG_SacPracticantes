// src/utils/auth/server.js
"use server";

import { cookies } from "next/headers";

export async function guardarIdClienteEnCookie(id_cliente) {
  cookies().set("id_cliente", id_cliente, {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7, // 7 días
  });
  return;
}
