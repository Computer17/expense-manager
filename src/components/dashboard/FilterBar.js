import { useState } from 'react';
import { CATEGORIES } from '@/constants';
import { FaFilter, FaRedo } from 'react-icons/fa';

export default function FilterBar({ onFilter }) {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [category, setCategory] = useState('');

  const applyFilter = () => {
    onFilter({ startDate, endDate, category });
  };

  const resetFilter = () => {
    setStartDate('');
    setEndDate('');
    setCategory('');
    onFilter({ startDate: '', endDate: '', category: '' });
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
          <label>ক্যাটাগরি</label>
          <select value={category} onChange={(e) => setCategory(e.target.value)}>
            <option value="">সব</option>
            {CATEGORIES.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
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