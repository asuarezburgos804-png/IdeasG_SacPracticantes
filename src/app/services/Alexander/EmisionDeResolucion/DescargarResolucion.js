import { jsPDF } from "jspdf";

export const onDescargarResolucion = (datos) => {
  try {
    const doc = new jsPDF();

    doc.setFontSize(16);
    doc.text("Emisión de Resolución", 20, 20);

    doc.setFontSize(12);
    doc.text(`N° de Expediente: ${datos.expediente}`, 20, 40);
    doc.text(`Administrado: ${datos.nombre_completo}`, 20, 50);
    doc.text(`DNI: ${datos.dni}`, 20, 60);
    doc.text(`Fecha de reg.: ${datos.fecha_registro}`, 20, 70);

    doc.save(`Resolucion_${datos.nombre_completo.replace(/\s+/g, "_")}.pdf`);

  } catch (err) {
    console.error("Error al generar el PDF", err);
    alert(err.message || "Error al generar el PDF");
  }
};
