import React from "react";
import DefaultLanding from "./sectionPlans";
import { useCliente } from "@/components/layout/ClienteProvider";

// DEFAULTS
import DefaultGlgis from "./defaults/glgis";
import DefaultVeci from "./defaults/veci";
import DefaultBizgis from "./defaults/bizgis";

// CLIENTES
import Cliente150 from "./clientes/150";

export default function LandingSelector() {
  const { clienteId, tipoCliente, loading } = useCliente();

  // console.log("LandingSelector render - loading:", loading, "tipoCliente:", tipoCliente, "clienteId:", clienteId);

  // Protección adicional: si hay valores undefined, mostrar fallback
  if (loading === undefined || tipoCliente === undefined) {
    // console.warn("ClienteProvider no inicializado correctamente, usando fallback");
    return <DefaultLanding />;
  }

  if (loading) return <div>Cargando landing...</div>;

  // Lógica para determinar qué landing mostrar
  // Clientes Personalizados
  // if (clienteId === "150") return <Cliente150 />;

  // Defaults por tipo_cliente
  if (tipoCliente === "glgis") return <DefaultGlgis />;
  if (tipoCliente === "veci") return <DefaultVeci />;
  if (tipoCliente === "bizgis") return <DefaultBizgis />;

  // Fallback general
  return <DefaultLanding />;
}