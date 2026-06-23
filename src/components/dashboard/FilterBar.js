import { useState } from 'react';
import { FaFilter, FaRedo } from 'react-icons/fa';

export default function FilterBar({ onFilter }) {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [reference, setReference] = useState('');

  const applyFilter = () => {
    onFilter({ startDate, endDate, reference });
  };

  const resetFilter = () => {
    setStartDate('');
    setEndDate('');
    setReference('');
    onFilter({ startDate: '', endDate: '', reference: '' });
  };

  return (
    <div className="filter-bar">
      <div className="filter-grid">
        <div className="filter-group">
          <label>শুরু তারিখ</label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </div>
        <div className="filter-group">
          <label>শেষ তারিখ</label>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </div>
        <div className="filter-group">
          <label>রেফারেন্স</label>
          <input
            type="text"
            placeholder="রেফারেন্স লিখুন"
            value={reference}
            onChange={(e) => setReference(e.target.value)}
          />
        </div>
        <div className="filter-actions">
          <button onClick={applyFilter} className="btn-primary">
            <FaFilter /> ফিল্টার
          </button>
          <button onClick={resetFilter} className="btn-outline">
            <FaRedo /> রিসেট
          </button>
        </div>
      </div>
    </div>
  );
}