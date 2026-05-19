// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import DashboardCRM from './components/DashboardCRM';
import ClientesVIP from './components/ClientesVIP';
import RegistroUsuario from './components/RegistroUsuario';

export default function App() {
  const [vistaActual, setVistaActual] = useState('dashboard');

  const colores = {
    fondo: '#FFFAF0',
    botones: '#452E5A',
    menus: '#001C30',
    textoClaro: '#FFFAF0'
  };

  const styles = {
    // Forzamos pantalla completa real bloqueando desbordes extraños
    appContainer: {
      display: 'flex',
      width: '100vw',
      height: '100vh',
      backgroundColor: colores.fondo,
      fontFamily: 'Segoe UI, sans-serif',
      margin: 0,
      padding: 0,
      overflow: 'hidden'
    },
    sidebar: {
      width: '280px',
      minWidth: '280px',
      backgroundColor: colores.menus,
      color: colores.textoClaro,
      display: 'flex',
      flexDirection: 'column',
      padding: '24px',
      boxShadow: '4px 0 15px rgba(0,0,0,0.15)',
      height: '100%'
    },
    logo: {
      fontSize: '1.4rem',
      fontWeight: 'bold',
      textAlign: 'center',
      marginBottom: '35px',
      borderBottom: '1px solid rgba(255,250,240,0.1)',
      paddingBottom: '20px',
      letterSpacing: '1px'
    },
    menuSection: {
      fontSize: '0.75rem',
      color: '#768192',
      fontWeight: 'bold',
      textTransform: 'uppercase',
      marginBottom: '10px',
      marginTop: '20px',
      letterSpacing: '0.8px'
    },
    menuBtn: (activa) => ({
      backgroundColor: activa ? colores.botones : 'transparent',
      color: colores.textoClaro,
      border: 'none',
      padding: '14px 18px',
      textAlign: 'left',
      marginBottom: '8px',
      borderRadius: '6px',
      cursor: 'pointer',
      fontSize: '0.95rem',
      fontWeight: activa ? 'bold' : 'normal',
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
      transition: 'all 0.2s ease'
    }),
    // El área de contenido ahora es fluida y ocupa el resto del monitor
    contentArea: {
      flexGrow: 1,
      height: '100%',
      overflowY: 'auto',
      padding: '40px',
      boxSizing: 'border-box'
    }
  };

  return (
    <div style={styles.appContainer}>
      {/* SIDEBAR CORPORATIVO FIJO */}
      <aside style={styles.sidebar}>
        <div style={styles.logo}>👟 SNEAKERS CRM</div>
        
        <span style={styles.menuSection}>Business Intelligence</span>
        <button style={styles.menuBtn(vistaActual === 'dashboard')} onClick={() => setVistaActual('dashboard')}>
          📊 Dashboard Corporativo
        </button>

        <span style={styles.menuSection}>Fuerza de Ventas</span>
        <button style={styles.menuBtn(vistaActual === 'vip')} onClick={() => setVistaActual('vip')}>
          👑 Clientes VIP & Carteras
        </button>

        <span style={styles.menuSection}>Seguridad y Sistemas</span>
        <button style={styles.menuBtn(vistaActual === 'registro')} onClick={() => setVistaActual('registro')}>
          👥 Gestión de Personal
        </button>
      </aside>

      {/* ÁREA CENTRAL EXPANDIDA */}
      <main style={styles.contentArea}>
        {vistaActual === 'dashboard' && <DashboardCRM colores={colores} />}
        {vistaActual === 'vip' && <ClientesVIP colores={colores} />}
        {vistaActual === 'registro' && <RegistroUsuario colores={colores} />}
      </main>
    </div>
  );
}