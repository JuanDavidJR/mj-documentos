// routes/contratos.js
const express = require("express");
const router = express.Router();
const { getFormCSS } = require("../views/styles");
const { generarContratoPDF } = require("../pdf/contrato-pdf");

// Formulario de contrato
router.get("/contrato-form", (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html lang="es">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Contrato - MJ Sonido Profesional</title>
        <style>${getFormCSS()}</style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <a href="/" class="back-btn">← Volver</a>
            <h1>CONTRATO</h1>
            <div class="subtitle">MJ SONIDO PROFESIONAL</div>
          </div>
          
          <form action="/contrato" method="POST" id="documentForm">
            <div class="form-group">
              <label for="contratante">Nombre del Contratante *</label>
              <input type="text" id="contratante" name="contratante" placeholder="Ej: Fabian Contreras" required />
            </div>
            
            <div class="form-group">
              <label for="servicios">Servicios Contratados *</label>
              <textarea id="servicios" name="servicios" placeholder="Ej: sonido profesional e iluminación y DJ en vivo" required></textarea>
            </div>
            
            <div class="row">
              <div class="form-group">
                <label for="fecha">Fecha del Evento *</label>
                <input type="date" id="fecha" name="fecha" required />
              </div>
              
              <div class="form-group">
                <label for="lugar">Lugar del Evento *</label>
                <input type="text" id="lugar" name="lugar" placeholder="Ej: Cariongo Plaza Hotel" required />
              </div>
            </div>
            
            <div class="row">
              <div class="form-group">
                <label for="horaInicio">Hora de Inicio *</label>
                <input type="time" id="horaInicio" name="horaInicio" required />
              </div>
              
              <div class="form-group">
                <label for="horaFin">Hora de Fin *</label>
                <input type="time" id="horaFin" name="horaFin" required />
              </div>
            </div>
            
            <div class="form-group">
              <label for="valorTotal">Valor Total del Contrato (COP) *</label>
              <input type="number" id="valorTotal" name="valorTotal" placeholder="1500000" min="0" step="1000" required />
            </div>
            
            <div class="form-group">
              <label for="abono">Abono Inicial (COP) *</label>
              <input type="number" id="abono" name="abono" placeholder="500000" min="0" step="1000" required />
            </div>
            
            <div class="total-preview" id="totalPreview">Total: $0 | Abono: $0 | Saldo: $0</div>
            
            <div class="form-group">
              <label for="observaciones">Condiciones Adicionales</label>
              <textarea id="observaciones" name="observaciones" placeholder="Condiciones especiales del contrato"></textarea>
            </div>
            
            <button type="submit">Generar Contrato PDF</button>
          </form>
        </div>
        
        <script>
          function calcularSaldos() {
            const valorTotal = parseFloat(document.getElementById('valorTotal').value) || 0;
            const abono = parseFloat(document.getElementById('abono').value) || 0;
            const saldo = valorTotal - abono;
            
            document.getElementById('totalPreview').textContent = 
              'Total: $' + valorTotal.toLocaleString('es-CO') + 
              ' | Abono: $' + abono.toLocaleString('es-CO') + 
              ' | Saldo: $' + saldo.toLocaleString('es-CO');
          }
          
          document.getElementById('valorTotal').addEventListener('input', calcularSaldos);
          document.getElementById('abono').addEventListener('input', calcularSaldos);
          document.getElementById('fecha').min = new Date().toISOString().split('T')[0];
          
          document.getElementById('documentForm').addEventListener('submit', function(e) {
            const valorTotal = parseFloat(document.getElementById('valorTotal').value);
            const abono = parseFloat(document.getElementById('abono').value);
            
            if (valorTotal <= 0) {
              alert('El valor total debe ser mayor a 0');
              e.preventDefault();
              return;
            }
            
            if (abono < 0 || abono > valorTotal) {
              alert('El abono debe ser entre 0 y el valor total');
              e.preventDefault();
              return;
            }
          });
        </script>
      </body>
    </html>
  `);
});

// Generar PDF de contrato
router.post("/contrato", generarContratoPDF);

module.exports = router;