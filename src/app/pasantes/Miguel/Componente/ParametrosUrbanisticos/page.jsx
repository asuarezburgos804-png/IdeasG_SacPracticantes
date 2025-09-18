"use client";

import React, { useState, useEffect } from "react";
import { Button, Input, Modal } from "@nextui-org/react";
import { useRouter } from "next/navigation";

export default function ParametrosUrbanisticos() {
  const router = useRouter();
  const [tab, setTab] = useState("urbanisticos");
  const [areaTerritorial, setAreaTerritorial] = useState("");
  const [areaActUrb, setAreaActUrb] = useState("");
  const [zonificacion, setZonificacion] = useState("");
  const [areaLote, setAreaLote] = useState("");
  const [modalMensaje, setModalMensaje] = useState({ open: false, tipo: "", texto: "" });
  const [expediente, setExpediente] = useState("");

  // Traer el expediente desde sessionStorage al cargar
  useEffect(() => {
    const exp = sessionStorage.getItem("expedienteVerificacion");
    if (exp) {
      const datos = JSON.parse(exp);
      setExpediente(datos.expediente);
    }
  }, []);

  const handleGuardar = () => {
    setModalMensaje({ open: true, tipo: "exito", texto: "¡Parámetros guardados correctamente!" });
    if (tab === "edificatorios") {
      setTab("urbanisticos");
    }
  };

  const handleCancelar = () => {
    setAreaTerritorial("");
    setAreaActUrb("");
    setZonificacion("");
    setAreaLote("");
    setTab("urbanisticos");
  };

  return (
    <div className="p-4 max-w-lg mx-auto">
      {/* Volver atrás */}
      <Button
        size="sm"
        variant="light"
        onPress={() => router.back()}
        className="mb-4"
      >
        &lt;&lt; Volver atrás
      </Button>

      {/* N° de expediente */}
      <div className="mb-2 font-semibold text-lg">
        N° de expediente: {expediente || "----"}
      </div>

      {/* Parámetros */}
      <div className="mb-4">
        <strong>Parámetros:</strong>{" "}
        <span
          className="text-blue-600 cursor-pointer"
          onClick={() => console.log("Editar parámetros")}
        >
          Editar parámetros
        </span>
      </div>

      {/* Tabs Urbanisticos / Edificatorios */}
      <div className="mb-4">
        <span
          className={`cursor-pointer mr-4 ${tab === "urbanisticos" ? "font-bold" : ""}`}
          onClick={() => setTab("urbanisticos")}
        >
          Urbanisticos
        </span>
        <span
          className={`cursor-pointer ${tab === "edificatorios" ? "font-bold" : ""}`}
          onClick={() => setTab("edificatorios")}
        >
          Edificatorios
        </span>
      </div>

      {/* Contenido de tabs */}
      {tab === "urbanisticos" && (
        <div className="space-y-2">
          <div>Área territorial: 500 m²</div>
          <div>Área de Act. Urb: 300 m²</div>
          <div>Zonificación: RDM-2</div>
          <div>Área de lote normativo M2: 450 m²</div>
        </div>
      )}

      {tab === "edificatorios" && (
        <div className="space-y-4">
          <div>
            <div>Área Territorial:</div>
            <Input
              placeholder="Para escribir"
              value={areaTerritorial}
              onChange={(e) => setAreaTerritorial(e.target.value)}
            />
          </div>
          <div>
            <div>Área de Act. Urb:</div>
            <Input
              placeholder="Para escribir"
              value={areaActUrb}
              onChange={(e) => setAreaActUrb(e.target.value)}
            />
          </div>
          <div>
            <div>Zonificación:</div>
            <Input
              placeholder="Para escribir"
              value={zonificacion}
              onChange={(e) => setZonificacion(e.target.value)}
            />
          </div>
          <div>
            <div>Área de lote normativo M2:</div>
            <Input
              placeholder="Para escribir"
              value={areaLote}
              onChange={(e) => setAreaLote(e.target.value)}
            />
          </div>

          {/* Botones Guardar / Cancelar */}
          <div className="flex gap-4 mt-4">
            <Button color="primary" onPress={handleGuardar} className="flex-1">
              Guardar parámetros
            </Button>
            <Button color="default" onPress={handleCancelar} className="flex-1">
              Cancelar
            </Button>
          </div>
        </div>
      )}

      {/* Modal de mensaje */}
      <Modal
        closeButton
        aria-labelledby="modal-title"
        open={modalMensaje.open}
        onClose={() => setModalMensaje({ ...modalMensaje, open: false })}
      >
        <Modal.Body>{modalMensaje.texto}</Modal.Body>
      </Modal>
    </div>
  );
}
