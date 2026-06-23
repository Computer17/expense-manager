import { useAuth } from '@/context/AuthContext';
import { useTables } from '@/context/TableContext';
import ThemeToggle from '@/components/common/ThemeToggle';
import TableList from './TableList';
import { getInitials } from '@/utils/helpers';

export default function Sidebar({ isOpen, onToggle }) {
  const { user, logout } = useAuth();
  const { tables, currentTable, selectTable, deleteTable } = useTables();

  return (
    <aside className={`sidebar ${isOpen ? 'open' : ''}`}>
      <div className="sidebar-header">
        <h3>📂 আমার টেবিল</h3>
        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
          <ThemeToggle />
          <button onClick={onToggle} className="close-sidebar">✕</button>
        </div>
      </div>

      {user && (
        <div className="sidebar-profile">
          <div className="avatar">{getInitials(user.name || user.email)}</div>
          <div className="info">
            <div className="name">{user.name || 'ব্যবহারকারী'}</div>
            <div className="email">{user.email}</div>
          </div>
        </div>
      )}

      <TableList
        tables={tables}
        currentTable={currentTable}
        onSelect={selectTable}
        onDelete={deleteTable}
      />

      <div className="sidebar-footer">
        <button onClick={logout} className="logout-btn-full">
          🚪 লগআউট
        </button>
      </div>
    </aside>
  );
}