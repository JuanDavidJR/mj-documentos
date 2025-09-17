// app.js - Nuevo archivo principal modular
const express = require("express");
const bodyParser = require("body-parser");

// Importar rutas
const indexRoutes = require("./routes/index");
const cotizacionRoutes = require("./routes/cotizaciones");
const contratoRoutes = require("./routes/contratos");
const cuentaCobroRoutes = require("./routes/cuentas-cobro");
const documentosRoutes = require("./routes/documentos");
const inventarioRoutes = require("./routes/inventario");

// Importar utilidades
const { validarArchivos } = require("./utils/validators");

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

// Usar las rutas
app.use("/", indexRoutes);
app.use("/", cotizacionRoutes);
app.use("/", contratoRoutes);
app.use("/", cuentaCobroRoutes);
app.use("/", documentosRoutes);
app.use("/", inventarioRoutes);

// Middleware de manejo de errores
app.use((error, req, res, next) => {
  console.error("Error:", error);
  res.status(500).send("Ha ocurrido un error en el servidor");
});

// Validar archivos al iniciar
validarArchivos();

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
  console.log(`📁 Estructura modular cargada correctamente`);
  console.log(`✅ Cotizaciones: Habilitadas`);
  console.log(`✅ Contratos: Habilitadas`);
  console.log(`✅ Cuentas de Cobro: Habilitadas`);
});