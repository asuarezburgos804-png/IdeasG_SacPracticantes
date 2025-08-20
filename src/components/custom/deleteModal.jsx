import React from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button } from "@nextui-org/react";
import { BasureroIcon } from "@/icons/veci/condominio/modales/BasureroIcon";
import { TrianguloAlertaIcon } from "@/icons/veci/condominio/modales/TrianguloAlertaIcon";

function DeleteModal({
  isOpen,
  onClose,
  onConfirm,
  label,
  labelPlacement = "",
  messageConfirmation = "¿Estás seguro de que deseas eliminar este registro?",
  isLoading = false,
  confirmText = "Eliminar",
}) {
  return (
    <Modal isOpen={isOpen} onOpenChange={onClose} size="md" placement="center">
      <ModalContent>
        {() => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              <div className="flex items-center gap-2 text-danger">
                <TrianguloAlertaIcon className="text-2xl" />
                <span>Eliminar registro</span>
              </div>
            </ModalHeader>
            <ModalBody>
              <div className="flex items-center gap-4 mb-4">
                <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center rounded-lg bg-danger/10 text-danger">
                  <BasureroIcon className="text-2xl" />
                </div>
                <div className="flex flex-col">
                  <span className="text-md font-semibold text-gray-900">{label}</span>
                  <span className="text-sm text-default-500">{labelPlacement}</span>
                </div>
              </div>
              <p className="text-sm text-default-600">{messageConfirmation}</p>
              <p className="text-xs text-default-500">Esta acción no se puede deshacer.</p>
            </ModalBody>
            <ModalFooter>
              <Button color="default" variant="light" onPress={onClose} disabled={isLoading}>
                Cancelar
              </Button>
              <Button
                color="danger"
                onPress={onConfirm}
                isLoading={isLoading}
                startContent={!isLoading && <BasureroIcon/>}
              >
                {confirmText}
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}

export default DeleteModal;