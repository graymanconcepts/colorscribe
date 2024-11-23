import React from 'react';
import { LucideIcon, Palette } from 'lucide-react';
import { NavLink } from 'react-router-dom';

interface SidebarProps {
  items: {
    icon: LucideIcon;
    label: string;
    path: string;
  }[];
}

const Sidebar: React.FC<SidebarProps> = ({ items }) => {
  return (
    <aside className="w-16 lg:w-64 bg-gray-900 border-r border-gray-800">
      <div className="p-4">
        <NavLink to="/" className="flex items-center gap-3">
          <div className="flex items-center justify-center h-8 w-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg">
            <Palette className="h-5 w-5 text-white" />
          </div>
          <span className="hidden lg:block text-lg font-semibold text-white">ColorScribe</span>
        </NavLink>
      </div>
      <nav className="mt-8">
        {items.map((item, index) => (
          <NavLink
            key={index}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 text-gray-400 hover:text-white hover:bg-gray-800 ${
                isActive ? 'bg-gray-800 text-white' : ''
              }`
            }
          >
            <item.icon className="h-5 w-5" />
            <span className="hidden lg:block">{item.label}</span>
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}

export default Sidebar;