// pdf/cuenta-cobro-pdf.js
const PDFDocument = require("pdfkit");
const fs = require("fs");
const { logoPath, firmaPath } = require("../config/paths");
const { formatearNumero, numeroEnPalabras } = require("../utils/formatters");

function generarCuentaCobroPDF(req, res) {
  try {
    const { deudor, acreedor, nit, cedula, valorTotal, concepto, fechaEvento, observaciones } = req.body;
    
    if (!deudor || !acreedor || !nit || !cedula || !valorTotal || !concepto || !fechaEvento) {
      return res.status(400).send("Faltan campos obligatorios");
    }
    
    const valorTotalNum = parseFloat(valorTotal);
    
    if (valorTotalNum <= 0) {
      return res.status(400).send("El valor total debe ser positivo");
    }

    const doc = new PDFDocument({ size: "A4", margins: { top: 60, bottom: 60, left: 60, right: 60 } });
    
    const fechaArchivo = new Date().toISOString().split('T')[0];
    const nombreArchivo = `cuenta_cobro_${deudor.replace(/\s+/g, '_')}_${fechaArchivo}.pdf`;
    
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", `attachment; filename="${nombreArchivo}"`);
    doc.pipe(res);

    const pageWidth = doc.page.width;
    const pageHeight = doc.page.height;
    const margin = 60;
    const usableWidth = pageWidth - (margin * 2);

    const fechaHoy = new Date().toLocaleDateString("es-CO", { 
      day: "2-digit", 
      month: "long", 
      year: "numeric" 
    }).toUpperCase();

    let currentY = 50;

    // Ubicación y fecha a la izquierda
doc.fontSize(9).font("Times-Roman");
doc.text("PAMPLONA, NORTE DE SANTANDER", margin, currentY + 30, { align: "left", width: 150 });
doc.text(fechaHoy, margin, currentY + 60, { align: "left", width: 120 });

// Logo a la derecha
if (fs.existsSync(logoPath)) {
  doc.image(logoPath, pageWidth - margin - 120, currentY, { width: 120 });
}
    currentY += 120;

    doc.fontSize(12).font("Times-Bold");
    doc.text(deudor.toUpperCase(), margin, currentY, { width: usableWidth, align: "center" });
    
    currentY += 40;

    doc.fontSize(12).font("Times-Bold");
    doc.text("DEBE A:", margin, currentY, { width: usableWidth, align: "center" });
    
    currentY += 20;
    
    doc.font("Times-Roman");
    doc.text(acreedor.toUpperCase(), margin, currentY, { width: usableWidth, align: "center" });
    
    currentY += 15;
    
    doc.text(`Nit: ${nit}`, margin, currentY, { width: usableWidth, align: "center" });
    
    currentY += 40;

    doc.font("Times-Bold");
    doc.text("LA SUMA DE:", margin, currentY, { width: usableWidth, align: "center" });
    currentY += 20;
    
    doc.fontSize(14);
    doc.text(`$${formatearNumero(valorTotalNum)} (${numeroEnPalabras(valorTotalNum)}) M/C`, margin, currentY, { width: usableWidth, align: "center" });
    
    currentY += 40;

    doc.fontSize(12);
    doc.text("POR CONCEPTO DE:", margin, currentY, { width: usableWidth, align: "center" });
    currentY += 20;
    
    doc.font("Times-Roman");
    const fechaEventoFormateada = new Date(fechaEvento).toLocaleDateString("es-CO", { 
      day: "2-digit", 
      month: "long", 
      year: "numeric" 
    }).toUpperCase();
    
    let conceptoCompleto = concepto.toUpperCase();
    if (fechaEvento) {
      conceptoCompleto += `, EL DIA ${fechaEventoFormateada}`;
    }
    conceptoCompleto += ".";
    
    doc.text(conceptoCompleto, margin, currentY, { width: usableWidth, align: "center" });
    
    currentY += 50;

    doc.font("Times-Bold");
    doc.text("SON:", margin, currentY, { width: usableWidth, align: "center" });
    currentY += 20;
    
    doc.fontSize(14);
    doc.text(`$${formatearNumero(valorTotalNum)} (${numeroEnPalabras(valorTotalNum)}) M/C`, margin, currentY, { width: usableWidth, align: "center" });
    
    currentY += 50;

    if (observaciones && observaciones.trim()) {
      doc.fontSize(12).font("Times-Bold");
      doc.text("OBSERVACIONES:", margin, currentY, { width: usableWidth, align: "center" });
      currentY += 20;
      doc.font("Times-Roman");
      doc.text(observaciones.toUpperCase(), margin, currentY, { width: usableWidth, align: "center" });
      currentY += 30;
    }

    const espacioFirma = 140;
    currentY = pageHeight - margin - espacioFirma;

    doc.fontSize(12).font("Times-Bold");
    doc.text("ATENTAMENTE", margin, currentY, { width: usableWidth, align: "center" });
    
    currentY += 30;
    
    if (fs.existsSync(firmaPath)) {
      const firmaWidth = 120;
      const firmaX = (pageWidth - firmaWidth) / 2;
      doc.image(firmaPath, firmaX, currentY, { width: firmaWidth });
    }
    
    currentY += 50;
    
    doc.text(acreedor.toUpperCase(), margin, currentY, { width: usableWidth, align: "center" });
    currentY += 15;
    
    doc.fontSize(10).font("Times-Roman");
    doc.text(`CC: ${cedula}`, margin, currentY, { width: usableWidth, align: "center" });
    currentY += 10;
    doc.text("Cel: 3115144319", margin, currentY, { width: usableWidth, align: "center" });

    doc.end();

  } catch (error) {
    console.error("Error generando cuenta de cobro:", error);
    res.status(500).send("Error interno del servidor");
  }
}

module.exports = {
  generarCuentaCobroPDF
};