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
        <title>MJ Sonido Profesional</title>
        <style>
          * { box-sizing: border-box; margin: 0; padding: 0; }
          
          body { 
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
            background: #0a0a0a;
            min-height: 100vh;
            overflow-x: hidden;
          }
          
          /* Fondo con efectos */
          body::before {
            content: '';
            position: fixed;
            top: -50%;
            left: -50%;
            width: 200%;
            height: 200%;
            background: 
              radial-gradient(circle at 20% 80%, rgba(0, 255, 68, 0.08) 0%, transparent 30%),
              radial-gradient(circle at 80% 20%, rgba(0, 255, 68, 0.05) 0%, transparent 25%),
              radial-gradient(circle at 40% 40%, rgba(0, 255, 68, 0.03) 0%, transparent 20%);
            animation: rotate 20s linear infinite;
            z-index: -1;
          }
          
          @keyframes rotate {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
          
          .main-container {
            min-height: 100vh;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            padding: 20px;
            position: relative;
          }
          
          /* Header con logo */
          .header {
            text-align: center;
            margin-bottom: 50px;
            animation: fadeInDown 0.8s ease-out;
          }
          
          .logo {
            width: 180px;
            height: auto;
            margin-bottom: 15px;
            filter: drop-shadow(0 4px 20px rgba(0, 255, 68, 0.3));
          }
          
          .main-title {
            font-size: 32px;
            font-weight: 300;
            color: #ffffff;
            letter-spacing: 3px;
            margin-bottom: 8px;
            text-shadow: 0 2px 10px rgba(0, 0, 0, 0.5);
          }
          
          .subtitle {
            font-size: 16px;
            color: #00ff44;
            font-weight: 500;
            letter-spacing: 1.5px;
            opacity: 0.9;
          }
          
          /* Grid de opciones */
          .options-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
            gap: 20px;
            max-width: 900px;
            width: 100%;
            animation: fadeInUp 0.8s ease-out 0.2s both;
          }
          
          .option-card {
            background: linear-gradient(135deg, rgba(26, 26, 26, 0.9) 0%, rgba(35, 35, 35, 0.9) 100%);
            border: 1px solid rgba(0, 255, 68, 0.15);
            border-radius: 16px;
            padding: 30px 25px;
            text-decoration: none;
            color: inherit;
            position: relative;
            overflow: hidden;
            transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
            backdrop-filter: blur(20px);
          }
          
          .option-card::before {
            content: '';
            position: absolute;
            top: 0;
            left: -100%;
            width: 100%;
            height: 100%;
            background: linear-gradient(90deg, transparent, rgba(0, 255, 68, 0.1), transparent);
            transition: left 0.5s;
          }
          
          .option-card:hover {
            transform: translateY(-8px) scale(1.02);
            border-color: rgba(0, 255, 68, 0.4);
            box-shadow: 
              0 20px 40px rgba(0, 0, 0, 0.4),
              0 0 30px rgba(0, 255, 68, 0.2);
          }
          
          .option-card:hover::before {
            left: 100%;
          }
          
          .card-icon {
            width: 50px;
            height: 50px;
            background: linear-gradient(135deg, #00ff44, #00cc36);
            border-radius: 12px;
            display: flex;
            align-items: center;
            justify-content: center;
            color: #000;
            font-weight: bold;
            font-size: 20px;
            margin-bottom: 20px;
            box-shadow: 0 4px 15px rgba(0, 255, 68, 0.3);
          }
          
          .card-title {
            font-size: 20px;
            font-weight: 600;
            color: #ffffff;
            margin-bottom: 12px;
            letter-spacing: 0.5px;
          }
          
          .card-description {
            font-size: 14px;
            color: rgba(255, 255, 255, 0.7);
            line-height: 1.6;
            letter-spacing: 0.3px;
          }
          
          /* Animaciones */
          @keyframes fadeInDown {
            from {
              opacity: 0;
              transform: translateY(-30px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          
          @keyframes fadeInUp {
            from {
              opacity: 0;
              transform: translateY(30px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          
          /* Responsive */
          @media (max-width: 768px) {
            .main-title {
              font-size: 24px;
              letter-spacing: 2px;
            }
            
            .logo {
              width: 140px;
            }
            
            .options-grid {
              grid-template-columns: 1fr;
              gap: 15px;
              max-width: 400px;
            }
            
            .option-card {
              padding: 25px 20px;
            }
          }
          
          /* Efectos adicionales */
          .main-container::after {
            content: '';
            position: absolute;
            bottom: 0;
            left: 0;
            right: 0;
            height: 1px;
            background: linear-gradient(90deg, transparent, rgba(0, 255, 68, 0.3), transparent);
          }
        </style>
      </head>
      <body>
        <div class="main-container">
          <div class="header">
            <img src="/logo-negro" alt="MJ Sonido e Iluminación" class="logo" />
            <h1 class="main-title">PÁGINA PRINCIPAL</h1>
            <div class="subtitle">MJ SONIDO PROFESIONAL</div>
          </div>
          
          <div class="options-grid">
            <a href="/cotizacion-form" class="option-card">
              <div class="card-icon">1</div>
              <h3 class="card-title">Cotizaciones</h3>
              <p class="card-description">Genera cotizaciones profesionales para servicios de sonido e iluminación con cálculos automáticos</p>
            </a>
            
            <a href="/contrato-form" class="option-card">
              <div class="card-icon">2</div>
              <h3 class="card-title">Contratos</h3>
              <p class="card-description">Crea contratos de prestación de servicios con términos, condiciones y manejo de abonos</p>
            </a>
            
            <a href="/cuenta-cobro-form" class="option-card">
              <div class="card-icon">3</div>
              <h3 class="card-title">Cuentas de Cobro</h3>
              <p class="card-description">Elabora cuentas de cobro profesionales para facturación de servicios prestados</p>
            </a>
            
            <a href="/documentos" class="option-card">
              <div class="card-icon">4</div>
              <h3 class="card-title">Centro de Documentos</h3>
              <p class="card-description">Gestiona y organiza documentos empresariales como RUT, certificados y riders técnicos</p>
            </a>
            
            <a href="/inventario" class="option-card">
              <div class="card-icon">5</div>
              <h3 class="card-title">Control de Inventario</h3>
              <p class="card-description">Administra equipos de sonido, iluminación y controla disponibilidad para eventos</p>
            </a>
          </div>
        </div>
      </body>
    </html>
  `);
});

// Servir logo para fondo blanco (documentos PDF)
router.get("/logo", (req, res) => {
  const { logoPath } = require("../config/paths");
  const fs = require("fs");
  
  if (fs.existsSync(logoPath)) {
    res.sendFile(logoPath);
  } else {
    res.status(404).send("Logo no encontrado");
  }
});

// Servir logo para fondo negro (página web)
router.get("/logo-negro", (req, res) => {
  const { logoNegroPath } = require("../config/paths");
  const fs = require("fs");
  
  if (fs.existsSync(logoNegroPath)) {
    res.sendFile(logoNegroPath);
  } else {
    res.status(404).send("Logo negro no encontrado");
  }
});

module.exports = router;