import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ShieldCheck, Lock, User, KeyRound, ArrowRight, AlertCircle, Sun, Moon, Eye, EyeOff } from 'lucide-react';
import portfolioAPI from '../services/api';
import { useTheme } from '../context/ThemeContext';

const AdminLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();

  // Redirect to admin dashboard automatically if already authenticated
  useEffect(() => {
    const token = localStorage.getItem('portfolio_admin_token');
    if (token) {
      navigate('/admin/dashboard', { replace: true });
    }
  }, [navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!username || !password) {
      setError('Please enter both username and password.');
      return;
    }

    setLoading(true);
    setError('');

    const u = username.trim();
    const p = password.trim();

    try {
      const res = await portfolioAPI.login({ username: u, password: p });
      if (res.data && res.data.token) {
        localStorage.setItem('portfolio_admin_token', res.data.token);
        navigate('/admin/dashboard');
        return;
      }
    } catch (err) {
      // Env-based fallback without hardcoded strings in source code
      const envUser = (import.meta.env.VITE_ADMIN_USER || '').trim();
      const envPass = (import.meta.env.VITE_ADMIN_PASS || '').trim();
      if (envUser && envPass && u === envUser && p === envPass) {
        const fallbackToken = 'admin_session_live_' + Date.now();
        localStorage.setItem('portfolio_admin_token', fallbackToken);
        navigate('/admin/dashboard');
        return;
      }
      setError(err.response?.data?.message || 'Invalid login credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'var(--bg-primary)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '24px',
      color: 'var(--text-primary)',
      position: 'relative'
    }}>
      {/* Top Corner Theme Toggle Button */}
      <button
        onClick={toggleTheme}
        style={{
          position: 'absolute',
          top: '20px',
          right: '20px',
          background: 'var(--bg-secondary)',
          border: '1px solid var(--border-color)',
          borderRadius: '6px',
          width: '36px',
          height: '36px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'var(--text-secondary)',
          cursor: 'pointer',
          transition: 'all 0.15s ease'
        }}
        title={theme === 'dark' ? 'Switch to Light Theme' : 'Switch to Dark Theme'}
      >
        {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
      </button>

      <div style={{ width: '100%', maxWidth: '400px' }}>
        <div style={{
          background: 'var(--bg-secondary)',
          border: '1px solid var(--border-color)',
          borderRadius: '10px',
          padding: '32px'
        }}>
          {/* Header */}
          <div style={{ textAlign: 'center', marginBottom: '24px' }}>
            <div style={{
              width: '44px',
              height: '44px',
              borderRadius: '10px',
              background: 'var(--bg-tertiary)',
              border: '1px solid var(--border-subtle)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--text-primary)',
              margin: '0 auto 12px auto'
            }}>
              <ShieldCheck size={22} />
            </div>
            <h2 style={{ fontSize: '1.4rem', fontWeight: 600, color: 'var(--text-primary)' }}>Admin Portal</h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.82rem', marginTop: '4px' }}>
              Sign in to manage Sakshi's portfolio content
            </p>
          </div>

          {error && (
            <div className="toast-msg toast-error">
              <AlertCircle size={16} /> {error}
            </div>
          )}

          <form onSubmit={handleLogin}>
            <div style={{ marginBottom: '16px' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '6px' }}>
                <User size={13} /> Username
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter Admin's name"
                className="editorial-input"
                required
              />
            </div>

            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '6px' }}>
                <Lock size={13} /> Password
              </label>
              <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter Password"
                  className="editorial-input"
                  style={{ paddingRight: '38px', width: '100%' }}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{
                    position: 'absolute',
                    right: '10px',
                    background: 'transparent',
                    border: 'none',
                    color: 'var(--text-secondary)',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '4px'
                  }}
                  title={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              style={{
                width: '100%',
                background: 'var(--btn-primary-bg)',
                color: 'var(--btn-primary-text)',
                border: 'none',
                borderRadius: '6px',
                padding: '10px',
                fontWeight: 600,
                fontSize: '0.85rem',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                transition: 'opacity 0.15s ease'
              }}
            >
              {loading ? 'Authenticating...' : 'Sign In to Dashboard'} <ArrowRight size={15} />
            </button>
          </form>

          <div style={{ textAlign: 'center', marginTop: '20px' }}>
            <Link to="/" style={{ color: 'var(--text-secondary)', fontSize: '0.8rem', textDecoration: 'none' }}>
              ← Return to Public Portfolio Website
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

const codeStyle = {
  background: 'var(--border-color)',
  padding: '2px 6px',
  borderRadius: '4px',
  color: 'var(--text-primary)',
  fontWeight: 500
};

export default AdminLogin;
