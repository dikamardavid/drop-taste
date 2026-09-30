import React from 'react';

interface LandingPageProps {
  onNavigate: (page: string) => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onNavigate }) => {
  return (
    <div style={{ paddingBottom: '100px' }}>
      {/* 1. Hero Section */}
      <section style={{ padding: '80px 0 60px 0', textAlign: 'center' }}>
        <div className="container" style={{ maxWidth: '860px' }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '6px 14px',
              borderRadius: '9999px',
              background: 'rgba(99, 102, 241, 0.1)',
              border: '1px solid #6366F1',
              color: '#A5B4FC',
              fontSize: '12px',
              fontWeight: 600,
              marginBottom: '24px',
            }}
          >
            <span>✨</span> Next-Gen Agentic Design Intelligence
          </div>

          <h1
            style={{
              fontSize: '48px',
              fontWeight: 800,
              letterSpacing: '-0.03em',
              lineHeight: 1.15,
              marginBottom: '20px',
              background: 'linear-gradient(180deg, #FFFFFF 0%, #94A3B8 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            Curate Web Taste into Figma & AI Coding Agents
          </h1>

          <p
            style={{
              fontSize: '17px',
              color: 'var(--text-muted)',
              lineHeight: 1.6,
              maxWidth: '680px',
              margin: '0 auto 32px auto',
            }}
          >
            Capture full web pages, auto-layout components, and visual references directly from your browser.
            Paste editable vectors into Figma or let AI coding agents replicate aesthetics with canonical design tokens.
          </p>

          <div style={{ display: 'flex', justifyContent: 'center', gap: '14px', flexWrap: 'wrap' }}>
            <a
              href="#download"
              className="btn-primary"
              style={{ padding: '14px 24px', fontSize: '15px' }}
              onClick={(e) => {
                e.preventDefault();
                alert('Drop Taste Chrome Extension v1.0.0 is ready in apps/extension/dist. Load unpacked in chrome://extensions!');
              }}
            >
              <span>📥</span> Download Chrome Extension
            </a>
            <button
              className="btn-secondary"
              style={{ padding: '14px 24px', fontSize: '15px' }}
              onClick={() => onNavigate('library')}
            >
              Explore Taste Library ↗
            </button>
          </div>
        </div>
      </section>

      {/* Hero Visual Mockup Preview */}
      <section className="container" style={{ maxWidth: '1040px', marginBottom: '80px' }}>
        <div
          style={{
            background: 'var(--bg-surface)',
            border: '1px solid var(--border-subtle)',
            borderRadius: '16px',
            padding: '16px',
            boxShadow: '0 24px 60px rgba(0,0,0,0.6)',
          }}
        >
          <div
            style={{
              background: '#040711',
              borderRadius: '10px',
              padding: '24px',
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '16px',
            }}
          >
            <div style={{ background: '#0D1424', padding: '16px', borderRadius: '8px', border: '1px solid #1E293B' }}>
              <div style={{ fontSize: '11px', color: '#60A5FA', fontWeight: 600, marginBottom: '6px' }}>📄 PAGE CAPTURE</div>
              <div style={{ fontSize: '13px', fontWeight: 600, color: '#F8FAFC' }}>Full-Page DOM Scans</div>
              <div style={{ fontSize: '11px', color: '#94A3B8', marginTop: '4px' }}>Paste Cmd+V into Figma as full editable artboard.</div>
            </div>
            <div style={{ background: '#0D1424', padding: '16px', borderRadius: '8px', border: '1px solid #1E293B' }}>
              <div style={{ fontSize: '11px', color: '#34D399', fontWeight: 600, marginBottom: '6px' }}>🧩 COMPONENT</div>
              <div style={{ fontSize: '13px', fontWeight: 600, color: '#F8FAFC' }}>Hover Flexbox & Divs</div>
              <div style={{ fontSize: '11px', color: '#94A3B8', marginTop: '4px' }}>Extracted as native Figma Auto-Layout frames.</div>
            </div>
            <div style={{ background: '#0D1424', padding: '16px', borderRadius: '8px', border: '1px solid #1E293B' }}>
              <div style={{ fontSize: '11px', color: '#F472B6', fontWeight: 600, marginBottom: '6px' }}>🖼️ IMAGE REFERENCE</div>
              <div style={{ fontSize: '13px', fontWeight: 600, color: '#F8FAFC' }}>Vision AI $\rightarrow$ design.md</div>
              <div style={{ fontSize: '11px', color: '#94A3B8', marginTop: '4px' }}>Reference prompts for Claude Desktop & Cursor.</div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. How It Works Section */}
      <section style={{ padding: '60px 0', borderTop: '1px solid var(--border-subtle)', borderBottom: '1px solid var(--border-subtle)', background: 'rgba(17, 24, 39, 0.4)' }}>
        <div className="container" style={{ maxWidth: '960px' }}>
          <div style={{ textAlign: 'center', marginBottom: '48px' }}>
            <h2 style={{ fontSize: '28px', fontWeight: 700, letterSpacing: '-0.02em', marginBottom: '10px' }}>
              How Drop Taste Works
            </h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '14px' }}>
              From web inspiration to design canvas and coding agent in 3 seamless steps.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '28px' }}>
            <div style={{ background: 'var(--bg-surface)', padding: '24px', borderRadius: '12px', border: '1px solid var(--border-subtle)' }}>
              <div style={{ fontSize: '32px', marginBottom: '14px' }}>1️⃣</div>
              <h3 style={{ fontSize: '16px', fontWeight: 600, marginBottom: '8px' }}>Capture from Web</h3>
              <p style={{ fontSize: '13px', color: 'var(--text-muted)', lineHeight: 1.5 }}>
                Use the Chrome Extension hover inspector or full-page scanner to save any webpage, component, or image reference.
              </p>
            </div>
            <div style={{ background: 'var(--bg-surface)', padding: '24px', borderRadius: '12px', border: '1px solid var(--border-subtle)' }}>
              <div style={{ fontSize: '32px', marginBottom: '14px' }}>2️⃣</div>
              <h3 style={{ fontSize: '16px', fontWeight: 600, marginBottom: '8px' }}>Cloud AI Synthesis</h3>
              <p style={{ fontSize: '13px', color: 'var(--text-muted)', lineHeight: 1.5 }}>
                Drop Taste Cloud automatically normalizes layout ASTs and runs Vision AI to extract tokens and generate canonical <code>design.md</code>.
              </p>
            </div>
            <div style={{ background: 'var(--bg-surface)', padding: '24px', borderRadius: '12px', border: '1px solid var(--border-subtle)' }}>
              <div style={{ fontSize: '32px', marginBottom: '14px' }}>3️⃣</div>
              <h3 style={{ fontSize: '16px', fontWeight: 600, marginBottom: '8px' }}>Figma & Agent Paste</h3>
              <p style={{ fontSize: '13px', color: 'var(--text-muted)', lineHeight: 1.5 }}>
                Copy directly into Figma with <code>Cmd+V</code> as auto-layout frames, or pass reference prompts to your AI coding agents via MCP.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Pricing Section */}
      <section style={{ padding: '80px 0' }}>
        <div className="container" style={{ maxWidth: '860px' }}>
          <div style={{ textAlign: 'center', marginBottom: '48px' }}>
            <h2 style={{ fontSize: '28px', fontWeight: 700, letterSpacing: '-0.02em', marginBottom: '10px' }}>
              Simple, Transparent Pricing
            </h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '14px' }}>
              Start for free, upgrade when your team needs unlimited cloud blending.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '28px' }}>
            {/* Free Tier */}
            <div
              style={{
                background: 'var(--bg-surface)',
                border: '1px solid var(--border-subtle)',
                borderRadius: '16px',
                padding: '32px',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <h3 style={{ fontSize: '18px', fontWeight: 600, marginBottom: '6px' }}>Starter</h3>
              <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginBottom: '20px' }}>For individual designers & developers.</p>
              <div style={{ fontSize: '36px', fontWeight: 800, marginBottom: '20px' }}>
                $0 <span style={{ fontSize: '14px', fontWeight: 400, color: 'var(--text-muted)' }}>/ month</span>
              </div>
              <ul style={{ listStyle: 'none', fontSize: '13px', color: '#D1D5DB', display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '28px', flex: 1 }}>
                <li>✓ 50 Cloud Captures / month</li>
                <li>✓ Full Page & Component Ingestion</li>
                <li>✓ Copy to Figma (Cmd+V Auto-Layout)</li>
                <li>✓ Model Context Protocol (MCP) Access</li>
                <li>✓ 5 Vision AI Image Syntheses</li>
              </ul>
              <button className="btn-secondary" style={{ width: '100%', justifyContent: 'center' }} onClick={() => onNavigate('auth')}>
                Get Started Free
              </button>
            </div>

            {/* Pro Tier */}
            <div
              style={{
                background: 'linear-gradient(180deg, #131B2E 0%, #111827 100%)',
                border: '1px solid #6366F1',
                borderRadius: '16px',
                padding: '32px',
                display: 'flex',
                flexDirection: 'column',
                position: 'relative',
              }}
            >
              <div
                style={{
                  position: 'absolute',
                  top: '-12px',
                  right: '24px',
                  background: 'linear-gradient(135deg, #6366F1, #8B5CF6)',
                  color: '#fff',
                  fontSize: '11px',
                  fontWeight: 700,
                  padding: '4px 10px',
                  borderRadius: '9999px',
                }}
              >
                RECOMMENDED
              </div>
              <h3 style={{ fontSize: '18px', fontWeight: 600, marginBottom: '6px' }}>Pro Designer</h3>
              <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginBottom: '20px' }}>For power creators & product teams.</p>
              <div style={{ fontSize: '36px', fontWeight: 800, marginBottom: '20px' }}>
                $19 <span style={{ fontSize: '14px', fontWeight: 400, color: 'var(--text-muted)' }}>/ month</span>
              </div>
              <ul style={{ listStyle: 'none', fontSize: '13px', color: '#D1D5DB', display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '28px', flex: 1 }}>
                <li>✓ Unlimited Cloud Captures</li>
                <li>✓ Unlimited Vision AI Image Syntheses</li>
                <li>✓ Multi-Reference Agent Blending</li>
                <li>✓ Local Agent Runtime Figma Blend Loop</li>
                <li>✓ Real-Time Agent Audit & Instant Revocation</li>
                <li>✓ Priority High-Bandwidth Ingestion</li>
              </ul>
              <button className="btn-primary" style={{ width: '100%', justifyContent: 'center' }} onClick={() => onNavigate('account')}>
                Upgrade to Pro
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Final CTA Download Extension Section */}
      <section id="download" style={{ textAlign: 'center', padding: '60px 0' }}>
        <div className="container" style={{ maxWidth: '640px' }}>
          <h2 style={{ fontSize: '32px', fontWeight: 700, letterSpacing: '-0.02em', marginBottom: '14px' }}>
            Ready to Supercharge Your Taste Workflow?
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '14px', marginBottom: '28px' }}>
            Install the Drop Taste Chrome extension now and capture your first reference in seconds.
          </p>
          <button
            className="btn-primary"
            style={{ padding: '14px 28px', fontSize: '15px' }}
            onClick={() => alert('Extension build ready in apps/extension/dist. Load unpacked in chrome://extensions!')}
          >
            <span>🧩</span> Add Drop Taste to Chrome
          </button>
        </div>
      </section>
    </div>
  );
};
