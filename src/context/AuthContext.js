import { createContext, useState, useEffect, useContext } from 'react';
import { useRouter } from 'next/router';
import { getLoginUser, clearLoginUser, setLoginUser, getUsers } from '@/services/storage';
import { ADMIN_EMAIL, ADMIN_PASSWORD } from '@/constants';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const loggedUser = getLoginUser();
    if (loggedUser) {
      setUser(loggedUser);
    }
    setLoading(false);
  }, []);

  const login = (email, password) => {
    const users = getUsers();
    let found = users.find((u) => u.email === email && u.password === password);

    if (!found && email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      found = { email, role: 'admin', name: 'Admin' };
    }

    if (found) {
      setUser(found);
      setLoginUser(found);
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    clearLoginUser();
    router.push('/');
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);