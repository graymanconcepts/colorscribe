import React from 'react';
import { Wand2 } from 'lucide-react';

interface PromptPanelProps {
  viewMode: 'grid' | 'chat';
  prompt: string;
  onPromptChange: (prompt: string) => void;
}

const PromptPanel: React.FC<PromptPanelProps> = ({ viewMode, prompt, onPromptChange }) => {
  if (viewMode === 'chat') {
    return null;
  }

  return (
    <div className="border-t border-gray-800 bg-gray-900 p-4">
      <div className="max-w-6xl mx-auto flex items-start gap-4">
        <div className="flex-1">
          {/* Prompt Input */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Prompt</label>
            <textarea
              value={prompt}
              onChange={(e) => onPromptChange(e.target.value)}
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-gray-200 h-20 resize-none"
              placeholder="Describe your image..."
            />
          </div>
        </div>

        {/* Generate Button */}
        <div className="pt-8">
          <button
            className="flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
          >
            <Wand2 className="h-5 w-5" />
            Generate
          </button>
        </div>
      </div>
    </div>
  );
};

export default PromptPanel;
