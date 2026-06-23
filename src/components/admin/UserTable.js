export default function UserTable({ users, onDelete }) {
  if (users.length === 0) {
    return <p className="empty-state">কোনো ইউজার নেই</p>;
  }

  return (
    <div className="table-responsive">
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>নাম</th>
            <th>ইমেইল</th>
            <th>রোল</th>
            <th>অ্যাকশন</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u, i) => (
            <tr key={i}>
              <td>{i + 1}</td>
              <td>{u.name || u.email.split('@')[0]}</td>
              <td>{u.email}</td>
              <td>{u.role || 'user'}</td>
              <td>
                <button
                  onClick={() => onDelete(i)}
                  className="btn-danger"
                  style={{ padding: '6px 16px', borderRadius: '30px' }}
                >
                  মুছুন
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}