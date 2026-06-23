import { useState } from 'react';
import { CATEGORIES, DEFAULT_CATEGORY } from '@/constants';
import { useTables } from '@/context/TableContext';
import { FaPlus } from 'react-icons/fa';

export default function ExpenseForm() {
  const { addExpense } = useTables();
  const [date, setDate] = useState('');
  const [details, setDetails] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState(DEFAULT_CATEGORY);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!date || !details || !amount || isNaN(parseFloat(amount)) || parseFloat(amount) <= 0) {
      alert('সব ফিল্ড সঠিকভাবে পূরণ করুন।');
      return;
    }
    const success = addExpense({
      date: date.trim(),
      details: details.trim(),
      amount: parseFloat(amount),
      category,
    });
    if (success) {
      setDate('');
      setDetails('');
      setAmount('');
      setCategory(DEFAULT_CATEGORY);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="expense-form">
      <div className="form-grid">
        <div className="form-group">
          <label>📅 তারিখ</label>
          <input
            type="text"
            placeholder="যেমন: 22-06-2026"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>📝 বিবরণ</label>
          <input
            type="text"
            placeholder="খরচের বিবরণ লিখুন"
            value={details}
            onChange={(e) => setDetails(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>💰 টাকা</label>
          <input
            type="number"
            placeholder="০.০০"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
            min="0"
            step="0.01"
          />
        </div>
        <div className="form-group">
          <label>🏷️ ক্যাটাগরি</label>
          <select value={category} onChange={(e) => setCategory(e.target.value)}>
            {CATEGORIES.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>
        <div className="form-group" style={{ alignSelf: 'flex-end' }}>
          <button type="submit" className="btn-success">
            <FaPlus style={{ marginRight: '8px' }} /> যোগ করুন
          </button>
        </div>
      </div>
    </form>
  );
}