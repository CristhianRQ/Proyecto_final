const mysql = require('mysql2');
require('dotenv').config();

// Crear el pool de conexión usando variables de entorno o valores por defecto
const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'tienda', // Cambia al nombre exacto de tu BD
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

module.exports = pool;
