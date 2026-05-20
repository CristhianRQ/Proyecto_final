// eslint-disable-next-line no-unused-vars
import React from 'react';
import styles from './ClientesVIP.module.css';

export default function ClientesVIP() {
  const clientes = [
    { rank: 1, nombre: 'Consorcio Mariátegui', inversion: 'S/ 18,450.00', compras: 42, segmento: 'Socio Estratégico', estado: 'Fidelizado' },
    { rank: 2, nombre: 'Elvis Negreiros', inversion: 'S/ 12,300.00', compras: 28, segmento: 'Cliente Premium', estado: 'Fidelizado' },
    { rank: 3, nombre: 'Distribuidora Trujillo S.A.', inversion: 'S/ 9,850.00', compras: 19, segmento: 'Mayorista Corporativo', estado: 'Activo' },
    { rank: 4, nombre: 'Elena Rosas', inversion: 'S/ 7,200.00', compras: 14, segmento: 'Minorista Frecuente', estado: 'Activo' },
  ];

  return (
    <div className={styles.container}>
      <h1 className={styles.mainTitle}>Gestión de Clientes VIP</h1>
      <p className={styles.subtitle}>Fidelización automatizada basada en el histórico de facturación de la base de datos</p>

      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead className={styles.thead}>
            <tr>
              <th className={styles.th}>Ranking</th>
              <th className={styles.th}>Entidad / Cliente</th>
              <th className={styles.th}>Inversión Acumulada</th>
              <th className={styles.th}>Volumen de Transacciones</th>
              <th className={styles.th}>Segmentación Interna</th>
              <th className={styles.th}>Estado Operativo</th>
            </tr>
          </thead>
          <tbody>
            {clientes.map((cli) => (
              <tr key={cli.rank} className={styles.tr}>
                <td className={`${styles.td} styles.rank`}>#{cli.rank}</td>
                <td className={`${styles.td} styles.clientName`}>{cli.nombre}</td>
                <td className={`${styles.td} styles.investment`}>{cli.inversion}</td>
                <td className={styles.td}>{cli.compras} Unidades adquiridas</td>
                <td className={styles.td} style={{ color: '#768192', fontWeight: '500' }}>{cli.segmento}</td>
                <td className={styles.td}>
                  <span className={styles.badge}>{cli.estado}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}