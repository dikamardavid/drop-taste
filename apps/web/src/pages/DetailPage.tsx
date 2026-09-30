import React, { useState, useEffect } from 'react';
import { createAgentReferencePrompt } from '@drop-taste/shared';

interface DetailPageProps {
  itemId: string;
  onBack: () => void;
}

export const DetailPage: React.FC<DetailPageProps> = ({ itemId, onBack }) => {
  const [item, setItem] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [copiedState, setCopiedState] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'overview' | 'design_md' | 'dom'>('overview');

  useEffect(() => {
    async function loadItem() {
      try {
        const res = await fetch(`/api/v1/library/${itemId}`);
        if (res.ok) {
          const json = await res.json();
          setItem(json.data);
          if (json.data.type === 'image') {
            setActiveTab('design_md');
          }
        }
      } catch (err) {
        console.error('Failed to load capture item:', err);
      } finally {
        setLoading(false);
      }
    }
    loadItem();
  }, [itemId]);

  const handleCopyToFigma = async () => {
    if (!item?.figmaPayload) return;

    try {
      // Write dual-MIME HTML clipboard payload for Figma paste Cmd+V
      const blobHtml = new Blob([item.figmaPayload], { type: 'text/html' });
      const blobText = new Blob([item.title], { type: 'text/plain' });

      if (navigator.clipboard && window.ClipboardItem) {
        await navigator.clipboard.write([
          new ClipboardItem({
            'text/html': blobHtml,
            'text/plain': blobText,
          }),
        ]);
      } else {
        await navigator.clipboard.writeText(item.figmaPayload);
      }

      setCopiedState('figma');
      setTimeout(() => setCopiedState(null), 3000);
    } catch (err) {
      console.error('Failed to copy to clipboard:', err);
    }
  };

  const handleReferenceWithAgent = async () => {
    if (!item) return;

    const safeSnippet = createAgentReferencePrompt(item.id, item.title);
    try {
      await navigator.clipboard.writeText(safeSnippet);
      setCopiedState('agent');
      setTimeout(() => setCopiedState(null), 3000);
    } catch (err) {
      console.error('Failed to copy agent reference prompt:', err);
    }
  };

  if (loading) {
    return (
      <div className="container" style={{ padding: '80px 0', textAlign: 'center', color: 'var(--text-muted)' }}>
        Loading capture details...
      </div>
    );
  }

  if (!item) {
    return (
      <div className="container" style={{ padding: '80px 0', textAlign: 'center' }}>
        <p style={{ color: 'var(--text-muted)', marginBottom: '16px' }}>Item not found.</p>
        <button className="btn-secondary" onClick={onBack}>
          ← Back to Library
        </button>
      </div>
    );
  }

  const isImageCapture = item.type === 'image';

  return (
    <div className="container" style={{ paddingBottom: '80px' }}>
      {/* Top Breadcrumb & Actions */}
      <div style={{ marginTop: '28px', marginBottom: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
        <button className="btn-secondary" onClick={onBack}>
          ← Back to Taste Library
        </button>

        <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
          {/* Action Branch: Page & Component get 'Copy to Figma' */}
          {!isImageCapture && (
            <button
              className={`btn-primary ${copiedState === 'figma' ? 'btn-success' : ''}`}
              onClick={handleCopyToFigma}
            >
              <span>{copiedState === 'figma' ? '✅ Copied!' : '📋 Copy to Figma'}</span>
              <span style={{ fontSize: '11px', opacity: 0.85 }}>
                {copiedState === 'figma' ? '(Paste Cmd+V in Figma)' : '(Cmd+V)'}
              </span>
            </button>
          )}

          {/* Action Branch: Image Reference captures get 'Reference this with your agent' */}
          {isImageCapture && (
            <button
              className={`btn-primary ${copiedState === 'agent' ? 'btn-success' : ''}`}
              onClick={handleReferenceWithAgent}
              style={{ background: copiedState === 'agent' ? '#065F46' : 'linear-gradient(135deg, #6366F1, #8B5CF6)' }}
            >
              <span>{copiedState === 'agent' ? '✅ Copied!' : '🤖 Reference this with your agent'}</span>
              <span style={{ fontSize: '11px', opacity: 0.85 }}>
                {copiedState === 'agent' ? '(Paste in Cursor/Claude)' : '(Click to copy prompt)'}
              </span>
            </button>
          )}
        </div>
      </div>

      {/* Main Details Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1.8fr) minmax(320px, 1fr)', gap: '28px' }}>
        {/* Left Column: Visual / Markdown / DOM Inspector */}
        <div>
          {/* Tabs */}
          <div style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
            <button
              className={`nav-tab ${activeTab === 'overview' ? 'active' : ''}`}
              onClick={() => setActiveTab('overview')}
            >
              Visual Preview
            </button>
            {isImageCapture && (
              <button
                className={`nav-tab ${activeTab === 'design_md' ? 'active' : ''}`}
                onClick={() => setActiveTab('design_md')}
              >
                📄 Canonical design.md
              </button>
            )}
            {!isImageCapture && (
              <button
                className={`nav-tab ${activeTab === 'dom' ? 'active' : ''}`}
                onClick={() => setActiveTab('dom')}
              >
                HTML / DOM Source
              </button>
            )}
          </div>

          <div
            style={{
              background: 'var(--bg-surface)',
              border: '1px solid var(--border-subtle)',
              borderRadius: 'var(--radius-lg)',
              overflow: 'hidden',
              minHeight: '440px',
            }}
          >
            {activeTab === 'overview' && (
              <div style={{ padding: '24px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                {item.assetUrl ? (
                  <img
                    src={item.assetUrl}
                    alt={item.title}
                    style={{ maxWidth: '100%', maxHeight: '600px', borderRadius: '8px', objectFit: 'contain' }}
                  />
                ) : (
                  <div style={{ width: '100%', minHeight: '300px', background: '#030712', borderRadius: '8px', padding: '24px' }}>
                    <div style={{ fontSize: '13px', color: '#94A3B8', marginBottom: '12px' }}>
                      DOM Component Render Frame ({item.dimensions?.width} × {item.dimensions?.height}px):
                    </div>
                    <div
                      dangerouslySetInnerHTML={{ __html: item.domHtml || '<p>No preview DOM available</p>' }}
                      style={{ pointerEvents: 'none' }}
                    />
                  </div>
                )}
              </div>
            )}

            {activeTab === 'design_md' && (
              <div style={{ padding: '24px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                  <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
                    Generated by Drop Taste Managed Vision Service (5-Step Pipeline)
                  </span>
                  <button
                    className="btn-secondary"
                    style={{ fontSize: '11px', padding: '4px 10px' }}
                    onClick={() => navigator.clipboard.writeText(item.designMd || '')}
                  >
                    Copy Markdown
                  </button>
                </div>
                <pre
                  style={{
                    background: '#030712',
                    border: '1px solid var(--border-subtle)',
                    padding: '16px',
                    borderRadius: '8px',
                    fontSize: '12px',
                    lineHeight: '1.6',
                    overflowX: 'auto',
                    whiteSpace: 'pre-wrap',
                    color: '#E2E8F0',
                  }}
                >
                  {item.designMd || 'No design.md available.'}
                </pre>
              </div>
            )}

            {activeTab === 'dom' && (
              <div style={{ padding: '24px' }}>
                <pre
                  style={{
                    background: '#030712',
                    border: '1px solid var(--border-subtle)',
                    padding: '16px',
                    borderRadius: '8px',
                    fontSize: '12px',
                    lineHeight: '1.6',
                    overflowX: 'auto',
                    whiteSpace: 'pre-wrap',
                    color: '#94A3B8',
                  }}
                >
                  {item.domHtml || '// No DOM content'}
                </pre>
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Metadata & Agent Instructions */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div
            style={{
              background: 'var(--bg-surface)',
              border: '1px solid var(--border-subtle)',
              borderRadius: 'var(--radius-lg)',
              padding: '24px',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
              <span className={`card-badge ${item.type}`}>
                {item.type === 'page' ? 'Page' : item.type === 'component' ? 'Component' : 'Image Reference'}
              </span>
              <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
                {item.dimensions?.width} × {item.dimensions?.height}px
              </span>
            </div>

            <h2 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '8px', lineHeight: 1.3 }}>
              {item.title}
            </h2>

            <div style={{ fontSize: '13px', color: 'var(--text-muted)', marginBottom: '16px' }}>
              Source:{' '}
              <a
                href={item.sourceUrl}
                target="_blank"
                rel="noreferrer"
                style={{ color: '#818CF8', textDecoration: 'underline' }}
              >
                {item.siteName} ↗
              </a>
            </div>

            <div style={{ borderTop: '1px solid var(--border-subtle)', paddingTop: '16px', marginTop: '16px' }}>
              <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginBottom: '6px' }}>Tags</div>
              <div className="card-tags">
                {item.tags.map((t: string) => (
                  <span key={t} className="tag-pill">
                    #{t}
                  </span>
                ))}
              </div>
            </div>

            <div style={{ borderTop: '1px solid var(--border-subtle)', paddingTop: '16px', marginTop: '16px' }}>
              <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginBottom: '6px' }}>Reference ID</div>
              <code style={{ fontSize: '11px', color: '#CBD5E1', background: '#0B0F17', padding: '4px 8px', borderRadius: '4px', display: 'block', wordBreak: 'break-all' }}>
                {item.id}
              </code>
            </div>
          </div>

          {/* Agent Reference Box */}
          <div
            style={{
              background: 'linear-gradient(180deg, #131B2E 0%, #0F172A 100%)',
              border: '1px solid #312E81',
              borderRadius: 'var(--radius-lg)',
              padding: '20px',
            }}
          >
            <h4 style={{ fontSize: '14px', fontWeight: 600, color: '#C7D2FE', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span>🤖</span> Agent Quick Paste
            </h4>
            <p style={{ fontSize: '12px', color: '#94A3B8', lineHeight: 1.5, marginBottom: '14px' }}>
              Paste this command into your AI coding assistant (Cursor, Claude Desktop, or Antigravity) to replicate this reference:
            </p>
            <div
              style={{
                background: '#090D16',
                border: '1px solid #1E293B',
                borderRadius: '6px',
                padding: '12px',
                fontSize: '11px',
                color: '#CBD5E1',
                fontFamily: 'monospace',
                lineHeight: 1.5,
                wordBreak: 'break-word',
              }}
            >
              {createAgentReferencePrompt(item.id, item.title)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
