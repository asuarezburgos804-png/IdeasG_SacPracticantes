"use client";

import React, { useState, useEffect } from "react";
import { Button, Input, Modal, ModalContent, ModalHeader, ModalBody, Card } from "@nextui-org/react";

export default function ParametrosUrbanisticos({ onBack }) {
  const [tab, setTab] = useState("urbanisticos");
  const [areaTerritorial, setAreaTerritorial] = useState("");
  const [areaActUrb, setAreaActUrb] = useState("");
  const [zonificacion, setZonificacion] = useState("");
  const [areaLote, setAreaLote] = useState("");
  const [modalMensaje, setModalMensaje] = useState({ open: false, tipo: "", texto: "" });
  const [expediente, setExpediente] = useState("");

  // Traer expediente desde sessionStorage
  useEffect(() => {
    const exp = sessionStorage.getItem("expedienteVerificacion");
    if (exp) {
      const datos = JSON.parse(exp);
      setExpediente(datos.expediente);
    }
  }, []);

  const handleGuardar = () => {
    setModalMensaje({ open: true, tipo: "exito", texto: "¡Parámetros guardados correctamente!" });
    setTab("urbanisticos");
  };

  const handleCancelar = () => {
    setAreaTerritorial("");
    setAreaActUrb("");
    setZonificacion("");
    setAreaLote("");
    setTab("urbanisticos");
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      {/* Botón volver */}
      <Button
        size="sm"
        variant="flat"
        onPress={onBack}
        className="mb-6"
      >
        ⬅ Volver atrás
      </Button>

      {/* Expediente */}
      <Card className="p-5 mb-6 shadow-md rounded-xl border border-gray-200">
        <div className="text-gray-600">N° de expediente</div>
        <div className="text-blue-600 text-lg font-semibold">{expediente || "----"}</div>
      </Card>

      {/* Tabs */}
      <div className="flex gap-3 mb-6">
        <Button
          variant={tab === "urbanisticos" ? "solid" : "flat"}
          color="primary"
          onPress={() => setTab("urbanisticos")}
          className="flex-1"
        >
          Urbanísticos
        </Button>
        <Button
          variant={tab === "edificatorios" ? "solid" : "flat"}
          color="primary"
          onPress={() => setTab("edificatorios")}
          className="flex-1"
        >
          Edificatorios
        </Button>
      </div>

      {/* Contenido */}
      {tab === "urbanisticos" && (
        <Card className="p-6 shadow-sm rounded-xl border border-gray-200 space-y-3">
          <div className="flex justify-between">
            <span className="font-medium text-gray-700">Área territorial</span>
            <span className="text-gray-900 font-semibold">500 m²</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium text-gray-700">Área de Act. Urb</span>
            <span className="text-gray-900 font-semibold">300 m²</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium text-gray-700">Zonificación</span>
            <span className="text-gray-900 font-semibold">RDM-2</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium text-gray-700">Área de lote normativo</span>
            <span className="text-gray-900 font-semibold">450 m²</span>
          </div>
        </Card>
      )}

      {tab === "edificatorios" && (
        <Card className="p-6 shadow-sm rounded-xl border border-gray-200 space-y-5">
          <Input
            label="Área Territorial"
            placeholder="Escribe el área"
            value={areaTerritorial}
            onChange={(e) => setAreaTerritorial(e.target.value)}
          />
          <Input
            label="Área de Act. Urb"
            placeholder="Escribe el área"
            value={areaActUrb}
            onChange={(e) => setAreaActUrb(e.target.value)}
          />
          <Input
            label="Zonificación"
            placeholder="Ej: RDM-2"
            value={zonificacion}
            onChange={(e) => setZonificacion(e.target.value)}
          />
          <Input
            label="Área de lote normativo (m²)"
            placeholder="Escribe el área"
            value={areaLote}
            onChange={(e) => setAreaLote(e.target.value)}
          />

          {/* Botones */}
          <div className="flex gap-4 pt-2">
            <Button color="primary" onPress={handleGuardar} className="flex-1">
              Guardar
            </Button>
            <Button variant="flat" onPress={handleCancelar} className="flex-1">
              Cancelar
            </Button>
          </div>
        </Card>
      )}

      {/* Modal */}
      <Modal
        isOpen={modalMensaje.open}
        onClose={() => setModalMensaje({ ...modalMensaje, open: false })}
      >
        <ModalContent>
          <ModalHeader className="text-green-600 font-bold">
            ✅ {modalMensaje.tipo === "exito" ? "Éxito" : "Mensaje"}
          </ModalHeader>
          <ModalBody>
            <p>{modalMensaje.texto}</p>
          </ModalBody>
        </ModalContent>
      </Modal>
    </div>
  );
}
