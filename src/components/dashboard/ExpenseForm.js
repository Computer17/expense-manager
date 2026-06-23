import { useState } from 'react';
import { useTables } from '@/context/TableContext';
import { FaPlus } from 'react-icons/fa';

export default function ExpenseForm() {
  const { addExpense } = useTables();
  const [date, setDate] = useState('');
  const [details, setDetails] = useState('');
  const [amount, setAmount] = useState('');
  const [reference, setReference] = useState('');

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
      reference: reference.trim(),
    });
    if (success) {
      setDate('');
      setDetails('');
      setAmount('');
      setReference('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="expense-form">
      <div className="form-grid">
        <div className="form-group">
          <label>📅 তারিখ</label>
          <input
            type="date"
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
          <label>🏷️ রেফারেন্স</label>
          <input
            type="text"
            placeholder="যেমন: বিল নং-১২৩, চালান নং-৪৫৬"
            value={reference}
            onChange={(e) => setReference(e.target.value)}
          />
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