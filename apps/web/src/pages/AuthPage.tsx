import React, { useState } from 'react';

interface AuthPageProps {
  onSuccess: () => void;
}

export const AuthPage: React.FC<AuthPageProps> = ({ onSuccess }) => {
  const [mode, setMode] = useState<'signin' | 'signup'>('signin');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) return;
    // Mock authentication: sets active session and navigates to library
    onSuccess();
  };

  return (
    <div
      style={{
        minHeight: 'calc(100vh - 120px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '40px 24px',
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '420px',
          background: 'var(--bg-surface)',
          border: '1px solid var(--border-subtle)',
          borderRadius: '16px',
          padding: '36px',
          boxShadow: '0 20px 40px rgba(0,0,0,0.4)',
        }}
      >
        <div style={{ textAlign: 'center', marginBottom: '24px' }}>
          <div
            style={{
              width: '40px',
              height: '40px',
              borderRadius: '8px',
              background: 'linear-gradient(135deg, #6366F1, #8B5CF6)',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '18px',
              fontWeight: 700,
              color: '#fff',
              marginBottom: '12px',
            }}
          >
            DT
          </div>
          <h2 style={{ fontSize: '20px', fontWeight: 700, letterSpacing: '-0.02em', marginBottom: '6px' }}>
            {mode === 'signin' ? 'Welcome back to Drop Taste' : 'Create your Drop Taste account'}
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '13px' }}>
            {mode === 'signin'
              ? 'Access your cloud reference library and agent keys'
              : 'Start capturing web inspirations directly into Figma & AI agents'}
          </p>
        </div>

        {/* Tab Switcher */}
        <div
          style={{
            display: 'flex',
            background: 'var(--bg-canvas)',
            padding: '4px',
            borderRadius: '8px',
            marginBottom: '20px',
            border: '1px solid var(--border-subtle)',
          }}
        >
          <button
            type="button"
            style={{
              flex: 1,
              padding: '8px',
              fontSize: '13px',
              fontWeight: 600,
              borderRadius: '6px',
              border: 'none',
              background: mode === 'signin' ? 'var(--bg-surface)' : 'transparent',
              color: mode === 'signin' ? '#fff' : 'var(--text-muted)',
            }}
            onClick={() => setMode('signin')}
          >
            Sign In
          </button>
          <button
            type="button"
            style={{
              flex: 1,
              padding: '8px',
              fontSize: '13px',
              fontWeight: 600,
              borderRadius: '6px',
              border: 'none',
              background: mode === 'signup' ? 'var(--bg-surface)' : 'transparent',
              color: mode === 'signup' ? '#fff' : 'var(--text-muted)',
            }}
            onClick={() => setMode('signup')}
          >
            Sign Up
          </button>
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          {mode === 'signup' && (
            <div>
              <label style={{ fontSize: '12px', color: 'var(--text-muted)', marginBottom: '4px', display: 'block' }}>
                Full Name
              </label>
              <input
                type="text"
                placeholder="Achmad Wahyudi"
                value={name}
                onChange={(e) => setName(e.target.value)}
                style={{
                  width: '100%',
                  background: 'var(--bg-canvas)',
                  border: '1px solid var(--border-subtle)',
                  padding: '10px 12px',
                  borderRadius: '6px',
                  color: '#fff',
                  fontSize: '13px',
                }}
                required
              />
            </div>
          )}

          <div>
            <label style={{ fontSize: '12px', color: 'var(--text-muted)', marginBottom: '4px', display: 'block' }}>
              Work Email
            </label>
            <input
              type="email"
              placeholder="designer@company.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{
                width: '100%',
                background: 'var(--bg-canvas)',
                border: '1px solid var(--border-subtle)',
                padding: '10px 12px',
                borderRadius: '6px',
                color: '#fff',
                fontSize: '13px',
              }}
              required
            />
          </div>

          <div>
            <label style={{ fontSize: '12px', color: 'var(--text-muted)', marginBottom: '4px', display: 'block' }}>
              Password
            </label>
            <input
              type="password"
              placeholder="••••••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{
                width: '100%',
                background: 'var(--bg-canvas)',
                border: '1px solid var(--border-subtle)',
                padding: '10px 12px',
                borderRadius: '6px',
                color: '#fff',
                fontSize: '13px',
              }}
              required
            />
          </div>

          <button
            type="submit"
            className="btn-primary"
            style={{ width: '100%', justifyContent: 'center', padding: '12px', marginTop: '10px' }}
          >
            {mode === 'signin' ? 'Sign In to Drop Taste' : 'Create Free Account'}
          </button>
        </form>
      </div>
    </div>
  );
};
