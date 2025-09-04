"use client";
import { useEffect } from "react";
import { useCliente } from "./ClienteProvider";
import environment from "@/config/enviroment";

export default function DynamicHead() {
  const { clienteData } = useCliente();

  useEffect(() => {
    if (clienteData) {
      // Solo cambia el título si existe
      if (clienteData.titulofavicon) {
        document.title = clienteData.titulofavicon;
      }
      
      // Solo cambia el favicon si existe
      if (clienteData.favicon) {
        const favicon = document.querySelector("link[rel='icon']");
        if (favicon) {
          const faviconUrl = environment.url_backend_master + clienteData.favicon;
          favicon.href = faviconUrl;
        }
      }
    }
  }, [clienteData]);

  return null;
}