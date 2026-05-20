import styles from './Sidebar.module.css';

const MENU = [
  {
    section: 'Gestión Operativa',
    items: [
      { id: 'estadisticas', label: 'Estadísticas e Inteligencia' },
      { id: 'productos', label: 'Catálogo de Productos' },
      { id: 'ventas', label: 'Registro de Ventas' },
      { id: 'almacen', label: 'Control de Almacén' },
      { id: 'clientes_potenciales', label: 'Clientes Potenciales' },
    ],
  },
  {
    section: 'Abastecimiento',
    items: [
      { id: 'compras', label: 'Órdenes de Compra' },
      { id: 'proveedores', label: 'Gestión de Proveedores' },
      { id: 'sectores', label: 'Sectores Logísticos' },
      { id: 'asociados', label: 'Asociados Comerciales' },
    ],
  },
  {
    section: 'Configuración',
    items: [
      { id: 'clientes', label: 'Base de Clientes' },
      { id: 'usuarios', label: 'Usuarios del Sistema' },
      { id: 'permisos', label: 'Matriz de Permisos' },
      { id: 'soporte', label: 'Centro de Soporte' },
    ],
  },
];

export default function Sidebar({ activeView, onNavigate, onLogout }) {
  return (
    <aside className={`d-flex flex-column ${styles.sidebar}`}>
      <div className={styles.logo}>SNEAKERS ERP</div>

      <nav className={`nav flex-column flex-grow-1 ${styles.nav}`}>
        {MENU.map((group) => (
          <div key={group.section} className={styles.group}>
            <span className={styles.sectionLabel}>{group.section}</span>
            {group.items.map((item) => (
              <button
                key={item.id}
                type="button"
                className={`nav-link ${styles.navLink} ${
                  activeView === item.id ? styles.navLinkActive : ''
                }`}
                onClick={() => onNavigate(item.id)}
              >
                {item.label}
              </button>
            ))}
          </div>
        ))}
      </nav>

      <button type="button" className={`btn w-100 ${styles.logoutBtn}`} onClick={onLogout}>
        Cerrar Sesión
      </button>
    </aside>
  );
}
