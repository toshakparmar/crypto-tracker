import React from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { CryptoProvider } from './context/CryptoContext';
import Header from './components/Header';
import SearchFilter from './components/SearchFilter';
import CryptoGrid from './components/CryptoGrid';

function App() {
  return (
    <ThemeProvider>
      <CryptoProvider>
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
          <Header />
          <SearchFilter />
          <CryptoGrid />
        </div>
      </CryptoProvider>
    </ThemeProvider>
  );
}

export default App;
