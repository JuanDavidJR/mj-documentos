// pdf/contrato-pdf.js
const PDFDocument = require("pdfkit");
const fs = require("fs");
const { logoPath, firmaPath } = require("../config/paths");
const { formatearNumero, numeroEnPalabras } = require("../utils/formatters");

function generarContratoPDF(req, res) {
  try {
    const { contratante, servicios, fecha, lugar, horaInicio, horaFin, valorTotal, abono, observaciones } = req.body;
    
    // Validaciones
    if (!contratante || !servicios || !fecha || !lugar || !horaInicio || !horaFin || !valorTotal || !abono) {
      return res.status(400).send("Faltan campos obligatorios");
    }
    
    const valorTotalNum = parseFloat(valorTotal);
    const abonoNum = parseFloat(abono);
    const saldo = valorTotalNum - abonoNum;
    
    if (valorTotalNum <= 0 || abonoNum < 0 || abonoNum > valorTotalNum) {
      return res.status(400).send("Los valores numéricos no son válidos");
    }

    const doc = new PDFDocument({ size: "A4", margins: { top: 60, bottom: 60, left: 60, right: 60 } });
    
    const fechaArchivo = new Date().toISOString().split('T')[0];
    const nombreArchivo = `contrato_${contratante.replace(/\s+/g, '_')}_${fechaArchivo}.pdf`;
    
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", `attachment; filename="${nombreArchivo}"`);
    doc.pipe(res);

    const pageWidth = doc.page.width;
    const pageHeight = doc.page.height;
    const margin = 60;
    const usableWidth = pageWidth - (margin * 2);
    const textMargin = margin + 40;
    const textWidth = usableWidth - 80;
    
    // Generar número de contrato
    const numeroContrato = Date.now().toString().slice(-3);

    let currentY = 50;

    // Ubicación y fecha a la izquierda
doc.fontSize(10).font("Times-Roman");
doc.text("PAMPLONA", textMargin, currentY + 25, { align: "left", width: 200 });

const fechaObj = new Date(fecha);
const fechaFormateada = fechaObj.toLocaleDateString("es-CO", { 
  day: "2-digit", 
  month: "long", 
  year: "numeric" 
}).toUpperCase();

doc.text(`${fechaFormateada}`, textMargin, currentY + 40, { align: "left", width: 200 });

    // Logo a la derecha
    if (fs.existsSync(logoPath)) {
      doc.image(logoPath, pageWidth - margin - 140, currentY, { width: 140 });
    }
    
    currentY += 120;

    // TÍTULO Y NÚMERO DE CONTRATO
    doc.fontSize(16).font("Times-Bold");
    doc.text(`CONTRATO #${numeroContrato}`, textMargin, currentY, { width: textWidth, align: "center" });
    
    currentY += 40;

    // PARTES DEL CONTRATO
    doc.fontSize(12).font("Times-Roman");
    doc.text(`ENTRE LOS SEÑORES: MARTIN EDUARDO JAIMES y ${contratante.toUpperCase()},`, textMargin, currentY, { width: textWidth });
    currentY += 20;
    
    doc.text("se celebra el presente contrato de prestación de servicios de", textMargin, currentY, { width: textWidth });
    currentY += 15;
    doc.text(`${servicios.toLowerCase()}, el cual se regirá por las siguientes condiciones:`, textMargin, currentY, { width: textWidth });
    
    currentY += 40;

    // CLÁUSULAS
    doc.font("Times-Bold");
    doc.text("PRIMERO:", textMargin, currentY);
    doc.font("Times-Roman");
    doc.text(`El evento se llevará a cabo el día ${fechaFormateada}, en las instalaciones del ${lugar}.`, textMargin + 80, currentY, { width: textWidth - 80 });
    
    currentY += 35;

    doc.font("Times-Bold");
    doc.text("SEGUNDO:", textMargin, currentY);
    doc.font("Times-Roman");
    doc.text(`El horario de prestación del servicio será desde las ${horaInicio} hasta las ${horaFin}.`, textMargin + 80, currentY, { width: textWidth - 80 });
    
    currentY += 35;

    doc.font("Times-Bold");
    doc.text("TERCERO:", textMargin, currentY);
    doc.font("Times-Roman");
    doc.text("El servicio incluirá la instalación, operación y desinstalación de equipos de sonido e iluminación, así como el acompañamiento técnico durante todo el evento.", textMargin + 80, currentY, { width: textWidth - 80 });
    
    currentY += 50;

    // CLÁUSULA CUARTO CON MEJOR ESPACIADO
    doc.font("Times-Bold");
    doc.text("CUARTO:", textMargin, currentY);
    doc.font("Times-Roman");
    doc.text(`El valor total del contrato es de $${formatearNumero(valorTotalNum)} (${numeroEnPalabras(valorTotalNum)}) M/CTE,`, textMargin + 80, currentY, { width: textWidth - 80 });
    
    currentY += 25; // Más espacio entre líneas
    
    doc.text(`de los cuales se realiza un abono inicial de $${formatearNumero(abonoNum)} (${numeroEnPalabras(abonoNum)}) M/CTE,`, textMargin + 80, currentY, { width: textWidth - 80 });
    
    currentY += 25; // Más espacio entre líneas
    
    doc.text(`y un saldo restante por $${formatearNumero(saldo)} (${numeroEnPalabras(saldo)}) M/CTE`, textMargin + 80, currentY, { width: textWidth - 80 });
    
    currentY += 20;
    
    doc.text("que será cancelado el mismo día del evento, antes de prestar el servicio.", textMargin + 80, currentY, { width: textWidth - 80 });
    
    currentY += 50;

    doc.font("Times-Bold");
    doc.text("QUINTO:", textMargin, currentY);
    doc.font("Times-Roman");
    doc.text("La empresa prestadora del servicio será MJ SONIDO E ILUMINACIÓN, especializada en producción técnica de eventos, comprometida con altos estándares de calidad y profesionalismo.", textMargin + 80, currentY, { width: textWidth - 80 });
    
    currentY += 50;

    // OBSERVACIONES
    if (observaciones && observaciones.trim()) {
      doc.font("Times-Bold");
      doc.text("OBSERVACIONES:", textMargin, currentY);
      currentY += 20;
      doc.font("Times-Roman");
      doc.text(observaciones.toUpperCase(), textMargin, currentY, { width: textWidth });
      currentY += 40; // Más espacio después de observaciones
    }

    // DECLARACIÓN FINAL - CON MÁS SEPARACIÓN
    doc.text("Ambas partes declaran haber leído, entendido y aceptado las condiciones aquí", textMargin, currentY, { width: textWidth });
    currentY += 15;
    doc.text("descritas, firmando en señal de conformidad.", textMargin, currentY, { width: textWidth });
    
    // FIRMAS AL FINAL
    const espacioFirma = 150; // Más espacio para incluir la firma
    const espacioDisponible = pageHeight - margin - currentY - 60;
    
    if (espacioDisponible < espacioFirma) {
      currentY = pageHeight - margin - espacioFirma;
    } else {
      currentY += 60; // Más separación antes de las firmas
    }

    doc.text("Atentamente,", textMargin, currentY);
    currentY += 30;

    // Agregar firma del lado izquierdo
    if (fs.existsSync(firmaPath)) {
      doc.image(firmaPath, textMargin, currentY, { width: 100 });
    }

    currentY += 50; // Espacio para la firma

    // Dos columnas para firmas
    doc.fontSize(12).font("Times-Bold");
    doc.text("Martín Eduardo Jaimes", textMargin, currentY);
    doc.text(contratante, textMargin + 250, currentY);
    
    currentY += 15;
    
    doc.fontSize(10).font("Times-Italic");
    doc.text("Contratista", textMargin, currentY);
    doc.text("Contratante", textMargin + 250, currentY);
    
    currentY += 10;
    
    doc.text("MJ SONIDO E ILUMINACIÓN", textMargin, currentY);

    doc.end();

  } catch (error) {
    console.error("Error generando contrato:", error);
    res.status(500).send("Error interno del servidor");
  }
}

module.exports = {
  generarContratoPDF
};