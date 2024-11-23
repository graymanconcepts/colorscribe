import React, { useState } from 'react';
import { LayoutGrid, MessageSquare, Search, LogOut, User, Settings, ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';
import Gallery from '../components/Gallery';
import ToolPanel from '../components/ToolPanel';
import PromptPanel from '../components/PromptPanel';

const HomePage: React.FC = () => {
  const [viewMode, setViewMode] = useState<'grid' | 'chat'>('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [prompt, setPrompt] = useState('');
  const [selectedDimensions, setSelectedDimensions] = useState('1024x1024');
  const [selectedEngine, setSelectedEngine] = useState('stable-diffusion-xl');

  const handleLogout = () => {
    // TODO: Implement logout functionality
    console.log('Logging out...');
  };

  return (
    <div className="flex flex-col h-full">
      <nav className="h-16 border-b border-gray-800 flex items-center justify-between px-4 bg-gray-900">
        {/* Left side with search */}
        <div className="flex-1 flex items-center gap-4 max-w-4xl">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={viewMode === 'grid' ? "Search your images and prompts..." : "Search chat history..."}
              className="w-full pl-10 pr-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-gray-200 focus:outline-none focus:border-blue-500"
            />
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-lg ${viewMode === 'grid' ? 'bg-gray-800 text-blue-500' : 'text-gray-400 hover:bg-gray-800'}`}
              title="Gallery View"
            >
              <LayoutGrid className="h-5 w-5" />
            </button>
            <button
              onClick={() => setViewMode('chat')}
              className={`p-2 rounded-lg ${viewMode === 'chat' ? 'bg-gray-800 text-blue-500' : 'text-gray-400 hover:bg-gray-800'}`}
              title="AI Chat View"
            >
              <MessageSquare className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Right side with user menu */}
        <div className="relative ml-4">
          <button
            onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
            className="flex items-center gap-2 p-1 rounded-lg hover:bg-gray-800 text-gray-300 hover:text-white"
          >
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white font-medium">
              JD
            </div>
            <ChevronDown className="h-4 w-4" />
          </button>

          {isUserMenuOpen && (
            <div className="absolute right-0 mt-2 w-48 rounded-lg bg-gray-800 border border-gray-700 shadow-lg py-1 z-10">
              <div className="px-4 py-2 border-b border-gray-700">
                <p className="text-sm font-medium text-white">John Doe</p>
                <p className="text-xs text-gray-400">john.doe@example.com</p>
              </div>
              <Link
                to="/profile"
                className="flex items-center gap-2 px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white"
                onClick={() => setIsUserMenuOpen(false)}
              >
                <User className="h-4 w-4" />
                My Page
              </Link>
              <Link
                to="/settings"
                className="flex items-center gap-2 px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white"
                onClick={() => setIsUserMenuOpen(false)}
              >
                <Settings className="h-4 w-4" />
                Settings
              </Link>
              <button
                onClick={() => {
                  handleLogout();
                  setIsUserMenuOpen(false);
                }}
                className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-400 hover:bg-gray-700 hover:text-red-300"
              >
                <LogOut className="h-4 w-4" />
                Log Out
              </button>
            </div>
          )}
        </div>
      </nav>
      <div className="flex-1 flex overflow-hidden">
        <div className="flex-1 flex flex-col">
          <div className="flex-1 overflow-y-auto">
            <Gallery 
              viewMode={viewMode} 
              searchQuery={searchQuery} 
              onPromptChange={setPrompt}
              onDimensionsChange={setSelectedDimensions}
              onEngineChange={setSelectedEngine}
            />
          </div>
          <PromptPanel 
            viewMode={viewMode} 
            prompt={prompt}
            onPromptChange={setPrompt}
          />
        </div>
        <ToolPanel 
          viewMode={viewMode} 
          selectedDimensions={selectedDimensions}
          onDimensionsChange={setSelectedDimensions}
          selectedEngine={selectedEngine}
          onEngineChange={setSelectedEngine}
        />
      </div>
    </div>
  );
};

export default HomePage;