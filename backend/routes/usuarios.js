const express = require('express');
const router = express.Router();
const db = require('../db');
const bcrypt = require('bcrypt');

const SALT_ROUNDS = 10;

/** Contraseña en bcrypt ($2a/$2b) o texto plano (datos antiguos en MySQL). */
async function verificarPassword(plain, almacenada) {
  if (!almacenada) return false;
  if (almacenada.startsWith('$2a$') || almacenada.startsWith('$2b$')) {
    return bcrypt.compare(plain, almacenada);
  }
  return plain === almacenada;
}

function queryAsync(sql, params = []) {
  return new Promise((resolve, reject) => {
    db.query(sql, params, (err, results) => {
      if (err) reject(err);
      else resolve(results);
    });
  });
}

// Listar roles para el select del formulario
router.get('/permisos', async (req, res) => {
  try {
    const results = await queryAsync(
      'SELECT id_permiso, nombre_permiso FROM permisos ORDER BY id_permiso'
    );
    res.json(results);
  } catch (err) {
    console.error('Error al obtener permisos:', err);
    res.status(500).json({ error: 'No se pudieron cargar los roles. Verifica la tabla permisos.' });
  }
});

// Iniciar sesión contra MySQL
router.post('/login', async (req, res) => {
  const { correo, password } = req.body;

  if (!correo || !password) {
    return res.status(400).json({ error: 'Usuario y contraseña son obligatorios.' });
  }

  try {
    const identificador = correo.trim();
    const identificadorLower = identificador.toLowerCase();

    const usuarios = await queryAsync(
      `SELECT u.id_usuario, u.nombres, u.apellidos, u.correo, u.password, u.id_permiso, u.estado,
              p.nombre_permiso
       FROM usuarios u
       LEFT JOIN permisos p ON p.id_permiso = u.id_permiso
       WHERE (u.correo = ? OR u.correo = ?) AND u.estado = 'ACTIVO'
       LIMIT 1`,
      [identificador, identificadorLower]
    );

    if (!usuarios.length) {
      return res.status(401).json({ error: 'Credenciales incorrectas.' });
    }

    const usuario = usuarios[0];
    const passwordOk = await verificarPassword(password, usuario.password);

    if (!passwordOk) {
      return res.status(401).json({ error: 'Credenciales incorrectas.' });
    }

    res.json({
      message: 'Sesión iniciada correctamente',
      usuario: {
        id_usuario: usuario.id_usuario,
        nombres: usuario.nombres,
        apellidos: usuario.apellidos,
        correo: usuario.correo,
        id_permiso: usuario.id_permiso,
        nombre_permiso: usuario.nombre_permiso,
      },
    });
  } catch (err) {
    console.error('Error en login:', err);
    res.status(500).json({ error: 'Error al validar credenciales en la base de datos.' });
  }
});

// Registrar nuevo usuario
router.post('/registro', async (req, res) => {
  const nombres = req.body.nombres?.trim();
  const apellidos = req.body.apellidos?.trim();
  const correo = req.body.correo?.trim().toLowerCase();
  const password = req.body.password;
  const id_permiso = parseInt(req.body.id_permiso, 10);

  if (!nombres || !apellidos || !correo || !password || !id_permiso) {
    return res.status(400).json({ error: 'Todos los campos son obligatorios.' });
  }

  if (password.length < 4) {
    return res.status(400).json({ error: 'La contraseña debe tener al menos 4 caracteres.' });
  }

  try {
    const roles = await queryAsync(
      'SELECT id_permiso FROM permisos WHERE id_permiso = ?',
      [id_permiso]
    );
    if (!roles.length) {
      return res.status(400).json({
        error: 'Rol inválido. Ejecuta backend/seed.sql para crear los permisos.',
      });
    }

    const existe = await queryAsync(
      'SELECT id_usuario FROM usuarios WHERE correo = ?',
      [correo]
    );
    if (existe.length) {
      return res.status(400).json({ error: 'El correo electrónico ya está registrado.' });
    }

    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

    const result = await queryAsync(
      `INSERT INTO usuarios (nombres, apellidos, correo, password, id_permiso, estado)
       VALUES (?, ?, ?, ?, ?, 'ACTIVO')`,
      [nombres, apellidos, correo, hashedPassword, id_permiso]
    );

    res.status(201).json({
      message: 'Usuario registrado exitosamente en la base de datos',
      id_usuario: result.insertId,
    });
  } catch (err) {
    if (err.code === 'ER_DUP_ENTRY') {
      return res.status(400).json({ error: 'El correo electrónico ya está registrado.' });
    }
    console.error('Error al insertar usuario:', err);
    res.status(500).json({ error: 'Error al guardar el usuario en MySQL.' });
  }
});

// Listar usuarios (módulo administración)
router.get('/', async (req, res) => {
  try {
    const results = await queryAsync(
      `SELECT u.id_usuario, u.nombres, u.apellidos, u.correo, u.estado,
              p.nombre_permiso
       FROM usuarios u
       LEFT JOIN permisos p ON p.id_permiso = u.id_permiso
       ORDER BY u.id_usuario DESC`
    );
    res.json(results);
  } catch (err) {
    console.error('Error al listar usuarios:', err);
    res.status(500).json({ error: 'Error al consultar usuarios.' });
  }
});

module.exports = router;
