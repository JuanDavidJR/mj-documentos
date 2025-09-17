// routes/inventario.js
const express = require("express");
const router = express.Router();
const fs = require("fs");
const path = require("path");
const { getFormCSS } = require("../views/styles");

// Ruta del archivo de inventario
const inventarioPath = path.join(__dirname, "../data/inventario.json");

// Crear carpeta data si no existe
const dataDir = path.join(__dirname, "../data");
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

// Inventario base basado en el rider técnico
const inventarioBase = {
  "sistema_principal": [
    { id: "sq6", nombre: "Consola Digital ALLAN & HEAT SQ6", cantidad: 1, disponible: 1, estado: "disponible" },
    { id: "drv4800", nombre: "Procesador D.S.P. DRIVE RACK 4800", cantidad: 1, disponible: 1, estado: "disponible" },
    { id: "ca9", nombre: "Amplificadores Crest audio CA9", cantidad: 6, disponible: 6, estado: "disponible" },
    { id: "ca12", nombre: "Amplificadores Crest audio CA12", cantidad: 4, disponible: 4, estado: "disponible" }
  ],
  "line_array": [
    { id: "d3215", nombre: "SOUND KING D3215", cantidad: 12, disponible: 12, estado: "disponible" },
    { id: "hdl20a", nombre: "TIPO HDL20A", cantidad: 12, disponible: 12, estado: "disponible" },
    { id: "sub18", nombre: "Sistema de bajos EIGHTEENSOUND 18\"", cantidad: 12, disponible: 12, estado: "disponible" }
  ],
  "monitores": [
    { id: "m32", nombre: "Consola Digital MIDAS M32", cantidad: 1, disponible: 1, estado: "disponible" },
    { id: "drv260", nombre: "Procesador D.S.P. DRIVE RACK 260", cantidad: 1, disponible: 1, estado: "disponible" },
    { id: "psm300", nombre: "InEar SHURE PSM300", cantidad: 3, disponible: 3, estado: "disponible" },
    { id: "p2", nombre: "InEar BEHRINGER P2", cantidad: 8, disponible: 8, estado: "disponible" },
    { id: "nx750", nombre: "Monitores YORKVILLE NX750", cantidad: 12, disponible: 12, estado: "disponible" },
    { id: "subyor", nombre: "Sub doble YORKVILLE", cantidad: 2, disponible: 2, estado: "disponible" }
  ],
  "microfonia": [
    { id: "beta58", nombre: "SHURE Beta 58", cantidad: 4, disponible: 4, estado: "disponible" },
    { id: "beta57", nombre: "SHURE Beta 57", cantidad: 10, disponible: 10, estado: "disponible" },
    { id: "sm58", nombre: "SHURE SM 58", cantidad: 4, disponible: 4, estado: "disponible" },
    { id: "sm57", nombre: "SHURE SM 57", cantidad: 8, disponible: 8, estado: "disponible" },
    { id: "beta91a", nombre: "SHURE Beta 91A", cantidad: 1, disponible: 1, estado: "disponible" },
    { id: "beta52a", nombre: "SHURE Beta 52A", cantidad: 1, disponible: 1, estado: "disponible" },
    { id: "tgv70d", nombre: "BEYERDYNAMIC TGV70D VOZ", cantidad: 4, disponible: 4, estado: "disponible" },
    { id: "c518", nombre: "AKG C518 CON CLAN", cantidad: 2, disponible: 2, estado: "disponible" },
    { id: "e904", nombre: "SENHEISER E904", cantidad: 2, disponible: 2, estado: "disponible" },
    { id: "atm350", nombre: "AUDIOTECHNICA ATM350", cantidad: 5, disponible: 5, estado: "disponible" },
    { id: "at2020", nombre: "AUDIOTECHNICA AT2020 CORAL", cantidad: 7, disponible: 7, estado: "disponible" },
    { id: "v7", nombre: "SE ELECTRONICS V7", cantidad: 4, disponible: 4, estado: "disponible" },
    { id: "samson7", nombre: "KIT DRUMS SAMSON 7 UNIDADES", cantidad: 1, disponible: 1, estado: "disponible" },
    { id: "blx24", nombre: "SHURE INALAMBRICO SM58 BLX24", cantidad: 2, disponible: 2, estado: "disponible" },
    { id: "qlxd4", nombre: "SHURE INALAMBRICO SM58 QLXD4", cantidad: 2, disponible: 2, estado: "disponible" },
    { id: "dbxact", nombre: "CAJAS DIRECTAS dbx ACTIVAS", cantidad: 8, disponible: 8, estado: "disponible" },
    { id: "imp2", nombre: "CAJAS DIRECTAS WHIRLWIND IMP2", cantidad: 6, disponible: 6, estado: "disponible" }
  ],
  "iluminacion": [
    { id: "martin", nombre: "Consola Martin PC INTERFAZ MARTIN M-TOUCH", cantidad: 1, disponible: 1, estado: "disponible" },
    { id: "dimmer", nombre: "Dimmer TEI DMX DIM 8 CHANNELS", cantidad: 3, disponible: 3, estado: "disponible" },
    { id: "k10", nombre: "Cabezas móvil K10 19x15W LED", cantidad: 10, disponible: 10, estado: "disponible" },
    { id: "beam230", nombre: "Cabezas móvil BEAM 230 7R", cantidad: 20, disponible: 20, estado: "disponible" },
    { id: "beam5r", nombre: "Cabezas móviles BEAM ELATIUM PLATINUM 5R", cantidad: 6, disponible: 6, estado: "disponible" },
    { id: "aura", nombre: "Cabezas móvil AURA 19x15W RGBW", cantidad: 8, disponible: 8, estado: "disponible" },
    { id: "led108", nombre: "Cabezas móviles LED RGBW 108", cantidad: 8, disponible: 8, estado: "disponible" },
    { id: "par3w", nombre: "Par LED 3 WATT", cantidad: 42, disponible: 42, estado: "disponible" },
    { id: "parcom", nombre: "Par COM LUZ BLANCA", cantidad: 10, disponible: 10, estado: "disponible" },
    { id: "blinder", nombre: "Blinder DE 4 LAMPARAS CON DMX", cantidad: 4, disponible: 4, estado: "disponible" },
    { id: "humo", nombre: "Maquina de humo F1500L PL Pro", cantidad: 2, disponible: 2, estado: "disponible" },
    { id: "splitter", nombre: "SPLITTER DMX SEÑAL", cantidad: 4, disponible: 4, estado: "disponible" },
    { id: "strobo", nombre: "Atomic Strobo Skypix 3000", cantidad: 24, disponible: 24, estado: "disponible" }
  ],
  "video": [
    { id: "led39i", nombre: "PANTALLA LED 3.9 PISS 4X3 MTS INDOR", cantidad: 1, disponible: 1, estado: "disponible" },
    { id: "led32o", nombre: "PANTALLA LED 3X2 MTS OUTDOOR", cantidad: 2, disponible: 2, estado: "disponible" },
    { id: "linsn", nombre: "PROCESADORES LINSN", cantidad: 2, disponible: 2, estado: "disponible" },
    { id: "novastar", nombre: "PROCESADORES NOVASTAR", cantidad: 2, disponible: 2, estado: "disponible" },
    { id: "laptop", nombre: "PC PORTATIL ASUS TUF GAMING A15", cantidad: 1, disponible: 1, estado: "disponible" }
  ],
  "infraestructura": [
    { id: "tarima", nombre: "TARIMA 11mt x 10mt Altura 1,80mt", cantidad: 1, disponible: 1, estado: "disponible" },
    { id: "techo", nombre: "TECHO 11,50mt x 10,50mt Altura 9mt", cantidad: 1, disponible: 1, estado: "disponible" },
    { id: "sobretarima", nombre: "SOBRETARIMAS 2,50X1,80X60 MTS", cantidad: 4, disponible: 4, estado: "disponible" }
  ]
};

// Inicializar inventario si no existe
function inicializarInventario() {
  if (!fs.existsSync(inventarioPath)) {
    fs.writeFileSync(inventarioPath, JSON.stringify(inventarioBase, null, 2));
  }
}

// Leer inventario
function leerInventario() {
  try {
    if (fs.existsSync(inventarioPath)) {
      return JSON.parse(fs.readFileSync(inventarioPath, 'utf8'));
    } else {
      inicializarInventario();
      return inventarioBase;
    }
  } catch (error) {
    console.error("Error leyendo inventario:", error);
    return inventarioBase;
  }
}

// Guardar inventario
function guardarInventario(inventario) {
  try {
    fs.writeFileSync(inventarioPath, JSON.stringify(inventario, null, 2));
  } catch (error) {
    console.error("Error guardando inventario:", error);
  }
}

// Página principal de inventario
router.get("/inventario", (req, res) => {
  const inventario = leerInventario();
  
  res.send(`
    <!DOCTYPE html>
    <html lang="es">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Control de Inventario - MJ Sonido</title>
        <style>${getFormCSS()}</style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <a href="/" class="back-btn">← Volver</a>
            <h1>CONTROL DE INVENTARIO</h1>
            <div class="subtitle">MJ SONIDO PROFESIONAL</div>
          </div>
          
          ${Object.entries(inventario).map(([categoria, equipos]) => `
            <div style="margin-bottom: 40px;">
              <h2 style="color: #00ff44; text-transform: uppercase; margin-bottom: 20px; border-bottom: 1px solid rgba(0, 255, 68, 0.3); padding-bottom: 10px;">
                ${categoria.replace('_', ' ')}
              </h2>
              
              <div style="display: grid; gap: 10px;">
                ${equipos.map(equipo => `
                  <div style="display: flex; justify-content: space-between; align-items: center; 
                             padding: 15px; background: rgba(255, 255, 255, 0.05); 
                             border-radius: 8px; border-left: 4px solid ${
                               equipo.disponible === 0 ? '#ff4444' : 
                               equipo.disponible < equipo.cantidad ? '#ffaa00' : '#00ff44'
                             };">
                    <div>
                      <div style="color: #ffffff; font-weight: 500; margin-bottom: 5px;">
                        ${equipo.nombre}
                      </div>
                      <div style="color: rgba(255, 255, 255, 0.6); font-size: 12px;">
                        Total: ${equipo.cantidad} | Disponible: ${equipo.disponible} | En uso: ${equipo.cantidad - equipo.disponible}
                      </div>
                    </div>
                    <div style="display: flex; gap: 10px;">
                      <span style="padding: 4px 8px; border-radius: 12px; font-size: 10px; font-weight: 500;
                                   background: ${
                                     equipo.disponible === 0 ? '#ff4444' : 
                                     equipo.disponible < equipo.cantidad ? '#ffaa00' : '#00ff44'
                                   }; 
                                   color: ${equipo.disponible === 0 ? '#fff' : '#000'};">
                        ${equipo.disponible === 0 ? 'AGOTADO' : 
                          equipo.disponible < equipo.cantidad ? 'PARCIAL' : 'DISPONIBLE'}
                      </span>
                      <button onclick="cambiarEstado('${categoria}', '${equipo.id}')" 
                              style="padding: 6px 12px; background: #333; color: #fff; border: none; 
                                     border-radius: 4px; cursor: pointer; font-size: 10px;">
                        Editar
                      </button>
                    </div>
                  </div>
                `).join('')}
              </div>
            </div>
          `).join('')}
          
          <div style="margin-top: 40px; padding: 20px; background: rgba(0, 255, 68, 0.1); border-radius: 8px;">
            <h3 style="color: #00ff44; margin-bottom: 15px;">Resumen de Estado</h3>
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 15px;">
              <div style="text-align: center;">
                <div style="font-size: 24px; font-weight: bold; color: #00ff44;">
                  ${Object.values(inventario).flat().filter(e => e.disponible > 0).length}
                </div>
                <div style="color: rgba(255, 255, 255, 0.7); font-size: 12px;">Equipos Disponibles</div>
              </div>
              <div style="text-align: center;">
                <div style="font-size: 24px; font-weight: bold; color: #ffaa00;">
                  ${Object.values(inventario).flat().filter(e => e.disponible < e.cantidad && e.disponible > 0).length}
                </div>
                <div style="color: rgba(255, 255, 255, 0.7); font-size: 12px;">Uso Parcial</div>
              </div>
              <div style="text-align: center;">
                <div style="font-size: 24px; font-weight: bold; color: #ff4444;">
                  ${Object.values(inventario).flat().filter(e => e.disponible === 0).length}
                </div>
                <div style="color: rgba(255, 255, 255, 0.7); font-size: 12px;">Agotados</div>
              </div>
            </div>
          </div>
        </div>
        
        <script>
          function cambiarEstado(categoria, equipoId) {
            const nuevaCantidad = prompt('Ingrese cantidad disponible:');
            if (nuevaCantidad !== null && !isNaN(nuevaCantidad)) {
              window.location.href = '/inventario/actualizar/' + categoria + '/' + equipoId + '/' + nuevaCantidad;
            }
          }
        </script>
      </body>
    </html>
  `);
});

// Actualizar cantidad de equipo
router.get("/inventario/actualizar/:categoria/:equipoId/:cantidad", (req, res) => {
  try {
    const { categoria, equipoId, cantidad } = req.params;
    const inventario = leerInventario();
    
    if (inventario[categoria]) {
      const equipo = inventario[categoria].find(e => e.id === equipoId);
      if (equipo) {
        const nuevaCantidad = parseInt(cantidad);
        if (nuevaCantidad >= 0 && nuevaCantidad <= equipo.cantidad) {
          equipo.disponible = nuevaCantidad;
          guardarInventario(inventario);
        }
      }
    }
    
    res.redirect("/inventario");
  } catch (error) {
    console.error("Error actualizando inventario:", error);
    res.redirect("/inventario");
  }
});

// Inicializar inventario al cargar el módulo
inicializarInventario();

module.exports = router;