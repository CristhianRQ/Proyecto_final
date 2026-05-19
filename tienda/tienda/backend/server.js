const express = require('express');
const cors = require('cors');
require('dotenv').config();

const usuariosRoutes = require('./routes/usuarios'); // Asegúrate de tener la carpeta 'routes' y el archivo 'usuarios.js'

const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares globales
app.use(cors()); 
app.use(express.json()); 

// Enrutador para el módulo de usuarios
app.use('/api/usuarios', usuariosRoutes);

// Ruta base para testear en el navegador
app.get('/', (req, res) => {
  res.send('Servidor de Ecolim corriendo sin errores de sintaxis 🚀');
});

// Inicialización
app.listen(PORT, () => {
  console.log(`Servidor escuchando en: http://localhost:${PORT}`);
});