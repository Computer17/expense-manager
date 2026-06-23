import { useState } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '@/context/AuthContext';
import Layout from '@/components/common/Layout';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const router = useRouter();

  const handleLogin = () => {
    if (!email || !password) {
      setError('ইমেইল ও পাসওয়ার্ড দিন।');
      return;
    }
    const success = login(email, password);
    if (success) {
      const user = JSON.parse(localStorage.getItem('loginUser') || 'null');
      router.push(user?.role === 'admin' ? '/admin' : '/dashboard');
    } else {
      setError('ভুল ইমেইল বা পাসওয়ার্ড');
    }
  };

  return (
    <Layout title="লগইন">
      <div className="login-wrapper">
        <div className="login-card">
          <div className="login-header">
            <span className="icon">📊</span>
            <h1>Expense Manager</h1>
            <p>আপনার খরচের হিসাব রাখুন</p>
          </div>
          <div className="login-body">
            <input
              type="email"
              placeholder="ইমেইল"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
              autoFocus
            />
            <input
              type="password"
              placeholder="পাসওয়ার্ড"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
            />
            <button onClick={handleLogin}>প্রবেশ করুন</button>
            {error && <p className="error-msg">{error}</p>}
          </div>
        </div>
      </div>
    </Layout>
  );
}