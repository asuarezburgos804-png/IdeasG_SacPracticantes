"use client";

import React, { useState, useEffect } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Divider,
  Button,
  Input,
  Select,
  SelectItem,
} from "@nextui-org/react";
import { buscarSolicitudes } from "@/app/services/Alexander/EmisionDeResolucion/buscarSolicitudes";
import { ModalRenderer } from "@/components/custom/custom_Alexander/CustomEmisionDeResolucion/ModalRenderer"; 
import { onDescargarResolucion } from "@/app/services/Alexander/EmisionDeResolucion/DescargarResolucion";

//Define estados y funciones que va a presentar la interraccion con el cuadro
export default function EmisionResolucion() {
  const [busqueda, setBusqueda] = useState("");
  const [resultados, setResultados] = useState([]);
  const [seleccionado, setSeleccionado] = useState(null);
  const [expediente, setExpediente] = useState("");
  const [modal, setModal] = useState({ type: "", props: {} }); // Estado único para modales

  // Efecto para búsqueda progresiva
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (busqueda.trim().length > 0) {
        const resultadosFiltrados = buscarSolicitudes(busqueda);
        setResultados(resultadosFiltrados);
      } else {
        setResultados([]);
      }
    }, 300);
    return () => clearTimeout(delayDebounceFn);
  }, [busqueda]);

  // Cuando se selecciona un resultado
  const handleSeleccionar = (item) => {
    setSeleccionado(item);
    setExpediente(item.expediente);
  };

  return (
    <div className="p-4 max-w-lg mx-auto">
      <Card>
        <CardHeader>
          <h2 className="text-xl font-bold">Emision de Resolucion</h2>
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
                onPress={() => setSeleccionado(null)}
                className="mb-2"
              >
                &lt;&lt; Volver atrás
              </Button>
              <div className="mb-2">
                <strong>N° de Expediente:</strong> {expediente}
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
              <Button color="primary" onPress={() => onDescargarResolucion(seleccionado)}>
                Descargar Resolución
              </Button>
            </>
          )}
        </CardBody>
      </Card>

      {/* Renderizado de modales con ModalRenderer */}
      <ModalRenderer
        modal={modal}
        closeModal={() => setModal({ type: "" })}
      />
    </div>
  );
}
