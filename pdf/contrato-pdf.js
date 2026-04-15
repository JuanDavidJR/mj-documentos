// pdf/contrato-pdf.js
const PDFDocument = require("pdfkit");
const fs = require("fs");
const { logoPath, firmaPath } = require("../config/paths");
const { formatearNumero, numeroEnPalabras } = require("../utils/formatters");

function generarContratoPDF(req, res) {
  try {
    const { cliente, servicios, fecha, lugar, horaInicio, horaFin, valorTotal, abono, condiciones } = req.body;

    if (!cliente || !servicios || !fecha || !lugar || !horaInicio || !horaFin || !valorTotal || abono === undefined) {
      return res.status(400).send("Faltan campos obligatorios");
    }

    const valorTotalNum = parseFloat(valorTotal);
    const abonoNum = parseFloat(abono) || 0;
    const saldoNum = valorTotalNum - abonoNum;

    if (valorTotalNum <= 0) {
      return res.status(400).send("El valor total debe ser positivo");
    }

    const doc = new PDFDocument({
      size: "A4",
      margins: { top: 60, bottom: 60, left: 60, right: 60 }
    });

    const fechaArchivo = new Date().toISOString().split('T')[0];
    const nombreArchivo = `contrato_${cliente.replace(/\s+/g, '_')}_${fechaArchivo}.pdf`;

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", `attachment; filename="${nombreArchivo}"`);

    doc.pipe(res);

    const pageWidth = doc.page.width;
    const pageHeight = doc.page.height;
    const margin = 60;
    const usableWidth = pageWidth - (margin * 2);
    const textMargin = margin + 40;
    const textWidth = usableWidth - 80;

    let currentY = 50;

    // Fecha de hoy (encabezado)
    const fechaHoy = new Date().toLocaleDateString("es-CO", {
      day: "2-digit",
      month: "long",
      year: "numeric"
    }).toUpperCase();

    // Fecha del evento
    const fechaObj = new Date(fecha + 'T00:00:00');
    const fechaEvento = fechaObj.toLocaleDateString("es-CO", {
      day: "2-digit",
      month: "long",
      year: "numeric"
    }).toUpperCase();

    // Encabezado: ciudad y fecha hoy
    doc.fontSize(12).font("Times-Roman");
    doc.text("PAMPLONA", textMargin, currentY + 25, { align: "left", width: 200 });
    doc.text(fechaHoy, textMargin, currentY + 40, { align: "left", width: 200 });

    // Logo
    if (fs.existsSync(logoPath)) {
      doc.image(logoPath, pageWidth - margin - 140, currentY, { width: 140 });
    }

    currentY += 100;

    // Título
    doc.fontSize(16).font("Times-Bold");
    doc.text("CONTRATO DE SERVICIOS", margin, currentY, {
      width: usableWidth,
      align: "center"
    });
    currentY += 30;

    doc.fontSize(12).font("Times-Roman");
    doc.text("MJ SONIDO PROFESIONAL", margin, currentY, {
      width: usableWidth,
      align: "center"
    });
    currentY += 40;

    // Partes del contrato
    doc.fontSize(12).font("Times-Bold");
    doc.text("CONTRATANTE:", textMargin, currentY);
    doc.font("Times-Roman").text(` ${cliente.toUpperCase()}`, textMargin + 110, currentY);
    currentY += 30;

    // Objeto del contrato
    doc.font("Times-Roman");
    doc.text(
      "POR MEDIO DEL PRESENTE CONTRATO, MJ SONIDO PROFESIONAL SE COMPROMETE A PRESTAR LOS SIGUIENTES SERVICIOS:",
      textMargin, currentY, { width: textWidth }
    );
    currentY += 35;

    // Servicios
    const serviciosArray = servicios.split(/[,\n]+/).map(s => s.trim().toUpperCase()).filter(s => s);
    serviciosArray.forEach(servicio => {
      doc.text(`• ${servicio}`, textMargin + 20, currentY, { width: textWidth - 20 });
      currentY += 20;
    });

    currentY += 20;

    // Detalles del evento
    doc.font("Times-Bold").text("DETALLES DEL EVENTO:", textMargin, currentY);
    currentY += 20;

    doc.font("Times-Roman");
    doc.text(`• FECHA: ${fechaEvento}`, textMargin + 20, currentY, { width: textWidth });
    currentY += 18;
    doc.text(`• LUGAR: ${lugar.toUpperCase()}`, textMargin + 20, currentY, { width: textWidth });
    currentY += 18;
    doc.text(`• HORARIO: ${horaInicio} A ${horaFin}`, textMargin + 20, currentY, { width: textWidth });
    currentY += 35;

    // Valor
    doc.font("Times-Bold").text("VALOR DEL CONTRATO:", margin, currentY, {
      width: usableWidth,
      align: "center"
    });
    currentY += 25;

    doc.fontSize(14).font("Times-Bold");
    doc.text(`$${formatearNumero(valorTotalNum)} (${numeroEnPalabras(valorTotalNum)}) M/C`, margin, currentY, {
      width: usableWidth,
      align: "center"
    });
    currentY += 20;

    doc.fontSize(12).font("Times-Roman");
    doc.text("LIBRES DE DESCUENTOS Y RETENCIONES", margin, currentY, {
      width: usableWidth,
      align: "center"
    });
    currentY += 35;

    // Abono y saldo
    doc.font("Times-Roman").fontSize(12);
    doc.text(`• ABONO INICIAL: $${formatearNumero(abonoNum)} (${numeroEnPalabras(abonoNum)}) M/C`, textMargin, currentY, { width: textWidth });
    currentY += 18;
    doc.text(`• SALDO RESTANTE: $${formatearNumero(saldoNum)} (${numeroEnPalabras(saldoNum)}) M/C`, textMargin, currentY, { width: textWidth });
    currentY += 35;

    // Condiciones
    if (condiciones && condiciones.trim()) {
      doc.font("Times-Bold").text("CONDICIONES ADICIONALES:", textMargin, currentY);
      currentY += 20;
      doc.font("Times-Roman").text(condiciones.toUpperCase(), textMargin, currentY, { width: textWidth });
      currentY += 30;
    }

    // Mensaje final
    doc.text(
      "AL FIRMAR EL PRESENTE CONTRATO, EL CONTRATANTE ACEPTA LOS SERVICIOS Y CONDICIONES DESCRITOS ANTERIORMENTE.",
      textMargin, currentY, { width: textWidth }
    );

    // Firma al final de la página
    currentY = pageHeight - margin - 140;

    doc.text("ATENTAMENTE,", textMargin, currentY);
    currentY += 25;

    if (fs.existsSync(firmaPath)) {
      doc.image(firmaPath, textMargin, currentY, { width: 120 });
    }
    currentY += 55;

    doc.fontSize(12).font("Times-Bold");
    doc.text("MARTIN EDUARDO JAIMES", textMargin, currentY);
    currentY += 15;

    doc.fontSize(10).font("Times-Italic");
    doc.text("REPRESENTANTE DE VENTAS", textMargin, currentY);
    currentY += 12;

    doc.fontSize(10).font("Times-Roman");
    doc.text("Cel: 3115144319", textMargin, currentY);

    doc.end();

  } catch (error) {
    console.error("Error generando contrato PDF:", error);
    res.status(500).send("Error interno del servidor");
  }
}

module.exports = {
  generarContratoPDF
};
