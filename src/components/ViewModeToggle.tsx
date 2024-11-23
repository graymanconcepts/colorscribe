import React from 'react';
import { LayoutGrid, MessageSquare } from 'lucide-react';

interface ViewModeToggleProps {
  viewMode: 'grid' | 'chat';
  onViewModeChange: (mode: 'grid' | 'chat') => void;
}

const ViewModeToggle: React.FC<ViewModeToggleProps> = ({ viewMode, onViewModeChange }) => {
  return (
    <div className="flex items-center gap-2">
      <button
        onClick={() => onViewModeChange('grid')}
        className={`p-2 rounded-lg ${viewMode === 'grid' ? 'bg-gray-800 text-blue-500' : 'text-gray-400 hover:bg-gray-800'}`}
        title="Gallery View"
      >
        <LayoutGrid className="h-5 w-5" />
      </button>
      <button
        onClick={() => onViewModeChange('chat')}
        className={`p-2 rounded-lg ${viewMode === 'chat' ? 'bg-gray-800 text-blue-500' : 'text-gray-400 hover:bg-gray-800'}`}
        title="AI Chat View"
      >
        <MessageSquare className="h-5 w-5" />
      </button>
    </div>
  );
};

export default ViewModeToggle;
