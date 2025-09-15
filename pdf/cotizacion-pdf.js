// pdf/cotizacion-pdf.js
const PDFDocument = require("pdfkit");
const fs = require("fs");
const { logoPath, firmaPath } = require("../config/paths");
const { formatearNumero, numeroEnPalabras } = require("../utils/formatters");

function generarCotizacionPDF(req, res) {
  try {
    const { cliente, servicios, fecha, lugar, horaInicio, horaFin, valorTotal, observaciones } = req.body;
    
    // Validaciones del servidor
    if (!cliente || !servicios || !fecha || !valorTotal) {
      return res.status(400).send("Faltan campos obligatorios");
    }
    
    const valorTotalNum = parseFloat(valorTotal);
    
    if (valorTotalNum <= 0) {
      return res.status(400).send("El valor total debe ser positivo");
    }

    const doc = new PDFDocument({ 
      size: "A4", 
      margins: { top: 60, bottom: 60, left: 60, right: 60 }
    });
    
    // Configurar headers para descarga
    const fechaArchivo = new Date().toISOString().split('T')[0];
    const nombreArchivo = `cotizacion_${cliente.replace(/\s+/g, '_')}_${fechaArchivo}.pdf`;
    
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

    // Ubicación y fecha a la izquierda

doc.fontSize(12).font("Times-Roman");
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

    // SEÑORES (Cliente)
    doc.fontSize(12).font("Times-Bold");
    doc.text("SEÑORES", textMargin, currentY);
    currentY += 20;
    
    doc.fontSize(12).font("Times-Roman");
    doc.text(cliente.toUpperCase(), textMargin, currentY);
    
    currentY += 40;

    // INTRODUCCIÓN
    doc.text("POR MEDIO DE LA PRESENTE ME PERMITO COTIZAR A USTEDES LOS SERVICIOS DE:", textMargin, currentY, {
      width: textWidth
    });
    
    currentY += 30;

    // LISTA DE SERVICIOS (con viñetas)
    const serviciosArray = servicios.split(/[,\n]+/).map(s => s.trim().toUpperCase()).filter(s => s);
    
    serviciosArray.forEach(servicio => {
      doc.text(`• ${servicio}`, textMargin + 20, currentY, {
        width: textWidth - 20
      });
      currentY += 20;
    });
    
    currentY += 30;

    // INFORMACIÓN DEL EVENTO
    let eventoTexto = `PARA EL EVENTO A REALIZARSE POR USTEDES EL DIA ${fechaFormateada}`;
    
    if (lugar && lugar.trim()) {
      eventoTexto += `, EN ${lugar.toUpperCase()}`;
    }
    
    if (horaInicio && horaFin) {
      eventoTexto += `, EN EL HORARIO DE ${horaInicio} A ${horaFin}`;
    } else if (horaInicio) {
      eventoTexto += `, A PARTIR DE LAS ${horaInicio}`;
    }
    
    eventoTexto += ".";
    
    doc.text(eventoTexto, textMargin, currentY, {
      width: textWidth
    });
    
    currentY += 50; // Más separación antes del valor

    // VALOR DE LA COTIZACIÓN - CENTRADO
    doc.text("LA PRESENTE COTIZACION TIENE UN VALOR DE:", margin, currentY, {
      width: usableWidth,
      align: "center"
    });
    
    currentY += 30;
    
    // Valor en números y letras
    doc.fontSize(14).font("Times-Bold");
    doc.text(`$${formatearNumero(valorTotalNum)} (${numeroEnPalabras(valorTotalNum)}) M/C`, margin, currentY, {
      width: usableWidth,
      align: "center"
    });
    
    currentY += 30;
    
    doc.fontSize(12).font("Times-Roman");
    doc.text("LIBRES DE DESCUENTOS Y RETENCIONES", margin, currentY, {
      width: usableWidth,
      align: "center"
    });
    
    currentY += 40;

    // OBSERVACIONES si las hay
    if (observaciones && observaciones.trim()) {
      doc.text("OBSERVACIONES:", textMargin, currentY);
      currentY += 20;
      doc.text(observaciones.toUpperCase(), textMargin, currentY, {
        width: textWidth
      });
      currentY += 30;
    }

    // MENSAJE FINAL
    doc.text("ESPERAMOS PODER SERVIRLE CON EL PROFESIONALISMO QUE NOS CARACTERIZA", textMargin, currentY, {
      width: textWidth
    });

    // CALCULAR ESPACIO PARA FIRMA AL FINAL DE LA PÁGINA
    const espacioFirma = 120;
    currentY = pageHeight - margin - espacioFirma;

    // ATENTAMENTE
    doc.text("ATENTAMENTE,", textMargin, currentY);
    currentY += 25;

    // Firma
    if (fs.existsSync(firmaPath)) {
      doc.image(firmaPath, textMargin, currentY, { width: 120 });
    }
    currentY += 50;

    // Información del representante
    doc.fontSize(12).font("Times-Bold");
    doc.text("MARTIN EDUARDO JAIMES", textMargin, currentY);
    currentY += 15;
    
    doc.fontSize(10).font("Times-Italic");
    doc.text("REPRESENTANTE DE VENTAS", textMargin, currentY);
    currentY += 10;
    
    doc.fontSize(10).font("Times-Roman");
    doc.text("Cel: 3115144319", textMargin, currentY);

    doc.end();

  } catch (error) {
    console.error("Error generando PDF:", error);
    res.status(500).send("Error interno del servidor");
  }
}

module.exports = {
  generarCotizacionPDF
};