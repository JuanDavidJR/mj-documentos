// routes/index.js
const express = require("express");
const router = express.Router();
const { getMainPageCSS } = require("../views/styles");

// Página principal con selector de tipo de documento
router.get("/", (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html lang="es">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Generador de Documentos - MJ Sonido Profesional</title>
        <style>${getMainPageCSS()}</style>
      </head>
      <body>
        <div class="container">
          <h1>GENERADOR DE DOCUMENTOS</h1>
          <div class="subtitle">MJ SONIDO PROFESIONAL</div>
          
          <div class="document-selector">
            <a href="/cotizacion-form" class="doc-option">
              <div class="doc-icon">1</div>
              <h3>Cotización</h3>
              <p>Genera cotizaciones profesionales para servicios de sonido e iluminación</p>
            </a>
            
            <a href="/contrato-form" class="doc-option">
              <div class="doc-icon">2</div>
              <h3>Contrato</h3>
              <p>Crea contratos de prestación de servicios con términos y condiciones</p>
            </a>
            
            <a href="/cuenta-cobro-form" class="doc-option">
              <div class="doc-icon">3</div>
              <h3>Cuenta de Cobro</h3>
              <p>Elabora cuentas de cobro para facturación de servicios prestados</p>
            </a>
          </div>
        </div>
      </body>
    </html>
  `);
});

module.exports = router;