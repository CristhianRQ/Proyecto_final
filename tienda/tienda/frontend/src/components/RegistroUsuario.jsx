// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import axios from 'axios';

export default function RegistroUsuario({ colores }) {
  const [form, setForm] = useState({ nombres: '', apellidos: '', correo: '', password: '', id_permiso: '1' });
  const [status, setStatus] = useState({ msg: '', error: false });

  const registrar = (e) => {
    e.preventDefault();
    setStatus({ msg: '', error: false });

    axios.post('http://localhost:5000/api/usuarios/registro', form)
      .then(() => {
        setStatus({ msg: '✅ Personal registrado correctamente en el CRM', error: false });
        setForm({ nombres: '', apellidos: '', correo: '', password: '', id_permiso: '1' });
      })
      .catch((err) => {
        setStatus({ msg: `❌ ${err.response?.data?.error || 'Error de comunicación'}`, error: true });
      });
  };

  const inputStyle = { padding: '11px 14px', borderRadius: '6px', border: '1px solid #ccc', marginBottom: '16px', width: '100%', fontSize: '0.95rem' };

  return (
    <div style={{ maxWidth: '550px', margin: '20px auto', background: '#FFF', padding: '35px', borderRadius: '10px', boxShadow: '0 6px 18px rgba(0,0,0,0.04)' }}>
      <h2 style={{ color: '#001C30', marginBottom: '5px', textAlign: 'center' }}>Control de Accesos</h2>
      <p style={{ color: '#768192', textAlign: 'center', marginBottom: '25px', fontSize: '0.9rem' }}>Añadir nuevos colaboradores al ecosistema del CRM</p>
      
      {status.msg && <div style={{ padding: '12px', marginBottom: '20px', color: '#FFF', background: status.error ? '#e55353' : '#2ed573', borderRadius: '6px', textAlign: 'center', fontWeight: '500' }}>{status.msg}</div>}

      <form onSubmit={registrar}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
          <div>
            <label style={{ fontSize: '0.85rem', fontWeight: 'bold' }}>Nombres</label>
            <input type="text" style={inputStyle} value={form.nombres} onChange={e => setForm({...form, nombres: e.target.value})} required />
          </div>
          <div>
            <label style={{ fontSize: '0.85rem', fontWeight: 'bold' }}>Apellidos</label>
            <input type="text" style={inputStyle} value={form.apellidos} onChange={e => setForm({...form, apellidos: e.target.value})} required />
          </div>
        </div>

        <label style={{ fontSize: '0.85rem', fontWeight: 'bold' }}>Correo Corporativo</label>
        <input type="email" style={inputStyle} value={form.correo} onChange={e => setForm({...form, correo: e.target.value})} placeholder="nombre@tienda.com" required />

        <label style={{ fontSize: '0.85rem', fontWeight: 'bold' }}>Contraseña de Acceso</label>
        <input type="password" style={inputStyle} value={form.password} onChange={e => setForm({...form, password: e.target.value})} placeholder="••••••••" required />

        <label style={{ fontSize: '0.85rem', fontWeight: 'bold' }}>Rol Asignado (Permisos MySQL)</label>
        <select style={inputStyle} value={form.id_permiso} onChange={e => setForm({...form, id_permiso: e.target.value})}>
          <option value="1">Administrador</option>
          <option value="2">Almacenero</option>
          <option value="3">Vendedor</option>
        </select>

        <button type="submit" style={{ width: '100%', background: colores.botones, color: '#FFF', border: 'none', padding: '13px', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold', fontSize: '1rem', marginTop: '10px' }}>
          Guardar e Inculcar Rol
        </button>
      </form>
    </div>
  );
}