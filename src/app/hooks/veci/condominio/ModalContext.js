import React, { createContext, useContext, useState } from "react";
import SuccessModal from "@/components/custom/successModal";
import ErrorModal from "@/components/custom/errorModal";

const ModalContext = createContext();

export function ModalProvider({ children }) {
  const [successModal, setSuccessModal] = useState({
    isOpen: false,
    modalTitle: "¡Operación Exitosa!",
    modalTextContent: "",
    buttonText: "Aceptar",
    showCloseButton: true,
  });

  const [errorModal, setErrorModal] = useState({
    isOpen: false,
    modalTitle: "¡Ocurrió un Error!",
    message: "",
    errorDetail: "",
    buttonText: "Entendido",
    showCloseButton: true,
  });

  const showSuccessModal = ({
    modalTitle = "¡Operación Exitosa!",
    modalTextContent,
    buttonText = "Aceptar",
    showCloseButton = true,
    onConfirm,
  }) => {
    setSuccessModal({
      isOpen: true,
      modalTitle,
      modalTextContent,
      buttonText,
      showCloseButton,
      onConfirm,
    });
  };

  const showErrorModal = ({
    modalTitle = "¡Ocurrió un Error!",
    message,
    errorDetail = "",
    buttonText = "Entendido",
    showCloseButton = true,
  }) => {
    setErrorModal({
      isOpen: true,
      modalTitle,
      message,
      errorDetail,
      buttonText,
      showCloseButton,
    });
  };

  const closeModals = () => {
    setSuccessModal((prev) => ({ ...prev, isOpen: false }));
    setErrorModal((prev) => ({ ...prev, isOpen: false }));
  };

  return (
    <ModalContext.Provider value={{ showSuccessModal, showErrorModal, closeModals }}>
      {children}
      <SuccessModal
        isOpen={successModal.isOpen}
        onClose={closeModals}
        modalTitle={successModal.modalTitle}
        modalTextContent={successModal.modalTextContent}
        buttonText={successModal.buttonText}
        showCloseButton={successModal.showCloseButton}
        onConfirm={successModal.onConfirm}
      />
      <ErrorModal
        isOpen={errorModal.isOpen}
        onClose={closeModals}
        modalTitle={errorModal.modalTitle}
        message={errorModal.message}
        // errorDetail={errorModal.errorDetail}
        buttonText={errorModal.buttonText}
        showCloseButton={errorModal.showCloseButton}
      />
    </ModalContext.Provider>
  );
}

export function useModal() {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error("useModal must be used within a ModalProvider");
  }
  return context;
}