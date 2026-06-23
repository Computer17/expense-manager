import { useEffect, useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import ProtectedRoute from '@/components/common/ProtectedRoute';
import Layout from '@/components/common/Layout';
import UserForm from '@/components/admin/UserForm';
import UserTable from '@/components/admin/UserTable';
import { getUsers, setUsers, getUserProfile, setUserProfile } from '@/services/storage';

export default function Admin() {
  const { logout } = useAuth();
  const [users, setUsersState] = useState([]);

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = () => {
    const raw = getUsers();
    const enriched = raw.map((u) => {
      const profile = getUserProfile(u.email);
      return { ...u, name: profile?.name || u.email.split('@')[0] };
    });
    setUsersState(enriched);
  };

  const addUser = ({ email, password, name }) => {
    const current = getUsers();
    if (current.find((u) => u.email === email)) {
      alert('এই ইমেইল ইতিমধ্যে আছে।');
      return;
    }
    current.push({ email, password, role: 'user' });
    setUsers(current);
    setUserProfile(email, { name: name || email.split('@')[0] });
    loadUsers();
    alert('ইউজার যোগ হয়েছে!');
  };

  const deleteUser = (index) => {
    if (!confirm('এই ইউজার মুছবেন?')) return;
    const current = getUsers();
    const removed = current.splice(index, 1);
    setUsers(current);
    if (removed.length) {
      localStorage.removeItem(removed[0].email + '_profile');
    }
    loadUsers();
  };

  return (
    <ProtectedRoute adminOnly>
      <Layout title="অ্যাডমিন প্যানেল">
        <div className="app-container">
          <header className="app-header">
            <h2>👑 অ্যাডমিন প্যানেল</h2>
            <button onClick={logout} className="logout-btn">🚪 লগআউট</button>
          </header>
          <main className="app-main">
            <section className="card">
              <h3>➕ নতুন ইউজার</h3>
              <UserForm onAddUser={addUser} />
            </section>
            <section className="card">
              <h3>📋 ইউজার তালিকা</h3>
              <UserTable users={users} onDelete={deleteUser} />
            </section>
          </main>
        </div>
      </Layout>
    </ProtectedRoute>
  );
}