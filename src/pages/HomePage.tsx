import React, { useState } from 'react';
import { LayoutGrid, MessageSquare, Plus, Search } from 'lucide-react';
import Gallery from '../components/Gallery';
import ToolPanel from '../components/ToolPanel';

const HomePage: React.FC = () => {
  const [viewMode, setViewMode] = useState<'grid' | 'chat'>('grid');

  return (
    <div className="flex flex-col h-full">
      <nav className="h-16 border-b border-gray-800 flex items-center px-4 bg-gray-900">
        <div className="flex-1 flex items-center gap-4">
          <div className="relative flex-1 max-w-2xl">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
            <input
              type="text"
              placeholder="Search images..."
              className="w-full pl-10 pr-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-gray-200 focus:outline-none focus:border-blue-500"
            />
          </div>
          <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg flex items-center gap-2">
            <Plus className="h-4 w-4" />
            Create Image
          </button>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-lg ${viewMode === 'grid' ? 'bg-gray-800 text-blue-500' : 'text-gray-400 hover:bg-gray-800'}`}
            >
              <LayoutGrid className="h-5 w-5" />
            </button>
            <button
              onClick={() => setViewMode('chat')}
              className={`p-2 rounded-lg ${viewMode === 'chat' ? 'bg-gray-800 text-blue-500' : 'text-gray-400 hover:bg-gray-800'}`}
            >
              <MessageSquare className="h-5 w-5" />
            </button>
          </div>
        </div>
      </nav>
      <div className="flex-1 flex overflow-hidden">
        <Gallery viewMode={viewMode} />
        <ToolPanel />
      </div>
    </div>
  );
};

export default HomePage;