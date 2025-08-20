"use client";
import React, { useState, useEffect, useCallback } from "react";
import { Button } from "@nextui-org/react";
import IconViewHide from "@/icons/IconViewHide";

export default function CustomDisplay({
  moduloRef,
  component,
  isModalOpen,
  setIsModalOpen,
}) {
  const [topMargin, setTopMargin] = useState(120); // Valor inicial por defecto

  // Calcular topMargin basado en moduloRef
  useEffect(() => {
    const updateTopMargin = () => {
      const height = moduloRef?.current?.getBoundingClientRect().height;
      if (height) {
        setTopMargin(height);
      }
    };

    updateTopMargin();
    const observer = new ResizeObserver(updateTopMargin);
    if (moduloRef?.current) {
      observer.observe(moduloRef.current);
    }

    return () => {
      if (moduloRef?.current) {
        observer.unobserve(moduloRef.current);
      }
    };
  }, [moduloRef]);

//   // Memoizar el manejador del botón de cerrar
//   const toggleModal = useCallback(() => {
//     setIsModalOpen(false);
//   }, [setIsModalOpen]);

  return (
    <div
      style={{
        position: "fixed",
        top: `${topMargin}px`,
        left: "0px",
        bottom: "0px",
        width: "100%",
        backgroundColor: "#FFFFFF",
        paddingTop: "10px",
        paddingLeft: "15px",
        paddingRight: "15px",
        overflowY: "auto",
        zIndex: 1000,
        display: isModalOpen ? "block" : "none",
      }}
    >
      {/* <div className="flex justify-end">
        <Button size="sm" isIconOnly onClick={toggleModal}>
          <IconViewHide />
        </Button>
      </div> */}
      {component}
    </div>
  );
}