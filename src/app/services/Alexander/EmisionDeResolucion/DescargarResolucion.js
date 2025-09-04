import { jsPDF } from "jspdf";

export const onDescargarResolucion = (datos) => {
  try {
    const doc = new jsPDF();
    const marginLeft = 20;
    let yPosition = 20;

    // Encabezado
    //Logo Municiopalidad y Escudo del Peru
    doc.setFontSize(16);
    doc.text("MUNICIPALIDAD DISTRITAL", 105, yPosition, { align: "center" });
    yPosition += 10;
    doc.setFontSize(14);
    doc.text("RESOLUCIÓN DE ALCALDÍA", 105, yPosition, { align: "center" });
    yPosition += 15;

    // Datos del expediente
    doc.setFontSize(12);
    doc.text(`EXPEDIENTE N°: ${datos.expediente}`, marginLeft, yPosition);
    yPosition += 10;
    doc.text(`SOLICITANTE: ${datos.nombre_completo.toUpperCase()}`, marginLeft, yPosition);
    yPosition += 10;
    doc.text(`DOCUMENTO DE IDENTIDAD: ${datos.dni}`, marginLeft, yPosition);
    yPosition += 10;
    doc.text(`FECHA DE REGISTRO: ${datos.fecha_registro}`, marginLeft, yPosition);
    yPosition += 15;

    // Considerandos
    doc.setFontSize(12);
    doc.setFont(undefined, 'bold');
    doc.text("CONSIDERANDO:", marginLeft, yPosition);
    yPosition += 10;
    doc.setFont(undefined, 'normal');
    
    const considerandos = [
      `Que, mediante Expediente N° ${datos.expediente}, el señor(a) ${datos.nombre_completo} identificado con DNI N° ${datos.dni} ha presentado la solicitud correspondiente.`,
      `Que, la solicitud fue registrada el ${datos.fecha_registro} y cumple con los requisitos establecidos.`,
      "Que, de acuerdo a la normativa municipal vigente, corresponde resolver sobre el particular.",
      "Que, la documentación presentada se encuentra en orden y procede la emisión de la resolución."
    ];

    considerandos.forEach(parrafo => {
      const lines = doc.splitTextToSize(parrafo, 170);
      doc.text(lines, marginLeft, yPosition);
      yPosition += lines.length * 7;
    });

    yPosition += 10;

    // Resolución
    doc.setFont(undefined, 'bold');
    doc.text("RESUELVE:", marginLeft, yPosition);
    yPosition += 10;
    doc.setFont(undefined, 'normal');

    const resoluciones = [
      `ARTÍCULO 1º.- APROBAR la solicitud presentada por ${datos.nombre_completo} con DNI N° ${datos.dni}, registrada en el expediente N° ${datos.expediente}.`,
      "ARTÍCULO 2º.- OTORGAR lo solicitado de acuerdo a la normativa municipal vigente y condiciones establecidas.",
      `ARTÍCULO 3º.- NOTIFICAR la presente resolución a ${datos.nombre_completo} para su conocimiento y efectos correspondientes.`,
      `ARTÍCULO 4º.- ARCHIVAR el expediente N° ${datos.expediente} una vez cumplido el trámite.`
    ];

    resoluciones.forEach(parrafo => {
      const lines = doc.splitTextToSize(parrafo, 170);
      doc.text(lines, marginLeft, yPosition);
      yPosition += lines.length * 7;
    });

    yPosition += 15;

    // Firma
    doc.text("Regístrese, notifíquese y archívese.", marginLeft, yPosition);
    yPosition += 20;
    
    doc.text("_________________________", marginLeft, yPosition);
    yPosition += 5;
    doc.text("ALCALDE", marginLeft, yPosition);
    yPosition += 10;
    
    doc.text(`Fecha: ${datos.fecha_registro}`, marginLeft, yPosition);

    doc.save(`Resolucion_${datos.nombre_completo.replace(/\s+/g, "_")}.pdf`);

  } catch (err) {
    console.error("Error al generar el PDF", err);
    alert(err.message || "Error al generar el PDF");
  }
};