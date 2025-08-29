"use client";

import React, { useState } from "react";
import { Card, CardHeader, CardBody, Divider, Button, Input, Select, SelectItem } from "@nextui-org/react";
import SuccessModal from "@/components/custom/custom_Alexander/successModal";
import ErrorModal from "@/components/custom/custom_Alexander/errorModal";

// Simulación de búsqueda (reemplazar)
// Consultar al backend para obtener datos reales
const administradosMock = [
  { dni: "20007487", nombre: "MAMANI RIOS, LUCIO", fecha: "2019-03-14" },
  { dni: "02484926", nombre: "VILCA AYAMAMANI, RITHA CORINA", fecha: "2019-03-14" },
  
  // falta completar la vinculacion con la base de datos
];

// Simulación de técnicos (reemplazar con servicio real)
// Consultar al backend para obtener datos reales
const tecnicosMock = [
  { value: "tec1", label: "Técnico 1" },
  { value: "tec2", label: "Técnico 2" },
];
// Completar si hace falta

//Define estados y funciones que va a presentar la interraccion con el cuadro
export default function MesaDePartesRol() {
  const [busqueda, setBusqueda] = useState("");
  const [resultados, setResultados] = useState([]);
  const [seleccionado, setSeleccionado] = useState(null);
  const [expediente, setExpediente] = useState("");
  const [tecnico, setTecnico] = useState("");
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  // Buscar administradores
  const handleBuscar = () => {
    const res = administradosMock.filter(
      a =>
        a.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
        a.dni.includes(busqueda)
    );
    setResultados(res);
  };

  // Registrar solicitud
  const handleRegistrar = () => {
    if (!expediente || !tecnico || !seleccionado) {
      setError(true);
      return;
    }
    // Aquí iría el llamado al servicio real osea la llamada al backend 
    // para guardar la solicitud  
    setSuccess(true);
    // Limpia el formulario para cuando se complete o cierre
    setExpediente("");
    setTecnico("");
    setSeleccionado(null);
    setResultados([]);
    setBusqueda("");
  };

  //Esta parte es la que visualiza
  return (
    <div className="p-4 max-w-lg mx-auto">
      <Card>
        <CardHeader>
          <h2 className="text-xl font-bold">Mesa de partes</h2>
        </CardHeader>
        <Divider />
        <CardBody>
          {!seleccionado ? (
            <>
              <Input
                label="Buscar por nombre o DNI"
                value={busqueda}
                onChange={e => setBusqueda(e.target.value)}
                className="mb-2"
              />
              <Button color="primary" onPress={handleBuscar} className="mb-2">
                Buscar
              </Button>
              <div className="max-h-48 overflow-y-auto border rounded">
                {resultados.map(a => (
                  <div
                    key={a.dni}
                    className="p-2 hover:bg-blue-100 cursor-pointer flex justify-between"
                    onClick={() => setSeleccionado(a)}
                  >
                    <span>{a.dni} | {a.nombre}</span>
                    <span>{a.fecha}</span>
                  </div>
                ))}
                {resultados.length === 0 && <div className="p-2 text-gray-500">Sin resultados</div>}
              </div>
            </>
          ) : (
            <>
              <Button size="sm" variant="light" onPress={() => setSeleccionado(null)} className="mb-2">
                &lt;&lt; Volver atrás
              </Button>
              <div className="mb-2">
                <b>Expediente:</b> <span>Visualizar</span>
              </div>
              <Input label="Administrado" value={seleccionado.nombre} readOnly className="mb-2" />
              <Input label="DNI" value={seleccionado.dni} readOnly className="mb-2" />
              <Input label="Fecha de reg." value={seleccionado.fecha} readOnly className="mb-2" />
              <Input
                label="N° de expediente"
                value={expediente}
                onChange={e => setExpediente(e.target.value)}
                className="mb-2"
              />
              <Select
                label="Técnico"
                value={tecnico}
                onChange={e => setTecnico(e.target.value)}
                className="mb-2"
              >
                {tecnicosMock.map(t => (
                  <SelectItem key={t.value} value={t.value}>
                    {t.label}
                  </SelectItem>
                ))}
              </Select>
              <Button color="primary" onPress={handleRegistrar}>
                Registrar
              </Button>
            </>
          )}
        </CardBody>
      </Card>
      <SuccessModal
        isOpen={success}
        onClose={() => setSuccess(false)}
        message="Registro exitoso"
      />
      <ErrorModal
        isOpen={error}
        onClose={() => setError(false)}
        message="Completa todos los campos"
      />
    </div>
  );
}