import React from 'react';

interface NavbarProps {
  currentTab: string;
  isAuthenticated: boolean;
  onTabChange: (tab: string) => void;
  onLogout: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  isAuthenticated,
  onTabChange,
  onLogout,
}) => {
  return (
    <header className="navbar">
      <div className="container navbar-inner">
        <div
          className="nav-brand"
          style={{ cursor: 'pointer' }}
          onClick={() => onTabChange(isAuthenticated ? 'library' : 'landing')}
        >
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
            className={`nav-tab ${currentTab === 'landing' ? 'active' : ''}`}
            onClick={() => onTabChange('landing')}
          >
            Overview
          </button>
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
            Connect MCP
          </button>

          {isAuthenticated ? (
            <>
              <button
                className={`nav-tab ${currentTab === 'account' ? 'active' : ''}`}
                onClick={() => onTabChange('account')}
              >
                Account
              </button>
              <button
                className="btn-secondary"
                style={{ padding: '6px 12px', fontSize: '12px' }}
                onClick={onLogout}
              >
                Sign Out
              </button>
            </>
          ) : (
            <button
              className="btn-primary"
              style={{ padding: '6px 14px', fontSize: '12px' }}
              onClick={() => onTabChange('auth')}
            >
              Sign In / Sign Up
            </button>
          )}
        </nav>
      </div>
    </header>
  );
};
