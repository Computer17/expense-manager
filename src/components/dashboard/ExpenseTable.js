export default function ExpenseTable({ expenses, total }) {
  if (expenses.length === 0) {
    return (
      <div className="empty-state" style={{ padding: '30px 0' }}>
        <p>📭 এখনও কোনো খরচ যোগ করা হয়নি</p>
        <p style={{ fontSize: '0.9rem', color: '#94a3b8' }}>উপরের ফর্ম ব্যবহার করে খরচ যোগ করুন</p>
      </div>
    );
  }

  return (
    <>
      <div className="table-responsive">
        <table className="striped-table">
          <thead>
            <tr>
              <th>#</th>
              <th>📅 তারিখ</th>
              <th>📝 বিবরণ</th>
              <th>🏷️ রেফারেন্স</th>
              <th>💰 টাকা</th>
            </tr>
          </thead>
          <tbody>
            {expenses.map((exp, idx) => (
              <tr key={exp.serial} className={idx % 2 === 0 ? 'even' : 'odd'}>
                <td>{exp.serial}</td>
                <td>{exp.date}</td>
                <td>{exp.details}</td>
                <td>
                  <span className="reference-badge">{exp.reference || '-'}</span>
                </td>
                <td><strong>{exp.amount}</strong></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="total-amount">
        <span>📊 মোট খরচ</span>
        <span>{total} টাকা</span>
      </div>
    </>
  );
}