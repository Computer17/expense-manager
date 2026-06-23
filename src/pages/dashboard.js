import { useState, useMemo } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useTables } from '@/context/TableContext';
import ProtectedRoute from '@/components/common/ProtectedRoute';
import Layout from '@/components/common/Layout';
import Sidebar from '@/components/dashboard/Sidebar';
import ExpenseForm from '@/components/dashboard/ExpenseForm';
import ExpenseTable from '@/components/dashboard/ExpenseTable';
import FilterBar from '@/components/dashboard/FilterBar';
import CategoryChart from '@/components/dashboard/CategoryChart';
import { downloadExpensesAsExcel } from '@/services/excel';
import { FaPlus, FaFileExcel, FaTrash } from 'react-icons/fa';

export default function Dashboard() {
  const { logout } = useAuth();
  const { tables, currentTable, expenses, createTable, deleteTable } = useTables();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [newTableName, setNewTableName] = useState('');
  const [filter, setFilter] = useState({ startDate: '', endDate: '', category: '' });

  const filteredExpenses = useMemo(() => {
    let filtered = [...expenses];
    if (filter.startDate) {
      filtered = filtered.filter((e) => e.date >= filter.startDate);
    }
    if (filter.endDate) {
      filtered = filtered.filter((e) => e.date <= filter.endDate);
    }
    if (filter.category) {
      filtered = filtered.filter((e) => e.category === filter.category);
    }
    return filtered;
  }, [expenses, filter]);

  const total = filteredExpenses.reduce((sum, e) => sum + e.amount, 0);

  const handleCreateTable = () => {
    const success = createTable(newTableName);
    if (success) {
      setNewTableName('');
      alert(`"${newTableName}" টেবিল তৈরি হয়েছে!`);
    } else {
      alert('টেবিল তৈরি করা সম্ভব হয়নি (নাম খালি বা ডুপ্লিকেট)।');
    }
  };

  const handleDownloadExcel = () => {
    if (!currentTable || filteredExpenses.length === 0) {
      alert('ডাউনলোড করার জন্য ডেটা নেই।');
      return;
    }
    const success = downloadExpensesAsExcel(filteredExpenses, currentTable);
    if (success) {
      alert('📥 Excel ডাউনলোড শুরু হয়েছে!');
    }
  };

  const handleDeleteCurrentTable = () => {
    if (!currentTable) return;
    if (confirm(`"${currentTable}" টেবিল ও এর সব ডেটা মুছতে চান?`)) {
      deleteTable(currentTable);
    }
  };

  return (
    <ProtectedRoute>
      <Layout title="ড্যাশবোর্ড">
        <div className="app-layout">
          <Sidebar isOpen={sidebarOpen} onToggle={() => setSidebarOpen(!sidebarOpen)} />

          <main className="main-content">
            <div className="top-bar">
              <button onClick={() => setSidebarOpen(true)} className="menu-toggle">
                ☰ মেনু
              </button>
              <h2 id="currentTableTitle">
                {currentTable ? `📊 ${currentTable}` : '📂 আমার হিসাব'}
              </h2>
            </div>

            <section className="card">
              <h3>📁 নতুন টেবিল তৈরি</h3>
              <div className="flex-row">
                <input
                  placeholder="টেবিলের নাম (যেমন: বালির হিসাব)"
                  value={newTableName}
                  onChange={(e) => setNewTableName(e.target.value)}
                />
                <button onClick={handleCreateTable} className="btn-primary">
                  <FaPlus style={{ marginRight: '8px' }} /> তৈরি করুন
                </button>
              </div>
            </section>

            {currentTable ? (
              <>
                <section className="card">
                  <h3>🧾 নতুন খরচ যোগ করুন</h3>
                  <ExpenseForm />
                </section>

                <section className="card">
                  <h3>🔍 ফিল্টার</h3>
                  <FilterBar onFilter={setFilter} />
                </section>

                <section className="card">
                  <div className="table-actions">
                    <h3>📋 খরচের তালিকা</h3>
                    <div className="action-buttons">
                      <button onClick={handleDownloadExcel} className="btn-excel">
                        <FaFileExcel style={{ marginRight: '8px' }} /> Excel
                      </button>
                      <button onClick={handleDeleteCurrentTable} className="btn-danger">
                        <FaTrash style={{ marginRight: '8px' }} /> টেবিল মুছুন
                      </button>
                    </div>
                  </div>
                  <ExpenseTable expenses={filteredExpenses} total={total} />
                </section>

                {filteredExpenses.length > 0 && (
                  <section className="card">
                    <h3>📊 ক্যাটাগরি ভিত্তিক খরচ</h3>
                    <CategoryChart expenses={filteredExpenses} />
                  </section>
                )}
              </>
            ) : (
              <div className="card empty-state">
                <p>👈 বাম পাশের মেনু থেকে একটি টেবিল নির্বাচন করুন, অথবা উপরে নতুন টেবিল তৈরি করুন।</p>
              </div>
            )}
          </main>
        </div>
      </Layout>
    </ProtectedRoute>
  );
}