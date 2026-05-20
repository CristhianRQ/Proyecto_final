-- Datos iniciales para registro de usuarios (ejecutar en phpMyAdmin o MySQL)
USE tienda;

-- Roles / permisos (requerido por FK en usuarios)
INSERT INTO permisos (id_permiso, nombre_permiso) VALUES
(1, 'Administrador'),
(2, 'Almacenero'),
(3, 'Vendedor')
ON DUPLICATE KEY UPDATE nombre_permiso = VALUES(nombre_permiso);

-- Usuario administrador demo (correo: admin | contraseña: 1234)
INSERT INTO usuarios (nombres, apellidos, correo, password, id_permiso, estado) VALUES
(
  'Administrador',
  'Sistema',
  'admin',
  '$2b$10$36hZhWIIZHALetwiTkfoWOAHRzC95CxuBmNXMfpPqtO9rs8Fy.uiK',
  1,
  'ACTIVO'
)
ON DUPLICATE KEY UPDATE
  nombres = VALUES(nombres),
  password = VALUES(password),
  estado = 'ACTIVO';

-- Si el correo no es único, ejecuta una sola vez:
-- ALTER TABLE usuarios ADD UNIQUE INDEX uk_usuarios_correo (correo);
