"use client";

import React, { useState, useEffect } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Divider,
  Button,
  Input,
  Checkbox,
} from "@nextui-org/react";
import { buscarExpedientes } from "@/app/services/Alexander/AsesoriaLegal/buscarExpedientes";
import { verificarTitularidad } from "@/app/services/Alexander/AsesoriaLegal/verificarTitularidad";
import SuccessModal from "@/components/custom/custom_Alexander/CustomMesaDeParte/successModal";
import ErrorModal from "@/components/custom/custom_Alexander/CustomMesaDeParte/errorModal";

export default function VerificacionTitularidad() {
  const [busqueda, setBusqueda] = useState("");
  const [resultados, setResultados] = useState([]);
  const [seleccionado, setSeleccionado] = useState(null);
  const [tituloVerificado, setTituloVerificado] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // Efecto para búsqueda progresiva
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (busqueda.trim().length > 0) {
        buscarExpedientes(busqueda, setResultados, setErrorMessage, setError);
      } else {
        setResultados([]);
      }
    }, 300);
    return () => clearTimeout(delayDebounceFn);
  }, [busqueda]);

  const handleVerificar = async () => {
    if (!seleccionado) {
      setErrorMessage("Debe seleccionar un expediente");
      setError(true);
      return;
    }

    const result = await verificarTitularidad(
      seleccionado.id_expediente,
      tituloVerificado,
      setSuccess,
      setErrorMessage,
      setError
    );

    if (result) {
      // Limpiar formulario después de éxito
      setTituloVerificado(false);
      setSeleccionado(null);
      setResultados([]);
      setBusqueda("");
    }
  };

  return (
    <div className="p-4 max-w-lg mx-auto">
      <Card>
        <CardHeader>
          <h2 className="text-xl font-bold">
            Asesoría Legal - Verificación de Titularidad
          </h2>
        </CardHeader>
        <Divider />
        <CardBody>
          {!seleccionado ? (
            <>
              <Input
                label="Ingrese el DNI o nombre del administrado"
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
                className="mb-2"
              />
              <div className="max-h-48 overflow-y-auto border rounded">
                {resultados.length > 0 ? (
                  <table className="min-w-full">
                    <thead>
                      <tr className="bg-gray-100">
                        <th className="text-left p-2">N° Expediente</th>
                        <th className="text-left p-2">DNI</th>
                        <th className="text-left p-2">Nombre</th>
                        <th className="text-left p-2">Fecha Registro</th>
                        <th className="text-left p-2">Estado</th>
                      </tr>
                    </thead>
                    <tbody>
                      {resultados.map((expediente) => (
                        <tr
                          key={expediente.id_expediente}
                          className={`border-b hover:bg-blue-100 cursor-pointer ${
                            expediente.titulo_verificado ? "bg-green-50" : ""
                          }`}
                          onClick={() => {
                            setSeleccionado(expediente);
                            setTituloVerificado(
                              expediente.titulo_verificado || false
                            );
                          }}
                        >
                          <td className="p-2">{expediente.nro_expediente}</td>
                          <td className="p-2">{expediente.dni}</td>
                          <td className="p-2">{expediente.nombre_completo}</td>
                          <td className="p-2">{expediente.fecha_registro}</td>
                          <td className="p-2 text-center">
                            {expediente.titulo_verificado ? (
                              <span className="text-green-600">
                                ✓ Verificado
                              </span>
                            ) : (
                              <span className="text-gray-400">Pendiente</span>
                            )}
                          </td>
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
                onPress={() => setSeleccionado(null)}
                className="mb-2"
              >
                &lt;&lt; Volver atrás
              </Button>
              <div className="mb-2">
                <b>Expediente:</b> <span>Visualizar</span>
              </div>
              <div className="mb-2">
                <strong>N° de expediente:</strong> {seleccionado.nro_expediente}
              </div>
              <div className="mb-2">
                <strong>Administrado:</strong> {seleccionado.nombre_completo}
              </div>
              <div className="mb-2">
                <strong>DNI:</strong> {seleccionado.dni}
              </div>
              <div className="mb-2">
                <strong>Fecha de reg.:</strong> {seleccionado.fecha_registro}
              </div>
              <Checkbox
                isSelected={tituloVerificado}
                onValueChange={setTituloVerificado}
                className="mb-4"
                isDisabled={seleccionado?.titulo_verificado}
              >
                Título de propiedad Verificado
                {seleccionado?.titulo_verificado && (
                  <span className="ml-2 text-green-600">(Ya verificado)</span>
                )}
              </Checkbox>
              <Button color="primary" onPress={handleVerificar}>
                Verificar Titularidad
              </Button>
            </>
          )}
        </CardBody>
      </Card>
      <SuccessModal
        isOpen={success}
        onClose={() => setSuccess(false)}
        message="Título de propiedad verificado correctamente"
      />
      <ErrorModal
        isOpen={error}
        onClose={() => setError(false)}
        message={errorMessage || "Error al verificar titularidad"}
      />
    </div>
  );
}
