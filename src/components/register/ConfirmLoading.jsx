import React from "react";
import "./ConfirmLoading.css";

export default function ConfirmLoading() {
  return (
    <>
      <div className="card flex flex-col items-center gap-2">
        <span className="small-text">Correo enviado correctamente.!</span>
        <span className="small-text">
          No cierre la pestaña hasa cofirmar su correo.!
        </span>
        <span className="title">Verifique su correo antes de continuar.</span>
        <div className="terminal-loader">
          <div className="terminal-header">
            <div className="terminal-title">Status</div>
            <div className="terminal-controls">
              <div className="control close"></div>
              <div className="control minimize"></div>
              <div className="control maximize"></div>
            </div>
          </div>
          <div className="text">Esperando verificación...</div>
        </div>
      </div>
    </>
  );
}
