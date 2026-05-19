// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';

export default function DashboardCRM({ colores }) {
  const [mes, setMes] = useState('5');
  const [prediccion, setPrediccion] = useState(3500.00);

  const topModelos = [
    { id: 'MODELO 01', ventas: '29,703 Pares', pct: '40%', colorBar: '#2ed573' },
    { id: 'MODELO 02', ventas: '24,093 Pares', pct: '20%', colorBar: '#ffb300' },
    { id: 'MODELO 03', ventas: '78,706 Pares', pct: '60%', colorBar: '#00bcd4' },
    { id: 'MODELO 04', ventas: '22,123 Pares', pct: '80%', colorBar: '#e55353' },
    { id: 'MODELO 05', ventas: '45,312 Pares', pct: '45%', colorBar: '#452E5A' },
  ];

  return (
    <div style={{ width: '100%' }}>
      {/* TOP HEADER CRM */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
        <div>
          <h1 style={{ color: '#001C30', margin: 0, fontSize: '2.2rem', fontWeight: '800' }}>Panel de Análisis Global</h1>
          <p style={{ color: '#768192', margin: '5px 0 0 0', fontSize: '1rem' }}>Indicadores clave de rendimiento corporativo en tiempo real</p>
        </div>
      </div>

      {/* 4 CARDS EMPRESARIALES DE ANCHO COMPLETO */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '24px', marginBottom: '35px' }}>
        {[
          ['MÉTRICA ENERO', 'S/ 4,200.00', '+12% Crecimiento'],
          ['MÉTRICA FEBRERO', 'S/ 5,150.00', '+22% Crecimiento'],
          ['MÉTRICA MARZO', 'S/ 4,800.00', '-7% Desaceleración'],
          ['MÉTRICA ABRIL', 'S/ 6,300.00', '+31% Crecimiento']
        ].map(([title, monto, info], idx) => (
          <div key={idx} style={{ backgroundColor: '#FFFFFF', padding: '24px', borderRadius: '12px', boxShadow: '0 4px 20px rgba(0, 28, 48, 0.04)', borderLeft: `6px solid ${colores.botones}` }}>
            <span style={{ fontSize: '0.85rem', fontWeight: 'bold', color: '#768192', letterSpacing: '0.5px' }}>{title}</span>
            <h2 style={{ color: '#001C30', margin: '10px 0', fontSize: '2rem', fontWeight: '700' }}>{monto}</h2>
            <small style={{ color: info.includes('+') ? '#2ed573' : '#e55353', fontWeight: 'bold', fontSize: '0.9rem' }}>{info}</small>
          </div>
        ))}
      </div>

      {/* BLOQUE DE PROYECCIÓN INTELIGENTE */}
      <div style={{ backgroundColor: '#FFFFFF', padding: '30px', borderRadius: '12px', marginBottom: '35px', boxShadow: '0 4px 20px rgba(0, 28, 48, 0.04)' }}>
        <h3 style={{ color: '#001C30', marginTop: 0, fontSize: '1.25rem', marginBottom: '20px' }}>📈 Predicción de Ventas Mensuales (Machine Learning Engine)</h3>
        <div style={{ display: 'flex', gap: '60px', alignItems: 'center' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '10px', fontSize: '0.95rem', fontWeight: 'bold', color: '#001C30' }}>Mes de Evaluación (X):</label>
            <select 
              value={mes} 
              onChange={(e) => {
                setMes(e.target.value);
                setPrediccion((parseFloat(e.target.value) * 310 + 2150).toFixed(2));
              }}
              style={{ padding: '12px 16px', borderRadius: '6px', width: '280px', border: '1px solid #ccc', fontSize: '1rem', outline: 'none', backgroundColor: '#FFF' }}
            >
              <option value="5">Mayo</option>
              <option value="6">Junio</option>
              <option value="7">Julio</option>
              <option value="8">Agosto</option>
              <option value="9">Septiembre</option>
            </select>
          </div>
          <div>
            <span style={{ fontSize: '1rem', color: '#768192', fontWeight: '500' }}>Valor Mínimo Estimado Esperado (Y):</span>
            <h2 style={{ color: colores.botones, margin: '5px 0 0 0', fontSize: '2.6rem', fontWeight: '800' }}>S/ {prediccion}</h2>
          </div>
        </div>
      </div>

      {/* TOP 5 PRODUCTOS FLUIDO */}
      <h3 style={{ color: '#001C30', marginBottom: '20px', fontSize: '1.25rem' }}>👟 Top 5 Modelos: Demanda Máxima de Usuarios</h3>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '20px' }}>
        {topModelos.map((modelo, i) => (
          <div key={i} style={{ backgroundColor: '#FFFFFF', padding: '24px', borderRadius: '12px', textAlign: 'center', boxShadow: '0 4px 20px rgba(0, 28, 48, 0.04)' }}>
            <span style={{ fontWeight: '800', color: '#768192', fontSize: '0.85rem' }}>{modelo.id}</span>
            <h4 style={{ margin: '12px 0', color: '#001C30', fontSize: '1.2rem', fontWeight: '700' }}>{modelo.ventas}</h4>
            <div style={{ width: '100%', backgroundColor: '#f1f2f6', borderRadius: '6px', height: '8px', overflow: 'hidden', marginBottom: '10px' }}>
              <div style={{ width: modelo.pct, backgroundColor: modelo.colorBar, height: '100%' }}></div>
            </div>
            <small style={{ color: '#2ed573', fontWeight: 'bold', fontSize: '0.95rem' }}>{modelo.pct} de Cuota</small>
          </div>
        ))}
      </div>
    </div>
  );
}