import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '@/context/AuthContext';

export default function ProtectedRoute({ children, adminOnly = false }) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      if (!user) {
        router.push('/');
      } else if (adminOnly && user.role !== 'admin') {
        router.push('/dashboard');
      }
    }
  }, [user, loading, adminOnly, router]);

  if (loading || !user || (adminOnly && user.role !== 'admin')) {
    return (
      <div style={{ textAlign: 'center', padding: '60px 20px' }}>
        <div style={{ fontSize: '2rem', marginBottom: '16px' }}>⏳</div>
        <p>লোড হচ্ছে...</p>
      </div>
    );
  }

  return children;
}