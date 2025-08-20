import React, { useRef, useState } from "react";
import { Button } from "@nextui-org/react";
import { Icon } from "@iconify/react";

export default function CustomSpatialFileUpload({ onFileChange, file, onClose, isProcessingFile = false, acceptTypes = ".zip,.geojson,.json,.kml,.dxf" }) {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);

  const validExtensions = acceptTypes.split(',').map(ext => ext.trim().toLowerCase());

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    const droppedFile = e.dataTransfer.files[0];
    validateAndSetFile(droppedFile);
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    validateAndSetFile(selectedFile);
  };

  const validateAndSetFile = (file) => {
    if (!file) return;

    // Validación por extensión
    const fileName = file.name.toLowerCase();
    const isValid = validExtensions.some(ext => fileName.endsWith(ext));

    // Validación de tamaño
    const maxSizeInBytes = 10 * 1024 * 1024; // 10MB
    if (!isValid || file.size > maxSizeInBytes) {
      onFileChange(null); // archivo inválido
      return;
    }

    onFileChange(file);
    if (onClose) onClose();
  };

  return (
    <div className="pb-8">
      <label className="block text-sm font-medium mb-2">
        Cargar archivo espacial:
      </label>
      <div
        className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
          isDragging ? "border-verdeVeci bg-verdeVeci-50" : "border-default-300"
        } ${isProcessingFile ? "opacity-50 pointer-events-none" : ""}`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <Icon
          icon="mdi:file-upload"
          className="w-12 h-12 mx-auto text-verdeVeci"
        />
        <p className="mt-2 text-verdeVeci font-medium">
          Arrastra y suelta tu archivo aquí o
        </p>
        <Button
          variant="flat"
          size="sm"
          className="mt-2 bg-verdeVeci text-white"
          onClick={() => fileInputRef.current?.click()}
          isDisabled={isProcessingFile}
        >
          Seleccionar archivo
        </Button>
        <p className="mt-2 text-tiny text-default-400">
          ZIP, GeoJSON, JSON, KML, DXF - Máximo 10MB
        </p>
        <input
          ref={fileInputRef}
          type="file"
          accept={acceptTypes}
          onChange={handleFileChange}
          disabled={isProcessingFile}
          className="hidden"
        />
        {file && (
          <p className="mt-2 text-sm text-default-600">
            Archivo seleccionado: {file.name}
          </p>
        )}
      </div>
    </div>
  );
}
