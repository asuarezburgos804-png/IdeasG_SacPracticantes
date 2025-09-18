"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { ModalRenderer } from "@/components/custom/custom_Miguel/VerificacionTecnica/ModalRenderer";

export default function Requisitos() {
  const router = useRouter();
  const [expediente, setExpediente] = useState("");
  const [editando, setEditando] = useState(false);
  const [requisitos, setRequisitos] = useState([
    { id: 1, nombre: "Fue", estado: "-" },
    { id: 2, nombre: "Copia literal de dominio expedida por la SUNARP", estado: "-" },
    { id: 3, nombre: "Propietario", estado: "-" },
    { id: 4, nombre: "Documento que acredite el derecho para edificar", estado: "-" },
    { id: 5, nombre: "Poder de representación en caso de Personas Jurídicas", estado: "-" },
    { id: 6, nombre: "Boleta de habilidad profesional (declaraciones juradas)", estado: "-" },
  ]);

  const [modal, setModal] = useState({ type: "", props: {} });

  // Cargar expediente desde sessionStorage
  useEffect(() => {
    const expedienteGuardado = sessionStorage.getItem("expedienteVerificacion");
    if (expedienteGuardado) {
      const expedienteData = JSON.parse(expedienteGuardado);
      setExpediente(expedienteData.expediente || "");
    }
  }, []);

  // Cambiar estado de cada requisito
  const handleEstadoChange = (id, value) => {
    setRequisitos(prev =>
      prev.map(req => (req.id === id ? { ...req, estado: value } : req))
    );
  };

  // Cancelar edición (solo sale del modo edición)
  const handleCancelar = () => {
    setEditando(false);
  };

  // Guardar requisitos
  const handleGuardar = () => {
    // Validar que todos los campos estén completos
    const incompletos = requisitos.some(req => req.estado === "" || req.estado === "-");
    if (incompletos) {
      setModal({
        type: "alert",
        props: { mensaje: "Debes completar todos los requisitos antes de guardar." }
      });
      return;
    }

    setEditando(false);
    sessionStorage.setItem("requisitosGuardados", JSON.stringify(requisitos));

    setModal({
      type: "alert",
      props: { mensaje: "Requisitos guardados correctamente." }
    });
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      {/* Botón volver atrás */}
      <Button
        size="sm"
        variant="light"
        onPress={() => router.back()}
        className="mb-4"
      >
        &lt;&lt; Volver atrás
      </Button>

      {/* Número de expediente */}
      <div className="mb-6 flex items-center gap-3">
        <label className="font-semibold">N° de expediente:</label>
        <input
          type="text"
          value={expediente}
          readOnly
          placeholder="No hay expediente"
          className="border p-2 rounded w-72 bg-gray-50"
        />
      </div>

      {/* Botón de edición */}
      <div className="flex items-center gap-2 mb-4">
        <h2 className="text-lg font-semibold">Requisitos:</h2>
        <button
          onClick={() => setEditando(!editando)}
          className="text-blue-600 hover:underline"
        >
          Editar Requisitos
        </button>
      </div>

      {/* Tabla de requisitos */}
      <table className="min-w-full border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="text-left p-2">Requisito</th>
            <th className="text-left p-2">Estado</th>
          </tr>
        </thead>
        <tbody>
          {requisitos.map(req => (
            <tr key={req.id} className="border-b">
              <td className="p-2">{req.nombre}</td>
              <td className="p-2">
                {editando ? (
                  <select
                    value={req.estado === "-" ? "" : req.estado}
                    onChange={(e) => handleEstadoChange(req.id, e.target.value)}
                    className="border p-1 rounded"
                  >
                    <option value="">Seleccione</option>
                    <option value="Si cumple">Si cumple</option>
                    <option value="No cumple">No cumple</option>
                  </select>
                ) : (
                  req.estado
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Botones finales */}
      {editando && (
        <div className="flex gap-4 mt-6">
          <Button color="primary" className="flex-1" onPress={handleGuardar}>
            Guardar verificación
          </Button>
          <Button color="default" className="flex-1" onPress={handleCancelar}>
            Cancelar
          </Button>
        </div>
      )}

      {/* Modal para mensajes */}
      <ModalRenderer modal={modal} closeModal={() => setModal({ type: "" })} />
    </div>
  );
}
