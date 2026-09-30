import React, { useState } from 'react';
import { Navbar } from './components/Navbar.js';
import { LandingPage } from './pages/LandingPage.js';
import { AuthPage } from './pages/AuthPage.js';
import { LibraryPage } from './pages/LibraryPage.js';
import { ConnectPage } from './pages/ConnectPage.js';
import { AccountPage } from './pages/AccountPage.js';

export const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<string>('landing');
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(true); // default true for instant dev access

  const handleNavigate = (page: string) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAuthSuccess = () => {
    setIsAuthenticated(true);
    setCurrentPage('library');
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setCurrentPage('landing');
  };

  return (
    <div>
      <Navbar
        currentTab={currentPage}
        isAuthenticated={isAuthenticated}
        onTabChange={handleNavigate}
        onLogout={handleLogout}
      />
      <main>
        {currentPage === 'landing' && <LandingPage onNavigate={handleNavigate} />}
        {currentPage === 'auth' && <AuthPage onSuccess={handleAuthSuccess} />}
        {currentPage === 'library' && <LibraryPage />}
        {currentPage === 'connect' && <ConnectPage />}
        {currentPage === 'account' && <AccountPage onLogout={handleLogout} />}
      </main>
    </div>
  );
};
