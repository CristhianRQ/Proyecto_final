// eslint-disable-next-line no-unused-vars
import React from 'react';
import { Line, Bar } from 'react-chartjs-2';
import './chartSetup';
import styles from './Charts.module.css';

const VARIANT_CLASS = {
  primary: styles.cardPrimary,
  info: styles.cardInfo,
  warning: styles.cardWarning,
  danger: styles.cardDanger,
};

function buildSparkData(values, chartType) {
  const labels = values.map((_, i) => i);
  const white = 'rgba(255, 255, 255, 0.95)';
  const fill = chartType === 'area' ? 'rgba(255, 255, 255, 0.25)' : 'transparent';

  if (chartType === 'bar') {
    return {
      labels,
      datasets: [
        {
          data: values,
          backgroundColor: 'rgba(255, 255, 255, 0.85)',
          borderRadius: 2,
          barThickness: 6,
        },
      ],
    };
  }

  return {
    labels,
    datasets: [
      {
        data: values,
        borderColor: white,
        backgroundColor: fill,
        fill: chartType === 'area',
        tension: 0.4,
        pointRadius: 0,
        borderWidth: 2,
      },
    ],
  };
}

const sparkOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: { legend: { display: false }, tooltip: { enabled: false } },
  scales: {
    x: { display: false },
    y: { display: false },
  },
  animation: { duration: 600 },
};

export default function SparklineKpiCard({ title, monto, pct, variant, spark, chartType }) {
  const data = buildSparkData(spark, chartType);
  const trendPositive = pct >= 0;

  return (
    <div className={`card border-0 text-white h-100 ${VARIANT_CLASS[variant]}`}>
      <div className="card-body d-flex flex-column pb-2">
        <div className="d-flex justify-content-between align-items-start mb-1">
          <span className="small fw-bold text-uppercase opacity-90">{title}</span>
          <button type="button" className={`btn btn-sm p-0 ${styles.menuDots}`} aria-label="Opciones">
            ⋮
          </button>
        </div>
        <div className={styles.sparkWrap}>
          {chartType === 'bar' ? (
            <Bar data={data} options={sparkOptions} />
          ) : (
            <Line data={data} options={sparkOptions} />
          )}
        </div>
        <div className="mt-auto pt-2">
          <div className="fw-bold fs-5">S/ {monto.toLocaleString('es-PE')}</div>
          <small className={`fw-semibold ${trendPositive ? 'text-white' : 'text-warning'}`}>
            {trendPositive ? '+' : ''}{pct}% {trendPositive ? 'Crecimiento' : 'Desaceleración'}
          </small>
        </div>
      </div>
    </div>
  );
}
