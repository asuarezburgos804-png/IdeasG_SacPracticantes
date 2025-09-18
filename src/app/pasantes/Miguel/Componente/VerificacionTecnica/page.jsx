"use client";

import React, { useState, useEffect } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Divider,
  Button,
  Input,
} from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { buscarSolicitudes } from "@/app/services/Miguel/VerificacionTecnica/buscarSolicitudes";
import { ModalRenderer } from "@/components/custom/custom_Miguel/VerificacionTecnica/ModalRenderer";
import {
  obtenerObservacionesPorExpediente,
  crearObservacion,
  obtenerVerificacionAdministrativa,
} from "@/app/services/Miguel/VerificacionTecnica/tecnicoService";

export default function EmisionResolucion() {
  const router = useRouter();
  const [busqueda, setBusqueda] = useState("");
  const [resultados, setResultados] = useState([]);
  const [seleccionado, setSeleccionado] = useState(null);
  const [verificacionData, setVerificacionData] = useState(null);
  const [modal, setModal] = useState({ type: "", props: {} });

  // Función para parsear observaciones y extraer datos de cumplimiento
  const parseObservaciones = (observaciones) => {
    const data = {
      cumpleAreaLinderos: false,
      observacionesAreaLinderos: "",
      cumpleNormasDiseno: false,
      observacionesNormasDiseno: "",
      cumpleNormasUrbanisticas: false,
      observacionesNormasUrbanisticas: "",
    };

    if (!observaciones) return data;

    // Buscar cumplimiento de área y linderos
    const areaMatch = observaciones.match(
      /Cumple con área y linderos:\s*(Sí|No)/i
    );
    if (areaMatch) {
      data.cumpleAreaLinderos = areaMatch[1].toLowerCase() === "sí";
    }

    // Buscar observaciones de área
    const obsAreaMatch = observaciones.match(
      /Observaciones área:\s*([^\n\r]*)/i
    );
    if (obsAreaMatch) {
      data.observacionesAreaLinderos = obsAreaMatch[1].trim();
    }

    // Buscar cumplimiento de normas de diseño
    const disenoMatch = observaciones.match(
      /Cumple con normas de diseño:\s*(Sí|No)/i
    );
    if (disenoMatch) {
      data.cumpleNormasDiseno = disenoMatch[1].toLowerCase() === "sí";
    }

    // Buscar observaciones de diseño
    const obsDisenoMatch = observaciones.match(
      /Observaciones diseño:\s*([^\n\r]*)/i
    );
    if (obsDisenoMatch) {
      data.observacionesNormasDiseno = obsDisenoMatch[1].trim();
    }

    // Buscar cumplimiento de normas urbanísticas
    const urbanMatch = observaciones.match(
      /Cumple con normas urbanísticas:\s*(Sí|No)/i
    );
    if (urbanMatch) {
      data.cumpleNormasUrbanisticas = urbanMatch[1].toLowerCase() === "sí";
    }

    // Buscar observaciones urbanísticas
    const obsUrbanMatch = observaciones.match(
      /Observaciones urbanísticas:\s*([^\n\r]*)/i
    );
    if (obsUrbanMatch) {
      data.observacionesNormasUrbanisticas = obsUrbanMatch[1].trim();
    }

    return data;
  };

  // Verificar si hay datos compartidos al cargar el componente
  useEffect(() => {
    const expedienteCompartido = sessionStorage.getItem(
      "expedienteVerificacion"
    );
    const origen = sessionStorage.getItem("origenVerificacion");

    if (expedienteCompartido && origen === "tecnicoVerificador") {
      const expediente = JSON.parse(expedienteCompartido);
      setSeleccionado(expediente);
    } else {
      // Si no hay datos compartidos, realizar búsqueda normal
      const delayDebounceFn = setTimeout(async () => {
        if (busqueda.trim().length > 0) {
          const resultadosFiltrados = await buscarSolicitudes(busqueda);
          setResultados(resultadosFiltrados);
        } else {
          setResultados([]);
        }
      }, 300);
      return () => clearTimeout(delayDebounceFn);
    }
  }, [busqueda]);

  // Cargar datos de verificación cuando se selecciona un expediente
  useEffect(() => {
    const loadVerificacionData = async () => {
      if (seleccionado && seleccionado.id_solicitud) {
        try {
          const data = await obtenerVerificacionAdministrativa(
            seleccionado.id_solicitud
          );
          if (data && data.success) {
            setVerificacionData(data.data);
          } else {
            setVerificacionData(null);
          }
        } catch (error) {
          console.error("Error cargando datos de verificación:", error);
          setVerificacionData(null);
        }
      } else {
        setVerificacionData(null);
      }
    };

    loadVerificacionData();
  }, [seleccionado]);

  const handleSeleccionar = (item) => {
    setSeleccionado(item);
  };

  // Función para volver atrás
  const handleVolverAtras = () => {
    const origen = sessionStorage.getItem("origenVerificacion");

    if (origen === "tecnicoVerificador") {
      // Si venimos del técnico verificador, volver allí
      sessionStorage.removeItem("origenVerificacion");
      sessionStorage.removeItem("expedienteVerificacion");
      router.push("/pasantes/Alexander/ComponenteA/RolTecnicoProg"); // Ajusta esta ruta según tu proyecto
    } else {
      // Si no, comportamiento original
      setSeleccionado(null);
    }
  };

  return (
    <div className="p-4 max-w-lg mx-auto">
      <Card>
        <CardHeader>
          <h2 className="text-xl font-bold">Verificación técnica</h2>
        </CardHeader>
        <Divider />
        <CardBody>
          {!seleccionado ? (
            <>
              <Input
                label="Ingrese nombre o DNI"
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
                className="mb-2"
              />
              <div className="max-h-48 overflow-y-auto border rounded">
                {resultados.length > 0 ? (
                  <table className="min-w-full">
                    <thead>
                      <tr className="bg-gray-100">
                        <th className="text-left p-2">DNI</th>
                        <th className="text-left p-2">Nombre</th>
                        <th className="text-left p-2">Fecha Registro</th>
                      </tr>
                    </thead>
                    <tbody>
                      {resultados.map((a) => (
                        <tr
                          key={a.id_solicitud}
                          className="border-b hover:bg-blue-100 cursor-pointer"
                          onClick={() => handleSeleccionar(a)}
                        >
                          <td className="p-2">{a.dni}</td>
                          <td className="p-2">{a.nombre_completo}</td>
                          <td className="p-2">{a.fecha_registro}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ) : (
                  <div className="p-2 text-gray-500">
                    {busqueda.trim().length > 0
                      ? "Sin resultados"
                      : "Ingrese texto para buscar"}
                  </div>
                )}
              </div>
            </>
          ) : (
            <>
              <Button
                size="sm"
                variant="light"
                onPress={handleVolverAtras}
                className="mb-2"
              >
                &lt;&lt; Volver atrás
              </Button>

              <div className="mb-2">
                <strong>Expediente:</strong>{" "}
                <span
                  className="text-blue-600 cursor-pointer underline"
                  onClick={() =>
                    setModal({
                      type: "detalleExpediente",
                      props: { data: seleccionado },
                    })
                  }
                >
                  Visualizar
                </span>
              </div>

              <div className="mb-2">
                <strong>N° de expediente:</strong> {seleccionado.expediente}
              </div>

              <div className="mb-2">
                <strong>Administrado:</strong> {seleccionado.nombre_completo}
              </div>

              {/* Enlaces de navegación */}
              <div className="space-y-1 mb-6">
                <div className="text-blue-600 cursor-pointer hover:underline">- Verificación administrativa</div>
                <div className="text-blue-600 cursor-pointer hover:underline">- Observaciones</div>
                <div className="text-blue-600 cursor-pointer hover:underline"
                onClick={() => router.push("/pasantes/Miguel/Componente/ParametrosUrbanisticos")}>
                  - Parámetros urbanísticos</div>
                <div className="text-blue-600 cursor-pointer hover:underline">- Documentos presentados</div>
                <div 
                  className="text-blue-600 cursor-pointer hover:underline font-semibold"
                  onClick={() => router.push("/pasantes/Alexander/ComponenteA/VerificacionCuadroAreas")}>
                  - Verificación cuadro de áreas
                </div>
                <div 
                  className="text-blue-600 cursor-pointer hover:underline"
                  onClick={() => router.push("/pasantes/Miguel/Componente/Requisitos")}>
                  - Requisitos
                </div>
              </div>

              {/* Botones de informe */}
              <div className="flex gap-4 mt-6">
                <Button color="danger" className="flex-1">
                  Informe de improcedente
                </Button>
                <Button color="primary" className="flex-1">
                  Informe de conformidad
                </Button>
              </div>
            </>
          )}
        </CardBody>
      </Card>

      <ModalRenderer modal={modal} closeModal={() => setModal({ type: "" })} />
    </div>
  );
}