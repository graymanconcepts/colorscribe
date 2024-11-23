import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import UserMenu from './UserMenu';

const Layout: React.FC = () => {
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  const handleLogout = () => {
    // TODO: Implement actual logout logic
    console.log('Logging out...');
  };

  return (
    <div className="flex flex-col h-screen bg-gray-900">
      <nav className="border-b border-gray-800 bg-gray-900">
        <div className="w-full px-4">
          <div className="flex items-center justify-end h-16">
            <UserMenu
              isOpen={isUserMenuOpen}
              onToggle={() => setIsUserMenuOpen(!isUserMenuOpen)}
              onLogout={handleLogout}
            />
          </div>
        </div>
      </nav>

      <div className="flex-1 overflow-hidden">
        <Outlet />
      </div>

      <Toaster
        position="bottom-right"
        toastOptions={{
          duration: 3000,
          style: {
            background: '#1f2937',
            color: '#fff',
            borderRadius: '8px',
            border: '1px solid #374151',
          },
        }}
      />
    </div>
  );
};

export default Layout;
