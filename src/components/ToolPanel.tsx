import React from 'react';
import { Sliders, Image as ImageIcon } from 'lucide-react';

interface ToolPanelProps {
  viewMode: 'grid' | 'chat';
  selectedDimensions: string;
  onDimensionsChange: (dimensions: string) => void;
  selectedEngine: string;
  onEngineChange: (engine: string) => void;
}

const ToolPanel: React.FC<ToolPanelProps> = ({ 
  viewMode, 
  selectedDimensions, 
  onDimensionsChange,
  selectedEngine,
  onEngineChange
}) => {
  const dimensionOptions = [
    '1024x1024',
    '832x1216',
    '1216x832'
  ];

  const [randomizeSeed, setRandomizeSeed] = React.useState(true);
  const [promptGuidance, setPromptGuidance] = React.useState(5);

  if (viewMode === 'chat') {
    return null; // Hide tool panel in chat mode
  }

  return (
    <div className={`w-80 border-l border-gray-800 bg-gray-900 p-4 overflow-y-auto ${viewMode === 'chat' ? 'hidden' : ''}`}>
      <div className="space-y-6">
        {/* Model Selection */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Model</label>
          <select 
            className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-gray-200"
            value={selectedEngine}
            onChange={(e) => onEngineChange(e.target.value)}
          >
            <option value="stable-diffusion-xl">Stable Diffusion XL</option>
            <option value="dall-e-3">DALL-E 3</option>
            <option value="bluewillow">BlueWillow</option>
          </select>
        </div>

        {/* Negative Prompt */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Negative Prompt</label>
          <textarea
            className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-gray-200 h-24 resize-none"
            placeholder="Describe what you don't want..."
          />
        </div>

        {/* Image Settings */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Image Settings</label>
          <div className="space-y-4">
            {/* Image Size Section */}
            <div className="space-y-2">
              <h3 className="text-sm font-medium text-gray-400">Image Size</h3>
              <div className="grid grid-cols-3 gap-2">
                {dimensionOptions.map((dimension) => (
                  <button
                    key={dimension}
                    onClick={() => onDimensionsChange(dimension)}
                    className={`px-2 py-2 rounded-lg text-sm font-medium transition-colors text-center
                      ${selectedDimensions === dimension
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                      }`}
                  >
                    {dimension}
                  </button>
                ))}
              </div>
            </div>

            {/* Prompt Guidance */}
            <div>
              <div className="flex justify-between text-sm text-gray-400 mb-2">
                <span>Prompt Guidance</span>
                <span>{promptGuidance}</span>
              </div>
              <input
                type="range"
                min="1"
                max="10"
                step="0.1"
                value={promptGuidance}
                onChange={(e) => setPromptGuidance(parseFloat(e.target.value))}
                className="w-full accent-blue-600"
              />
              <p className="text-amber-400/80 text-sm mt-1">Higher values will make the image more closely match your prompt</p>
            </div>

            {/* Quality Selection */}
            <div>
              <span className="text-gray-400 block mb-2">Quality</span>
              <select className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-gray-200 mb-2">
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
              <p className="text-amber-400/80 text-sm">Higher quality will increase generation time</p>
            </div>

            {/* Seed Randomization */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-gray-400">Randomize Seed</span>
                <button
                  onClick={() => setRandomizeSeed(!randomizeSeed)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    randomizeSeed ? 'bg-blue-600' : 'bg-gray-700'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      randomizeSeed ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
              <p className="text-gray-400 text-sm">Generate unique results each time</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ToolPanel;