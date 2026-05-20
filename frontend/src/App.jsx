// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import LoginCRM from './components/LoginCRM';
import Sidebar from './components/Sidebar';
import DashboardCRM from './components/DashboardCRM';
import ClientesVIP from './components/ClientesVIP';
import RegistroUsuario from './components/RegistroUsuario';
import layout from './layouts/AppLayout.module.css';
import tableStyles from './styles/Tables.module.css';

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [subVista, setSubVista] = useState('estadisticas');

  if (!isLoggedIn) {
    return (
      <LoginCRM
        onLoginSuccess={() => {
          setIsLoggedIn(true);
        }}
      />
    );
  }

  return (
    <div className={layout.shell}>
      <Sidebar
        activeView={subVista}
        onNavigate={setSubVista}
        onLogout={() => setIsLoggedIn(false)}
      />

      <main className={layout.main}>
        <div className={layout.pageCard}>
          <div className={layout.pageCardHeader}>
            <h2 className={layout.pageCardTitle}>{getTituloVista(subVista)}</h2>
            <span className={layout.badgeActive}>Módulo activo</span>
          </div>
          <div className={layout.pageCardBody}>
            {renderVistaActiva(subVista)}
          </div>
        </div>
      </main>
    </div>
  );
}

function getTituloVista(vista) {
  const titulos = {
    estadisticas: 'Panel de Métricas y Proyecciones',
    productos: 'Catálogo General de Productos',
    ventas: 'Histórico Transaccional de Ventas',
    almacen: 'Gestión de Inventario por Lotes',
    clientes_potenciales: 'Ranking de Clientes de Alto Valor',
    compras: 'Registro de Órdenes de Compra',
    proveedores: 'Directorio de Proveedores',
    sectores: 'Clasificación de Sectores',
    asociados: 'Red de Asociados Comerciales',
    clientes: 'Base de Datos de Clientes',
    usuarios: 'Administración de Usuarios',
    permisos: 'Configuración de Roles y Accesos',
    soporte: 'Solicitudes de Asistencia Técnica',
  };
  return titulos[vista] || 'Módulo del Sistema';
}

function renderVistaActiva(vista) {
  switch (vista) {
    case 'estadisticas':
      return <DashboardCRM />;
    case 'clientes_potenciales':
      return <ClientesVIP />;
    case 'usuarios':
      return <RegistroUsuario />;
    case 'productos':
      return <VistaProductos />;
    case 'ventas':
      return <VistaVentasDetalle />;
    case 'almacen':
      return <VistaAlmacenLotes />;
    case 'compras':
      return <VistaComprasDetalle />;
    case 'proveedores':
    case 'sectores':
    case 'asociados':
    case 'clientes':
    case 'permisos':
    case 'soporte':
      return <VistaGenerica tabla={vista} />;
    default:
      return <VistaPlaceholder />;
  }
}

function VistaProductos() {
  return (
    <div className={`table-responsive ${tableStyles.wrap}`}>
      <table className="table table-hover align-middle mb-0">
        <thead className="table-light">
          <tr>
            <th>Código</th>
            <th>Producto</th>
            <th>Precio Compra</th>
            <th>Precio Venta</th>
            <th>Stock Actual</th>
            <th>Stock Mínimo</th>
            <th>Estado</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>SNK-001</td>
            <td>Nike Air Force 1 White</td>
            <td>S/ 280.00</td>
            <td>S/ 450.00</td>
            <td>24</td>
            <td>10</td>
            <td><span className="badge text-bg-success">Disponible</span></td>
          </tr>
          <tr>
            <td>SNK-002</td>
            <td>Adidas Superstar Black</td>
            <td>S/ 260.00</td>
            <td>S/ 420.00</td>
            <td>8</td>
            <td>10</td>
            <td><span className="badge text-bg-warning">Bajo Stock</span></td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

function VistaVentasDetalle() {
  return (
    <div className={`table-responsive ${tableStyles.wrap}`}>
      <table className="table table-hover align-middle mb-0">
        <thead className="table-light">
          <tr>
            <th>ID Venta</th>
            <th>Cliente</th>
            <th>Fecha</th>
            <th>Total</th>
            <th>Estado</th>
            <th>Usuario</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>VNT-2026-001</td>
            <td>Carlos Rodríguez</td>
            <td>15/05/2026</td>
            <td>S/ 1,350.00</td>
            <td><span className="badge text-bg-success">Completada</span></td>
            <td>admin</td>
          </tr>
          <tr>
            <td>VNT-2026-002</td>
            <td>Ana Luz Negreiros</td>
            <td>14/05/2026</td>
            <td>S/ 890.00</td>
            <td><span className="badge text-bg-success">Completada</span></td>
            <td>vendedor_01</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

function VistaAlmacenLotes() {
  return (
    <div className={`table-responsive ${tableStyles.wrap}`}>
      <table className="table table-hover align-middle mb-0">
        <thead className="table-light">
          <tr>
            <th>Número de Lote</th>
            <th>Producto</th>
            <th>Fecha de Ingreso</th>
            <th>Cantidad</th>
            <th>Proveedor</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>LOT-2026-045</td>
            <td>Nike Air Force 1 White</td>
            <td>10/05/2026</td>
            <td>50</td>
            <td>Distribuidora Deportiva SAC</td>
          </tr>
          <tr>
            <td>LOT-2026-046</td>
            <td>Adidas Superstar Black</td>
            <td>12/05/2026</td>
            <td>30</td>
            <td>Importadora Fashion Ltd</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

function VistaComprasDetalle() {
  return (
    <div className={`table-responsive ${tableStyles.wrap}`}>
      <table className="table table-hover align-middle mb-0">
        <thead className="table-light">
          <tr>
            <th>ID Compra</th>
            <th>Proveedor</th>
            <th>Fecha</th>
            <th>Total</th>
            <th>Estado</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>CPM-2026-012</td>
            <td>Distribuidora Deportiva SAC</td>
            <td>08/05/2026</td>
            <td>S/ 14,000.00</td>
            <td><span className="badge text-bg-success">Recibida</span></td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

function VistaGenerica({ tabla }) {
  return (
    <div>
      <p className="text-muted">
        Módulo de gestión para <strong>{tabla}</strong>. Funcionalidades CRUD con validación de permisos.
      </p>
      <div className={`alert alert-secondary text-center ${tableStyles.placeholder}`}>
        Interfaz de administración cargada para: <code>{tabla}</code>
      </div>
    </div>
  );
}

function VistaPlaceholder() {
  return (
    <div className={`alert alert-light text-center ${tableStyles.placeholder}`}>
      Seleccione una opción del menú lateral para comenzar.
    </div>
  );
}
