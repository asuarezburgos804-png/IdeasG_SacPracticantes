"use client";

import Footer from "@/components/landing/Footer";
import { usePathname } from "next/navigation";

export default function ConditionalFooter() {
  const pathname = usePathname();

  // Rutas donde NO se debe mostrar el Footer
  const hiddenRoutes = [
    "/dashboard",
    "/sistema",
    "/authentication",
    "/register/notificacion",
  ];

  // Si la ruta actual empieza con alguna de las rutas ocultas, no renderizar
  const shouldHideFooter = hiddenRoutes.some((route) =>
    pathname.startsWith(route)
  );

  if (shouldHideFooter) return null;

  return <Footer />;
}
