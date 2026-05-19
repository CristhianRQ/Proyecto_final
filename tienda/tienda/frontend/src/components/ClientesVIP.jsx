// eslint-disable-next-line no-unused-vars
import React from 'react';

export default function ClientesVIP() {
  const clientes = [
    { rank: 1, nombre: 'Consorcio Mariátegui', inversion: 'S/ 18,450.00', compras: 42, segmento: 'Socio Estratégico', estado: 'Fidelizado' },
    { rank: 2, nombre: 'Elvis Negreiros', inversion: 'S/ 12,300.00', compras: 28, segmento: 'Cliente Premium', estado: 'Fidelizado' },
    { rank: 3, nombre: 'Distribuidora Trujillo S.A.', inversion: 'S/ 9,850.00', compras: 19, segmento: 'Mayorista Corporativo', estado: 'Activo' },
    { rank: 4, nombre: 'Elena Rosas', inversion: 'S/ 7,200.00', compras: 14, segmento: 'Minorista Frecuente', estado: 'Activo' },
  ];

  return (
    <div style={{ width: '100%' }}>
      <h1 style={{ color: '#001C30', margin: 0, fontSize: '2.2rem', fontWeight: '800' }}>Gestión de Clientes VIP</h1>
      <p style={{ color: '#768192', margin: '5px 0 30px 0', fontSize: '1rem' }}>Fidelización automatizada basada en el histórico de facturación de la base de datos</p>

      <div style={{ backgroundColor: '#FFFFFF', borderRadius: '12px', boxShadow: '0 4px 20px rgba(0, 28, 48, 0.04)', overflow: 'hidden', width: '100%' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '1rem' }}>
          <thead>
            <tr style={{ backgroundColor: '#001C30', color: '#FFFAF0' }}>
              <th style={{ padding: '20px' }}>Ranking</th>
              <th style={{ padding: '20px' }}>Entidad / Cliente</th>
              <th style={{ padding: '20px' }}>Inversión Acumulada</th>
              <th style={{ padding: '20px' }}>Volumen de Transacciones</th>
              <th style={{ padding: '20px' }}>Segmentación Interna</th>
              <th style={{ padding: '20px' }}>Estado Operativo</th>
            </tr>
          </thead>
          <tbody>
            {clientes.map((cli) => (
              <tr key={cli.rank} style={{ borderBottom: '1px solid #f1f2f6', transition: 'background 0.2s' }}>
                <td style={{ padding: '20px', fontWeight: 'bold', color: '#452E5A', fontSize: '1.1rem' }}>#{cli.rank}</td>
                <td style={{ padding: '20px', fontWeight: '600', color: '#001C30' }}>{cli.nombre}</td>
                <td style={{ padding: '20px', fontWeight: 'bold', color: '#2ed573' }}>{cli.inversion}</td>
                <td style={{ padding: '20px', color: '#4a5568' }}>{cli.compras} Unidades adquiridas</td>
                <td style={{ padding: '20px', color: '#768192', fontWeight: '500' }}>{cli.segmento}</td>
                <td style={{ padding: '20px' }}>
                  <span style={{ backgroundColor: '#e3fcef', color: '#2ed573', padding: '6px 12px', borderRadius: '6px', fontSize: '0.85rem', fontWeight: 'bold' }}>
                    {cli.estado}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}