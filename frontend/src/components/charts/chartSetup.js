import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Filler,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Filler,
  Tooltip,
  Legend,
);

export const MESES_LABELS = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio'];

export const VENTAS_HISTORICAS = [4200, 5150, 4800, 6300];

export const KPI_CARDS = [
  {
    key: 'enero',
    title: 'ENERO',
    monto: 4200,
    pct: 12,
    variant: 'primary',
    spark: [38, 42, 40, 45, 48, 52],
    chartType: 'line',
  },
  {
    key: 'febrero',
    title: 'FEBRERO',
    monto: 5150,
    pct: 22,
    variant: 'info',
    spark: [44, 48, 52, 50, 55, 58],
    chartType: 'line',
  },
  {
    key: 'marzo',
    title: 'MARZO',
    monto: 4800,
    pct: -7,
    variant: 'warning',
    spark: [52, 48, 45, 42, 40, 38],
    chartType: 'area',
  },
  {
    key: 'abril',
    title: 'ABRIL',
    monto: 6300,
    pct: 31,
    variant: 'danger',
    spark: [40, 45, 50, 55, 60, 63],
    chartType: 'bar',
  },
];

export const TOP_MODELOS = [
  { id: 'MODELO 01', users: '29.703', pct: 40, bar: 'bg-primary', img: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=200&h=120&fit=crop' },
  { id: 'MODELO 02', users: '24.093', pct: 20, bar: 'bg-info', img: 'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=200&h=120&fit=crop' },
  { id: 'MODELO 03', users: '78.706', pct: 60, bar: 'bg-warning', img: 'https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=200&h=120&fit=crop' },
  { id: 'MODELO 04', users: '22.123', pct: 80, bar: 'bg-danger', img: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=200&h=120&fit=crop' },
  { id: 'MODELO 05', users: '45.312', pct: 45, bar: 'bg-secondary', img: 'https://images.unsplash.com/photo-1560769629-975ec094d035?w=200&h=120&fit=crop' },
];

export function predecirVenta(mes) {
  return parseFloat(mes) * 310 + 2150;
}
