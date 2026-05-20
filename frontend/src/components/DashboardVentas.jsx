// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';

export default function DashboardVentas({ colores }) {
  const [mesSeleccionado, setMesSeleccionado] = useState('5');
  const [prediccion, setPrediccion] = useState(3500.00);

  // Simulación de los 5 productos más vendidos extraídos de tu MySQL
  const topZapatillas = [
    { id: 'M01', nombre: 'Modelo Urban Sport', ventas: '29,703', pct: '40%' },
    { id: 'M02', nombre: 'Modelo Classic Red', ventas: '24,093', pct: '20%' },
    { id: 'M03', nombre: 'Modelo High Top White', ventas: '78,706', pct: '60%' },
    { id: 'M04', nombre: 'Modelo Running Pink', ventas: '22,123', pct: '80%' },
    { id: 'M05', nombre: 'Modelo Dark Stealth', ventas: '40.15%', pct: '45%' },
  ];

  return (
    <div>
      <h1 style={{ color: '#001C30', marginBottom: '5px' }}>Proyección y Reporte de Ventas</h1>
      <p style={{ color: '#666', marginBottom: '25px' }}>Análisis predictivo con TensorFlowJS e historial MySQL</p>

      {/* SECCIÓN PREDICCIÓN */}
      <div style={{ background: '#FFF', padding: '20px', borderRadius: '8px', marginBottom: '25px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
        <h3 style={{ color: '#001C30', marginTop: 0 }}>Parte 1: Inteligencia de Negocio (TensorFlow.js)</h3>
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginTop: '15px' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Seleccionar Mes a Predecir:</label>
            <select 
              value={mesSeleccionado} 
              onChange={(e) => {
                setMesSeleccionado(e.target.value);
                // Aquí se llamará a la función de regresión lineal posteriormente
                setPrediccion((parseFloat(e.target.value) * 320 + 2000).toFixed(2));
              }}
              style={{ padding: '8px', borderRadius: '4px', width: '200px' }}
            >
              <option value="5">Mayo</option>
              <option value="6">Junio</option>
              <option value="7">Julio</option>
              <option value="8">Agosto</option>
              <option value="9">Setiembre</option>
            </select>
          </div>
          <div style={{ marginLeft: '40px' }}>
            <span style={{ fontSize: '1.1rem', color: '#555' }}>Valor Estimado Esperado:</span>
            <h2 style={{ color: colores.botones, margin: '5px 0 0 0' }}>S/ {prediccion}</h2>
          </div>
        </div>
      </div>

      {/* SECCIÓN 5 PRODUCTOS MÁS VENDIDOS */}
      <h3 style={{ color: '#001C30' }}>Parte 2: Top 5 Zapatillas Más Vendidas (MySQL)</h3>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '15px', marginTop: '15px' }}>
        {topZapatillas.map((zap) => (
          <div key={zap.id} style={{ background: '#FFF', padding: '15px', borderRadius: '8px', textAlign: 'center', boxShadow: '0 2px 6px rgba(0,0,0,0.05)', borderTop: `4px solid ${colores.botones}` }}>
            <span style={{ fontWeight: 'bold', color: '#888', fontSize: '0.85rem' }}>{zap.id}</span>
            <h4 style={{ margin: '8px 0', color: '#001C30' }}>{zap.nombre}</h4>
            <p style={{ margin: 0, fontWeight: 'bold', color: colores.botones }}>{zap.ventas} Und.</p>
            <small style={{ color: '#2ed573' }}>{zap.pct} del total</small>
          </div>
        ))}
      </div>
    </div>
  );
}