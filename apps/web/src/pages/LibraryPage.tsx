import React, { useState, useEffect } from 'react';
import { CaptureDetailModal } from '../components/CaptureDetailModal.js';

export interface CaptureSummary {
  id: string;
  type: 'page' | 'component' | 'image';
  title: string;
  sourceUrl: string;
  siteName: string;
  category: string;
  tags: string[];
  dimensions: { width: number; height: number };
  thumbnailUrl?: string;
  assetUrl?: string;
  createdAt: string;
}

export const LibraryPage: React.FC = () => {
  const [items, setItems] = useState<CaptureSummary[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedType, setSelectedType] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeModalItemId, setActiveModalItemId] = useState<string | null>(null);

  const fetchItems = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (selectedType !== 'all') params.append('type', selectedType);
      if (searchQuery.trim()) params.append('search', searchQuery.trim());

      const res = await fetch(`/api/v1/library?${params.toString()}`);
      if (res.ok) {
        const json = await res.json();
        setItems(json.data || []);
      }
    } catch (err) {
      console.error('Failed to fetch library items:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, [selectedType, searchQuery]);

  return (
    <div className="container" style={{ paddingBottom: '60px' }}>
      {/* Top Header & Search Bar */}
      <div style={{ marginTop: '32px', marginBottom: '24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <h1 style={{ fontSize: '24px', fontWeight: 700, letterSpacing: '-0.02em', marginBottom: '6px' }}>
              Taste Library
            </h1>
            <p style={{ color: 'var(--text-muted)', fontSize: '13px' }}>
              Curated web captures ready for Figma pasting or AI coding agent reference.
            </p>
          </div>

          <div style={{ display: 'flex', gap: '10px' }}>
            <input
              type="text"
              placeholder="Search references, tags, or domains..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                background: 'var(--bg-surface)',
                border: '1px solid var(--border-subtle)',
                color: '#fff',
                padding: '8px 14px',
                borderRadius: '6px',
                fontSize: '13px',
                minWidth: '280px',
              }}
            />
          </div>
        </div>

        {/* Filter Tabs */}
        <div style={{ display: 'flex', gap: '8px', marginTop: '20px' }}>
          {[
            { id: 'all', label: 'All Items' },
            { id: 'page', label: '📄 Pages' },
            { id: 'component', label: '🧩 Components' },
            { id: 'image', label: '🖼️ Image References' },
          ].map((tab) => (
            <button
              key={tab.id}
              className={`nav-tab ${selectedType === tab.id ? 'active' : ''}`}
              onClick={() => setSelectedType(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Grid or Empty State */}
      {loading ? (
        <div style={{ padding: '60px 0', textAlign: 'center', color: 'var(--text-muted)' }}>
          Loading your taste references...
        </div>
      ) : items.length === 0 ? (
        <div
          style={{
            background: 'var(--bg-surface)',
            border: '1px dashed var(--border-subtle)',
            borderRadius: '12px',
            padding: '48px 24px',
            textAlign: 'center',
            marginTop: '32px',
          }}
        >
          <div style={{ fontSize: '36px', marginBottom: '12px' }}>🌐</div>
          <h3 style={{ fontSize: '16px', fontWeight: 600, marginBottom: '6px' }}>
            No references captured yet
          </h3>
          <p style={{ color: 'var(--text-muted)', fontSize: '13px', maxWidth: '420px', margin: '0 auto 18px auto' }}>
            Use the Drop Taste Chrome extension on any website to capture full pages, component containers, or image assets.
          </p>
        </div>
      ) : (
        <div className="bento-grid">
          {items.map((item) => (
            <div key={item.id} className="card" onClick={() => setActiveModalItemId(item.id)}>
              <div className="card-preview">
                <span className={`card-badge ${item.type}`}>
                  {item.type === 'page' ? 'Page' : item.type === 'component' ? 'Component' : 'Image Reference'}
                </span>
                {item.assetUrl ? (
                  <img
                    src={item.assetUrl}
                    alt={item.title}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                ) : (
                  <div style={{ textAlign: 'center', color: '#64748B', padding: '16px' }}>
                    <div style={{ fontSize: '28px', marginBottom: '8px' }}>
                      {item.type === 'page' ? '📄' : '🧩'}
                    </div>
                    <div style={{ fontSize: '11px', fontFamily: 'monospace' }}>
                      {item.dimensions?.width} × {item.dimensions?.height}px
                    </div>
                  </div>
                )}
              </div>

              <div className="card-body">
                <h3 className="card-title">{item.title}</h3>
                <div className="card-meta">
                  <span>{item.siteName}</span>
                  <span>•</span>
                  <span>{item.category}</span>
                </div>
                <div className="card-tags">
                  {item.tags.slice(0, 3).map((tag) => (
                    <span key={tag} className="tag-pill">
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Full Screen Detail Modal with Left/Right Navigation */}
      {activeModalItemId && (
        <CaptureDetailModal
          itemId={activeModalItemId}
          allItems={items.map((it) => ({ id: it.id, title: it.title }))}
          onClose={() => setActiveModalItemId(null)}
          onNavigateItem={(nextId) => setActiveModalItemId(nextId)}
        />
      )}
    </div>
  );
};
