import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Home, Image, Library, CreditCard, User, Settings, Users } from 'lucide-react';
import Sidebar from './components/Sidebar';
import HomePage from './pages/HomePage';
import ExplorePage from './pages/ExplorePage';
import LibraryPage from './pages/LibraryPage';
import PaymentsPage from './pages/PaymentsPage';
import ProfilePage from './pages/ProfilePage';
import SettingsPage from './pages/SettingsPage';
import PartnersPage from './pages/PartnersPage';

function App() {
  const navItems = [
    { icon: Home, label: 'Home', path: '/' },
    { icon: Image, label: 'Explore', path: '/explore' },
    { icon: Library, label: 'Library', path: '/library' },
    { icon: CreditCard, label: 'Payments', path: '/payments' },
    { icon: User, label: 'My Page', path: '/profile' },
    { icon: Settings, label: 'Settings', path: '/settings' },
    { icon: Users, label: 'Partner Program', path: '/partners' },
  ];

  return (
    <Router>
      <div className="flex h-screen bg-gray-900">
        <Sidebar items={navItems} />
        <main className="flex-1 overflow-auto">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/explore" element={<ExplorePage />} />
            <Route path="/library" element={<LibraryPage />} />
            <Route path="/payments" element={<PaymentsPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/settings" element={<SettingsPage />} />
            <Route path="/partners" element={<PartnersPage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;