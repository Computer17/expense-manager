import { FaTable } from 'react-icons/fa';

export default function TableList({ tables, currentTable, onSelect, onDelete }) {
  if (tables.length === 0) {
    return (
      <div className="empty-tables">
        <FaTable size={28} style={{ opacity: 0.3, marginBottom: '8px' }} />
        <p>কোনো টেবিল নেই</p>
        <p style={{ fontSize: '0.8rem', color: '#64748b' }}>উপরের ফর্ম দিয়ে তৈরি করুন</p>
      </div>
    );
  }

  return (
    <div className="table-list">
      {tables.map((name) => (
        <div
          key={name}
          className={`table-item ${name === currentTable ? 'active' : ''}`}
        >
          <span className="table-name" onClick={() => onSelect(name)}>
            <FaTable size={14} style={{ marginRight: '10px', opacity: 0.7 }} />
            {name}
          </span>
          <button
            className="del-table"
            onClick={(e) => {
              e.stopPropagation();
              onDelete(name);
            }}
          >
            ✕
          </button>
        </div>
      ))}
    </div>
  );
}