import React, { useState, useEffect } from 'react';

export const ConnectPage: React.FC = () => {
  const [tokens, setTokens] = useState<any[]>([]);
  const [sessions, setSessions] = useState<any[]>([]);
  const [newTokenName, setNewTokenName] = useState('');
  const [generatedToken, setGeneratedToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const loadData = async () => {
    try {
      const [tRes, sRes] = await Promise.all([
        fetch('/api/v1/agents/tokens'),
        fetch('/api/v1/agents/sessions'),
      ]);
      if (tRes.ok) {
        const tJson = await tRes.json();
        setTokens(tJson.data || []);
      }
      if (sRes.ok) {
        const sJson = await sRes.json();
        setSessions(sJson.data || []);
      }
    } catch (err) {
      console.error('Failed to load agent tokens or sessions:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleCreateToken = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTokenName.trim()) return;

    try {
      const res = await fetch('/api/v1/agents/tokens', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: newTokenName.trim() }),
      });
      if (res.ok) {
        const json = await res.json();
        setGeneratedToken(json.data.token);
        setNewTokenName('');
        loadData();
      }
    } catch (err) {
      console.error('Failed to generate token:', err);
    }
  };

  const handleRevokeToken = async (tokenId: string) => {
    if (!confirm('Are you sure you want to revoke this agent token? Active agents will immediately lose access.')) {
      return;
    }

    try {
      const res = await fetch(`/api/v1/agents/tokens/${tokenId}`, { method: 'DELETE' });
      if (res.ok) {
        loadData();
      }
    } catch (err) {
      console.error('Failed to revoke token:', err);
    }
  };

  const mcpConfigSnippet = {
    mcpServers: {
      'drop-taste': {
        command: 'node',
        args: ['/Users/goregadget/Multica Agentic/projects/drop-taste/packages/mcp/dist/server.js'],
        env: {
          DROP_TASTE_API_TOKEN: generatedToken || 'dt_pat_YOUR_TOKEN_HERE',
          DROP_TASTE_API_URL: 'http://localhost:3847',
        },
      },
    },
  };

  return (
    <div className="container" style={{ paddingBottom: '80px', maxWidth: '1000px' }}>
      <div style={{ marginTop: '32px', marginBottom: '28px' }}>
        <h1 style={{ fontSize: '24px', fontWeight: 700, letterSpacing: '-0.02em', marginBottom: '6px' }}>
          Connect AI Coding Agents (MCP)
        </h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '13px' }}>
          Connect Claude Desktop, Antigravity, or Cursor to your Drop Taste library via Model Context Protocol.
        </p>
      </div>

      {/* Token Generation Card */}
      <div
        style={{
          background: 'var(--bg-surface)',
          border: '1px solid var(--border-subtle)',
          borderRadius: 'var(--radius-lg)',
          padding: '24px',
          marginBottom: '28px',
        }}
      >
        <h3 style={{ fontSize: '16px', fontWeight: 600, marginBottom: '8px' }}>Generate Personal Access Token</h3>
        <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginBottom: '16px' }}>
          Agents use this token to query and reference your design library via MCP.
        </p>

        <form onSubmit={handleCreateToken} style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
          <input
            type="text"
            placeholder="e.g. My Antigravity Agent, Claude Desktop MacBook"
            value={newTokenName}
            onChange={(e) => setNewTokenName(e.target.value)}
            style={{
              flex: 1,
              background: 'var(--bg-canvas)',
              border: '1px solid var(--border-subtle)',
              color: '#fff',
              padding: '10px 14px',
              borderRadius: '6px',
              fontSize: '13px',
            }}
          />
          <button type="submit" className="btn-primary">
            Generate Token
          </button>
        </form>

        {generatedToken && (
          <div
            style={{
              marginTop: '16px',
              padding: '14px',
              background: 'rgba(99, 102, 241, 0.1)',
              border: '1px solid #6366F1',
              borderRadius: '8px',
            }}
          >
            <div style={{ fontSize: '12px', fontWeight: 600, color: '#A5B4FC', marginBottom: '6px' }}>
              🔑 Copy your new token now (it will not be shown in full again):
            </div>
            <code style={{ fontSize: '13px', color: '#fff', wordBreak: 'break-all', display: 'block', background: '#0B0F17', padding: '8px', borderRadius: '4px' }}>
              {generatedToken}
            </code>
          </div>
        )}
      </div>

      {/* MCP Configuration Guide */}
      <div
        style={{
          background: 'var(--bg-surface)',
          border: '1px solid var(--border-subtle)',
          borderRadius: 'var(--radius-lg)',
          padding: '24px',
          marginBottom: '28px',
        }}
      >
        <h3 style={{ fontSize: '16px', fontWeight: 600, marginBottom: '8px' }}>MCP Client Configuration</h3>
        <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginBottom: '14px' }}>
          Add the following to your Claude Desktop config (<code>claude_desktop_config.json</code>) or Antigravity config:
        </p>

        <pre
          style={{
            background: '#030712',
            border: '1px solid var(--border-subtle)',
            padding: '16px',
            borderRadius: '8px',
            fontSize: '12px',
            color: '#38BDF8',
            overflowX: 'auto',
          }}
        >
          {JSON.stringify(mcpConfigSnippet, null, 2)}
        </pre>
      </div>

      {/* Active Tokens & Revocation Table */}
      <div
        style={{
          background: 'var(--bg-surface)',
          border: '1px solid var(--border-subtle)',
          borderRadius: 'var(--radius-lg)',
          padding: '24px',
          marginBottom: '28px',
        }}
      >
        <h3 style={{ fontSize: '16px', fontWeight: 600, marginBottom: '8px' }}>Active Access Tokens</h3>
        <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginBottom: '16px' }}>
          Manage and revoke token access instantly. Revocation takes effect on the next agent request.
        </p>

        {loading ? (
          <p style={{ fontSize: '13px', color: 'var(--text-muted)' }}>Loading tokens...</p>
        ) : tokens.length === 0 ? (
          <p style={{ fontSize: '13px', color: 'var(--text-muted)' }}>No tokens created yet.</p>
        ) : (
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border-subtle)', textAlign: 'left', color: 'var(--text-muted)' }}>
                <th style={{ padding: '8px 12px' }}>Token Name</th>
                <th style={{ padding: '8px 12px' }}>Prefix</th>
                <th style={{ padding: '8px 12px' }}>Created</th>
                <th style={{ padding: '8px 12px' }}>Status</th>
                <th style={{ padding: '8px 12px', textAlign: 'right' }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {tokens.map((t) => (
                <tr key={t.id} style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                  <td style={{ padding: '12px', fontWeight: 500 }}>{t.name}</td>
                  <td style={{ padding: '12px', fontFamily: 'monospace', color: '#94A3B8' }}>{t.tokenSecretPrefix}</td>
                  <td style={{ padding: '12px', color: '#94A3B8' }}>{new Date(t.createdAt).toLocaleDateString()}</td>
                  <td style={{ padding: '12px' }}>
                    <span
                      style={{
                        padding: '2px 8px',
                        borderRadius: '4px',
                        fontSize: '11px',
                        fontWeight: 600,
                        background: t.isRevoked ? 'rgba(239, 68, 68, 0.15)' : 'rgba(16, 185, 129, 0.15)',
                        color: t.isRevoked ? '#EF4444' : '#10B981',
                      }}
                    >
                      {t.isRevoked ? 'REVOKED' : 'ACTIVE'}
                    </span>
                  </td>
                  <td style={{ padding: '12px', textAlign: 'right' }}>
                    {!t.isRevoked && (
                      <button
                        onClick={() => handleRevokeToken(t.id)}
                        style={{
                          background: 'transparent',
                          border: '1px solid #EF4444',
                          color: '#EF4444',
                          padding: '4px 10px',
                          borderRadius: '4px',
                          fontSize: '11px',
                          fontWeight: 500,
                        }}
                      >
                        Revoke Access
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Active Agent Sessions Table */}
      <div
        style={{
          background: 'var(--bg-surface)',
          border: '1px solid var(--border-subtle)',
          borderRadius: 'var(--radius-lg)',
          padding: '24px',
        }}
      >
        <h3 style={{ fontSize: '16px', fontWeight: 600, marginBottom: '8px' }}>Active Agent Sessions</h3>
        <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginBottom: '16px' }}>
          Real-time audit log of external agents querying your references via MCP.
        </p>

        {sessions.length === 0 ? (
          <p style={{ fontSize: '13px', color: 'var(--text-muted)' }}>No agent sessions logged yet.</p>
        ) : (
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border-subtle)', textAlign: 'left', color: 'var(--text-muted)' }}>
                <th style={{ padding: '8px 12px' }}>Client</th>
                <th style={{ padding: '8px 12px' }}>Host OS</th>
                <th style={{ padding: '8px 12px' }}>Queries</th>
                <th style={{ padding: '8px 12px' }}>Last Active</th>
              </tr>
            </thead>
            <tbody>
              {sessions.map((s) => (
                <tr key={s.id} style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                  <td style={{ padding: '12px', fontWeight: 500 }}>{s.clientName}</td>
                  <td style={{ padding: '12px', color: '#94A3B8' }}>{s.hostOs}</td>
                  <td style={{ padding: '12px', color: '#94A3B8' }}>{s.queryCount}</td>
                  <td style={{ padding: '12px', color: '#94A3B8' }}>{new Date(s.lastActiveAt).toLocaleTimeString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};
