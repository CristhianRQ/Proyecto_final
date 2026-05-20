// eslint-disable-next-line no-unused-vars
import React from 'react';
import SparklineKpiCard from './charts/SparklineKpiCard';
import SalesProjectionChart from './charts/SalesProjectionChart';
import { KPI_CARDS, TOP_MODELOS } from './charts/chartSetup';
import styles from './DashboardCRM.module.css';

export default function DashboardCRM() {
  return (
    <div className={styles.dashboard}>
      <header className="mb-4 pb-3 border-bottom">
        <h1 className={`h2 fw-bold mb-1 ${styles.mainTitle}`}>Panel de Análisis Global</h1>
        <p className={`mb-0 ${styles.subtitle}`}>
          Indicadores clave de rendimiento corporativo en tiempo real
        </p>
      </header>

      {/* Fila 1: tarjetas con mini-gráficos (estilo CoreUI) */}
      <section className="mb-4">
        <div className="row g-3">
          {KPI_CARDS.map((kpi) => (
            <div key={kpi.key} className="col-sm-6 col-xl-3">
              <SparklineKpiCard
                title={kpi.title}
                monto={kpi.monto}
                pct={kpi.pct}
                variant={kpi.variant}
                spark={kpi.spark}
                chartType={kpi.chartType}
              />
            </div>
          ))}
        </div>
      </section>

      {/* Fila 2: gráfico principal + modelos + imágenes */}
      <section>
        <SalesProjectionChart topModelos={TOP_MODELOS} />
      </section>
    </div>
  );
}
