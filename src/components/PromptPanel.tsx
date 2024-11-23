import React from 'react';
import { Wand2 } from 'lucide-react';

interface PromptPanelProps {
  viewMode: 'grid' | 'chat';
  prompt: string;
  onPromptChange: (prompt: string) => void;
  onGenerate: () => void;
  isGenerating: boolean;
}

const PromptPanel: React.FC<PromptPanelProps> = ({ 
  viewMode, 
  prompt, 
  onPromptChange,
  onGenerate,
  isGenerating 
}) => {
  return (
    <div className={`border-t border-gray-800 bg-gray-900 p-4 ${viewMode === 'chat' ? 'hidden' : ''}`}>
      <div className="flex gap-4">
        <div className="flex-1">
          <input
            type="text"
            value={prompt}
            onChange={(e) => onPromptChange(e.target.value)}
            placeholder="Enter your prompt here..."
            className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-gray-200 focus:outline-none focus:border-blue-500"
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !isGenerating) {
                onGenerate();
              }
            }}
          />
        </div>
        <button
          onClick={onGenerate}
          disabled={isGenerating}
          className={`px-6 py-2 rounded-lg font-medium transition-colors
            ${isGenerating 
              ? 'bg-blue-600/50 text-blue-300 cursor-not-allowed'
              : 'bg-blue-600 text-white hover:bg-blue-500'
            }`}
        >
          {isGenerating ? (
            <div className="flex items-center gap-2">
              <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                <circle 
                  className="opacity-25" 
                  cx="12" 
                  cy="12" 
                  r="10" 
                  stroke="currentColor" 
                  strokeWidth="4"
                  fill="none"
                />
                <path 
                  className="opacity-75" 
                  fill="currentColor" 
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
              Generating...
            </div>
          ) : (
            'Generate'
          )}
        </button>
      </div>
    </div>
  );
};

export default PromptPanel;
