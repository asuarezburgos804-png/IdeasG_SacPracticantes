"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { getIdClienteBySubdominio } from "@/app/services/suite/suiteMaster";

const ClienteContext = createContext();

export function useCliente() {
  const context = useContext(ClienteContext);
  
  // Protección: si el contexto no existe, devolver valores por defecto
  if (!context) {
    console.warn("useCliente() usado fuera de ClienteProvider, devolviendo valores por defecto");
    return {
      clienteId: null,
      tipoCliente: null,
      clienteData: null,
      loading: false
    };
  }
  
  return context;
}

export default function ClienteProvider({ children }) {
  const [clienteId, setClienteId] = useState(null);
  const [tipoCliente, setTipoCliente] = useState(null);
  const [clienteData, setClienteData] = useState(null);
  const [loading, setLoading] = useState(true);

  const getSubdomain = () => {
    if (typeof window === "undefined") return null;
    const host = window.location.hostname;
    const port = window.location.port;
    if (host === "localhost") {
      const params = new URLSearchParams(window.location.search);
      const subdomainParam = params.get("subdomain");
      if (subdomainParam) return subdomainParam;
      return `localhost:${port}`;
    }
    if (host.split(".").length > 2) return host;
    return null;
  };

  useEffect(() => {
    const fetchClienteId = async () => {
      try {
        const subdomain = getSubdomain();
        // console.log("Subdominio detectado:", subdomain);
        
        if (!subdomain) {
          console.log("No hay subdominio, finalizando carga");
          setLoading(false);
          return;
        }
        
        const response = await getIdClienteBySubdominio(subdomain);
        // console.log("Respuesta del cliente:", response);
        
        if (response && response.id) {
          setClienteId(response.id.toString());
          setTipoCliente(response.tipo_cliente || null);
          setClienteData(response);

          if (typeof window !== "undefined") {
            document.documentElement.style.setProperty('--color-primary', response.color_principal || '#000');
            document.documentElement.style.setProperty('--color-secondary', response.color_secundario || '#fff');
            document.documentElement.style.setProperty('--color-tertiary', response.color_terciario || '#ccc');
          }

          // console.log("Cliente configurado correctamente:", response.tipo_cliente);
        } else {
          console.log("No se obtuvo cliente válido");
        }
      } catch (error) {
        console.error("Error obteniendo cliente:", error);
        // En caso de error, puedes decidir si asignar valores por defecto
        // setTipoCliente("default");
      } finally {
        // console.log("Finalizando carga del cliente - loading: false");
        setLoading(false);
      }
    };

    fetchClienteId();
  }, []);

  return (
    <ClienteContext.Provider value={{ clienteId, tipoCliente, clienteData, loading }}>
      {children}
    </ClienteContext.Provider>
  );
}