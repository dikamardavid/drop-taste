import React, { useState, useEffect } from 'react';

interface AccountPageProps {
  onLogout: () => void;
}

export const AccountPage: React.FC<AccountPageProps> = ({ onLogout }) => {
  const [sessions, setSessions] = useState<any[]>([]);
  const [isPro, setIsPro] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadSessions() {
      try {
        const res = await fetch('/api/v1/agents/sessions');
        if (res.ok) {
          const json = await res.json();
          setSessions(json.data || []);
        }
      } catch (err) {
        console.error('Failed to load sessions:', err);
      } finally {
        setLoading(false);
      }
    }
    loadSessions();
  }, []);

  const handleDeleteAccount = () => {
    if (confirm('Are you absolutely sure you want to delete your account? All your captured references and agent tokens will be permanently erased.')) {
      alert('Account deleted successfully.');
      onLogout();
    }
  };

  return (
    <div className="container" style={{ paddingBottom: '100px', maxWidth: '900px' }}>
      <div style={{ marginTop: '36px', marginBottom: '28px' }}>
        <h1 style={{ fontSize: '24px', fontWeight: 700, letterSpacing: '-0.02em', marginBottom: '6px' }}>
          Account & Subscription Settings
        </h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '13px' }}>
          Manage your subscription plan, connected agent runtimes, security tokens, and account data.
        </p>
      </div>

      {/* 1. Current Plan Section */}
      <div
        style={{
          background: 'var(--bg-surface)',
          border: '1px solid var(--border-subtle)',
          borderRadius: '16px',
          padding: '28px',
          marginBottom: '28px',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
              <h3 style={{ fontSize: '18px', fontWeight: 600 }}>Current Subscription Plan</h3>
              <span
                style={{
                  padding: '3px 10px',
                  borderRadius: '9999px',
                  fontSize: '11px',
                  fontWeight: 700,
                  background: isPro ? 'rgba(99, 102, 241, 0.2)' : 'rgba(148, 163, 184, 0.2)',
                  color: isPro ? '#A5B4FC' : '#94A3B8',
                  border: isPro ? '1px solid #6366F1' : '1px solid #475569',
                }}
              >
                {isPro ? 'PRO DESIGNER ($19/mo)' : 'STARTER FREE ($0/mo)'}
              </span>
            </div>
            <p style={{ fontSize: '13px', color: 'var(--text-muted)' }}>
              {isPro
                ? 'Unlimited captures, unlimited Vision AI design.md syntheses, and local Figma blending.'
                : 'Limited to 50 cloud captures and 5 Vision AI image syntheses per month.'}
            </p>
          </div>

          <button
            className="btn-primary"
            onClick={() => {
              setIsPro(!isPro);
              alert(isPro ? 'Downgraded to Starter Free' : 'Upgraded to Pro Designer successfully!');
            }}
          >
            {isPro ? 'Manage Billing' : '⚡ Upgrade to Pro Plan'}
          </button>
        </div>
      </div>

      {/* 2. Connected History Section */}
      <div
        style={{
          background: 'var(--bg-surface)',
          border: '1px solid var(--border-subtle)',
          borderRadius: '16px',
          padding: '28px',
          marginBottom: '28px',
        }}
      >
        <h3 style={{ fontSize: '18px', fontWeight: 600, marginBottom: '6px' }}>Connected History</h3>
        <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginBottom: '18px' }}>
          Audit log of AI agents (Cursor, Claude Desktop, Antigravity) and Figma plugins querying your library.
        </p>

        {loading ? (
          <p style={{ fontSize: '13px', color: 'var(--text-muted)' }}>Loading connected history...</p>
        ) : sessions.length === 0 ? (
          <div style={{ background: '#070C18', border: '1px dashed var(--border-subtle)', borderRadius: '8px', padding: '24px', textAlign: 'center' }}>
            <span style={{ fontSize: '20px', display: 'block', marginBottom: '6px' }}>🔌</span>
            <span style={{ fontSize: '13px', color: 'var(--text-muted)' }}>No external agents connected yet. Connect your first agent in the Connect MCP tab.</span>
          </div>
        ) : (
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border-subtle)', textAlign: 'left', color: 'var(--text-muted)' }}>
                <th style={{ padding: '8px 12px' }}>Client Application</th>
                <th style={{ padding: '8px 12px' }}>Host Environment</th>
                <th style={{ padding: '8px 12px' }}>Total Requests</th>
                <th style={{ padding: '8px 12px' }}>Last Activity</th>
              </tr>
            </thead>
            <tbody>
              {sessions.map((s) => (
                <tr key={s.id} style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                  <td style={{ padding: '12px', fontWeight: 500 }}>{s.clientName}</td>
                  <td style={{ padding: '12px', color: '#94A3B8' }}>{s.hostOs}</td>
                  <td style={{ padding: '12px', color: '#94A3B8' }}>{s.queryCount}</td>
                  <td style={{ padding: '12px', color: '#94A3B8' }}>{new Date(s.lastActiveAt).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* 3. Session & Danger Zone */}
      <div
        style={{
          background: 'var(--bg-surface)',
          border: '1px solid #7F1D1D',
          borderRadius: '16px',
          padding: '28px',
        }}
      >
        <h3 style={{ fontSize: '18px', fontWeight: 600, color: '#F87171', marginBottom: '6px' }}>
          Account Actions & Danger Zone
        </h3>
        <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginBottom: '20px' }}>
          Permanently delete your Drop Taste library data or end your active browser session.
        </p>

        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          <button
            className="btn-secondary"
            onClick={onLogout}
            style={{ borderColor: 'var(--border-subtle)' }}
          >
            Log Out of Session
          </button>
          <button
            onClick={handleDeleteAccount}
            style={{
              background: '#991B1B',
              color: '#FEE2E2',
              border: 'none',
              padding: '10px 18px',
              borderRadius: '6px',
              fontSize: '13px',
              fontWeight: 600,
              cursor: 'pointer',
            }}
          >
            Delete Account Permanently
          </button>
        </div>
      </div>
    </div>
  );
};
