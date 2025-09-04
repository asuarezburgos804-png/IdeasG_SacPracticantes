  // Función para manejar la descarga de resolución
  export const onDescargarResolucion = async () => {
    try {
      // Simular la descarga
      setModal({ 
        type: "success", 
        props: { 
          message: "Resolución descargada correctamente",
          onClose: () => {
            // Simular la descarga de un archivo PDF
            const link = document.createElement('a');
            link.href = '#';
            link.download = `resolucion_${expediente || seleccionado?.expediente || 'sin_numero'}.pdf`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
          }
        } 
      });
    } catch (err) {
      setModal({
        type: "error",
        props: { message: err.message || "Error al descargar la resolución" },
      });
    }
  };