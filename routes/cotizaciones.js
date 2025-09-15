// routes/cotizaciones.js
const express = require("express");
const router = express.Router();
const { getFormCSS } = require("../views/styles");
const { generarCotizacionPDF } = require("../pdf/cotizacion-pdf");

// Formulario de cotización
router.get("/cotizacion-form", (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html lang="es">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Cotización - MJ Sonido Profesional</title>
        <style>${getFormCSS()}</style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <a href="/" class="back-btn">← Volver</a>
            <h1>COTIZACIÓN</h1>
            <div class="subtitle">MJ SONIDO PROFESIONAL</div>
          </div>
          
          <form action="/cotizacion" method="POST" id="documentForm">
            <div class="form-group">
              <label for="cliente">Nombre del Cliente *</label>
              <input type="text" id="cliente" name="cliente" placeholder="Ej: Eventos El Mirador" required />
            </div>
            
            <div class="form-group">
              <label for="servicios">Servicios a Cotizar *</label>
              <textarea id="servicios" name="servicios" placeholder="Ej: SONIDO PROFESIONAL, ILUMINACION PROFESIONAL, DJ" required></textarea>
            </div>
            
            <div class="row">
              <div class="form-group">
                <label for="fecha">Fecha del Evento *</label>
                <input type="date" id="fecha" name="fecha" required />
              </div>
              
              <div class="form-group">
                <label for="lugar">Lugar del Evento</label>
                <input type="text" id="lugar" name="lugar" placeholder="Ej: Piscina del Municipio de Toledo" />
              </div>
            </div>
            
            <div class="row">
              <div class="form-group">
                <label for="horaInicio">Hora de Inicio</label>
                <input type="time" id="horaInicio" name="horaInicio" />
              </div>
              
              <div class="form-group">
                <label for="horaFin">Hora de Fin</label>
                <input type="time" id="horaFin" name="horaFin" />
              </div>
            </div>
            
            <div class="form-group">
              <label for="valorTotal">Valor Total (COP) *</label>
              <input type="number" id="valorTotal" name="valorTotal" placeholder="6500000" min="0" step="1000" required />
            </div>
            
            <div class="total-preview" id="totalPreview">Total: $0</div>
            
            <div class="form-group">
              <label for="observaciones">Observaciones Adicionales</label>
              <textarea id="observaciones" name="observaciones" placeholder="Condiciones especiales, requisitos adicionales, etc."></textarea>
            </div>
            
            <button type="submit">Generar Cotización PDF</button>
          </form>
        </div>
        
        <script>
          function mostrarTotal() {
            const valorTotal = parseFloat(document.getElementById('valorTotal').value) || 0;
            document.getElementById('totalPreview').textContent = 
              'Total: $' + valorTotal.toLocaleString('es-CO');
          }
          
          document.getElementById('valorTotal').addEventListener('input', mostrarTotal);
          document.getElementById('fecha').min = new Date().toISOString().split('T')[0];
          
          document.getElementById('documentForm').addEventListener('submit', function(e) {
            const valorTotal = parseFloat(document.getElementById('valorTotal').value);
            if (valorTotal <= 0) {
              alert('El valor total debe ser mayor a 0');
              e.preventDefault();
            }
          });
        </script>
      </body>
    </html>
  `);
});

// Generar PDF de cotización
router.post("/cotizacion", generarCotizacionPDF);

module.exports = router;