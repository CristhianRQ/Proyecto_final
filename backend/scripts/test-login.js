require('dotenv').config({ path: require('path').join(__dirname, '..', '.env') });
const db = require('../db');
const bcrypt = require('bcrypt');

async function verificarPassword(plain, almacenada) {
  if (!almacenada) return false;
  if (almacenada.startsWith('$2a$') || almacenada.startsWith('$2b$')) {
    return bcrypt.compare(plain, almacenada);
  }
  return plain === almacenada;
}

db.query(
  `SELECT u.*, p.nombre_permiso FROM usuarios u
   LEFT JOIN permisos p ON p.id_permiso = u.id_permiso
   WHERE u.correo = ? AND u.estado = 'ACTIVO'`,
  ['carlos@tienda.com'],
  async (err, rows) => {
    if (err) {
      console.error(err);
      process.exit(1);
    }
    console.log('found', rows.length, rows[0]?.correo, rows[0]?.estado);
    if (rows[0]) {
      const ok = await verificarPassword('123456', rows[0].password);
      console.log('password ok', ok);
    }
    process.exit(0);
  }
);
