// routes/documentos.js
const express = require("express");
const router = express.Router();
const multer = require("multer");
const fs = require("fs");
const path = require("path");
const { getFormCSS } = require("../views/styles");

// Crear carpeta uploads si no existe
const uploadsDir = path.join(__dirname, "../uploads");
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Configuración de multer para subida de archivos
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadsDir);
  },
  filename: function (req, file, cb) {
    // Mantener el nombre original con timestamp para evitar duplicados
    const timestamp = Date.now();
    const originalName = file.originalname;
    cb(null, `${timestamp}_${originalName}`);
  }
});

const upload = multer({
  storage: storage,
  fileFilter: function (req, file, cb) {
    // Solo permitir PDFs
    if (file.mimetype === 'application/pdf') {
      cb(null, true);
    } else {
      cb(new Error('Solo se permiten archivos PDF'));
    }
  },
  limits: {
    fileSize: 10 * 1024 * 1024 // 10MB máximo
  }
});

// Categorías de documentos
const categorias = [
  "Certificados",
  "Documentos Tributarios", 
  "Riders Técnicos",
  "Contratos Tipo",
  "Seguros",
  "Otros"
];

// Página principal de documentos
router.get("/documentos", (req, res) => {
  // Leer archivos existentes
  const archivos = [];
  
  try {
    const files = fs.readdirSync(uploadsDir);
    files.forEach(file => {
      if (file.endsWith('.pdf')) {
        const filePath = path.join(uploadsDir, file);
        const stats = fs.statSync(filePath);
        
        // Extraer información del nombre del archivo
        const parts = file.split('_');
        const timestamp = parts[0];
        const originalName = parts.slice(1).join('_');
        
        archivos.push({
          filename: file,
          originalName: originalName,
          fecha: new Date(parseInt(timestamp)).toLocaleDateString('es-CO'),
          size: (stats.size / 1024 / 1024).toFixed(2) + ' MB'
        });
      }
    });
  } catch (error) {
    console.log("Error leyendo directorio uploads:", error);
  }

  res.send(`
    <!DOCTYPE html>
    <html lang="es">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Documentos Empresariales - MJ Sonido</title>
        <style>${getFormCSS()}</style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <a href="/" class="back-btn">← Volver</a>
            <h1>DOCUMENTOS EMPRESARIALES</h1>
            <div class="subtitle">MJ SONIDO PROFESIONAL</div>
          </div>
          
          <!-- Formulario para subir archivos -->
          <form action="/documentos/upload" method="POST" enctype="multipart/form-data" id="uploadForm">
            <div class="form-group">
              <label for="categoria">Categoría del Documento *</label>
              <select id="categoria" name="categoria" required>
                <option value="">Seleccionar categoría</option>
                ${categorias.map(cat => `<option value="${cat}">${cat}</option>`).join('')}
              </select>
            </div>
            
            <div class="form-group">
              <label for="archivo">Seleccionar Archivo PDF *</label>
              <input type="file" id="archivo" name="archivo" accept=".pdf" required 
                     style="padding: 12px; border: 1px solid rgba(255, 255, 255, 0.1); border-radius: 8px; 
                            background: rgba(255, 255, 255, 0.05); color: #ffffff; width: 100%;" />
            </div>
            
            <button type="submit">Subir Documento</button>
          </form>
          
          ${archivos.length > 0 ? `
            <div style="margin-top: 40px;">
              <h2 style="color: #ffffff; text-align: center; margin-bottom: 30px;">Documentos Subidos</h2>
              
              <div style="background: rgba(255, 255, 255, 0.05); border-radius: 8px; padding: 20px;">
                ${archivos.map(archivo => `
                  <div style="display: flex; justify-content: space-between; align-items: center; 
                             padding: 15px; margin-bottom: 10px; background: rgba(255, 255, 255, 0.03); 
                             border-radius: 5px; border-left: 3px solid #00ff44;">
                    <div>
                      <div style="color: #ffffff; font-weight: 500;">${archivo.originalName}</div>
                      <div style="color: rgba(255, 255, 255, 0.6); font-size: 12px;">
                        ${archivo.fecha} • ${archivo.size}
                      </div>
                    </div>
                    <div style="display: flex; gap: 10px;">
                      <a href="/documentos/download/${archivo.filename}" 
                         style="padding: 8px 16px; background: #00ff44; color: #000; text-decoration: none; 
                                border-radius: 4px; font-size: 12px; font-weight: 500;">
                        Descargar
                      </a>
                      <a href="/documentos/delete/${archivo.filename}" 
                         onclick="return confirm('¿Eliminar este documento?')"
                         style="padding: 8px 16px; background: #ff4444; color: #fff; text-decoration: none; 
                                border-radius: 4px; font-size: 12px; font-weight: 500;">
                        Eliminar
                      </a>
                    </div>
                  </div>
                `).join('')}
              </div>
            </div>
          ` : ''}
        </div>
        
        <script>
          document.getElementById('uploadForm').addEventListener('submit', function(e) {
            const archivo = document.getElementById('archivo').files[0];
            const categoria = document.getElementById('categoria').value;
            
            if (!archivo) {
              alert('Por favor selecciona un archivo');
              e.preventDefault();
              return;
            }
            
            if (!categoria) {
              alert('Por favor selecciona una categoría');
              e.preventDefault();
              return;
            }
            
            if (archivo.size > 10 * 1024 * 1024) {
              alert('El archivo es muy grande. Máximo 10MB');
              e.preventDefault();
              return;
            }
          });
        </script>
      </body>
    </html>
  `);
});

// Subir archivo
router.post("/documentos/upload", upload.single('archivo'), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).send("No se subió ningún archivo");
    }
    
    console.log("Archivo subido:", req.file.filename);
    res.redirect("/documentos?success=1");
    
  } catch (error) {
    console.error("Error subiendo archivo:", error);
    res.status(500).send("Error subiendo archivo");
  }
});

// Descargar archivo
router.get("/documentos/download/:filename", (req, res) => {
  try {
    const filename = req.params.filename;
    const filePath = path.join(uploadsDir, filename);
    
    if (!fs.existsSync(filePath)) {
      return res.status(404).send("Archivo no encontrado");
    }
    
    // Obtener el nombre original del archivo
    const parts = filename.split('_');
    const originalName = parts.slice(1).join('_');
    
    res.download(filePath, originalName);
    
  } catch (error) {
    console.error("Error descargando archivo:", error);
    res.status(500).send("Error descargando archivo");
  }
});

// Eliminar archivo
router.get("/documentos/delete/:filename", (req, res) => {
  try {
    const filename = req.params.filename;
    const filePath = path.join(uploadsDir, filename);
    
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
      console.log("Archivo eliminado:", filename);
    }
    
    res.redirect("/documentos");
    
  } catch (error) {
    console.error("Error eliminando archivo:", error);
    res.status(500).send("Error eliminando archivo");
  }
});

module.exports = router;