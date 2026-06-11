import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Login.css';

export default function Login() {
  const [mode, setMode] = useState('login'); // 'login' | 'register'
  const [role, setRole] = useState('traveler');
  const [form, setForm] = useState({ name: '', email: '', phone: '', password: '' });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async () => {
    setLoading(true);
    // TODO: Connect to backend
    // const endpoint = mode === 'login' ? '/api/auth/login' : '/api/auth/register';
    // const res = await fetch(endpoint, {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ ...form, role })
    // });
    // const data = await res.json();
    // localStorage.setItem('token', data.token);
    await new Promise(r => setTimeout(r, 1200));
    setLoading(false);
    navigate('/');
  };

  return (
    <div className="login-page">
      <div className="login-left">
        <div className="login-brand">
          <Link to="/" className="logo-link">
            <span className="logo">Ghar<span>Wapsi</span></span>
            <span className="logo-devanagari">घर वापसी</span>
          </Link>
        </div>
        <div className="login-quote">
          <div className="quote-text">"Every Indian home is a story waiting to be lived."</div>
          <div className="quote-img-grid">
            <img src="https://images.unsplash.com/photo-1585016495481-91613b13f3f0?w=200&h=200&fit=crop" alt="" />
            <img src="https://images.unsplash.com/photo-1599930113854-d6d7fd521f10?w=200&h=200&fit=crop" alt="" />
            <img src="https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=200&h=200&fit=crop" alt="" />
            <img src="https://images.unsplash.com/photo-1532375810709-75b1da00537c?w=200&h=200&fit=crop" alt="" />
          </div>
        </div>
      </div>

      <div className="login-right">
        <div className="login-card">
          <div className="login-tabs">
            <button className={mode === 'login' ? 'tab active' : 'tab'} onClick={() => setMode('login')}>Login</button>
            <button className={mode === 'register' ? 'tab active' : 'tab'} onClick={() => setMode('register')}>Register</button>
          </div>

          <h2 className="login-title">
            {mode === 'login' ? 'Welcome back 🙏' : 'Join GharWapsi'}
          </h2>
          <p className="login-sub">
            {mode === 'login' ? 'Log in to your account' : 'Create your account to get started'}
          </p>

          {mode === 'register' && (
            <>
              <div className="role-picker">
                <button className={role === 'traveler' ? 'role-btn active' : 'role-btn'} onClick={() => setRole('traveler')}>
                  🎒 I'm a Traveler
                </button>
                <button className={role === 'host' ? 'role-btn active' : 'role-btn'} onClick={() => setRole('host')}>
                  🏠 I'm a Host
                </button>
              </div>
              <div className="form-field">
                <label>Full Name</label>
                <input type="text" placeholder="Rahul Sharma" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
              </div>
              <div className="form-field">
                <label>Phone Number</label>
                <input type="tel" placeholder="+91 98765 43210" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} />
              </div>
            </>
          )}

          <div className="form-field">
            <label>Email Address</label>
            <input type="email" placeholder="you@example.com" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
          </div>

          <div className="form-field">
            <label>Password</label>
            <input type="password" placeholder="••••••••" value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} />
          </div>

          {mode === 'register' && (
            <div className="aadhaar-note">
              🪪 You'll verify your Aadhaar after registration for a trusted profile badge.
            </div>
          )}

          <button className={`login-btn ${loading ? 'loading' : ''}`} onClick={handleSubmit} disabled={loading}>
            {loading ? '⏳ Please wait...' : mode === 'login' ? 'Login →' : 'Create Account →'}
          </button>

          <div className="login-divider"><span>or</span></div>

          <button className="google-btn">
            <img src="https://www.google.com/favicon.ico" alt="Google" width="16" />
            Continue with Google
          </button>

          <p className="login-switch">
            {mode === 'login' ? "Don't have an account? " : "Already have an account? "}
            <button className="switch-btn" onClick={() => setMode(mode === 'login' ? 'register' : 'login')}>
              {mode === 'login' ? 'Register' : 'Login'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
