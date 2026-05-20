// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react';
import { fetchPermisos, listarUsuarios, registrarUsuario } from '../api/usuarios';
import tableStyles from '../styles/Tables.module.css';

export default function RegistroUsuario() {
  const [form, setForm] = useState({
    nombres: '',
    apellidos: '',
    correo: '',
    password: '',
    id_permiso: '1',
  });
  const [permisos, setPermisos] = useState([]);
  const [usuarios, setUsuarios] = useState([]);
  const [status, setStatus] = useState({ msg: '', error: false });
  const [loading, setLoading] = useState(false);

  const cargarDatos = async () => {
    try {
      const [roles, lista] = await Promise.all([fetchPermisos(), listarUsuarios()]);
      setPermisos(roles);
      setUsuarios(lista);
      if (roles.length > 0) {
        setForm((f) => ({ ...f, id_permiso: String(roles[0].id_permiso) }));
      }
    } catch {
      setStatus({
        msg: 'No se pudo conectar con la API. Verifica que el backend esté en marcha.',
        error: true,
      });
    }
  };

  useEffect(() => {
    cargarDatos();
  }, []);

  const registrar = async (e) => {
    e.preventDefault();
    setStatus({ msg: '', error: false });
    setLoading(true);

    try {
      await registrarUsuario({
        nombres: form.nombres.trim(),
        apellidos: form.apellidos.trim(),
        correo: form.correo.trim().toLowerCase(),
        password: form.password,
        id_permiso: form.id_permiso,
      });
      setStatus({ msg: 'Usuario guardado correctamente en MySQL.', error: false });
      setForm({
        nombres: '',
        apellidos: '',
        correo: '',
        password: '',
        id_permiso: permisos[0] ? String(permisos[0].id_permiso) : '1',
      });
      await cargarDatos();
    } catch (err) {
      setStatus({
        msg: err.response?.data?.error || 'Error al registrar en la base de datos',
        error: true,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <p className="text-muted mb-4">
        Los nuevos colaboradores se guardan en la tabla <code>usuarios</code> de MySQL con contraseña
        encriptada (bcrypt).
      </p>

      {status.msg && (
        <div className={`alert py-2 ${status.error ? 'alert-danger' : 'alert-success'}`}>
          {status.msg}
        </div>
      )}

      <div className="card border-0 shadow-sm mb-4">
        <div className="card-body p-4">
          <h3 className="h5 fw-bold mb-3">Registrar nuevo usuario</h3>
          <form onSubmit={registrar}>
            <div className="row g-3 mb-3">
              <div className="col-md-6">
                <label className="form-label fw-semibold">Nombres</label>
                <input
                  type="text"
                  className="form-control"
                  value={form.nombres}
                  onChange={(e) => setForm({ ...form, nombres: e.target.value })}
                  required
                />
              </div>
              <div className="col-md-6">
                <label className="form-label fw-semibold">Apellidos</label>
                <input
                  type="text"
                  className="form-control"
                  value={form.apellidos}
                  onChange={(e) => setForm({ ...form, apellidos: e.target.value })}
                  required
                />
              </div>
            </div>

            <div className="mb-3">
              <label className="form-label fw-semibold">Correo</label>
              <input
                type="email"
                className="form-control"
                value={form.correo}
                onChange={(e) => setForm({ ...form, correo: e.target.value })}
                placeholder="nombre@tienda.com"
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label fw-semibold">Contraseña</label>
              <input
                type="password"
                className="form-control"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                minLength={4}
                required
              />
            </div>

            <div className="mb-4">
              <label className="form-label fw-semibold">Rol (permiso)</label>
              <select
                className="form-select"
                value={form.id_permiso}
                onChange={(e) => setForm({ ...form, id_permiso: e.target.value })}
                required
              >
                {permisos.map((p) => (
                  <option key={p.id_permiso} value={p.id_permiso}>
                    {p.nombre_permiso}
                  </option>
                ))}
              </select>
            </div>

            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? 'Guardando...' : 'Guardar en base de datos'}
            </button>
          </form>
        </div>
      </div>

      <h3 className="h6 fw-bold mb-3">Usuarios registrados</h3>
      <div className={`table-responsive ${tableStyles.wrap}`}>
        <table className="table table-hover align-middle mb-0">
          <thead className="table-light">
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Correo</th>
              <th>Rol</th>
              <th>Estado</th>
            </tr>
          </thead>
          <tbody>
            {usuarios.length === 0 ? (
              <tr>
                <td colSpan={5} className="text-center text-muted py-4">
                  No hay usuarios o no se pudo cargar la lista.
                </td>
              </tr>
            ) : (
              usuarios.map((u) => (
                <tr key={u.id_usuario}>
                  <td>{u.id_usuario}</td>
                  <td>
                    {u.nombres} {u.apellidos}
                  </td>
                  <td>{u.correo}</td>
                  <td>{u.nombre_permiso || '—'}</td>
                  <td>
                    <span
                      className={`badge ${u.estado === 'ACTIVO' ? 'text-bg-success' : 'text-bg-secondary'}`}
                    >
                      {u.estado}
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
