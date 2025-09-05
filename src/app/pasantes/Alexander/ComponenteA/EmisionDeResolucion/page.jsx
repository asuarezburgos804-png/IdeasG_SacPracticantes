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
import { obtenerResoluciones } from "@/app/services/Alexander/AsesoriaLegal/obtenerResoluciones";
import { descargarResolucion } from "@/app/services/Alexander/AsesoriaLegal/descargarResolucion";
import { buscarResoluciones } from "@/app/services/Alexander/AsesoriaLegal/buscarResoluciones";
import SuccessModal from "@/components/custom/custom_Alexander/CustomMesaDeParte/successModal";
import ErrorModal from "@/components/custom/custom_Alexander/CustomMesaDeParte/errorModal";

export default function EmisionResolucion() {
  const [resoluciones, setResoluciones] = useState([]);
  const [seleccionado, setSeleccionado] = useState(null);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [busqueda, setBusqueda] = useState("");
  const [cargando, setCargando] = useState(false);

  // Efecto para búsqueda con debounce - maneja carga inicial y búsquedas
  useEffect(() => {
    const timer = setTimeout(() => {
      const loadResoluciones = async () => {
        setCargando(true);
        try {
          if (busqueda.trim() === "") {
            await obtenerResoluciones(
              setResoluciones,
              setErrorMessage,
              setError
            );
          } else {
            await buscarResoluciones(
              busqueda,
              setResoluciones,
              setErrorMessage,
              setError
            );
          }
        } catch (error) {
          console.error("Error cargando resoluciones:", error);
          setErrorMessage(
            "Error al cargar las resoluciones. Por favor, intente más tarde."
          );
          setError(true);
        } finally {
          setCargando(false);
        }
      };
      loadResoluciones();
    }, 500); // Debounce de 500ms

    return () => clearTimeout(timer);
  }, [busqueda]);

  const handleDescargar = async () => {
    if (!seleccionado) {
      setErrorMessage("Debe seleccionar una resolución");
      setError(true);
      return;
    }

    setCargando(true);
    const result = await descargarResolucion(
      seleccionado.id_resolucion, // Usar id_resolucion (número) en lugar de id_expediente (string)
      setErrorMessage,
      setError
    );

    setCargando(false);
    if (result) {
      setSuccess(true);
    }
  };

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <Card>
        <CardHeader>
          <h2 className="text-xl font-bold">Emisión de Resolución</h2>
        </CardHeader>
        <Divider />
        <CardBody>
          {!seleccionado ? (
            <>
              <div className="mb-4">
                <Input
                  placeholder="Buscar por número de expediente, resolución, DNI, nombre o apellido..."
                  value={busqueda}
                  onChange={(e) => setBusqueda(e.target.value)}
                  className="w-full"
                />
              </div>
              <div className="max-h-48 overflow-y-auto border rounded">
                {cargando ? (
                  <div className="p-4 text-center text-gray-500">
                    Buscando resoluciones...
                  </div>
                ) : resoluciones.length > 0 ? (
                  <table className="min-w-full">
                    <thead>
                      <tr className="bg-gray-100">
                        <th className="text-left p-2">N° Resolución</th>
                        <th className="text-left p-2">N° Expediente</th>
                        <th className="text-left p-2">Administrado</th>
                        <th className="text-left p-2">Fecha Resolución</th>
                      </tr>
                    </thead>
                    <tbody>
                      {resoluciones.map((resolucion) => (
                        <tr
                          key={resolucion.id_resolucion}
                          className="border-b hover:bg-blue-100 cursor-pointer"
                          onClick={() => setSeleccionado(resolucion)}
                        >
                          <td className="p-2">
                            {resolucion.numero_resolucion}
                          </td>
                          <td className="p-2">{resolucion.nro_expediente}</td>
                          <td className="p-2">{resolucion.nombre_completo}</td>
                          <td className="p-2">{resolucion.fecha_resolucion}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ) : (
                  <div className="p-2 text-gray-500">
                    No hay resoluciones disponibles
                  </div>
                )}
              </div>
            </>
          ) : (
            <>
              <Button
                size="sm"
                variant="light"
                onPress={() => setSeleccionado(null)}
                className="mb-2"
              >
                &lt;&lt; Volver atrás
              </Button>
              <div className="mb-2">
                <strong>N° de Resolución:</strong>{" "}
                {seleccionado.numero_resolucion}
              </div>
              <div className="mb-2">
                <strong>N° de Expediente:</strong> {seleccionado.nro_expediente}
              </div>
              <div className="mb-2">
                <strong>Administrado:</strong> {seleccionado.nombre_completo}
              </div>
              <div className="mb-2">
                <strong>DNI:</strong> {seleccionado.dni}
              </div>
              <div className="mb-2">
                <strong>Fecha de Resolución:</strong>{" "}
                {seleccionado.fecha_resolucion}
              </div>
              <Button
                color="primary"
                onPress={handleDescargar}
                isLoading={cargando}
              >
                {cargando ? "Descargando..." : "Descargar Resolución"}
              </Button>
            </>
          )}
        </CardBody>
      </Card>

      <SuccessModal
        isOpen={success}
        onClose={() => setSuccess(false)}
        message="Resolución descargada correctamente"
      />
      <ErrorModal
        isOpen={error}
        onClose={() => setError(false)}
        message={errorMessage || "Error al descargar resolución"}
      />
    </div>
  );
}
