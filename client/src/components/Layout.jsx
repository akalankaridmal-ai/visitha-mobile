import React from 'react';
import Header from './Header';

const Layout = ({ children }) => {
  return (
    <div>
      <Header />
      <main style={{ minHeight: '80vh' }}>
        {children}
      </main>
      <footer className="bg-dark text-white text-center py-4 mt-5">
        <p>&copy; 2026 Visitha Mobile. All Rights Reserved.</p>
      </footer>
    </div>
  );
};

export default Layout;