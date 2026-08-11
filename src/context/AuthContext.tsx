import { createContext, useContext, useState, useCallback } from 'react';
import type { ReactNode } from 'react';
import api from '../api/adminClient';

interface AdminUser {
  id: string;
  name: string;
  username: string;
  email: string;
  role: string;
  profilePhoto?: string;
}

interface AuthContextValue {
  admin: AdminUser | null;
  token: string | null;
  loading: boolean;
  error: string | null;
  login: (emailOrUsername: string, password: string) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [admin, setAdmin] = useState<AdminUser | null>(() => {
    const raw = localStorage.getItem('sm_admin_user');
    return raw ? JSON.parse(raw) : null;
  });
  const [token, setToken] = useState<string | null>(() => localStorage.getItem('sm_admin_token'));
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const login = useCallback(async (emailOrUsername: string, password: string) => {
    setLoading(true);
    setError(null);
    try {
      const res = await api.post('/auth/login', { emailOrUsername, password });
      const { token, admin } = res.data;
      localStorage.setItem('sm_admin_token', token);
      localStorage.setItem('sm_admin_user', JSON.stringify(admin));
      setToken(token);
      setAdmin(admin);
      return true;
    } catch (err: any) {
      setError(err.response?.data?.message || 'Login failed. Check your credentials.');
      return false;
    } finally {
      setLoading(false);
    }
  }, []);

  const logout = useCallback(() => {
    api.post('/auth/logout').catch(() => {});
    localStorage.removeItem('sm_admin_token');
    localStorage.removeItem('sm_admin_user');
    setToken(null);
    setAdmin(null);
    window.location.href = '/admin/login';
  }, []);

  return (
    <AuthContext.Provider value={{ admin, token, loading, error, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
