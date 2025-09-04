"use server";
import { cookies } from "next/headers";

export async function createTokenCookie(data) {
  cookies().set({
    name: "token",
    value: data,
    // httpOnly: true,
    // secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 1000 * 60 * 60 * 24 * 30,
    path: "/",
  });
}

export async function deleteTokenCookie() {
  cookies().delete("token");
}

export async function getTokenCookie() {
  cookies().get("token");
}
