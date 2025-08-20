"use client";

import { useState } from "react";
import { Button, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter } from "@nextui-org/react";

export default function ModalResumenUnion({ 
    isOpen, 
    onClose, 
    datosResumen, 
    onConfirmar,
    onCancelar 
}) {
    const [isProcessing, setIsProcessing] = useState(false);
    
    const handleConfirmar = async () => {
        setIsProcessing(true);
        try {
            await onConfirmar();
        } finally {
            setIsProcessing(false);
        }
    };

    if (!datosResumen) return null;

    return (
        <Modal 
            isOpen={isOpen} 
            onClose={isProcessing ? undefined : onClose}
            size="2xl"
            scrollBehavior="inside"
            isDismissable={!isProcessing}
            isKeyboardDismissDisabled={isProcessing}
            classNames={{
                base: "max-h-[80vh]",
                body: "py-6",
                backdrop: "bg-[#292f46]/50 backdrop-opacity-40"
            }}
        >
            <ModalContent>
                {(onClose) => (
                    <>
                        <ModalHeader className="flex flex-col gap-1">
                            <h2 className="text-xl font-bold text-gray-800">
                                📋 Resumen de Unión de Lotes
                            </h2>
                            <p className="text-sm text-gray-600 font-normal">
                                {isProcessing ? "Procesando unión..." : "Revise los datos antes de proceder con la unión de lotes"}
                            </p>
                        </ModalHeader>
                        <ModalBody>
                            <div className="space-y-4">
                                {/* Info de sector y manzana */}
                                <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                                    <h4 className="font-medium text-gray-800 mb-2">Ubicación de la Unión:</h4>
                                    <div className="text-sm">
                                        <p><span className="font-medium">Sector:</span> {datosResumen.sector ? `${datosResumen.sector.c_cod_sector} (ID: ${datosResumen.sector.id_sector})` : '-'}</p>
                                        <p><span className="font-medium">Manzana:</span> {datosResumen.manzana ? `${datosResumen.manzana.c_cod_mzna} (ID: ${datosResumen.manzana.id_manzana})` : '-'}</p>
                                    </div>
                                </div>
                                {/* Info de lotes seleccionados */}
                                <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                                    <h4 className="font-medium text-blue-800 mb-2">Lotes Seleccionados:</h4>
                                    <div className="grid grid-cols-3 gap-2 text-sm">
                                        {datosResumen.lotes.map((lote, idx) => (
                                            <div key={idx} className="p-2 bg-white rounded border text-center">
                                                <span className="font-mono font-bold text-blue-600">{lote.c_cod_lote}</span>
                                                <div className="text-xs text-gray-600">{lote.c_nombre}</div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                {/* Nuevo código de lote */}
                                <div className="p-3 bg-purple-50 rounded-lg border border-purple-200">
                                    <h4 className="font-medium text-purple-800 mb-2">Nuevo Código de Lote:</h4>
                                    <div className="text-lg font-mono font-bold text-purple-700">{datosResumen.nuevoCodigoLote}</div>
                                </div>
                                {/* Info de resultado de unión */}
                                <div className="p-3 bg-green-50 rounded-lg border border-green-200">
                                    <h4 className="font-medium text-green-800 mb-2">Resultado de Unión:</h4>
                                    <div className="text-sm">
                                        <p><span className="font-medium">Polígonos resultantes:</span> {datosResumen.cantidadPoligonos}</p>
                                        <p><span className="font-medium">Área total:</span> {datosResumen.areaTotal ? `${datosResumen.areaTotal.toFixed(2)} m²` : "-"}</p>
                                        <p><span className="font-medium">Estado:</span> {datosResumen.cantidadPoligonos === 1 ? "✅ Unión válida" : "❌ Lotes separados"}</p>
                                    </div>
                                </div>
                                {/* Advertencia final */}
                                <div className="p-3 bg-orange-50 rounded-lg border border-orange-200">
                                    <p className="text-xs text-orange-700">
                                        <span className="font-medium">⚠️ Advertencia:</span> Esta acción enviará la unión al backend. Verifique que la información sea correcta.
                                    </p>
                                </div>
                                {/* Estado de procesamiento */}
                                {isProcessing && (
                                    <div className="p-4 bg-blue-100 rounded-lg border border-blue-300">
                                        <div className="flex items-center gap-3">
                                            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
                                            <div>
                                                <h4 className="font-medium text-blue-800">Procesando Unión</h4>
                                                <p className="text-sm text-blue-600">
                                                    Enviando datos al servidor...
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </ModalBody>
                        <ModalFooter>
                            <Button 
                                color="danger" 
                                variant="light" 
                                onPress={onCancelar}
                                isDisabled={isProcessing}
                            >
                                ❌ Cancelar
                            </Button>
                            <Button 
                                color="success" 
                                onPress={handleConfirmar}
                                isLoading={isProcessing}
                                isDisabled={isProcessing}
                            >
                                {isProcessing ? "🔄 Procesando..." : "✅ Confirmar Unión"}
                            </Button>
                        </ModalFooter>
                    </>
                )}
            </ModalContent>
        </Modal>
    );
}
