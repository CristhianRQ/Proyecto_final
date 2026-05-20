// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react';
import { fetchPermisos, loginUsuario, registrarUsuario } from '../api/usuarios';
import styles from './LoginCRM.module.css';

function IconUser() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8Zm0 2c-4.42 0-8 2.24-8 5v1h16v-1c0-2.76-3.58-5-8-5Z"
        fill="currentColor"
      />
    </svg>
  );
}

function IconLock() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M17 9h-1V7a4 4 0 0 0-8 0v2H7a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-8a2 2 0 0 0-2-2Zm-3 0H10V7a2 2 0 1 1 4 0v2Z"
        fill="currentColor"
      />
    </svg>
  );
}

function IconShoe() {
  return (
    <svg className={styles.shoeSvg} viewBox="0 0 120 60" fill="none" aria-hidden="true">
      <path
        d="M8 38c8-14 22-22 38-24 6-.5 12 0 18 2 10 4 18 12 22 22l6 14H12l-4-14Z"
        fill="rgba(255,255,255,0.12)"
      />
      <path
        d="M20 36c6-8 16-14 28-15 8-.5 16 2 24 8 4 3 7 8 8 13H24c-1-3-2-4-4-6Z"
        fill="rgba(255,255,255,0.25)"
      />
      <ellipse cx="88" cy="42" rx="10" ry="4" fill="rgba(255,255,255,0.2)" />
    </svg>
  );
}

export default function LoginCRM({ onLoginSuccess }) {
  const [modo, setModo] = useState('login');
  const [showPass, setShowPass] = useState(false);
  const [form, setForm] = useState({
    nombres: '',
    apellidos: '',
    correo: '',
    password: '',
    id_permiso: '1',
  });
  const [status, setStatus] = useState({ msg: '', error: false });
  const [permisos, setPermisos] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (modo !== 'register') return;

    fetchPermisos()
      .then((data) => {
        setPermisos(data);
        if (data.length > 0) {
          setForm((f) => ({ ...f, id_permiso: String(data[0].id_permiso) }));
        }
      })
      .catch(() => {
        setStatus({
          msg: 'No se cargaron los roles. Inicia el backend y ejecuta backend/seed.sql en MySQL.',
          error: true,
        });
      });
  }, [modo]);

  const cambiarModo = (nuevoModo) => {
    setModo(nuevoModo);
    setStatus({ msg: '', error: false });
    setForm({ nombres: '', apellidos: '', correo: '', password: '', id_permiso: '1' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ msg: '', error: false });
    setLoading(true);

    try {
      if (modo === 'login') {
        const data = await loginUsuario(form.correo.trim(), form.password);
        sessionStorage.setItem('usuario', JSON.stringify(data.usuario));
        onLoginSuccess(data.usuario);
      } else {
        await registrarUsuario({
          nombres: form.nombres.trim(),
          apellidos: form.apellidos.trim(),
          correo: form.correo.trim().toLowerCase(),
          password: form.password,
          id_permiso: form.id_permiso,
        });
        setStatus({
          msg: 'Cuenta guardada en MySQL. Ya puedes iniciar sesión con tu correo.',
          error: false,
        });
        setModo('login');
        setForm({ nombres: '', apellidos: '', correo: '', password: '', id_permiso: '1' });
      }
    } catch (err) {
      const msg = err.response?.data?.error
        || (err.code === 'ERR_NETWORK'
          ? 'No hay conexión con el servidor. Ejecuta: cd backend && npm start'
          : 'Error al procesar la solicitud');
      setStatus({ msg, error: true });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`min-vh-100 ${styles.page}`}>
      <div className={styles.bgOrb1} aria-hidden="true" />
      <div className={styles.bgOrb2} aria-hidden="true" />
      <div className={styles.bgGrid} aria-hidden="true" />

      {/* POSICIÓN: container = centrado en pantalla | row/col = ancho tarjeta */}
      <div className={`container py-4 py-lg-5 ${styles.loginWrap}`}>
        <div className={`row justify-content-center ${styles.loginRow}`}>
          <div className={`col-12 ${styles.loginCol}`}>
            {/* POSICIÓN: shell = tarjeta principal (max-width + margin auto) */}
            <div className={`card border-0 ${styles.shell}`}>
              {/* POSICIÓN: col-lg-5 / col-lg-7 = split 40% marca | 60% formulario */}
              <div className="row g-0">
                <div className={`col-lg-5 ${styles.brandPanel}`}>
                  <div className={styles.brandInner}>
                    <div className={styles.logoMark}>SNK</div>
                    <h2 className={styles.brandTitle}>SNEAKERS</h2>
                    <p className={styles.brandTagline}>Predicción y reporte de ventas</p>
                    <IconShoe />
                    <ul className={styles.featureList}>
                      <li>
                        <span className={styles.featureDot} />
                        Dashboard en tiempo real
                      </li>
                      <li>
                        <span className={styles.featureDot} />
                        Machine Learning integrado
                      </li>
                      <li>
                        <span className={styles.featureDot} />
                        Top 5 productos más vendidos
                      </li>
                    </ul>
                    <div className={styles.brandBadge}>ERP · Tienda de zapatillas</div>
                  </div>
                </div>

                <div className={`col-lg-7 ${styles.formPanel}`}>
                  <div className={styles.formInner}>
                    <header className="mb-4">
                      <span className={styles.formEyebrow}>
                        {modo === 'login' ? 'Acceso al sistema' : 'Nueva cuenta'}
                      </span>
                      <h1 className={styles.formTitle}>
                        {modo === 'login' ? 'Bienvenido de nuevo' : 'Únete al equipo'}
                      </h1>
                      <p className={styles.formSubtitle}>
                        {modo === 'login'
                          ? 'Ingresa tus credenciales para continuar'
                          : 'Completa el formulario para registrarte'}
                      </p>
                    </header>

                    {status.msg && (
                      <div
                        className={`alert d-flex align-items-center gap-2 py-2 px-3 mb-4 small ${
                          status.error ? styles.alertError : styles.alertSuccess
                        }`}
                        role="alert"
                      >
                        {status.msg}
                      </div>
                    )}

                    <form onSubmit={handleSubmit} noValidate>
                      {modo === 'register' && (
                        <div className="row g-3 mb-3">
                          <div className="col-sm-6">
                            <label htmlFor="nombres" className={`form-label ${styles.label}`}>
                              Nombres
                            </label>
                            <input
                              id="nombres"
                              type="text"
                              className={`form-control ${styles.input}`}
                              value={form.nombres}
                              onChange={(e) => setForm({ ...form, nombres: e.target.value })}
                              required
                            />
                          </div>
                          <div className="col-sm-6">
                            <label htmlFor="apellidos" className={`form-label ${styles.label}`}>
                              Apellidos
                            </label>
                            <input
                              id="apellidos"
                              type="text"
                              className={`form-control ${styles.input}`}
                              value={form.apellidos}
                              onChange={(e) => setForm({ ...form, apellidos: e.target.value })}
                              required
                            />
                          </div>
                        </div>
                      )}

                      <div className="mb-3">
                        <label htmlFor="correo" className={`form-label ${styles.label}`}>
                          {modo === 'login' ? 'Usuario o correo' : 'Correo electrónico'}
                        </label>
                        <div className={`input-group ${styles.inputGroup}`}>
                          <span className={`input-group-text ${styles.inputIcon}`}>
                            <IconUser />
                          </span>
                          <input
                            id="correo"
                            type={modo === 'login' ? 'text' : 'email'}
                            className={`form-control ${styles.input}`}
                            value={form.correo}
                            onChange={(e) => setForm({ ...form, correo: e.target.value })}
                            placeholder={modo === 'login' ? 'carlos@tienda.com' : 'tu@correo.com'}
                            autoComplete="username"
                            required
                          />
                        </div>
                      </div>

                      <div className="mb-4">
                        <label htmlFor="password" className={`form-label ${styles.label}`}>
                          Contraseña
                        </label>
                        <div className={`input-group ${styles.inputGroup}`}>
                          <span className={`input-group-text ${styles.inputIcon}`}>
                            <IconLock />
                          </span>
                          <input
                            id="password"
                            type={showPass ? 'text' : 'password'}
                            className={`form-control ${styles.input}`}
                            value={form.password}
                            onChange={(e) => setForm({ ...form, password: e.target.value })}
                            placeholder="••••••••"
                            autoComplete={modo === 'login' ? 'current-password' : 'new-password'}
                            required
                          />
                          <button
                            type="button"
                            className={`btn ${styles.btnGhost}`}
                            onClick={() => setShowPass((v) => !v)}
                            tabIndex={-1}
                            aria-label={showPass ? 'Ocultar contraseña' : 'Mostrar contraseña'}
                          >
                            {showPass ? 'Ocultar' : 'Ver'}
                          </button>
                        </div>
                      </div>

                      {modo === 'register' && (
                        <div className="mb-4">
                          <label htmlFor="permiso" className={`form-label ${styles.label}`}>
                            Rol inicial
                          </label>
                          <select
                            id="permiso"
                            className="form-select"
                            value={form.id_permiso}
                            onChange={(e) => setForm({ ...form, id_permiso: e.target.value })}
                            required
                          >
                            {permisos.length > 0 ? (
                              permisos.map((p) => (
                                <option key={p.id_permiso} value={p.id_permiso}>
                                  {p.nombre_permiso}
                                </option>
                              ))
                            ) : (
                              <>
                                <option value="1">Administrador</option>
                                <option value="2">Almacenero</option>
                                <option value="3">Vendedor</option>
                              </>
                            )}
                          </select>
                        </div>
                      )}

                      <button
                        type="submit"
                        className={`btn w-100 ${styles.btnPrimary}`}
                        disabled={loading}
                      >
                        <span>
                          {loading
                            ? 'Procesando...'
                            : modo === 'login'
                              ? 'Iniciar sesión'
                              : 'Crear cuenta'}
                        </span>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                          <path
                            d="M5 12h14m-6-6 6 6-6 6"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </button>
                    </form>

                    <div className={styles.divider}>
                      <span>o</span>
                    </div>

                    <p className={`text-center mb-0 ${styles.footer}`}>
                      {modo === 'login' ? (
                        <>
                          ¿No tienes cuenta?{' '}
                          <button
                            type="button"
                            className={styles.linkToggle}
                            onClick={() => cambiarModo('register')}
                          >
                            Regístrate aquí
                          </button>
                        </>
                      ) : (
                        <>
                          ¿Ya tienes cuenta?{' '}
                          <button
                            type="button"
                            className={styles.linkToggle}
                            onClick={() => cambiarModo('login')}
                          >
                            Inicia sesión
                          </button>
                        </>
                      )}
                    </p>

                    {modo === 'login' && (
                      <p className={`text-center mt-3 mb-0 ${styles.hint}`}>
                        Demo: <code>carlos@tienda.com</code> / <code>123456</code>
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
