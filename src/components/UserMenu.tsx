import React from 'react';
import { LogOut, User, Settings, ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';

interface UserMenuProps {
  isOpen: boolean;
  onToggle: () => void;
  onLogout: () => void;
}

const UserMenu: React.FC<UserMenuProps> = ({ isOpen, onToggle, onLogout }) => {
  return (
    <div className="relative">
      <button
        onClick={onToggle}
        className="flex items-center gap-2 p-1 rounded-lg hover:bg-gray-800 text-gray-300 hover:text-white"
      >
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white font-medium">
          JD
        </div>
        <ChevronDown className="h-4 w-4" />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 rounded-lg bg-gray-800 border border-gray-700 shadow-lg py-1 z-10">
          <div className="px-4 py-2 border-b border-gray-700">
            <p className="text-sm font-medium text-white">John Doe</p>
            <p className="text-xs text-gray-400">john.doe@example.com</p>
          </div>
          <Link
            to="/profile"
            className="flex items-center gap-2 px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white"
            onClick={onToggle}
          >
            <User className="h-4 w-4" />
            My Page
          </Link>
          <Link
            to="/settings"
            className="flex items-center gap-2 px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white"
            onClick={onToggle}
          >
            <Settings className="h-4 w-4" />
            Settings
          </Link>
          <button
            onClick={() => {
              onLogout();
              onToggle();
            }}
            className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-400 hover:bg-gray-700 hover:text-red-300"
          >
            <LogOut className="h-4 w-4" />
            Log Out
          </button>
        </div>
      )}
    </div>
  );
};

export default UserMenu;
