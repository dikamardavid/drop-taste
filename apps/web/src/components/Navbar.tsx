import React from 'react';

interface NavbarProps {
  currentTab: 'library' | 'connect';
  onTabChange: (tab: 'library' | 'connect') => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentTab, onTabChange }) => {
  return (
    <header className="navbar">
      <div className="container navbar-inner">
        <div className="nav-brand" style={{ cursor: 'pointer' }} onClick={() => onTabChange('library')}>
          <div className="brand-icon">DT</div>
          <div>
            <span>Drop Taste</span>
            <span style={{ fontSize: '11px', color: '#94A3B8', fontWeight: 400, marginLeft: '8px' }}>
              Design Intelligence
            </span>
          </div>
        </div>

        <nav className="nav-links">
          <button
            className={`nav-tab ${currentTab === 'library' ? 'active' : ''}`}
            onClick={() => onTabChange('library')}
          >
            Taste Library
          </button>
          <button
            className={`nav-tab ${currentTab === 'connect' ? 'active' : ''}`}
            onClick={() => onTabChange('connect')}
          >
            Connect (MCP & Agents)
          </button>
        </nav>
      </div>
    </header>
  );
};
