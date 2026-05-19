const express = require('express');
const router = express.Router();
const db = require('../db'); // Importa el archivo de conexión que creamos en el Paso 2
const bcrypt = require('bcrypt');

// 1. Endpoint para obtener todos los permisos (roles) y cargarlos en el select del formulario
router.get('/permisos', (req, res) => {
  const query = 'SELECT id_permiso, nombre_permiso FROM permisos';
  db.query(query, (err, results) => {
    if (err) {
      console.error('Error al obtener permisos:', err);
      return res.status(500).json({ error: 'Error en el servidor al traer los roles' });
    }
    res.json(results);
  });
});

// 2. Endpoint para registrar un nuevo usuario en la tabla 'usuarios'
router.post('/registro', async (req, res) => {
  const { nombres, apellidos, correo, password, id_permiso } = req.body;

  // Validación de campos obligatorios
  if (!nombres || !apellidos || !correo || !password || !id_permiso) {
    return res.status(400).json({ error: 'Todos los campos son obligatorios.' });
  }

  try {
    // Encriptamos la contraseña por seguridad antes de guardarla (genera un hash de 60 caracteres)
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Consulta SQL estructurada según tus columnas exactas
    const query = `
      INSERT INTO usuarios (nombres, apellidos, correo, password, id_permiso, estado) 
      VALUES (?, ?, ?, ?, ?, 'ACTIVO')
    `;

    db.query(query, [nombres, apellidos, correo, hashedPassword, id_permiso], (err, result) => {
      if (err) {
        // Manejar error si el correo ya existe (duplicado)
        if (err.code === 'ER_DUP_ENTRY') {
          return res.status(400).json({ error: 'El correo electrónico ya está registrado.' });
        }
        console.error('Error al insertar usuario en MySQL:', err);
        return res.status(500).json({ error: 'Error al guardar el usuario en la base de datos.' });
      }
      
      res.status(201).json({ 
        message: 'Usuario registrado exitosamente', 
        id_usuario: result.insertId 
      });
    });
  } catch (error) {
    console.error('Error en el servidor:', error);
    res.status(500).json({ error: 'Error interno del servidor.' });
  }
});

module.exports = router;