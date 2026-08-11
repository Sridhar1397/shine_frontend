import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiStar, FiLock, FiUser } from 'react-icons/fi';
import { useAuth } from '../../context/AuthContext';
import './LoginPage.css';

export default function LoginPage() {
  const { login, loading, error } = useAuth();
  const [emailOrUsername, setEmailOrUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const ok = await login(emailOrUsername, password);
    if (ok) navigate('/admin');
  };

  return (
    <div className="login-page admin-shell">
      <div className="login-card">
        <div className="login-brand">
          <div className="login-brand-mark"><FiStar size={20} /></div>
          <h1>Shine Magics</h1>
          <p>Admin Panel</p>
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          {error && <div className="login-error">{error}</div>}
          <div className="login-field">
            <FiUser size={15} />
            <input placeholder="Username or Email" value={emailOrUsername} onChange={(e) => setEmailOrUsername(e.target.value)} required />
          </div>
          <div className="login-field">
            <FiLock size={15} />
            <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </div>
          <button type="submit" className="login-submit" disabled={loading}>
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>
      </div>
    </div>
  );
}
