// eslint-disable-next-line no-unused-vars
import React, { useMemo, useState } from 'react';
import { Line } from 'react-chartjs-2';
import './chartSetup';
import { MESES_LABELS, VENTAS_HISTORICAS, predecirVenta } from './chartSetup';
import styles from './Charts.module.css';

const MESES_SELECT = [
  { value: '5', label: 'Mayo' },
  { value: '6', label: 'Junio' },
  { value: '7', label: 'Julio' },
  { value: '8', label: 'Agosto' },
  { value: '9', label: 'Septiembre' },
];

export default function SalesProjectionChart({ topModelos }) {
  const [mes, setMes] = useState('5');
  const [periodo, setPeriodo] = useState('month');

  const prediccion = predecirVenta(mes);
  const mesIndex = parseInt(mes, 10) - 1;

  const chartData = useMemo(() => {
    const labels = periodo === 'year'
      ? ['2022', '2023', '2024', '2025']
      : MESES_LABELS.slice(0, 7);

    const historico = periodo === 'year'
      ? [18000, 22000, 26000, 20450]
      : [...VENTAS_HISTORICAS, null, null, null];

    const regresion = periodo === 'year'
      ? historico.map((v, i) => (v ? v * 1.08 : null))
      : labels.map((_, i) => {
          const x = i + 1;
          return 310 * x + 2150;
        });

    const prediccionSerie = labels.map((_, i) => {
      if (periodo === 'year') return null;
      if (i === mesIndex) return prediccion;
      return null;
    });

    return {
      labels,
      datasets: [
        {
          label: 'Ventas reales',
          data: historico,
          borderColor: '#321fdb',
          backgroundColor: 'rgba(50, 31, 219, 0.08)',
          fill: true,
          tension: 0.35,
          pointRadius: 4,
          pointBackgroundColor: '#321fdb',
          borderWidth: 2,
        },
        {
          label: 'Tendencia ML',
          data: regresion,
          borderColor: '#2eb85c',
          backgroundColor: 'transparent',
          borderDash: [6, 4],
          tension: 0.35,
          pointRadius: 0,
          borderWidth: 2,
        },
        {
          label: 'Predicción (mes X)',
          data: prediccionSerie,
          borderColor: '#e55353',
          backgroundColor: '#e55353',
          pointRadius: 8,
          pointHoverRadius: 10,
          showLine: false,
        },
      ],
    };
  }, [mes, mesIndex, prediccion, periodo]);

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: { mode: 'index', intersect: false },
    plugins: {
      legend: {
        position: 'top',
        align: 'end',
        labels: { boxWidth: 12, usePointStyle: true },
      },
      tooltip: {
        callbacks: {
          label: (ctx) => {
            const v = ctx.parsed.y;
            if (v == null) return null;
            return `${ctx.dataset.label}: S/ ${v.toLocaleString('es-PE', { minimumFractionDigits: 2 })}`;
          },
        },
      },
    },
    scales: {
      x: {
        grid: { display: false },
        ticks: { color: '#768192', font: { size: 11 } },
      },
      y: {
        beginAtZero: false,
        grid: { color: 'rgba(0,0,0,0.06)' },
        ticks: {
          color: '#768192',
          callback: (v) => `S/ ${v}`,
        },
      },
    },
  };

  return (
    <div className={`card border-0 shadow-sm ${styles.projectionCard}`}>
      <div className={`card-header bg-white border-bottom ${styles.chartHeader}`}>
        <div className="row align-items-center g-3">
          <div className="col-lg-6">
            <h2 className={`h5 fw-bold mb-0 ${styles.chartTitle}`}>PROYECCIÓN VENTAS</h2>
          </div>
          <div className="col-lg-6">
            <div className="d-flex flex-wrap align-items-center justify-content-lg-end gap-2">
              <select
                className="form-select form-select-sm"
                style={{ maxWidth: '140px' }}
                value={mes}
                onChange={(e) => setMes(e.target.value)}
              >
                {MESES_SELECT.map((m) => (
                  <option key={m.value} value={m.value}>{m.label}</option>
                ))}
              </select>
              <span className={`badge text-bg-primary fs-6 ${styles.predBadge}`}>
                S/ {prediccion.toLocaleString('es-PE', { minimumFractionDigits: 2 })}
              </span>
              <div className="btn-group btn-group-sm" role="group">
                {['day', 'month', 'year'].map((p) => (
                  <button
                    key={p}
                    type="button"
                    className={`btn btn-outline-secondary ${periodo === p ? 'active' : ''}`}
                    onClick={() => setPeriodo(p)}
                  >
                    {p === 'day' ? 'Día' : p === 'month' ? 'Mes' : 'Año'}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="card-body">
        <div className={styles.mainChartWrap}>
          <Line data={chartData} options={options} />
        </div>

        <div className={`row g-0 mt-4 pt-3 border-top ${styles.modelsRow}`}>
          {topModelos.map((m) => (
            <div key={m.id} className="col">
              <div className="px-2 text-center">
                <div className={`small fw-bold text-uppercase ${styles.modelLabel}`}>{m.id}</div>
                <div className="small text-muted mb-2">
                  {m.users} Pares ({m.pct}%)
                </div>
                <div className="progress mb-0" style={{ height: '4px' }}>
                  <div
                    className={`progress-bar ${m.bar}`}
                    style={{ width: `${m.pct}%` }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="row g-2 mt-3">
          {topModelos.map((m) => (
            <div key={`img-${m.id}`} className="col">
              <div className={styles.shoeThumb}>
                <img
                  src={m.img}
                  alt={m.id}
                  className="img-fluid rounded"
                  loading="lazy"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.parentElement.classList.add(styles.shoeFallback);
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
