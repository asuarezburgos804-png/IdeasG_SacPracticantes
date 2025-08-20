import React, { useRef, useState } from "react";
import { Button } from "@nextui-org/react";
import { Icon } from "@iconify/react";

export default function CustomFileUpload({
  onFileChange,
  file,
  acceptTypes = "application/pdf,image/jpeg,image/png",
  onClose,
}) {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);
  const dropZoneRef = useRef(null);

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

    // Valid extensions and types
    const validExtensions = ["pdf", "jpg", "jpeg", "png"];
    const validTypes = ["application/pdf", "image/jpeg", "image/png"];

    // Check extension
    const ext = file.name.split(".").pop().toLowerCase();
    const isValidExt = validExtensions.includes(ext);
    const isValidType = validTypes.includes(file.type);

    if (!isValidExt || !isValidType) {
      onFileChange(null);
      return;
    }

    // Validate file size (max 5MB)
    const maxSizeInBytes = 5 * 1024 * 1024; // 5MB in bytes
    if (file.size > maxSizeInBytes) {
      onFileChange(null);
      return;
    }

    onFileChange(file);
    if (onClose) onClose(); // Close the modal after file selection
  };

  // Convert acceptTypes to human-readable format for display
  const displayTypes = "PDF, JPG, JPEG, PNG";

  return (
    <div className="pb-8">
      <div
        ref={dropZoneRef}
        className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
          isDragging ? "border-verdeVeci bg-verdeVeci-50" : "border-default-300"
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <Icon
          icon="lucide:upload-cloud"
          className="w-12 h-12 mx-auto text-default-400"
        />
        <p className="mt-2 text-default-600">
          Arrastra y suelta tu archivo aquí o
        </p>
        <Button
          variant="flat"
          size="sm"
          className="mt-2 bg-verdeVeci text-white"
          onPress={() => fileInputRef.current?.click()}
        >
          Selecciona un archivo
        </Button>
        <p className="mt-2 text-tiny text-default-400">
          {displayTypes} - Máximo 5MB
        </p>
        <input
          ref={fileInputRef}
          type="file"
          accept={acceptTypes}
          onChange={handleFileChange}
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
