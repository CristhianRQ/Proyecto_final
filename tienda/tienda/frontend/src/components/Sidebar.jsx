export default function Sidebar() {
  return (
    <aside style={{ width: '256px', backgroundColor: '#2f3542', color: '#fff', minHeight: '100vh', padding: '20px' }}>
      <div style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '30px', display: 'flex', alignItems: 'center', gap: '10px' }}>
        <span>🔲</span> CORE UI
      </div>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        <li style={{ padding: '12px 10px', backgroundColor: '#343a40', borderRadius: '4px', marginBottom: '5px', color: '#fff' }}>📊 Dashboard</li>
        <li style={{ color: '#a4b0be', padding: '10px', fontSize: '0.8rem', textTransform: 'uppercase', marginTop: '15px' }}>Theme</li>
        <li style={{ padding: '10px', color: '#ced6e0' }}>🎨 Colors</li>
        <li style={{ padding: '10px', color: '#ced6e0' }}>✏️ Typography</li>
        <li style={{ color: '#a4b0be', padding: '10px', fontSize: '0.8rem', textTransform: 'uppercase', marginTop: '15px' }}>Components</li>
        <li style={{ padding: '10px', color: '#ced6e0' }}>📦 Base</li>
        <li style={{ padding: '10px', color: '#ced6e0' }}>📈 Charts</li>
      </ul>
    </aside>
  );
}