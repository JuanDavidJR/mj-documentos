// routes/cuentas-cobro.js
const express = require("express");
const router = express.Router();
const { getFormCSS } = require("../views/styles");
const { generarCuentaCobroPDF } = require("../pdf/cuenta-cobro-pdf");

// Formulario de cuenta de cobro
router.get("/cuenta-cobro-form", (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html lang="es">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Cuenta de Cobro - MJ Sonido Profesional</title>
        <style>${getFormCSS()}</style>
        <style>
          .logo-toggle-group {
            display: flex;
            align-items: center;
            justify-content: space-between;
            background: #f8f9fa;
            border: 1px solid #dee2e6;
            border-radius: 8px;
            padding: 12px 16px;
            margin-bottom: 20px;
          }
          .logo-toggle-label {
            font-size: 14px;
            font-weight: 600;
            color: #444;
          }
          .toggle-switch {
            position: relative;
            display: inline-block;
            width: 52px;
            height: 28px;
            flex-shrink: 0;
          }
          .toggle-switch input {
            opacity: 0;
            width: 0;
            height: 0;
          }
          .toggle-slider {
            position: absolute;
            cursor: pointer;
            top: 0; left: 0; right: 0; bottom: 0;
            background-color: #ccc;
            border-radius: 28px;
            transition: 0.3s;
          }
          .toggle-slider:before {
            position: absolute;
            content: "";
            height: 20px;
            width: 20px;
            left: 4px;
            bottom: 4px;
            background-color: white;
            border-radius: 50%;
            transition: 0.3s;
          }
          .toggle-switch input:checked + .toggle-slider {
            background-color: #2d6a4f;
          }
          .toggle-switch input:checked + .toggle-slider:before {
            transform: translateX(24px);
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <a href="/" class="back-btn">← Volver</a>
            <h1>CUENTA DE COBRO</h1>
            <div class="subtitle">MJ SONIDO PROFESIONAL</div>
          </div>
          
          <form action="/cuenta-cobro" method="POST" id="documentForm">
            <div class="form-group">
              <label for="deudor">Debe A (Cliente) *</label>
              <input type="text" id="deudor" name="deudor" placeholder="Ej: COOMULTRUP" required />
            </div>
            
            <div class="form-group">
              <label for="acreedor">Acreedor *</label>
              <input type="text" id="acreedor" name="acreedor" placeholder="Ej: YANETH FABIOLA ROJAS CONTRERAS" required />
            </div>
            
            <div class="row">
              <div class="form-group">
                <label for="nit">NIT del Acreedor *</label>
                <input type="text" id="nit" name="nit" placeholder="Ej: 37512237-0" required />
              </div>
              
              <div class="form-group">
                <label for="cedula">Cédula del Acreedor *</label>
                <input type="text" id="cedula" name="cedula" placeholder="Ej: 88156320" required />
              </div>
            </div>
            
            <div class="form-group">
              <label for="valorTotal">Valor Total (COP) *</label>
              <input type="number" id="valorTotal" name="valorTotal" placeholder="1200000" min="0" step="1000" required />
            </div>
            
            <div class="total-preview" id="totalPreview">Total: $0</div>
            
            <div class="form-group">
              <label for="concepto">Concepto del Cobro *</label>
              <textarea id="concepto" name="concepto" placeholder="Ej: PRESENTACION GRUPO MUSICAL EN EL DIA DE LA FAMILIA" required></textarea>
            </div>
            
            <div class="form-group">
              <label for="fechaEvento">Fecha del Evento *</label>
              <input type="date" id="fechaEvento" name="fechaEvento" required />
            </div>
            
            <div class="form-group">
              <label for="observaciones">Observaciones Adicionales</label>
              <textarea id="observaciones" name="observaciones" placeholder="Información adicional sobre el cobro"></textarea>
            </div>
            
            <input type="hidden" id="includeLogo" name="includeLogo" value="true" />
            
            <div class="logo-toggle-group">
              <span class="logo-toggle-label">Incluir logo en el PDF</span>
              <label class="toggle-switch">
                <input type="checkbox" id="logoToggle" checked onchange="document.getElementById('includeLogo').value = this.checked ? 'true' : 'false'" />
                <span class="toggle-slider"></span>
              </label>
            </div>
            
            <button type="submit">Generar Cuenta de Cobro PDF</button>
          </form>
        </div>
        
        <script>
          function mostrarTotal() {
            const valorTotal = parseFloat(document.getElementById('valorTotal').value) || 0;
            document.getElementById('totalPreview').textContent = 
              'Total: $' + valorTotal.toLocaleString('es-CO');
          }
          
          document.getElementById('valorTotal').addEventListener('input', mostrarTotal);
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

// Generar PDF de cuenta de cobro
router.post("/cuenta-cobro", generarCuentaCobroPDF);

module.exports = router;
