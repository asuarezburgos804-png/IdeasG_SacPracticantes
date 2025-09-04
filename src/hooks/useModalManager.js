import { useState, useCallback } from "react";

export function useModalManager() {
  const [modal, setModal] = useState({ type: null, props: {} });

  const openModal = useCallback((type, props = {}) => {
    setModal({ type, props });
  }, []);

  const closeModal = useCallback(() => {
    setModal({ type: null, props: {} });
  }, []);

  return {
    modal,
    openModal,
    closeModal,
  };
}
