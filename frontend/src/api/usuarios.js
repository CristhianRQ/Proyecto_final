import axios from 'axios';
import { API_URL } from './config';

const api = axios.create({
  baseURL: `${API_URL}/usuarios`,
  headers: { 'Content-Type': 'application/json' },
});

export async function fetchPermisos() {
  const { data } = await api.get('/permisos');
  return data;
}

export async function loginUsuario(correo, password) {
  const { data } = await api.post('/login', { correo, password });
  return data;
}

export async function registrarUsuario(payload) {
  const { data } = await api.post('/registro', payload);
  return data;
}

export async function listarUsuarios() {
  const { data } = await api.get('/');
  return data;
}
