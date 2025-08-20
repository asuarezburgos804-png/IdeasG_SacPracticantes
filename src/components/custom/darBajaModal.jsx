import React, { useState } from "react";
import {
  Button,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Avatar
} from "@nextui-org/react";
import { Icon } from "@iconify/react";

import SuccessModal from "@/components/custom/successModal";
import ErrorModal from "@/components/custom/errorModal";

export default function DarBajaModal({ isOpen, onOpenChange, resident, onConfirm }) {
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [modalErrorDetail, setModalErrorDetail] = useState("");

  const handleConfirm = async () => {
    try {
      await onConfirm(); 
      setModalMessage("Residente desactivado exitosamente.");
      setIsSuccessModalOpen(true);
    } catch (error) {
      setModalMessage("Error al desactivar residente.");
      setModalErrorDetail(error.message || "Ocurrió un problema inesperado.");
      setIsErrorModalOpen(true);
    }
  };

  return (
    <>
      <SuccessModal
        isOpen={isSuccessModalOpen}
        onClose={() => {
          setIsSuccessModalOpen(false);
          onOpenChange(false); // Close the DarBajaModal after success
        }}
        modalTitle="¡Operación Exitosa!"
        modalTextContent={modalMessage}
        buttonText="Aceptar"
        showCloseButton={true}
      />

      <ErrorModal
        isOpen={isErrorModalOpen}
        onClose={() => setIsErrorModalOpen(false)}
        modalTitle="¡Ocurrió un Error!"
        message={modalMessage}
        errorDetail={modalErrorDetail}
        buttonText="Entendido"
        showCloseButton={true}
      />

      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        size="lg"
        placement="center"
        classNames={{
          base: "rounded-lg",
          header: "border-b border-divider",
          footer: "border-t border-divider"
        }}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex gap-3 items-center">
                <div className="bg-danger-100 p-2 rounded-full">
                  <Icon icon="lucide:user-minus" className="text-xl text-danger" />
                </div>
                <span className="text-lg">Desactivar Residente</span>
              </ModalHeader>
              <ModalBody>
                <div className="space-y-5 pb-3">
                  <div
                    className="flex items-center gap-3 px-4 py-2 rounded-lg"
                  >
                    <Icon icon="lucide:info" className="text-xl flex-shrink-0 text-danger" />
                    <p className="text-default-700 text-sm">
                      ¿Está seguro que desea desactivar a este residente? Esta acción puede revertirse más adelante.
                    </p>
                  </div>
                  {resident && (
                    <div className="bg-default-50 p-5 rounded-lg border border-default-200">
                      <div className="flex items-center gap-4 mb-4">
                        <div>
                          <h3 className="font-semibold text-lg">Detalles del residente</h3>
                          <p className="text-default-500 text-sm">Revise la información antes de continuar</p>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <Icon icon="lucide:home" className="text-default-400" />
                          <span className="font-medium text-default-700">Unidad:</span>
                          <span className="text-default-600">{resident.unidad || "Sin unidad"}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Icon icon="lucide:user" className="text-default-400" />
                          <span className="font-medium text-default-700">Nombre:</span>
                          <span className="text-default-600">{resident.residente}</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </ModalBody>
              <ModalFooter>
                <Button
                  variant="flat"
                  onPress={onClose}
                  startContent={<Icon icon="lucide:x" />}
                  className="font-medium"
                >
                  Cancelar
                </Button>
                <Button
                  color="danger"
                  onPress={handleConfirm}
                  startContent={<Icon icon="lucide:user-minus" />}
                  className="font-medium"
                >
                  Desactivar Residente
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}