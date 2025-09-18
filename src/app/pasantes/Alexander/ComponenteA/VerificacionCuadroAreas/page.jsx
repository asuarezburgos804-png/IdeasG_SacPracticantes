"use client";

import React, { useState, useEffect } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Divider,
  Button,
  Input,
  Textarea
} from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { obtenerPisosPorExpediente, guardarPisos } from "@/app/services/Alexander/VerificacionCuadroAreas/datosPisos";

export default function VerificacionCuadroAreas() {
  const router = useRouter();
  const [pisos, setPisos] = useState([]);
  const [modoEdicion, setModoEdicion] = useState(false);
  const [cargando, setCargando] = useState(false);
  const [mensajeExito, setMensajeExito] = useState("");

  // Obtener datos del expediente de sessionStorage o parámetros
  const [expediente, setExpediente] = useState({
    numero: "2011",
    administrado: "COLLAOMAGUA PEREZ, PERDO ANTENGRINES"
  });

  // Cargar datos al iniciar
  useEffect(() => {
    const cargarDatos = async () => {
      // Obtener datos del expediente desde sessionStorage
      const expedienteGuardado = sessionStorage.getItem('expedienteVerificacion');
      if (expedienteGuardado) {
        const expedienteData = JSON.parse(expedienteGuardado);
        setExpediente({
          numero: expedienteData.expediente || "",
          administrado: expedienteData.nombre_completo || ""
        });
      }

      // Cargar pisos
      setCargando(true);
      try {
        const datosPisos = await obtenerPisosPorExpediente(expediente.numero);
        setPisos(datosPisos);
      } catch (error) {
        console.error("Error al cargar pisos:", error);
      } finally {
        setCargando(false);
      }
    };

    cargarDatos();
  }, []);

  // Manejar cambios en los campos de los pisos
  const handleCambioPiso = (id, campo, valor) => {
    setPisos(prevPisos => 
      prevPisos.map(piso => 
        piso.id === id ? { ...piso, [campo]: valor } : piso
      )
    );
  };

  // Agregar nuevo piso
  const handleAgregarPiso = () => {
    const nuevoNumero = pisos.length > 0 ? Math.max(...pisos.map(p => p.numero)) + 1 : 1;
    const nuevoPiso = {
      id: Date.now(),
      numero: nuevoNumero,
      existente: "",
      ampliacion: "",
      nuevo: "",
      demolicion: "",
      remodelacion: "",
      observacion: ""
    };
    setPisos([...pisos, nuevoPiso]);
  };

  // Guardar cambios
  const handleGuardar = async () => {
    setCargando(true);
    try {
      const resultado = await guardarPisos(pisos);
      if (resultado.success) {
        setMensajeExito(resultado.message);
        setModoEdicion(false);
        setTimeout(() => setMensajeExito(""), 3000);
      }
    } catch (error) {
      console.error("Error al guardar:", error);
    } finally {
      setCargando(false);
    }
  };

  // Cancelar edición
  const handleCancelar = () => {
    setModoEdicion(false);
    // Recargar los datos originales
    const cargarPisosOriginales = async () => {
      const datosPisos = await obtenerPisosPorExpediente(expediente.numero);
      setPisos(datosPisos);
    };
    cargarPisosOriginales();
  };

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <Card>
        <CardHeader className="flex justify-between items-center">
          <h2 className="text-xl font-bold">Técnico verificador</h2>
          <Button
            size="sm"
            variant="light"
            onPress={() => router.back()}
          >
            &lt;&lt; Volver atrás
          </Button>
        </CardHeader>
        <Divider />
        <CardBody>
          {/* Información del expediente*/}
          <div className="mb-6">
            <div className="mb-2">
              <strong>N° de expediente:</strong> {expediente.numero}
            </div>
            <div className="mb-2">
              <strong>Administrado:</strong> {expediente.administrado}
            </div>
          </div>

          {/* Mensaje de éxito */}
          {mensajeExito && (
            <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
              {mensajeExito}
            </div>
          )}

          {/* Encabezado con botón de edición */}
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">Verificación cuadro de áreas:</h3>
            {!modoEdicion ? (
              <span 
                className="text-blue-600 cursor-pointer underline text-sm"
                onClick={() => setModoEdicion(true)}
              >
                Editar pisos
              </span>
            ) : (
              <div className="flex gap-2">
                <Button 
                  size="sm" 
                  color="primary" 
                  onPress={handleGuardar}
                  isLoading={cargando}
                >
                  Guardar
                </Button>
                <Button 
                  size="sm"
                  variant="flat" 
                  onPress={handleCancelar}
                >
                  Cancelar
                </Button>
              </div>
            )}
          </div>

          {/* Lista de pisos en modo compacto */}
          {cargando && pisos.length === 0 ? (
            <div className="text-center py-8">Cargando datos...</div>
          ) : pisos.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              No hay elementos. Sé el primero en añadir uno!
            </div>
          ) : (
            <div className="space-y-4">
              {pisos.map((piso) => (
                <div key={piso.id} className="border rounded-lg p-4 bg-gray-50">
                  <h4 className="font-semibold mb-3">Piso {piso.numero}:</h4>
                  
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Existente (m²)</label>
                      {modoEdicion ? (
                        <Input
                          size="sm"
                          value={piso.existente}
                          onChange={(e) => handleCambioPiso(piso.id, "existente", e.target.value)}
                          type="number"
                          min="0"
                          className="w-full"
                        />
                      ) : (
                        <div className="text-sm">{piso.existente || "0"}</div>
                      )}
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Ampliación (m²)</label>
                      {modoEdicion ? (
                        <Input
                          size="sm"
                          value={piso.ampliacion}
                          onChange={(e) => handleCambioPiso(piso.id, "ampliacion", e.target.value)}
                          type="number"
                          min="0"
                          className="w-full"
                        />
                      ) : (
                        <div className="text-sm">{piso.ampliacion || "0"}</div>
                      )}
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Nuevo (m²)</label>
                      {modoEdicion ? (
                        <Input
                          size="sm"
                          value={piso.nuevo}
                          onChange={(e) => handleCambioPiso(piso.id, "nuevo", e.target.value)}
                          type="number"
                          min="0"
                          className="w-full"
                        />
                      ) : (
                        <div className="text-sm">{piso.nuevo || "0"}</div>
                      )}
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Demolición (m²)</label>
                      {modoEdicion ? (
                        <Input
                          size="sm"
                          value={piso.demolicion}
                          onChange={(e) => handleCambioPiso(piso.id, "demolicion", e.target.value)}
                          type="number"
                          min="0"
                          className="w-full"
                        />
                      ) : (
                        <div className="text-sm">{piso.demolicion || "0"}</div>
                      )}
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Remodelación (m²)</label>
                      {modoEdicion ? (
                        <Input
                          size="sm"
                          value={piso.remodelacion}
                          onChange={(e) => handleCambioPiso(piso.id, "remodelacion", e.target.value)}
                          type="number"
                          min="0"
                          className="w-full"
                        />
                      ) : (
                        <div className="text-sm">{piso.remodelacion || "0"}</div>
                      )}
                    </div>
                    
                    <div className="col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1">Observación</label>
                      {modoEdicion ? (
                        <Textarea
                          size="sm"
                          value={piso.observacion}
                          onChange={(e) => handleCambioPiso(piso.id, "observacion", e.target.value)}
                          minRows={1}
                          className="w-full"
                        />
                      ) : (
                        <div className="text-sm">{piso.observacion || "-"}</div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Botón para agregar más pisos en modo edición */}
          {modoEdicion && (
            <div className="mt-4">
              <span 
                className="text-blue-600 cursor-pointer underline text-sm"
                onClick={handleAgregarPiso}
              >
                Agregar más pisos
              </span>
            </div>
          )}
        </CardBody>
      </Card>
    </div>
  );
}