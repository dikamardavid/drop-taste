import React, { useState } from 'react';
import { Navbar } from './components/Navbar.js';
import { LibraryPage } from './pages/LibraryPage.js';
import { DetailPage } from './pages/DetailPage.js';
import { ConnectPage } from './pages/ConnectPage.js';

export const App: React.FC = () => {
  const [currentTab, setCurrentTab] = useState<'library' | 'connect'>('library');
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null);

  const handleSelectItem = (id: string) => {
    setSelectedItemId(id);
  };

  const handleBackToLibrary = () => {
    setSelectedItemId(null);
  };

  const handleTabChange = (tab: 'library' | 'connect') => {
    setCurrentTab(tab);
    setSelectedItemId(null);
  };

  return (
    <div>
      <Navbar currentTab={currentTab} onTabChange={handleTabChange} />
      <main>
        {currentTab === 'connect' ? (
          <ConnectPage />
        ) : selectedItemId ? (
          <DetailPage itemId={selectedItemId} onBack={handleBackToLibrary} />
        ) : (
          <LibraryPage onSelectItem={handleSelectItem} />
        )}
      </main>
    </div>
  );
};
