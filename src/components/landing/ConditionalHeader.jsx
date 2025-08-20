"use client";

import Header from "@/components/landing/header";
import { usePathname } from "next/navigation";

export default function ConditionalHeader() {
  const pathname = usePathname();

  // Rutas donde NO se debe mostrar el Header
  const hiddenRoutes = [
    "/dashboard",
    "/sistema",
    "/authentication",
    "/register/notificacion",
  ];

  // Si la ruta actual empieza con alguna de las rutas ocultas, no renderizar
  const shouldHideHeader = hiddenRoutes.some((route) =>
    pathname.startsWith(route)
  );

  if (shouldHideHeader) return null;

  return <Header />;
}
