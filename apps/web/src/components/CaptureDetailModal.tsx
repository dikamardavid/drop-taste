import React, { useState, useEffect } from 'react';
import { createAgentReferencePrompt } from '@drop-taste/shared';

interface CaptureDetailModalProps {
  itemId: string;
  allItems: Array<{ id: string; title: string }>;
  onClose: () => void;
  onNavigateItem: (nextId: string) => void;
}

export const CaptureDetailModal: React.FC<CaptureDetailModalProps> = ({
  itemId,
  allItems,
  onClose,
  onNavigateItem,
}) => {
  const [item, setItem] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [copiedState, setCopiedState] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'overview' | 'design_md' | 'dom'>('overview');

  const currentIndex = allItems.findIndex((it) => it.id === itemId);
  const hasPrev = currentIndex > 0;
  const hasNext = currentIndex >= 0 && currentIndex < allItems.length - 1;

  const handlePrev = () => {
    if (hasPrev) {
      onNavigateItem(allItems[currentIndex - 1].id);
    }
  };

  const handleNext = () => {
    if (hasNext) {
      onNavigateItem(allItems[currentIndex + 1].id);
    }
  };

  useEffect(() => {
    async function loadItem() {
      setLoading(true);
      try {
        const res = await fetch(`/api/v1/library/${itemId}`);
        if (res.ok) {
          const json = await res.json();
          setItem(json.data);
          if (json.data.type === 'image') {
            setActiveTab('design_md');
          } else {
            setActiveTab('overview');
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

  // Keyboard navigation: Escape to close, Left/Right arrow to cycle items
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft' && hasPrev) handlePrev();
      if (e.key === 'ArrowRight' && hasNext) handleNext();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [hasPrev, hasNext, currentIndex]);

  const handleCopyToFigma = async () => {
    if (!item?.figmaPayload) return;

    try {
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
      console.error('Failed to copy agent prompt:', err);
    }
  };

  const isImageCapture = item?.type === 'image';

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(3, 7, 18, 0.88)',
        backdropFilter: 'blur(8px)',
        zIndex: 100,
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Top Action Bar of Full-Screen Modal */}
      <div
        style={{
          height: '60px',
          borderBottom: '1px solid var(--border-subtle)',
          background: 'rgba(9, 13, 22, 0.95)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 24px',
        }}
      >
        {/* Navigation Arrows & Counter */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <button
            className="btn-secondary"
            style={{ padding: '6px 12px', fontSize: '12px', opacity: hasPrev ? 1 : 0.4, cursor: hasPrev ? 'pointer' : 'not-allowed' }}
            onClick={handlePrev}
            disabled={!hasPrev}
            title="Previous Reference (Left Arrow)"
          >
            ← Prev
          </button>
          <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
            {currentIndex >= 0 ? `${currentIndex + 1} of ${allItems.length}` : ''}
          </span>
          <button
            className="btn-secondary"
            style={{ padding: '6px 12px', fontSize: '12px', opacity: hasNext ? 1 : 0.4, cursor: hasNext ? 'pointer' : 'not-allowed' }}
            onClick={handleNext}
            disabled={!hasNext}
            title="Next Reference (Right Arrow)"
          >
            Next →
          </button>
        </div>

        {/* Primary Action Button (Copy to Figma OR Reference with Agent) */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          {item && !isImageCapture && (
            <button
              className={`btn-primary ${copiedState === 'figma' ? 'btn-success' : ''}`}
              onClick={handleCopyToFigma}
            >
              <span>{copiedState === 'figma' ? '✅ Copied!' : '📋 Copy to Figma'}</span>
              <span style={{ fontSize: '11px', opacity: 0.85 }}>
                {copiedState === 'figma' ? '(Paste Cmd+V in Figma)' : '(Cmd+V Auto-Layout)'}
              </span>
            </button>
          )}

          {item && isImageCapture && (
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

          {/* Close Modal Button */}
          <button
            onClick={onClose}
            style={{
              background: 'transparent',
              border: '1px solid var(--border-subtle)',
              color: '#F8FAFC',
              borderRadius: '6px',
              padding: '6px 12px',
              fontSize: '14px',
              cursor: 'pointer',
            }}
            title="Close Modal (Esc)"
          >
            ✕
          </button>
        </div>
      </div>

      {/* Main Split Body: Left (Preview) & Right (Detail Fields) */}
      <div
        style={{
          flex: 1,
          display: 'grid',
          gridTemplateColumns: 'minmax(0, 1.8fr) minmax(340px, 1fr)',
          overflow: 'hidden',
        }}
      >
        {/* Left Side: Preview & Viewer */}
        <div
          style={{
            borderRight: '1px solid var(--border-subtle)',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
          }}
        >
          {/* Subtabs */}
          <div style={{ display: 'flex', gap: '8px', padding: '12px 24px', borderBottom: '1px solid var(--border-subtle)', background: 'rgba(15, 23, 42, 0.4)' }}>
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

          <div style={{ flex: 1, overflowY: 'auto', padding: '24px', display: 'flex', justifyContent: 'center' }}>
            {loading ? (
              <div style={{ margin: 'auto', color: 'var(--text-muted)' }}>Loading capture content...</div>
            ) : activeTab === 'overview' ? (
              item?.assetUrl ? (
                <img
                  src={item.assetUrl}
                  alt={item.title}
                  style={{ maxWidth: '100%', maxHeight: 'calc(100vh - 160px)', objectFit: 'contain', borderRadius: '8px' }}
                />
              ) : (
                <div style={{ width: '100%', height: '100%', background: '#030712', borderRadius: '8px', padding: '24px' }}>
                  <div style={{ fontSize: '13px', color: '#94A3B8', marginBottom: '12px' }}>
                    DOM Render Frame ({item?.dimensions?.width} × {item?.dimensions?.height}px):
                  </div>
                  <div dangerouslySetInnerHTML={{ __html: item?.domHtml || '<p>No preview DOM</p>' }} />
                </div>
              )
            ) : activeTab === 'design_md' ? (
              <div style={{ width: '100%', maxWidth: '800px' }}>
                <pre
                  style={{
                    background: '#040711',
                    border: '1px solid var(--border-subtle)',
                    padding: '20px',
                    borderRadius: '8px',
                    fontSize: '12px',
                    lineHeight: '1.6',
                    whiteSpace: 'pre-wrap',
                    color: '#E2E8F0',
                  }}
                >
                  {item?.designMd || '// No design.md generated'}
                </pre>
              </div>
            ) : (
              <div style={{ width: '100%' }}>
                <pre
                  style={{
                    background: '#040711',
                    border: '1px solid var(--border-subtle)',
                    padding: '20px',
                    borderRadius: '8px',
                    fontSize: '12px',
                    color: '#94A3B8',
                    whiteSpace: 'pre-wrap',
                  }}
                >
                  {item?.domHtml || '// No HTML source'}
                </pre>
              </div>
            )}
          </div>
        </div>

        {/* Right Side: Detail Fields captured from extension */}
        <div style={{ background: 'var(--bg-surface)', padding: '28px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {loading ? (
            <div style={{ color: 'var(--text-muted)' }}>Loading metadata...</div>
          ) : item ? (
            <>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
                  <span className={`card-badge ${item.type}`}>
                    {item.type === 'page' ? 'Page Capture' : item.type === 'component' ? 'Component' : 'Image Reference'}
                  </span>
                  <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
                    {item.dimensions?.width} × {item.dimensions?.height}px
                  </span>
                </div>
                <h2 style={{ fontSize: '20px', fontWeight: 700, lineHeight: 1.3, marginBottom: '6px' }}>
                  {item.title}
                </h2>
                <div style={{ fontSize: '13px', color: 'var(--text-muted)' }}>
                  Source:{' '}
                  <a href={item.sourceUrl} target="_blank" rel="noreferrer" style={{ color: '#818CF8', textDecoration: 'underline' }}>
                    {item.siteName} ↗
                  </a>
                </div>
              </div>

              <div style={{ borderTop: '1px solid var(--border-subtle)', paddingTop: '16px' }}>
                <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginBottom: '4px' }}>Category</div>
                <div style={{ fontSize: '14px', fontWeight: 500 }}>{item.category}</div>
              </div>

              <div style={{ borderTop: '1px solid var(--border-subtle)', paddingTop: '16px' }}>
                <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginBottom: '8px' }}>Tags</div>
                <div className="card-tags">
                  {item.tags?.map((t: string) => (
                    <span key={t} className="tag-pill">
                      #{t}
                    </span>
                  ))}
                </div>
              </div>

              <div style={{ borderTop: '1px solid var(--border-subtle)', paddingTop: '16px' }}>
                <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginBottom: '4px' }}>Captured At</div>
                <div style={{ fontSize: '12px', color: '#CBD5E1' }}>
                  {new Date(item.createdAt).toLocaleString()}
                </div>
              </div>

              {/* Agent Reference Box */}
              <div
                style={{
                  marginTop: 'auto',
                  background: 'linear-gradient(180deg, #131B2E 0%, #0F172A 100%)',
                  border: '1px solid #312E81',
                  borderRadius: '12px',
                  padding: '16px',
                }}
              >
                <div style={{ fontSize: '13px', fontWeight: 600, color: '#C7D2FE', marginBottom: '6px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <span>🤖</span> Agent Reference Command
                </div>
                <p style={{ fontSize: '11px', color: '#94A3B8', marginBottom: '10px', lineHeight: 1.4 }}>
                  Use this safe prompt snippet with your AI coding assistant:
                </p>
                <div
                  style={{
                    background: '#090D16',
                    border: '1px solid #1E293B',
                    borderRadius: '6px',
                    padding: '10px',
                    fontSize: '11px',
                    fontFamily: 'monospace',
                    color: '#CBD5E1',
                    wordBreak: 'break-word',
                  }}
                >
                  {createAgentReferencePrompt(item.id, item.title)}
                </div>
              </div>
            </>
          ) : null}
        </div>
      </div>
    </div>
  );
};
