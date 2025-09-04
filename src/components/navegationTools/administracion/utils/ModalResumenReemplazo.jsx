"use client";

import { useState } from "react";
import { Button, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter } from "@nextui-org/react";

export default function ModalResumenReemplazo({ 
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
            size="3xl"
            scrollBehavior="inside"
            isDismissable={!isProcessing}
            isKeyboardDismissDisabled={isProcessing}
            classNames={{
                base: "max-h-[90vh]",
                body: "py-6",
                backdrop: "bg-[#292f46]/50 backdrop-opacity-40"
            }}
        >
            <ModalContent>
                {(onClose) => (
                    <>
                        <ModalHeader className="flex flex-col gap-1">
                            <h2 className="text-xl font-bold text-gray-800">
                                📋 Resumen del Reemplazo
                            </h2>
                            <p className="text-sm text-gray-600 font-normal">
                                {isProcessing ? "Procesando reemplazo..." : "Revise los datos antes de proceder con el reemplazo del lote"}
                            </p>
                        </ModalHeader>
                        
                        <ModalBody>
                            <div className="space-y-4">
                                {/* Header del resumen */}
                                <div className="p-4 bg-blue-50 rounded-lg border-l-4 border-blue-400">
                                    <h3 className="text-lg font-semibold text-blue-800 mb-2">
                                        🎯 Confirmación de Reemplazo
                                    </h3>
                                    <p className="text-sm text-blue-600">
                                        {isProcessing ? "Enviando datos al servidor..." : "Verifique que toda la información sea correcta antes de continuar."}
                                    </p>
                                </div>

                                {/* Información del lote a reemplazar */}
                                <div className="p-3 bg-red-50 rounded-lg border border-red-200">
                                    <h4 className="font-medium text-red-800 mb-2">📍 Lote a Reemplazar:</h4>
                                    <div className="text-sm space-y-1">
                                        <p><span className="font-medium">Sector:</span> {datosResumen.lote_a_reemplazar.codigo_sector} (ID: {datosResumen.lote_a_reemplazar.id_sector})</p>
                                        <p><span className="font-medium">Manzana:</span> {datosResumen.lote_a_reemplazar.codigo_manzana} (ID: {datosResumen.lote_a_reemplazar.id_manzana})</p>
                                        <p><span className="font-medium">Lote:</span> {datosResumen.lote_a_reemplazar.codigo_lote} (ID: {datosResumen.lote_a_reemplazar.id_lote})</p>
                                    </div>
                                </div>

                                {/* Información del archivo */}
                                <div className="p-3 bg-green-50 rounded-lg border border-green-200">
                                    <h4 className="font-medium text-green-800 mb-2">📂 Archivo de Origen:</h4>
                                    <div className="text-sm space-y-1">
                                        <p><span className="font-medium">Nombre:</span> {datosResumen.nuevos_lotes[0]?.archivo_origen.nombre}</p>
                                        <p><span className="font-medium">Tipo:</span> {datosResumen.nuevos_lotes[0]?.archivo_origen.tipo.toUpperCase()}</p>
                                        <p><span className="font-medium">SRS Original:</span> {datosResumen.nuevos_lotes[0]?.archivo_origen.srs_original}</p>
                                        <p><span className="font-medium">Peso:</span> {datosResumen.nuevos_lotes[0]?.archivo_origen.peso_mb.toFixed(2)} MB</p>
                                    </div>
                                </div>

                                {/* Resumen numérico */}
                                <div className="p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                                    <h4 className="font-medium text-yellow-800 mb-2">📊 Resumen Numérico:</h4>
                                    <div className="grid grid-cols-2 gap-3 text-sm">
                                        <div>
                                            <span className="font-medium">Nuevos lotes:</span>
                                            <p className="text-lg font-bold text-yellow-700">{datosResumen.resumen.total_features}</p>
                                        </div>
                                        <div>
                                            <span className="font-medium">Área total:</span>
                                            <p className="text-lg font-bold text-yellow-700">{datosResumen.resumen.area_total_nuevos.toFixed(2)} m²</p>
                                        </div>
                                        {datosResumen.resumen.area_lote_original && (
                                            <>
                                                <div>
                                                    <span className="font-medium">Área original:</span>
                                                    <p className="text-lg font-bold text-yellow-700">{datosResumen.resumen.area_lote_original} m²</p>
                                                </div>
                                                <div>
                                                    <span className="font-medium">Diferencia:</span>
                                                    <p className="text-lg font-bold text-yellow-700">
                                                        {(datosResumen.resumen.area_total_nuevos - parseFloat(datosResumen.resumen.area_lote_original)).toFixed(2)} m²
                                                    </p>
                                                </div>
                                            </>
                                        )}
                                    </div>
                                </div>

                                {/* Lista de códigos asignados */}
                                <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                                    <h4 className="font-medium text-gray-800 mb-2">🏷️ Códigos Asignados:</h4>
                                    <div className="max-h-32 overflow-y-auto">
                                        <div className="grid grid-cols-4 gap-2 text-sm">
                                            {datosResumen.nuevos_lotes.map((lote, index) => (
                                                <div key={index} className="p-2 bg-white rounded border text-center">
                                                    <span className="font-mono font-bold text-blue-600">
                                                        {lote.codigo_lote}
                                                    </span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                {/* Estado de validaciones */}
                                <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                                    <h4 className="font-medium text-gray-800 mb-2">✅ Estado de Validaciones:</h4>
                                    <div className="space-y-2 text-sm">
                                        <div className="flex items-center gap-2">
                                            <span className="text-green-600">✅</span>
                                            <span>Proximidad geográfica: {datosResumen.validaciones.proximidad?.distanciaConjunto}m</span>
                                        </div>
                                        {datosResumen.validaciones.comparacion_areas && (
                                            <div className="flex items-center gap-2">
                                                <span className="text-green-600">✅</span>
                                                <span>Comparación de áreas: {datosResumen.validaciones.comparacion_areas.porcentajeDiferencia}% de diferencia</span>
                                            </div>
                                        )}
                                        <div className="flex items-center gap-2">
                                            <span className="text-green-600">✅</span>
                                            <span>Códigos únicos y completos</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Advertencia final */}
                                <div className="p-3 bg-orange-50 rounded-lg border border-orange-200">
                                    <p className="text-xs text-orange-700">
                                        <span className="font-medium">⚠️ Advertencia:</span> Esta acción reemplazará permanentemente el lote seleccionado 
                                        con los {datosResumen.resumen.total_features} nuevos lotes. Asegúrese de que toda la información sea correcta.
                                    </p>
                                </div>

                                {/* Estado de procesamiento */}
                                {isProcessing && (
                                    <div className="p-4 bg-blue-100 rounded-lg border border-blue-300">
                                        <div className="flex items-center gap-3">
                                            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
                                            <div>
                                                <h4 className="font-medium text-blue-800">Procesando Reemplazo</h4>
                                                <p className="text-sm text-blue-600">
                                                    Enviando {datosResumen.resumen.total_features} nuevos lotes al servidor...
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
                                {isProcessing ? "🔄 Procesando..." : "✅ Confirmar Reemplazo"}
                            </Button>
                        </ModalFooter>
                    </>
                )}
            </ModalContent>
        </Modal>
    );
}