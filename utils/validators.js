// utils/validators.js
const fs = require("fs");
const { logoPath, firmaPath } = require("../config/paths");

function validarArchivos() {
  const archivos = [
    { path: logoPath, name: "Logo" },
    { path: firmaPath, name: "Firma" }
  ];
  
  archivos.forEach(archivo => {
    if (!fs.existsSync(archivo.path)) {
      console.warn(`⚠️  Advertencia: ${archivo.name} no encontrado en: ${archivo.path}`);
    }
  });
}

module.exports = {
  validarArchivos
};